# MediCare Smart - Admin Authentication & Authorization System

## 🔐 Complete Admin Sign-In & Role-Based Access Control

This document outlines the comprehensive authentication and authorization system for healthcare providers and clinic administrators.

---

## 📋 Role Definitions & Permissions

### **1. Healthcare Provider (Doctor)**

**Who**: Individual healthcare providers, doctors, specialists, nurses

**Core Permissions**:
- ✅ View patient records (assigned patients only)
- ✅ View appointments (assigned appointments)
- ✅ View medicine reminders (prescribed medicines)
- ✅ View disease predictions (related patients)
- ✅ View reports (generated for their patients)
- ❌ Cannot manage users
- ❌ Cannot generate system-wide reports
- ❌ Cannot view audit trail

**Accessible Sections**:
1. Dashboard (overview of their workload)
2. Medicines (view/adjust prescribed medicines)
3. Predictions (review flagged health risks)

**Key Features**:
- View only their assigned patients' data
- Can add notes/observations
- Can adjust medicine dosages
- Can approve/flag disease predictions

---

### **2. Clinic Administrator**

**Who**: Clinic admin staff, practice managers, office administrators

**Core Permissions**:
- ✅ View all patients
- ✅ Manage patient accounts (activate/deactivate)
- ✅ View all appointments
- ✅ Manage appointments (schedule, reschedule, cancel)
- ✅ View medicine reminders
- ✅ Manage medicine reminders
- ✅ Review disease predictions
- ✅ Generate reports
- ✅ Manage user accounts
- ✅ View audit trail
- ✅ Reset user passwords
- ✅ Assign roles

**Accessible Sections**:
1. Dashboard (full clinic overview)
2. Patients (full management)
3. Appointments (full management)
4. Medicines (full oversight)
5. Predictions (review & approve)
6. Reports (generate & export)
7. Users (manage all users)
8. Audit Trail (view all activity)

**Key Features**:
- Complete clinic data access
- User management capabilities
- Report generation & export
- Full audit trail visibility

---

### **3. Clinic Supervisor**

**Who**: Senior clinic staff, medical supervisors, clinic directors

**Core Permissions**:
- ✅ View all patients
- ✅ Manage patient accounts
- ✅ View all appointments
- ✅ Manage appointments
- ✅ View medicine reminders
- ✅ Review disease predictions
- ✅ Approve/manage predictions
- ✅ Generate reports
- ✅ Manage user accounts (limited)
- ✅ View audit trail
- ❌ Cannot delete users
- ❌ Cannot modify system settings

**Accessible Sections**:
1. Dashboard (full clinic overview)
2. Patients (full management)
3. Appointments (full management)
4. Medicines (full oversight)
5. Predictions (review & approve)
6. Reports (generate & export)
7. Users (view & basic management)
8. Audit Trail (view all activity)

---

## 🔄 Authentication Flow

### **Step 1: User Accesses Admin Login**
```
User → admin-login.html
```

### **Step 2: User Fills Login Form**
```
Required Fields:
- Email or License Number
- Password (min 6 characters)
- Role Selection (Provider / Admin / Supervisor)

Optional:
- "Remember me" checkbox
```

### **Step 3: Frontend Validation**
```javascript
✓ Valid email format
✓ Password minimum length (6 chars)
✓ Role selected from dropdown
→ If validation fails: Show error message
→ If validation passes: Proceed to backend
```

### **Step 4: Backend Authentication** (server.py)
```
Expected API Endpoint: POST /api/admin-login
Body: {
  email: "user@clinic.com",
  password: "hashedPassword",
  role: "provider|admin|supervisor"
}

Server Response (Success):
{
  success: true,
  user: { email, role, loginTime },
  permissions: [ "view_patients", "manage_appointments", ... ],
  sessionToken: "jwt_token_here"
}

Server Response (Failure):
{
  success: false,
  error: "Invalid credentials or insufficient permissions"
}
```

### **Step 5: Session Management**
```javascript
// Store in sessionStorage (client-side)
sessionStorage.setItem('adminUser', JSON.stringify({
  email: "user@clinic.com",
  role: "admin",  // or "provider" or "supervisor"
  loginTime: "2026-08-30T10:45:00Z",
  sessionId: "session_1693370700000"
}));

// Store permissions based on role
sessionStorage.setItem('userPermissions', JSON.stringify([
  'view_patients',
  'manage_appointments',
  'view_medicine_reminders',
  // ... role-specific permissions
]));
```

