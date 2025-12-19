# Sagars Homeopathy For Kids - Admin CMS

A professional homeopathy consultation website with a powerful admin panel for content management and customer review management.

## 🌟 Features

### Public Website
- ✨ Professional single-page application (SPA)
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Smooth animations with Framer Motion
- 📧 Integrated appointment form (email/SMS/WhatsApp)
- ⭐ Customer reviews with star ratings
- 🔍 SEO optimized with meta tags

### Admin Panel
- 🔐 Secure authentication with Firebase Auth
- ✏️ Rich text WYSIWYG editor for all pages
- 📝 Edit 10 different page sections
- ⭐ Complete review management (CRUD operations)
- 💾 Real-time content updates
- 🎯 Protected admin routes
- 📊 Clean dashboard interface

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 18.2.0 + TypeScript
- **Build Tool:** Vite 4.4.0
- **Routing:** React Router DOM 6
- **Backend:** Firebase (Authentication + Firestore)
- **Rich Text Editor:** React Quill
- **Animations:** Framer Motion 10.16.2
- **Styling:** CSS-in-JS (inline styles)
- **Deployment:** GitHub Pages

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Google Account** (for Firebase)
- **Git** (optional, for version control)

---

## 🚀 Quick Start

### 1. Installation

```bash
# Clone the repository (if using git)
git clone <your-repo-url>
cd sagarsholistic.github.io

# Install dependencies
npm install
```

### 2. Firebase Setup

Before running the application, you need to set up Firebase. Follow the detailed guide below.

### 3. Run Development Server

```bash
npm run dev
```

Visit: http://localhost:5173

---

## 🔥 Complete Firebase Setup Guide

### Step 1: Create Firebase Project (5 minutes)

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com
   - Sign in with your Google account

2. **Create New Project**
   - Click "Add project" or "Create a project"
   - **Project name:** "Sagars Homeopathy" (or your preferred name)
   - Click "Continue"

3. **Google Analytics (Optional)**
   - Toggle off "Enable Google Analytics" (optional)
   - Click "Create project"
   - Wait 30-60 seconds for project creation
   - Click "Continue"

---

### Step 2: Enable Authentication (3 minutes)

1. **Navigate to Authentication**
   - In Firebase Console left sidebar, click **"Build"**
   - Click **"Authentication"**
   - Click **"Get started"**

2. **Enable Email/Password Provider**
   - Click **"Sign-in method"** tab
   - Find **"Email/Password"** in the providers list
   - Click on it
   - Toggle **"Enable"** to ON
   - Click **"Save"**

✅ **Authentication is now enabled!**

---

### Step 3: Create Firestore Database (3 minutes)

1. **Navigate to Firestore**
   - In left sidebar, click **"Firestore Database"**
   - Click **"Create database"**

2. **Configure Database**
   - Select **"Start in production mode"**
   - Click **"Next"**

3. **Choose Location**
   - Select a location closest to your users (e.g., "us-central" for USA)
   - Click **"Enable"**
   - Wait 30-60 seconds for database creation

✅ **Firestore Database is ready!**

---

### Step 4: Get Firebase Credentials (2 minutes)

1. **Register Web App**
   - Click the **gear icon ⚙️** next to "Project Overview"
   - Click **"Project settings"**
   - Scroll down to **"Your apps"** section
   - Click the **web icon `</>`** to register a web app

2. **App Registration**
   - **App nickname:** "Homeopathy Website"
   - ☐ **Do NOT check** "Also set up Firebase Hosting"
   - Click **"Register app"**

