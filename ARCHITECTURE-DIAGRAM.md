# MediCare Smart - Visual Connection Architecture

## 🗺️ Complete File Hierarchy Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      MEDICCARE SMART ARCHITECTURE                        │
└─────────────────────────────────────────────────────────────────────────┘

                              ┌──────────────┐
                              │  index.html  │
                              │  (Landing)   │
                              └──────┬───────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
              ┌─────▼──────┐   ┌─────▼──────┐   ┌────▼────────────┐
              │ login.html  │   │  home.html │   │ Feature Cards:  │
              │(Auth Page)  │   │ (App Hub)  │   │ - medicine-rm   │
              └─────┬───────┘   └─────┬──────┘   │ - appointments  │
                    │                 │          │ - predictions   │
                    │         ┌───────┼─────┬────┼─ reports       │
                    │         │       │     │    │ - dashboard    │
                    │         │       │     │    │ - admin-login  │
                    │    ┌────▼──┐┌──▼──┬──▼──┬──▼──┬────────┐
                    │    │       ││     │     │     │        │
              ┌─────▼────▼───┐   ││     │     │     │        │
              │ admin-login   │   ││     │     │     │        │
              │   .html       │   ││     │     │     │        │
              └────┬──────────┘   ││     │     │     │        │
                   │              ││     │     │     │        │
              ┌────▼────┐         ││     │     │     │        │
              │admin.html│         ││     │     │     │        │
              │(Provider)│        ▼▼     │     │     │        │
              └──────────┘    ┌───────────┐   │     │        │
                              │Dashboard  │   │     │        │
                              │  (Manage) │───┤     │        │
                              └───────────┘   │     │        │
                                              │     │        │
                    ┌─────────────────────────┴─────┴────┬────┴────┐
                    │                                    │         │
          ┌─────────▼─────────┐      ┌─────────────┐   │         │
          │ Sidebar (Opt)     │      │   Top Nav   │   │         │
          ├───────────────────┤      ├─────────────┤   │         │
          │ • Dashboard       │      │ • Home  ✓   │   │         │
          │ • Medicines  ─────┼────→ │ • Dashboard ├───┼─────┐   │
          │ • Appointments  ──┼────→ │ • Prediction├───┼───┐ │   │
          │ • Predictions   ──┼────→ │ • Appointments   │ │ │   │
          │ • Reports      ───┼────→ │ • Medicines     │ │ │   │
          │ • Settings        │      │ • Reports       │ │ │   │
          │ • Logout       ───┼────→ │ • Logout → login│ │ │   │
          └───────────────────┘      └─────────────┘   │ │ │   │
                                                        │ │ │   │
          ┌─────────────────────────────────────────────┘ │ │   │
          │                                               │ │   │
    ┌─────▼──────────────┐  ┌────────────────┐  ┌────────▼─▼───▼─────┐
    │medicine-reminder   │  │appointments.   │  │disease-prediction │
    │      .html         │  │     html       │  │      .html        │
    └────┬──────────────┘  └────┬───────────┘  └────┬──────────────┘
         │                      │                   │
         │                      │                   │
    ┌────▼──────────────────────▼───────────────────▼──────────┐
    │         All Share: Top Navigation Bar (6 pages)         │
    ├─────────────────────────────────────────────────────────┤
    │  Brand Logo  Home  Dashboard  Prediction  Appointments  │
    │  Medicines   Reports  [Profile] Logout(↪)              │
    │                                                         │
    │  Each Page Links To All Others + login.html (logout)   │
    └─────────────────────────────────────────────────────────┘

```

---

## 🔄 Detailed Navigation Flows

### Flow 1: Patient Login & App Access
```
┌──────────────┐
│ index.html   │
│  (Landing)   │
└──────┬───────┘
       │
       │ User clicks "Sign In"
       ▼
┌──────────────────┐
│  login.html      │
│ (Auth Page)      │
└──────┬───────────┘
       │
       │ Enter credentials + Submit
       │ (JavaScript validation & redirect)
       │
       ▼
