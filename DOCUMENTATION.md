# Barangay Connect — Project Documentation

Welcome to **Barangay Connect**, a modern community portal designed to bridge the gap between barangay residents and local government officials. This documentation explains what the program is, what technologies were used, how it was built, and how to use it in simple, everyday English.

---

## 1. What is Barangay Connect?

**Barangay Connect** is a web-based community management system. It replaces slow paperwork and long lines at the barangay hall with a fast, transparent, and easy-to-use digital system.

With Barangay Connect:
- **Residents** can read announcements, view community events, request official documents (Barangay Clearance, Certificate of Residency, etc.), file blotter/incident reports, and chat directly with barangay officials from their phone or computer.
- **Barangay Officials (Admins)** can broadcast news and advisories in real time, review and approve document requests, resolve incident reports, chat with residents and fellow administrators, and manage barangay settings.

---

## 2. What Technologies and Tools Were Used?

We used modern, reliable, and free/open-source developer tools:

### Frontend (What the user sees and clicks)
- **React 19**: A popular JavaScript library used to build fast and interactive user interfaces.
- **TypeScript**: A version of JavaScript that adds types to prevent errors and ensure code reliability.
- **Vite**: A super-fast build tool and development server that bundles the website.
- **Tailwind CSS v4**: A modern styling framework used to create clean, responsive layouts that look great on both mobile phones and desktop computers.

### Backend & Database (Where data is stored and secured)
- **Supabase (PostgreSQL Database)**: A cloud database that securely stores accounts, document requests, announcements, events, blotter incidents, and chat messages.
- **Supabase Realtime**: Enables instant updates so residents receive announcements and messages immediately without having to refresh the page.
- **Supabase Auth**: Manages user authentication, sign-ups, secure password logins, and role checking.

### Hosting & Deployment (How it runs on the internet)
- **GitHub**: Stores the source code and tracks changes with Git version control.
- **Vercel**: Cloud hosting platform that automatically deploys the website so anyone can visit it on any browser (Chrome, Edge, Safari, Brave) at:
  `https://baranggay-connect-iy1h.vercel.app`

---

## 3. How the Program Was Built

The application was built step by step through iterative design and testing:

1. **Database & Schema Design**:
   - Set up tables in Supabase for `barangay_settings`, `announcements`, `events`, `document_requests`, `messages`, `incidents`, and `accounts`.
   - Designed tables to link residents' contact details with their requests and messages.

2. **User Experience & Navigation**:
   - Created a dual-view interface: one streamlined for **Residents** (focused on services) and one powerful for **Admins** (focused on management).
   - Designed clean sidebars, status pills, and simple navigation.

3. **Core Features Development**:
   - **Document Request Workflow**: Simplified document processing into 3 clear steps: *Pending*, *Approved (Ready for Pickup)*, and *Declined*, plus a *Received* button once the resident collects the document.
   - **Real-Time Messaging**: Built instant chat allowing residents to message the barangay office, and administrators to message both residents and fellow administrators.
   - **Real-Time Announcements**: Enabled barangay news to appear instantly on resident homepages.
   - **Role Management**: Created a master admin system where administrators can promote qualified staff accounts to admin status or revert them back to residents.
   - **Accessibility & Security**: Added show/hide password toggle buttons across all password forms, and ensured only live database records are displayed.

---

## 4. How to Use the Program (Step-by-Step Guide)

### A. For Residents

1. **Creating an Account & Signing In**:
   - Open the website and click **Sign in / Register**.
   - Fill in your Name, Email, Mobile Number, Purok/Address, and Password.
   - Once logged in, you will see the **Barangay Labangan** dashboard.

2. **Reading Announcements & Events**:
   - The homepage shows the latest community news, medical missions, advisories, and water/power schedules.
   - Click the **Events calendar** tab to see upcoming dates for feeding programs, sports leagues, or barangay meetings.

3. **Requesting an Official Document**:
   - Go to **Document requests** in the menu and click **Apply for Document**.
   - Choose the document type (e.g., *Barangay Clearance*, *Certificate of Residency*, *Certificate of Indigency*, or *Business Clearance*).
   - Type your reason/purpose and submit.
   - You can monitor your tracking status on the page:
     - 🟡 **Pending**: The office is reviewing your application.
     - 🟢 **Approved**: Ready for pickup at the barangay hall!
     - 🔴 **Declined**: Rejected with a clear note explaining why.

4. **Messaging the Barangay Office**:
   - Go to **Message Admin**.
   - Type your question, inquiry, or follow-up and click Send.
   - You can also click quick buttons like *"Magandang araw po! Gusto ko pong itanong ang status ng aking request."* for quick inquiries.

5. **Reporting an Incident / Blotter**:
   - Go to **Emergency & Incidents** to submit an official blotter report or neighborhood concern (noise dispute, street hazard, etc.) for the Lupon to review.

---

### B. For Barangay Administrators

1. **Signing In as Admin**:
   - Sign in with an authorized administrator account (e.g., `admin@baranggay.conn.gov.ph` or promoted admin accounts like `ryan@gmail.com`).
   - Your sidebar will show administrative tools (*Management* sections).

2. **Processing Document Requests**:
   - Click **Document requests** in the sidebar.
   - Click on any request to view resident information.
   - Click **Approve** to mark it ready for pickup, or **Decline** if documents are missing.
   - When the resident arrives at the window and receives the document, click **Mark as Received**.

3. **Publishing Announcements & Events**:
   - Go to **Announcements** and click **New Announcement**.
   - Enter the title, category, and announcement message. Click **Publish live**. All residents will see it immediately.
   - In **Events calendar**, add new community events with date and venue.

4. **Managing Messages**:
   - Go to **Messages**.
   - Click on any resident conversation under **Residents** to reply to their questions.
   - Click on **👑 Admins** to chat and coordinate with other barangay officials.
   - Use the **Search** bar to quickly start a new conversation with any resident or admin.

5. **Managing Residents & Promoting Admins**:
   - Go to **Manage residents** to view registered residents, verify accounts, or reset passwords upon request.
   - To make another staff member an admin, find their account and click **Promote to Admin**. To remove privileges, click **Remove Admin Privileges**.

6. **Updating Barangay Settings**:
   - Go to **Barangay settings** to update official barangay name, captain, phone number, office hours, and official email.