3. **Copy Firebase Configuration**

   You'll see a config object like this:

   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef123456"
   };
   ```

   ⚠️ **IMPORTANT:** Keep this page open - you'll need these values!

4. **Click "Continue to console"**

---

### Step 5: Configure Environment Variables (2 minutes)

1. **Create `.env` File**

   A `.env` file already exists in the project root. Open it:

   ```
   c:\Workspace\Claude\sagarsholistic.github.io\.env
   ```

2. **Replace Placeholder Values**

   Copy each value from your Firebase config and replace the placeholders:

   ```env
   # Before:
   VITE_FIREBASE_API_KEY=your_api_key_here

   # After (using your actual values):
   VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
   VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
   ```

3. **Save the file**

⚠️ **NEVER commit `.env` to git** - it's already in `.gitignore`

---

### Step 6: Deploy Firestore Security Rules (2 minutes)

1. **Open Firestore Rules**
   - In Firebase Console, go to **"Firestore Database"**
   - Click **"Rules"** tab

2. **Replace Rules**
   - Delete the existing default rules
   - Copy the entire contents of `firestore.rules` from your project
   - Paste into the Firebase rules editor

3. **Publish Rules**
   - Click **"Publish"**
   - Wait for confirmation

**Your security rules should look like this:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper function to check if user is authenticated admin
    function isAdmin() {
      return request.auth != null &&
             exists(/databases/$(database)/documents/adminUsers/$(request.auth.token.email));
    }

    // Page content - Public read, Admin write
    match /pageContent/{document} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Reviews - Public reads published, Admin full access
    match /reviews/{reviewId} {
      allow read: if resource.data.isPublished == true || isAdmin();
      allow create, update, delete: if isAdmin();
    }

    // Admin users - Admin read only
    match /adminUsers/{email} {
      allow read: if isAdmin();
      allow write: if false;
    }
  }
}
```

✅ **Security rules are deployed!**

---

### Step 7: Create Your First Admin User (5 minutes)

#### Part A: Create User in Authentication

1. **Go to Authentication**
   - Firebase Console → **"Authentication"**
   - Click **"Users"** tab
   - Click **"Add user"** button

2. **Enter User Details**
   - **Email:** your-email@example.com (use your actual email)
   - **Password:** Create a strong password (save it somewhere safe!)
   - Click **"Add user"**

✅ **User created in Authentication!**

#### Part B: Add User to Admin Whitelist

1. **Go to Firestore Database**
   - Click **"Firestore Database"** in left sidebar
   - Click **"Start collection"**

2. **Create `adminUsers` Collection**
   - **Collection ID:** `adminUsers` (exact spelling, case-sensitive)
   - Click **"Next"**

3. **Add Admin Document**

   - **Document ID:** your-email@example.com (EXACTLY as entered in Authentication)

   **Add the following fields:**

   | Field name   | Type      | Value                              |
   |--------------|-----------|------------------------------------|
   | email        | string    | your-email@example.com             |
   | displayName  | string    | Admin                              |
   | role         | string    | admin                              |
   | createdAt    | timestamp | (click "current timestamp" button) |
   | lastLogin    | timestamp | (click "current timestamp" button) |

   - Click **"Save"**

⚠️ **CRITICAL:** The document ID MUST exactly match the email address!

✅ **Admin user is ready!**

---

### Step 8: Verify Setup (2 minutes)

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Test Admin Login**
   - Visit: http://localhost:5173/admin/login
   - Enter your email and password
   - Click "Sign In"
   - You should see the admin dashboard

3. **Test Firestore Connection**
   - Click any page card (e.g., "Banner")
   - You should see the edit interface
   - Make a small change and click "Save Changes"
   - If you see "Content saved successfully!" - Firebase is working!

✅ **Firebase is fully configured and working!**

---

## 📱 Application Routes

### Public Routes
- `/` - Home page (all sections in one page)
- `/reviews` - Customer reviews page

### Admin Routes (Protected)
- `/admin/login` - Admin login page
- `/admin` - Admin dashboard
- `/admin/edit/:pageId` - Edit page content
- `/admin/reviews` - Manage customer reviews

---

## 🎨 Admin Panel Usage

### Logging In

1. Visit: http://localhost:5173/admin/login
2. Enter your admin email and password
3. Click "Sign In"

### Editing Page Content

1. **From Dashboard:**
   - Click any of the 10 page cards
   - Options: Banner, Journey, Education, Conditions Treated, First Consultation, Follow-up Consultations, Fee & Payment, What is Homeopathy, Appointment, Footer

2. **Edit Content:**
   - Use the rich text editor for formatting
   - **Toolbar features:**
     - Headers (H1, H2, H3)
     - Bold, Italic, Underline
     - Ordered/Unordered lists
     - Links
   - Click "Save Changes" when done

3. **View Changes:**
   - Changes appear immediately on the public site
   - Open http://localhost:5173 in another tab to verify

### Managing Reviews

1. **Access Reviews Manager:**
   - Click "Manage Reviews" in admin sidebar

