import json
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

HOST = "127.0.0.1"
PORT = int(os.getenv("PORT", "5500"))
AI_URL = os.getenv("AI_URL", "https://api.openai.com/v1/chat/completions")
AI_MODEL = os.getenv("AI_MODEL", "gpt-4o-mini")


class MediCareHandler(SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path != "/api/ai":
            self.send_error(404)
            return

        length = int(self.headers.get("Content-Length", "0"))
        try:
            payload = json.loads(self.rfile.read(length))
            question = str(payload.get("question", "")).strip()
        except (ValueError, TypeError):
            self.send_json(400, {"error": "Invalid request body."})
            return

        if not question:
            self.send_json(400, {"error": "A question is required."})
            return

        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            self.send_json(503, {"error": "Set OPENAI_API_KEY to enable generated answers."})
            return

        request_body = json.dumps({
            "model": AI_MODEL,
            "temperature": 0.2,
            "messages": [
                {
                    "role": "system",
                    "content": (
                        "You are Care AI for a healthcare education website. "
                        "Give concise, plain-language educational information. "
                        "Never diagnose, prescribe, or replace a clinician. "
                        "Recommend professional care and mention urgent care for severe or sudden symptoms."
                    ),
                },
                {"role": "user", "content": question},
            ],
        }).encode("utf-8")
        request = Request(
            AI_URL,
            data=request_body,
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            method="POST",
        )

        try:
            with urlopen(request, timeout=45) as response:
                result = json.loads(response.read())
            answer = result["choices"][0]["message"]["content"]
            self.send_json(200, {"answer": answer})
        except (HTTPError, URLError, KeyError, IndexError, TypeError, ValueError) as error:
            print(f"AI request failed: {error}")
            self.send_json(502, {"error": "The AI service could not answer right now."})

    def send_json(self, status, body):
        encoded = json.dumps(body).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(encoded)


if __name__ == "__main__":
    server = ThreadingHTTPServer((HOST, PORT), MediCareHandler)
    print(f"MediCare Smart running at http://{HOST}:{PORT}")
    print("Set OPENAI_API_KEY before starting to enable generated AI answers.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        server.server_close()
