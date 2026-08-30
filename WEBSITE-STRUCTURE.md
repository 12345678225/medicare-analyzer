# MediCare Smart - Website Structure & File Integration

## 📋 Complete Website Map

This document outlines how all HTML files are interconnected to create a complete healthcare management website.

---

## 🗂️ File Structure & Descriptions

### **Entry Points**

#### `index.html` ⭐ (Landing Page)
- **Purpose**: Main entry point to the website
- **Content**: 
  - Company branding and overview
  - Feature cards for all main sections
  - Quick access buttons to all pages
- **Links to**:
  - `login.html` - Sign In
  - `home.html` - Dashboard
  - `medicine-reminder.html` - Medicine management
  - `appointments.html` - Appointment booking
  - `disease-prediction.html` - Health insights
  - `medicine-reports.html` - Health reports
  - `admin.html` - Admin portal

#### `login.html` 🔐 (Authentication)
- **Purpose**: User authentication page
- **Features**:
  - Email/password login
  - OAuth options (Google, Apple)
  - Beautiful animated login UI
  - Account creation link
  - Password recovery link
  - Provider portal (admin) link
- **After Login**: Redirects to `home.html`
- **Navigation**:
  - Create account → `dashboard.html`
  - Forgot password → `home.html`
  - Admin portal → `admin.html`
  - OAuth buttons → `home.html`

---

### **Main Application Pages**

#### `home.html` 🏠 (Dashboard Home)
- **Purpose**: Welcome page and application entry
- **Content**:
  - User greeting
  - Daily wellbeing summary
  - Feature cards
  - Quick stats and insights
- **Navigation Bar**: Links to all main sections
  - Home (active)
  - Dashboard
  - Prediction
  - Appointments
  - Medicines
  - Reports
  - Profile & Logout

#### `dashboard.html` 📊 (Main Dashboard)
- **Purpose**: Overview of all health activities
- **Content**:
  - Today's medicine reminders count
  - Upcoming appointments
  - Routine consistency percentage
  - Health summary badge
  - Sidebar navigation
- **Sidebar Links**:
  - Overview (active)
  - Medicines → `medicine-reminder.html`
  - Appointments → `appointments.html`
  - Predictions → `disease-prediction.html`
  - Reports → `medicine-reports.html`
  - Settings
  - Sign out → `login.html`

#### `medicine-reminder.html` 💊 (Medicine Management)
- **Purpose**: Manage daily medicine reminders
- **Content**:
  - Add new medicine form
  - List of active medicines
  - Reminder schedule
  - Medicine tracking
- **Top Navigation**: Links to all app sections
- **Key Links**:
  - Home → `home.html`
  - Dashboard → `dashboard.html`
  - Logout → `login.html`

#### `appointments.html` 📅 (Appointment Booking)
- **Purpose**: Browse and book doctor appointments
- **Content**:
  - Doctor directory with specialties
  - Search and filter functionality
  - Availability information
  - Booking interface
- **Top Navigation**: Links to all app sections
- **Available Specialties**:
  - Cardiologist
  - Dermatologist
  - General Physician
  - Dentist
  - Neurologist

#### `disease-prediction.html` 🔬 (Symptom Explorer)
- **Purpose**: Health insights and symptom exploration
- **Content**:
  - Symptom input form
  - Educational health patterns
  - Prediction results
  - Doctor consultation prompts
- **Top Navigation**: Links to all app sections
- **Important**: Educational tool, not medical diagnosis

#### `medicine-reports.html` 📈 (Health Reports)
- **Purpose**: Track and view health history
- **Content**:
  - Medicine history
  - Appointment records
  - Health reports and statistics
  - Downloadable reports
- **Top Navigation**: Links to all app sections
- **Key Links**:
  - Dashboard → `dashboard.html`
  - Medicines → `medicine-reminder.html`
  - Logout → `login.html`

---

### **Special Pages**

#### `admin.html` 👨‍⚕️ (Provider Portal)
- **Purpose**: Admin/provider dashboard
- **Audience**: Healthcare providers and administrators
- **Content**:
  - User management
  - Doctor management
  - Appointment overview
  - Analytics and reports