2. **Add New Review:**
   - Click "Add New Review" button
   - Fill in:
     - Customer Name
     - Rating (1-5 stars)
     - Review Text (use rich text editor)
   - Check "Publish immediately" to make it public
   - Click "Save Review"

3. **Edit Review:**
   - Click "Edit" button on any review
   - Make changes
   - Click "Save Review"

4. **Publish/Unpublish:**
   - Click "Publish" to make visible on public site
   - Click "Unpublish" to hide from public site

5. **Delete Review:**
   - Click "Delete" button
   - Confirm deletion (cannot be undone)

---

## 📂 Project Structure

```
sagarsholistic.github.io/
├── public/                      # Static assets
│   ├── favicon.png
│   ├── fonts/
│   └── assets/
├── src/
│   ├── config/
│   │   └── firebase.ts          # Firebase configuration
│   ├── contexts/
│   │   └── AuthContext.tsx      # Authentication context
│   ├── components/
│   │   ├── ProtectedRoute.tsx   # Route guard
│   │   ├── RichTextEditor.tsx   # WYSIWYG editor
│   │   └── StarRating.tsx       # Star rating display
│   ├── hooks/
│   │   └── usePageContent.ts    # Firebase data fetching
│   ├── layouts/
│   │   ├── PublicLayout.tsx     # Public site layout
│   │   └── AdminLayout.tsx      # Admin panel layout
│   ├── pages/
│   │   ├── ReviewsPage.tsx      # Public reviews page
│   │   └── admin/
│   │       ├── AdminLogin.tsx   # Login page
│   │       ├── AdminDashboard.tsx  # Dashboard
│   │       ├── EditPage.tsx     # Content editor
│   │       └── ReviewsManager.tsx  # Review management
│   ├── fragment/                # Original page components
│   │   ├── banner/
│   │   ├── journey/
│   │   ├── education/
│   │   ├── conditions-treated/
│   │   └── ... (all page sections)
│   ├── types/
│   │   └── content.types.ts     # TypeScript interfaces
│   ├── App.tsx                  # Main app with routing
│   └── main.tsx                 # Entry point
├── .env                         # Firebase credentials (DO NOT COMMIT)
├── .env.example                 # Environment template
├── firestore.rules              # Firestore security rules
├── package.json
├── vite.config.ts
└── README.md                    # This file
```

---

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:5173)

# Build
npm run build        # Build for production (outputs to dist/)

# Preview
npm run preview      # Preview production build locally