### **Step 6: Redirect to Admin Dashboard**
```
✓ Authentication successful
→ Redirect to admin.html?role=admin
→ admin.html checks session on load
→ Initializes UI based on role
→ Hides sections user cannot access
```

### **Step 7: Ongoing Authorization**
```
Every page load or section access:
1. Check if adminUser session exists
2. Check if userPermissions array exists
3. If either missing → Redirect to login
4. Validate requested action against permissions
5. Allow/deny section access
```

---

## 🔑 Role-Based Access Control (RBAC)

### **Permission Matrix**

```
┌─────────────────────┬──────────┬─────────┬────────────┐
│ Feature             │ Provider │ Admin   │ Supervisor │
├─────────────────────┼──────────┼─────────┼────────────┤
│ Dashboard           │    ✓     │    ✓    │     ✓      │
│ View Patients       │    ✓     │    ✓    │     ✓      │
│ Manage Patients     │    ✗     │    ✓    │     ✓      │
│ View Appointments   │    ✓     │    ✓    │     ✓      │
│ Manage Appointments │    ✗     │    ✓    │     ✓      │
│ View Medicines      │    ✓     │    ✓    │     ✓      │
│ Manage Medicines    │    ✓     │    ✓    │     ✓      │
│ View Predictions    │    ✓     │    ✓    │     ✓      │
│ Approve Predictions │    ✗     │    ✓    │     ✓      │
│ View Reports        │    ✗     │    ✓    │     ✓      │
│ Generate Reports    │    ✗     │    ✓    │     ✓      │
│ Manage Users        │    ✗     │    ✓    │    (~)     │
│ View Audit Log      │    ✗     │    ✓    │     ✓      │
└─────────────────────┴──────────┴─────────┴────────────┘

Legend: ✓ = Full Access | ~ = Limited Access | ✗ = No Access
```

### **Section Visibility by Role**

**Provider View** (Only 3 sections):
1. ✓ Dashboard
2. ✓ Medicines
3. ✓ Predictions

**Admin View** (All 8 sections):
1. ✓ Dashboard
2. ✓ Patients
3. ✓ Appointments
4. ✓ Medicines
5. ✓ Predictions
6. ✓ Reports
7. ✓ Users
8. ✓ Audit Trail

**Supervisor View** (7 sections):
1. ✓ Dashboard
2. ✓ Patients
3. ✓ Appointments
4. ✓ Medicines
5. ✓ Predictions
6. ✓ Reports
7. ✓ Audit Trail
(Users section hidden)

---

## 📊 Admin Portal Features

### **1. Dashboard Section**

**Accessible By**: Provider, Admin, Supervisor

**Key Metrics**:
- Total Patients Count
- Today's Appointments Count
- Pending Reviews (predictions awaiting approval)
- Missed Doses (last 24 hours)

**Alerts & Notifications**:
- ⚠️ Critical alerts (missed medication doses)
- ⏰ Pending reviews (disease predictions)
- ℹ️ Informational (reports ready, etc.)

```javascript
// Real-time alert generation
Alerts trigger when:
- Patient misses 2+ scheduled medication doses
- Disease prediction awaiting approval > 24 hours
- Appointment cancelled by patient
- Critical health flag detected
```

---

### **2. Patient Management Section**

**Accessible By**: Admin, Supervisor

**Capabilities**:
```
✓ View all patient records
✓ Search patients (name, email, ID)
✓ Filter patients (active, inactive, high-risk)
✓ View individual patient details
✓ Activate/deactivate patient accounts
✓ Add notes to patient records
✓ Link to patient's dashboard/data
```

**Patient Information Displayed**:
- Name & Contact
- Account Status
- Last Checkup Date
- Risk Level (Low/Medium/High)
- Current Medicines
- Upcoming Appointments

---

### **3. Appointment Management Section**

**Accessible By**: Admin, Supervisor