┌──────────────────┐
│   home.html      │
│  (App Hub)       │
│  ✓ Authenticated │
└──────┬───────────┘
       │
       │ Top Navigation Available:
       │ ┌─ Dashboard
       │ ├─ Medicines
       │ ├─ Appointments
       │ ├─ Predictions
       │ ├─ Reports
       │ └─ Logout (→ login.html)
       │
       └─→ User can access any of 6 main pages
           (all interconnected)
```

### Flow 2: Provider Login & Admin Access
```
┌──────────────┐
│ index.html   │
│  (Landing)   │
└──────┬───────┘
       │
       │ User clicks "Admin Portal"
       ▼
┌─────────────────────┐
│  admin-login.html   │
│ (Provider Auth)     │
└──────┬──────────────┘
       │
       │ Enter provider credentials + Submit
       │ (JavaScript validation & redirect)
       │
       ▼
┌──────────────────┐
│   admin.html     │
│  (Admin Portal)  │
│  ✓ Provider Mode │
└──────┬───────────┘
       │
       │ Sidebar Navigation:
       │ ┌─ Dashboard
       │ ├─ Users
       │ ├─ Doctors
       │ ├─ Appointments
       │ ├─ Reports
       │ ├─ Settings
       │ └─ Logout (→ admin-login.html)
       │
       └─→ Admin-specific features
           (patient management, etc.)
```

### Flow 3: Account Creation
```
┌──────────────┐
│ index.html   │
│  (Landing)   │
└──────┬───────┘
       │
       │ User clicks "Sign In"
       ▼
┌──────────────────┐
│  login.html      │
└──────┬───────────┘
       │
       │ Click "Create an account"
       ▼
┌──────────────────┐
│ dashboard.html   │
│ (Signup Form)    │
└──────┬───────────┘
       │
       │ Complete signup
       │ (Backend creates account)
       │
       ▼
┌──────────────────┐
│  home.html       │
│  ✓ Authenticated │
│  (Auto-redirect) │
└──────────────────┘
```

---

## 📦 File Dependency Map

```
┌─────────────────────────────────────────────────────────┐
│               RESOURCE FILES (Shared)                   │
├─────────────────────────────────────────────────────────┤
│  • css/style.css        → Linked by all app pages       │
│  • js/script.js         → Linked by all app pages       │
│  • server.py            → Backend API                   │
└─────────────────────────────────────────────────────────┘
         △                △                 △
         │                │                 │
         └────────┬───────┴────────┬────────┘
                  │                │
        ┌─────────┴────┐    ┌──────┴──────────┐
        │   Auth Pages │    │  App Pages (6)  │
        ├──────────────┤    ├─────────────────┤
        │index.html    │    │home.html        │
        │login.html    │    │dashboard.html   │
        │admin-login   │    │medicine-        │
        │admin.html    │    │  reminder.html  │
        │              │    │appointments.html│
        │              │    │disease-         │
        │              │    │  prediction.html│
        │              │    │medicine-        │
        │              │    │  reports.html   │
        └──────────────┘    └─────────────────┘