# Lint
npm run lint         # Run ESLint
```

---

## 🔒 Security Features

- ✅ Firebase Authentication (email/password)
- ✅ Protected admin routes (redirect if not authenticated)
- ✅ Firestore security rules (admin-only writes)
- ✅ Admin whitelist in database
- ✅ Environment variables for sensitive data
- ✅ `.env` excluded from git
- ✅ XSS protection (React escapes by default)

---

## 🐛 Troubleshooting

### Issue: "Failed to sign in"

**Solutions:**
1. Verify email in Authentication exactly matches document ID in `adminUsers` collection
2. Check password is correct
3. Verify `.env` file has correct Firebase credentials
4. Restart dev server after updating `.env`

### Issue: "Content not saving"

**Solutions:**
1. Check Firestore rules are published
2. Verify you're logged in as admin
3. Check browser console for errors (F12)
4. Verify admin user exists in `adminUsers` collection

### Issue: "Reviews not showing on public page"

**Solutions:**
1. Verify review is marked as "Published" (not draft)
2. Check you're visiting `/reviews` (not `/review`)
3. Check Firestore rules allow public read of published reviews

### Issue: "Firebase credentials error"

**Solutions:**
1. Verify all values in `.env` are correct (no quotes needed)
2. Check no extra spaces in `.env` values
3. Restart dev server after changing `.env`
4. Verify Firebase project is active in Firebase Console

### Issue: "Module not found" errors

**Solutions:**
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Restart dev server

---

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

Output will be in `dist/` directory.

### Deploy to GitHub Pages

1. **Configure Vite for GitHub Pages:**

   Update `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/', // or '/repo-name/' for project pages
     plugins: [react()],
   });
   ```

2. **Build:**
   ```bash
   npm run build
   ```

3. **Deploy:**
   ```bash
   # Copy dist/ contents to docs/ (if using docs folder)
   # OR push to gh-pages branch
   ```

4. **Configure GitHub Pages:**
   - Go to repository Settings → Pages
   - Select source branch/folder
   - Save

### Environment Variables in Production

⚠️ **IMPORTANT:** When deploying, make sure to:
1. Set environment variables in your hosting platform
2. Never commit `.env` to git
3. Use environment variable secrets in GitHub Actions (if applicable)

---

## 📊 Firestore Collections

### `pageContent` Collection

Stores editable content for all pages.

**Document Structure:**
```typescript
{
  id: "banner",
  sectionName: "Banner",
  content: {
    title: "SAGARS HOMEOPATHY FOR KIDS",
    subtitle: "A Video Consultation Platform by,",
    doctorName: "PADMINI SAGAR M.D. DABHM",
    // ... more fields
  },
  lastModified: Timestamp,
  modifiedBy: "admin@example.com",
  version: 1
}
```

### `reviews` Collection

Stores customer reviews.

**Document Structure:**
```typescript
{
  id: "auto-generated-id",
  customerName: "John Doe",
  rating: 5,
  reviewText: "<p>Great experience!</p>",
  reviewDate: Timestamp,
  isPublished: true,
  createdAt: Timestamp,
  updatedAt: Timestamp,
  createdBy: "admin@example.com"
}
```

### `adminUsers` Collection

Stores admin user whitelist.

**Document Structure:**
```typescript
{
  email: "admin@example.com", // Also the document ID
  displayName: "Admin",
  role: "admin",
  createdAt: Timestamp,
  lastLogin: Timestamp
}
```

---

## 🔐 Adding More Admins

1. **Create user in Firebase Authentication**
   - Firebase Console → Authentication → Add user

2. **Add to adminUsers collection**
   - Firestore → adminUsers → Add document
   - Document ID: new-admin@example.com
   - Add all required fields (email, displayName, role, timestamps)

3. **New admin can now log in**
   - They can access all admin features
   - Their email will be tracked in content modifications

---

## 🎯 Features Summary

### Editable via Admin Panel:
- ✏️ Banner (name, email, phone, title)
- ✏️ Journey page (full HTML content)
- ✏️ Education & License (via admin but keeping original structure)
- ✏️ Conditions Treated (via admin but keeping original structure)
- ✏️ First Consultation (full HTML content)
- ✏️ Follow-up Consultations (full HTML content)
- ✏️ Fee & Payment (full HTML content)
- ✏️ What is Homeopathy (full HTML content)
- ✏️ Footer (business name, email, copyright)
- ⭐ Customer Reviews (add/edit/delete with star ratings)

### Static Components:
- 📧 Appointment Form (functional - email/SMS/WhatsApp)
- 🎨 Navigation Menu
- 📊 Progress Bar

---

## 📝 Development Notes

### Backward Compatibility

All components have hardcoded fallbacks. The site will work even without Firebase:
- If Firebase data doesn't exist, hardcoded content is displayed
- If Firebase connection fails, fallback content is used
- This ensures the site never breaks due to Firebase issues

### TypeScript

The project uses TypeScript for type safety:
- All components are typed
- Firebase data structures are defined in `src/types/content.types.ts`
- Compile with: `npm run build`

### Code Style

- **Styling:** Inline CSS-in-JS (no separate CSS files)
- **Components:** Functional components with hooks
- **State Management:** React Context for auth, local state for UI
- **Routing:** React Router DOM v6

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Firebase Console for errors
3. Check browser console (F12) for error messages
4. Verify all setup steps were completed

---

## 📄 License

This project is private and proprietary.

---

## 🙏 Acknowledgments

- Built with React, TypeScript, and Vite
- Powered by Firebase
- Styled with Framer Motion
- Edited with React Quill

---

**Last Updated:** December 2024

**Version:** 1.0.0

---

## 🚀 Quick Reference

```bash
# Install dependencies
npm install

# Set up Firebase (follow guide above)
# Edit .env file with Firebase credentials

# Start development
npm run dev

# Login as admin
http://localhost:5173/admin/login

# View public site
http://localhost:5173

# View reviews
http://localhost:5173/reviews
```

---

Made with ❤️ for Sagars Homeopathy For Kids
