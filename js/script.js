const demo = { reminders: [{ id: 1, name: 'Vitamin D3', dose: '1000 IU', time: '08:00', status: 'Taken' }, { id: 2, name: 'Metformin', dose: '500 mg', time: '20:00', status: 'Pending' }], appointments: [{ id: 1, doctor: 'Dr. Ananya Rao', speciality: 'Cardiologist', date: '2026-09-02', time: '10:30' }], reports: [{ medicine: 'Vitamin D3', dose: '1000 IU', date: '2026-08-28', time: '08:00', status: 'Taken' }, { medicine: 'Metformin', dose: '500 mg', date: '2026-08-27', time: '20:00', status: 'Missed' }] };
const store = { get(k, f = []) { try { return JSON.parse(localStorage.getItem(k)) || f } catch { return f } }, set(k, v) { localStorage.setItem(k, JSON.stringify(v)) } };['reminders', 'appointments', 'reports'].forEach(k => { if (!localStorage.getItem(k)) store.set(k, demo[k]) });
const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s); function toast(message) { const el = document.createElement('div'); el.className = 'toast'; el.textContent = message; document.body.append(el); setTimeout(() => el.remove(), 2800) }
function nav() { const page = document.body.dataset.page; $$('[data-nav]').forEach(a => { if (a.dataset.nav === page) a.classList.add('active') }); $('.menu-btn')?.addEventListener('click', () => $('.nav-links').classList.toggle('hidden')) }
function renderReminders(target = '#reminder-list') { const el = $(target); if (!el) return; const items = store.get('reminders'); el.innerHTML = items.length ? items.map(x => `<div class="reminder-item"><span class="time">${x.time}</span><span class="med-dot"></span><div style="flex:1"><b>${x.name}</b><small class="muted"> · ${x.dose}</small></div><button class="badge ${x.status === 'Pending' ? 'pending' : ''}" data-take="${x.id}">${x.status}</button></div>`).join('') : '<div class="empty">No medicines added yet.</div>'; $$('[data-take]').forEach(b => b.onclick = () => { const a = store.get('reminders'); const item = a.find(x => x.id == b.dataset.take); item.status = item.status === 'Taken' ? 'Pending' : 'Taken'; store.set('reminders', a); renderReminders(target); toast(item.status === 'Taken' ? 'Marked as taken' : 'Marked as pending') }) }
function renderAppointments(target = '#appointments-list') { const el = $(target); if (!el) return; const items = store.get('appointments'); el.innerHTML = items.length ? items.map(x => `<div class="appointment-item"><div class="stat-icon">⌁</div><div style="flex:1"><b>${x.doctor}</b><div class="muted" style="font-size:12px">${x.speciality} · ${x.date} at ${x.time}</div></div><button class="btn danger small" data-cancel="${x.id}">Cancel</button></div>`).join('') : '<div class="empty">No upcoming appointments.</div>'; $$('[data-cancel]').forEach(b => b.onclick = () => { store.set('appointments', store.get('appointments').filter(x => x.id != b.dataset.cancel)); renderAppointments(target); toast('Appointment cancelled') }) }
function setupLogin() { const form = $('#login-form'); if (!form) return; $$('.auth-tabs button').forEach(b => b.onclick = () => { $$('.auth-tabs button').forEach(x => x.classList.remove('active')); b.classList.add('active'); $('#login-title').textContent = b.dataset.role === 'admin' ? 'Admin login' : 'Welcome back' }); $('.show-password').onclick = () => { const input = $('#password'); input.type = input.type === 'password' ? 'text' : 'password' }; form.onsubmit = e => { e.preventDefault(); const email = $('#email').value.trim(), pass = $('#password').value; if (!email || !pass) { $('#login-error').textContent = 'Please enter your email and password.'; return } const admin = $('.auth-tabs button.active').dataset.role === 'admin'; location.href = admin ? 'admin.html' : 'home.html' } }
function setupReminder() { const form = $('#medicine-form'); renderReminders(); if (!form) return; form.onsubmit = e => { e.preventDefault(); const data = Object.fromEntries(new FormData(form)); if (!data.name || !data.dose || !data.time) { toast('Complete the medicine details'); return } const reminders = store.get('reminders'); reminders.push({ id: Date.now(), name: data.name, dose: data.dose, time: data.time, status: 'Pending' }); store.set('reminders', reminders); form.reset(); renderReminders(); toast('Medicine reminder added') } }
function setupAppointment() { renderAppointments('#my-appointments'); const form = $('#appointment-form'); if (!form) return; form.onsubmit = e => { e.preventDefault(); const data = Object.fromEntries(new FormData(form)); if (!data.doctor || !data.date || !data.time || !data.patient) { toast('Complete the appointment details'); return } const list = store.get('appointments'); list.push({ id: Date.now(), doctor: data.doctor, speciality: $('#speciality')?.value || 'General Physician', date: data.date, time: data.time }); store.set('appointments', list); form.reset(); renderAppointments('#my-appointments'); toast('Appointment confirmed') } }
function setupPrediction() {
    const form = $('#prediction-form');
    if (!form) return;
    form.onsubmit = async e => {
        e.preventDefault();
        const symptoms = [...$$('input[name="symptom"]:checked')].map(x => x.value);
        if (!symptoms.length) { toast('Select at least one symptom'); return }
        const resultCard = $('#prediction-result');
        resultCard.innerHTML = '<div class="eyebrow">Care AI</div><h2>Reviewing your information...</h2><p class="muted">Preparing educational guidance.</p>';
        resultCard.classList.remove('hidden');
        const question = `Patient age: ${$('#age').value || 'not provided'}. Symptoms: ${symptoms.join(', ')}. Explain possible general health patterns, questions to ask a doctor, and when to seek urgent care. Do not diagnose.`;
        try {
            const answer = await askCareAI(question);
            resultCard.innerHTML = `<div class="eyebrow">AI educational guidance</div><div class="ai-answer">${answer.replace(/\n/g, '<br>')}</div><div class="notice">This is decision-support information, not a medical diagnosis. Please consult a qualified healthcare professional.</div>`;
            toast('AI guidance generated');
        } catch {
            const result = symptoms.includes('thirst') ? 'Possible pattern: elevated blood sugar' : symptoms.includes('headache') ? 'Possible pattern: tension headache' : 'Possible pattern: seasonal viral infection';
            resultCard.innerHTML = `<div class="eyebrow">Educational result</div><h2>${result}</h2><p class="muted">Local demo guidance is shown because the AI server is unavailable.</p><div class="notice">This is decision-support information, not a medical diagnosis. Please consult a qualified healthcare professional.</div>`;
            toast('AI server unavailable; local guidance shown');
        }
    };
}
async function askCareAI(question) {
    const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
    });
    if (!response.ok) throw new Error('AI endpoint unavailable');
    const data = await response.json();
    return data.answer;
}
function setupAI() {
    const form = $('#ai-form');
    if (!form) return;
    form.onsubmit = async e => {
        e.preventDefault();
        const question = $('#ai-question').value.trim();
        const answer = $('#ai-answer');
        if (!question) { toast('Enter a question first'); return }
        answer.textContent = 'Care AI is thinking...';
        answer.classList.remove('hidden');
        try {
            answer.textContent = await askCareAI(question);
        } catch {
            answer.textContent = 'For this demo, Care AI can help you prepare questions, organize symptoms, and explain health terms in plain language. It cannot diagnose, prescribe, or replace a qualified healthcare professional. Please seek urgent medical care for severe or sudden symptoms.';
        }
    };
}
function setupSearch() { const input = $('[data-filter]'); if (!input) return; input.oninput = () => { const q = input.value.toLowerCase(); $$('[data-searchable]').forEach(el => el.classList.toggle('hidden', !el.textContent.toLowerCase().includes(q))) } }
function renderReports() { const body = $('#report-body'); if (!body) return; const reports = store.get('reports'); body.innerHTML = reports.map(x => `<tr data-searchable><td>${x.medicine}</td><td>${x.dose}</td><td>${x.date}</td><td>${x.time}</td><td><span class="badge ${x.status === 'Missed' ? 'missed' : ''}">${x.status}</span></td></tr>`).join(''); $('#print-report')?.addEventListener('click', () => window.print()); $('#generate-report')?.addEventListener('click', () => toast('Report refreshed from your medicine history')) }
function setupAdmin() { const body = $('#admin-users'); if (!body) return; const users = [['Aarav Mehta', 'aarav@example.com', 'Active'], ['Maya Shah', 'maya@example.com', 'Active'], ['Kabir Singh', 'kabir@example.com', 'Pending']]; body.innerHTML = users.map((u, i) => `<tr data-searchable><td><b>${u[0]}</b></td><td>${u[1]}</td><td><span class="badge ${u[2] === 'Pending' ? 'pending' : ''}">${u[2]}</span></td><td><button class="btn secondary small" data-remove="${i}">Delete</button></td></tr>`).join(''); $$('[data-remove]').forEach(b => b.onclick = () => { b.closest('tr').remove(); toast('User removed from demo table') }) }
function init() { nav(); setupLogin(); setupReminder(); setupAppointment(); setupPrediction(); setupAI(); setupSearch(); renderReports(); setupAdmin(); $('#logout')?.addEventListener('click', () => location.href = 'login.html'); $('#today-count') && ($('#today-count').textContent = store.get('reminders').length); $('#appointment-count') && ($('#appointment-count').textContent = store.get('appointments').length) } document.addEventListener('DOMContentLoaded', init);
