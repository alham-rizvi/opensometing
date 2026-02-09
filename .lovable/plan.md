

# Open-Source Tools Directory - Implementation Plan

## Overview
A modern, responsive open-source tools directory website with user authentication, tool submissions, and a personal dashboard. Built with React, featuring a clean black & white theme with light/dark mode toggle.

---

## Pages & Features

### 1. Home Page
- **Hero section** explaining what the site is about
- **Featured tools** showcase (popular open-source projects)
- **Category cards** for quick navigation (AI, Dev Tools, Design, Security, DevOps, Productivity)
- **Clean navigation bar** with links to all pages

### 2. All Tools Page
- **Grid layout** of all open-source tools
- **Tool cards** showing: name, category, description, logo, and GitHub link
- **Search bar** for finding tools by name
- **Category filter** dropdown/tabs
- Clicking a tool opens its detail page

### 3. Tool Detail Page
- **Full tool information**: name, description, category, license
- **Tool logo/image** display
- **GitHub/Source link** button
- **Tags** for easy categorization
- Back navigation to tools list

### 4. Submit Tool Page
- **Submission form** with fields:
  - Tool name
  - Description
  - Category selection
  - Open-source URL (GitHub/GitLab)
  - Image URL for logo
- **Form validation** before submission
- **localStorage** saves submissions linked to logged-in user
- Submitted tools appear on user's dashboard

### 5. Authentication System

**Signup Page:**
- Username, password fields
- **Custom security question** (user creates their own question)
- **Security answer** field
- Blocks signup if security question is missing
- Basic password hashing in JavaScript
- Stores user data in localStorage

**Login Page:**
- Username + password authentication
- Validates against localStorage users
- Creates session on successful login

**Forgot Password Page:**
- Enter username to retrieve account
- Displays user's custom security question
- Only resets password if answer matches
- No email required

### 6. User Dashboard (Protected)
- **Requires login** to access (redirects to login if not authenticated)
- **Profile information** display
- **List of user's submitted tools**
- **Delete functionality** for their own submissions
- **Logout button**

---

## Technical Features

### Data Storage (localStorage)
- **Users database**: stores username, hashed password, security Q&A
- **Tools database**: all submitted tools with submitter info
- **Sessions**: current logged-in user
- **Theme preference**: light/dark mode setting

### Design System
- **Black & white theme** with clean typography
- **Light/Dark mode toggle** in navigation
- **Fully responsive** for mobile and desktop
- **Consistent card-based UI** throughout

### Sample Data
- Pre-populated with 10-15 popular open-source tools across categories
- Categories: AI & ML, Developer Tools, Design, Security, DevOps, Productivity

### Route Protection
- Dashboard checks for active session
- Redirects unauthorized users to login
- Session persists across page refreshes

---

## User Flow

1. **Visitor** lands on home page → browses tools → views details
2. **Signs up** with custom security question → logs in
3. **Submits new tools** via form → sees them on dashboard
4. **Forgot password?** → enters username → answers security question → resets password
5. **Theme preference** persists across sessions