```

---

## 🎯 Connection Summary Table

```
┌──────────────────┬──────────────────────────────────────┐
│   FROM PAGE      │   LINKS TO (Top Navigation Bar)      │
├──────────────────┼──────────────────────────────────────┤
│ home.html        │ dashboard, predictions, appointments,│
│                  │ medicines, reports, + logout         │
├──────────────────┼──────────────────────────────────────┤
│ dashboard.html   │ home, predictions, appointments,     │
│                  │ medicines, reports, + logout         │
├──────────────────┼──────────────────────────────────────┤
│ medicine-        │ home, dashboard, predictions,        │
│ reminder.html    │ appointments, reports, + logout      │
├──────────────────┼──────────────────────────────────────┤
│ appointments.    │ home, dashboard, predictions,        │
│ html             │ medicines, reports, + logout         │
├──────────────────┼──────────────────────────────────────┤
│ disease-         │ home, dashboard, medicines,          │
│ prediction.html  │ appointments, reports, + logout      │
├──────────────────┼──────────────────────────────────────┤
│ medicine-        │ home, dashboard, medicines,          │
│ reports.html     │ appointments, predictions, + logout  │
├──────────────────┼──────────────────────────────────────┤
│ login.html       │ home (redirect), dashboard           │
│                  │ (account), admin-login (provider)    │
├──────────────────┼──────────────────────────────────────┤
│ admin-login.html │ admin (redirect), login, index       │
├──────────────────┼──────────────────────────────────────┤
│ admin.html       │ admin-login (logout)                 │
├──────────────────┼──────────────────────────────────────┤
│ index.html       │ login, home, + 6 feature cards       │
└──────────────────┴──────────────────────────────────────┘
```

---

## 🌳 Tree View of File Organization

```
medical/
│
├── 📄 index.html ..................... Landing Page (Entry Point)
│   ├─→ login.html
│   ├─→ home.html
│   └─→ Feature Cards (6 links)
│
├── 🔐 Authentication Pages
│   ├── 📄 login.html ................. Patient Authentication
│   │   ├─→ home.html (after login)
│   │   ├─→ dashboard.html (signup)
│   │   └─→ admin-login.html (provider)
│   │
│   ├── 📄 admin-login.html ........... Provider Authentication
│   │   ├─→ admin.html (after login)
│   │   ├─→ login.html (back link)
│   │   └─→ index.html
│   │
│   └── 📄 admin.html ................. Admin Portal
│       └─→ admin-login.html (logout)
│
├── 🏥 Patient App Pages (All Interconnected)
│   ├── 📄 home.html .................. App Hub / Welcome
│   │
│   ├── 📄 dashboard.html ............. Overview & Workspace
│   │
│   ├── 📄 medicine-reminder.html ..... Medicine Management
│   │
│   ├── 📄 appointments.html .......... Doctor Appointments
│   │
│   ├── 📄 disease-prediction.html .... Symptom Explorer
│   │
│   └── 📄 medicine-reports.html ...... Health Reports & History
│
├── 📂 css/
│   └── 📄 style.css .................. Global Styling
│       └─ Linked by: all 6 app pages
│
├── 📂 js/
│   └── 📄 script.js .................. Global Scripts
│       └─ Linked by: all 6 app pages
│
├── 🐍 server.py ..................... Python Backend Server
│
├── 📋 WEBSITE-STRUCTURE.md .......... File Integration Guide
└── 📋 NAVIGATION-GUIDE.md ........... Navigation Reference
```

---

## 🔗 Link Density Chart

```
Link Count by Page:

index.html          [██████████████████] 18 links
login.html          [█████████████] 13 links
admin-login.html    [███████] 7 links
admin.html          [████] 4 links
home.html           [██████████████████] 18 links
dashboard.html      [██████████████████] 18 links
medicine-reminder   [██████████████████] 18 links
appointments        [██████████████████] 18 links
disease-prediction  [██████████████████] 18 links
medicine-reports    [██████████████████] 18 links
```

---

## ✅ Verification Checklist

- [x] index.html → login.html (Sign In CTA)
- [x] index.html → home.html (Dashboard CTA)
- [x] index.html → 6 feature cards linked
- [x] index.html → admin-login.html (Admin card)
- [x] login.html → home.html (form submit)
- [x] login.html → dashboard.html (signup)
- [x] login.html → admin-login.html (provider link)
- [x] home.html ↔ dashboard.html (bidirectional nav)
- [x] home.html ↔ medicine-reminder (nav)
- [x] home.html ↔ appointments (nav)
- [x] home.html ↔ disease-prediction (nav)
- [x] home.html ↔ medicine-reports (nav)
- [x] dashboard.html ↔ All 5 other app pages
- [x] All 6 app pages have consistent nav bar
- [x] All app pages → login.html (logout)
- [x] admin-login.html → admin.html (form submit)
- [x] admin-login.html → login.html (back link)
- [x] admin.html → admin-login.html (logout)
- [x] css/style.css linked by all app pages
- [x] js/script.js linked by all app pages

---

## 🎓 Color Legend

```
🟦 Public Pages:     index.html, login.html, admin-login.html
🟩 Protected Pages:  home.html, dashboard.html, medicine-reminder.html,
                     appointments.html, disease-prediction.html,
                     medicine-reports.html
🟪 Admin Pages:      admin.html
⚫ Resources:        css/style.css, js/script.js, server.py
```

