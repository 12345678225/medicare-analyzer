# MediCare Smart

A browser-only healthcare management frontend built with HTML, CSS, and JavaScript.

Open `index.html` with VS Code Live Server for the browser-only demo. Demo state is stored in browser `localStorage`.

## Generated AI answers

For real generated answers, use the included local proxy so the API key stays on the server:

```powershell
$env:OPENAI_API_KEY = "your-key"
python server.py
```

Then open `http://127.0.0.1:5500/disease-prediction.html`. The optional `AI_MODEL` and `AI_URL` environment variables can select another OpenAI-compatible provider. Without the key, the page uses its safe educational fallback.

The symptom explorer is educational decision support only and is not a medical diagnosis.