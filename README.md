# Open Source Hub

You are a senior full-stack web engineer and UX designer.
Your task is to design and generate a COMPLETE, SIMPLE, OPEN-SOURCE WEBSITE
using ONLY:
- HTML
- CSS
- Vanilla JavaScript
(NO frameworks, NO backend servers, NO databases — simulate storage using localStorage)
The website is an OPEN-SOURCE TOOLS DIRECTORY.
========================
CORE REQUIREMENTS
========================
1. DESIGN
- Modern, minimal UI
- Black & white theme by default
- Light/Dark mode toggle (user-controlled)
- Responsive (mobile + desktop)
- Clean navigation bar
2. WEBSITE STRUCTURE (MULTI-PAGE)
Create the following pages with FULL CODE for each:
A. Home Page
- Intro section (what the site is)
- Featured popular open-source tools
- Category cards (AI, Dev Tools, Design, Security, DevOps, Productivity, etc.)
- Navigation bar (Home, Tools, Submit Tool, Dashboard, Login/Signup)
B. All Tools Page
- Grid or list of ALL open-source tools
- Each tool card includes:
  - Tool Name
  - Category
  - Short description
  - Image/logo
  - Open-source link (GitHub/GitLab/etc.)
- Category filter
- Search bar
C. Tool Detail Page
- Larger description
- Tool image
- Open-source license
- GitHub link
- Tags
D. Submit Tool Page
- Public submission form:
  - Tool Name
  - Description
  - Category
  - Open-source URL
  - Image upload (simulate with image URL)
- Save submitted tools to localStorage
- Submitted tools appear on dashboard
E. User Authentication Pages
1. Signup Page
   - Username
   - Password
   - REQUIRED: User-created security question
   - REQUIRED: Answer to that question
   - ❌ If security question is missing → BLOCK signup
   - Store user data securely (basic hashing logic in JS)
2. Login Page
   - Username + password
   - Validate via localStorage
3. Forgot Password Page
   - Ask username
   - Display the user’s CUSTOM security question
   - Only allow password reset if answer matches
   - NO EMAIL RESET
F. User Dashboard
- Only accessible when logged in
- Displays:
  - User profile info
  - Tools submitted by the user
  - Ability to delete their submitted tools
- Admin-style layout but simple
========================
FUNCTIONAL REQUIREMENTS
========================
- Use localStorage to store:
  - Users
  - Tools
  - Login sessions
  - Theme preference
- Protect dashboard routes (redirect if not logged in)
- Logout functionality
- Clean, commented code
- Separate files:
  - index.html
  - tools.html
  - submit.html
  - login.html
  - signup.html
  - forgot-password.html
  - dashboard.html
  - styles.css
  - script.js
========================
OUTPUT FORMAT
========================
1. Show full folder structure
2. Provide FULL CODE for every file
3. Comment the code clearly
4. Explain briefly how localStorage logic works
5. Ensure the site can run by simply opening index.html
DO NOT:
- Use frameworks
- Use backend services
- Skip any page
- Use placeholder pseudo-code
This must be a COMPLETE, WORKING, OPEN-SOURCE-READY WEBSITE.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://opensometing.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4d4d332f-4332-4984-ad98-b53f905653c3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