**Capabilities**:
```
✓ View all appointments (clinic-wide)
✓ Filter by status (pending, confirmed, completed, cancelled)
✓ Schedule new appointments
✓ Approve pending appointments
✓ Reschedule appointments
✓ Cancel appointments
✓ Add notes/comments
```

**Actions Available**:
- Approve appointment
- Reschedule
- Cancel
- Send patient reminder
- View appointment details

---

### **4. Medicine Reminders Oversight**

**Accessible By**: Provider, Admin, Supervisor

**Capabilities**:
```
✓ View all active medicines
✓ Filter by status (active, paused, completed)
✓ View compliance rates
✓ Edit dosage schedules
✓ Adjust medicine frequency
✓ Pause/resume reminders
✓ View missed doses
```

**Compliance Tracking**:
- % of doses taken on time
- % of doses missed
- Compliance trend over time
- Patient adherence alerts

---

### **5. Disease Prediction Review**

**Accessible By**: Provider, Admin, Supervisor

**Capabilities**:
```
✓ View all predictions
✓ Filter by risk level (critical, high, medium, low)
✓ Review prediction details
✓ Approve/reject prediction
✓ Flag for follow-up
✓ Add clinical notes
✓ Share prediction with patient (or withhold)
```

**Admin Actions**:
- Review & validate AI predictions
- Approve before patient notification
- Add clinical context
- Flag high-risk cases
- Schedule follow-up appointments

---

### **6. Reports & Analytics**

**Accessible By**: Admin, Supervisor

**Report Templates**:
1. **Patient Health Summary**
   - Comprehensive patient health overview
   - Includes all vital data points
   - Printable/exportable

2. **Medicine Compliance Report**
   - Adherence rates across patients
   - Missed dose trends
   - Effectiveness analysis

3. **Clinic Analytics**
   - Total patient count
   - Appointment statistics
   - Revenue metrics
   - Staff workload analysis

**Export Formats**:
- PDF (printable)
- CSV (spreadsheet)
- JSON (API integration)

---

### **7. User & Account Management**

**Accessible By**: Admin only

**Capabilities**:
```
✓ View all clinic staff
✓ Create new user accounts
✓ Assign roles (provider, admin, supervisor)
✓ Activate/deactivate accounts
✓ Reset user passwords
✓ Manage user permissions
✓ View user login history
✓ Remove users
```

**User Actions Available**:
- Edit user profile
- Change role assignment
- Reset password
- Suspend account
- Delete account
- View activity history

---

### **8. Audit Trail & Activity Log**

**Accessible By**: Admin, Supervisor

**Events Logged**:
```
✓ User login/logout
✓ Patient record view
✓ Patient data modifications
✓ Appointment changes
✓ Medicine adjustments
✓ Prediction approvals
✓ Report generation
✓ User account changes
✓ System settings changes
```

**Audit Entry Format**:
```
[Timestamp] [User] [Action] [Object] [Details]

Example:
2026-08-30 10:45 | Dr. Aswini | viewed | Patient: Aarav Mehta
2026-08-30 09:30 | Admin User | updated | Appointment: Priya Singh
2026-08-30 08:15 | Supervisor | approved | Prediction: Pre-Diabetes Risk
```

**Use Cases**:
- Compliance & regulation (HIPAA, GDPR)
- Security investigation
- User accountability
- Change tracking

---

## 🛡️ Security Implementation

### **Session Management**
```javascript
// Session timeout: 30 minutes of inactivity
const SESSION_TIMEOUT = 30 * 60 * 1000;

// Check session validity
function isSessionValid() {
  const session = JSON.parse(sessionStorage.getItem('adminUser'));
  if (!session) return false;
  
  const loginTime = new Date(session.loginTime);
  const currentTime = new Date();
  const timeSinceLogin = currentTime - loginTime;
  
  return timeSinceLogin < SESSION_TIMEOUT;
}
```

### **Password Requirements**
- Minimum 8 characters (production: 12)
- Uppercase & lowercase letters
- Numbers & special characters
- Regular password expiration (90 days)

### **HTTPS Only**
- All login transmissions over HTTPS
- Secure cookies with HttpOnly flag
- CSRF protection tokens