- **Sidebar Navigation**:
  - Dashboard (active)
  - Users
  - Doctors
  - Appointments
  - Reports
  - Settings
  - Sign out → `login.html`
- **Access**: Via `login.html` "Sign in to provider portal" link

---

## 🔄 Navigation Flow

```
index.html (Landing)
    ├── → login.html (Sign In)
    │       ├── → home.html (Authenticated entry)
    │       ├── → dashboard.html (Overview)
    │       ├── → admin.html (Provider Portal)
    │       └── → medicine-reminder.html (Account creation)
    │
    ├── → home.html (Skip login if already authenticated)
    │       ├── → dashboard.html
    │       ├── → medicine-reminder.html
    │       ├── → appointments.html
    │       ├── → disease-prediction.html
    │       ├── → medicine-reports.html
    │       └── → login.html (Logout)
    │
    └── → Other pages (Direct links from cards)
            ├── medicine-reminder.html
            ├── appointments.html
            ├── disease-prediction.html
            ├── medicine-reports.html
            └── admin.html
```

---

## 🎨 Styling & Resources

### CSS
- **File**: `css/style.css`
- **Used by**: All pages except `login.html` (has inline styles)
- **Provides**: Consistent styling across the application

### JavaScript
- **File**: `js/script.js`
- **Provides**: Interactive functionality (search, filters, forms, etc.)
- **Plus**: Inline scripts in `login.html` for authentication

---

## 🚀 Backend Integration

### Python Server
- **File**: `server.py`
- **Purpose**: Backend API server
- **Handles**:
  - User authentication
  - Medicine reminders CRUD
  - Appointment management
  - Health predictions
  - Reports generation
  - Admin functionality

---

## 📱 User Journey

### New User
1. Land on `index.html`
2. Click "Sign In" → `login.html`
3. Create account or enter credentials
4. Redirected to `home.html` (authenticated)
5. Navigate to desired features via top navigation

### Existing User
1. Land on `index.html`
2. Click "View Dashboard" → `home.html`
3. Or click "Sign In" → `login.html` → `home.html`
4. Use sidebar or top navigation to access features

### Healthcare Provider
1. Land on `index.html`
2. Go to `login.html`
3. Click "Sign in to the provider portal" → `admin.html`
4. Manage patients, appointments, and reports

---

## ✅ Checklist for Website Integration

- [x] Landing page (`index.html`) links to all sections
- [x] Login page (`login.html`) has all necessary action links
- [x] Home page (`home.html`) has complete navigation
- [x] Dashboard (`dashboard.html`) has sidebar navigation
- [x] All app pages have consistent top navigation bar
- [x] Logout functionality on all authenticated pages
- [x] Admin portal accessible from login page
- [x] Mobile-responsive design on all pages
- [x] CSS/JS files linked consistently
- [x] Python backend server configured

---

## 🔗 Quick Reference - All Internal Links

| From | To | Purpose |
|------|-----|---------|
| index.html | login.html | Sign In CTA |
| index.html | home.html | Dashboard view |
| index.html | All pages | Feature cards |
| login.html | home.html | After login redirect |
| login.html | dashboard.html | Create account |
| login.html | admin.html | Provider portal |
| home.html | All pages | Top nav links |
| dashboard.html | All pages | Sidebar links |
| All app pages | login.html | Logout |

---

## 🛠️ To Run the Website

1. **Start Python server**:
   ```bash
   python server.py
   ```

2. **Open in browser**:
   - Main site: `http://localhost:5000/index.html`
   - Or any direct page: `http://localhost:5000/home.html`

3. **Default credentials** (if configured in backend):
   - Check `server.py` for test credentials

---

## 📝 Notes

- All pages use `<meta name="viewport">` for mobile responsiveness
- Authentication state should be managed by the backend (`server.py`)
- The `login.html` redirects to `home.html` after successful login
- All protected pages should check authentication before loading
- Admin pages should require provider role verification