### **Role-Based Authorization**
```javascript
// Backend: Validate every API call
function validatePermission(userRole, requiredPermission) {
  const permissions = {
    provider: ['view_patients', 'view_appointments', ...],
    admin: ['view_patients', 'manage_patients', ...],
    supervisor: [...]
  };
  
  return permissions[userRole].includes(requiredPermission);
}
```

---

## 🔄 Authorization Flow Diagram

```
Admin-Login Page
       ↓
User enters: Email, Password, Role
       ↓
Frontend Validation
       ↓
Send to Backend
       ↓
Backend Authentication
       ├─ Check credentials
       ├─ Verify role match
       └─ Generate session token
       ↓
Store Session
       ├─ sessionStorage: adminUser
       └─ sessionStorage: userPermissions
       ↓
Redirect to admin.html
       ↓
Admin Page Loads
       ├─ Check session validity
       ├─ Verify permissions
       └─ Load role-specific UI
       ↓
Display Dashboard
       └─ Only show accessible sections
```

---

## 🚀 Implementation Checklist

### **Frontend Implementation**
- [x] admin-login.html form with role selection
- [x] admin-login.html validation logic
- [x] Session storage configuration
- [x] admin.html authorization checks
- [x] Role-based section visibility
- [x] Permission-based feature access
- [x] Logout functionality
- [x] Session timeout handling

### **Backend Implementation (server.py)**
- [ ] POST /api/admin-login endpoint
- [ ] Email & password validation
- [ ] Role verification against database
- [ ] Session token generation (JWT)
- [ ] Permission assignment per role
- [ ] Session storage (Redis/Database)
- [ ] Session timeout handling
- [ ] POST /api/logout endpoint
- [ ] POST /api/verify-session endpoint
- [ ] Audit logging for all actions

### **Database Schema**
- [ ] admin_users table
- [ ] admin_roles table (provider, admin, supervisor)
- [ ] admin_permissions table
- [ ] admin_sessions table
- [ ] audit_logs table

### **Security**
- [ ] HTTPS/SSL configuration
- [ ] Password hashing (bcrypt)
- [ ] CSRF protection
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] Rate limiting on login attempts
- [ ] Multi-factor authentication (optional)

---

## 📝 Example Usage

### **Provider Login Flow**
```
1. Provider visits admin-login.html
2. Enters: email@clinic.com, password, role="provider"
3. Frontend validates input
4. Sends to backend: POST /api/admin-login
5. Backend returns: Provider permissions
6. Redirects to admin.html
7. Only sees: Dashboard, Medicines, Predictions sections
8. Cannot access: Patients, Users, Audit sections
```

### **Admin Login Flow**
```
1. Admin visits admin-login.html
2. Enters: admin@clinic.com, password, role="admin"
3. Frontend validates input
4. Sends to backend: POST /api/admin-login
5. Backend returns: Full admin permissions
6. Redirects to admin.html
7. Sees all 8 sections
8. Can manage users, view audit trail, generate reports
```

---

## 🔍 Troubleshooting

### **Issue**: "Session expired" after login
**Solution**: Session timeout is 30 minutes. Extend by logging in again.

### **Issue**: Can't access certain sections
**Solution**: Your role doesn't have permission. Contact clinic admin to change role.

### **Issue**: Forgotten password
**Solution**: Click "Forgot password" link or contact clinic administrator to reset.

### **Issue**: Login credentials not working
**Solution**: Verify email/license number, password, and selected role. Check caps lock.

---

## 📞 Support & Deployment

### **For Clinic Administrators**
1. Users should log in via admin-login.html
2. Assign roles during user creation
3. Monitor audit trail for compliance
4. Handle password resets

### **For Developers**
1. Implement backend authentication endpoints
2. Set up role-based authorization
3. Configure session management
4. Implement audit logging
5. Set up security features (HTTPS, CSRF, etc.)

---

## 📚 Related Documentation

- [NAVIGATION-GUIDE.md](NAVIGATION-GUIDE.md) - Site navigation
- [FILE-INDEX.md](FILE-INDEX.md) - File catalog
- [COMPLETE-SETUP-SUMMARY.md](COMPLETE-SETUP-SUMMARY.md) - Setup overview

---

*Last Updated: 2026-08-30*
*MediCare Smart v1.0*
