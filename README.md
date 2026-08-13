# Open Stacker

A community-curated directory of the best open-source alternatives to popular software and developer tools. Find free, open-source replacements for paid software across every category.

**Live Demo**: http://localhost:8081/ (development)

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [Features](#features)
5. [Project Structure](#project-structure)
6. [API & Routing](#api--routing)
7. [Database](#database)
8. [Setup & Installation](#setup--installation)
9. [Development](#development)
10. [Building & Deployment](#building--deployment)
11. [Contributing](#contributing)
12. [License](#license)

---

## Overview

Open Stacker is a comprehensive directory featuring **260+ open-source alternatives** to expensive software, SaaS products, and commercial tools. Users can:

- 🔍 **Browse** tools by category (Office, Design, Development, etc.)
- 🏷️ **Filter** by tags, difficulty, and platform
- 💬 **Chat** with an AI to discover alternatives
- 🎯 **Submit** new open-source tools
- 👤 **Track** submitted tools on a personal dashboard

---

## Tech Stack

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI framework for building interactive components |
| **TypeScript** | 5.8.3 | Static typing for JavaScript |
| **Vite** | 5.4.19 | Fast build tool and dev server |
| **React Router DOM** | 6.30.1 | Client-side routing and navigation |
| **TanStack Query** | 5.83.0 | Server state management and data fetching |
| **React Hook Form** | 7.61.1 | Form state management and validation |
| **Zod** | 3.25.76 | Schema validation and type safety |

### UI & Styling

| Technology | Version | Purpose |
|------------|---------|---------|
| **Tailwind CSS** | 3.4.17 | Utility-first CSS framework |
| **Radix UI** | Latest | Headless, accessible component library |
| **shadcn/ui** | Custom | Pre-built Radix UI components with Tailwind |
| **Lucide React** | 0.462.0 | Beautiful icon library |
| **Sonner** | 1.7.4 | Toast notifications |
| **Recharts** | 2.15.4 | Chart and visualization library |

### State Management & Context

| Technology | Purpose |
|------------|---------|
| **React Context API** | Theme and authentication state |
| **TanStack Query** | Server-side data caching |
| **React Hook Form** | Form validation state |

### Backend & APIs

| Technology | Purpose |
|------------|---------|
| **Supabase** | PostgreSQL database, auth, real-time APIs |
| **Supabase Functions** | Serverless functions for AI chat |
| **OpenAI API** | LLM for chatbot (configured in Supabase functions) |

### Development Tools

| Technology | Version | Purpose |
|------------|---------|---------|
| **ESLint** | 9.32.0 | Code linting and quality |
| **TypeScript ESLint** | 8.38.0 | TypeScript-aware linting |
| **Vitest** | 3.2.4 | Unit testing framework |
| **@testing-library/react** | 16.0.0 | React component testing |
| **PostCSS** | 8.5.6 | CSS processing |
| **Autoprefixer** | 10.4.21 | CSS vendor prefixes |

### Deployment & Container

| Technology | Purpose |
|------------|---------|
| **Docker** | Containerization for deployment |
| **Podman** | Alternative container runtime |

---

## Architecture

### Component Architecture

```
App.tsx (Root)
├── Providers
│   ├── QueryClientProvider (TanStack Query)
│   ├── ThemeProvider (Dark/Light mode)
│   ├── AuthProvider (Authentication context)
│   └── TooltipProvider (Radix UI)
├── Router (React Router)
│   ├── Pages
│   │   ├── Index (Homepage)
│   │   ├── Tools (Tool directory)
│   │   ├── Discover (AI chat discovery)
│   │   ├── ToolDetail (Single tool page)
│   │   ├── Submit (Add new tool)
│   │   ├── Login / Signup / ForgotPassword
│   │   └── Dashboard (User submissions)
│   └── Layout (Common wrapper)
└── ChatWidget (AI assistant overlay)
```

### Data Flow

```
React Components
    ↓
React Hook Form (Form state)
    ↓
TanStack Query (API calls)
    ↓
Supabase Client (REST/Real-time)
    ↓
Supabase Backend
├── PostgreSQL Database
├── Authentication (Auth API)
├── Serverless Functions
└── OpenAI Integration
```

---

## Features

### 🌟 Core Features

1. **Tool Directory**
   - 260+ open-source alternatives
   - Categorized by purpose (Office, Design, Development, etc.)
   - Detailed descriptions and use cases
   - Alternative-to mappings (e.g., "replaces Photoshop")

2. **Smart Search & Filter**
   - Full-text search
   - Category filtering
   - Tag-based filtering
   - Difficulty level (Beginner/Intermediate/Advanced)
   - Platform filtering (Windows/macOS/Linux)

3. **AI Discovery**
   - Chat with an AI to find alternatives
   - Context-aware recommendations
   - Natural language queries

4. **User Features**
   - Sign up and login
   - Submit new tools
   - View personal dashboard
   - Manage submitted tools

5. **UI/UX Features**
   - Dark/Light theme toggle
   - Responsive design
   - Toast notifications
   - Loading states
   - Error handling

---

## Project Structure

```
opensometing/
├── src/
│   ├── components/
│   │   ├── ui/                    # Radix UI + shadcn components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ... (20+ UI components)
│   │   ├── Layout.tsx             # Main layout wrapper
│   │   ├── Navbar.tsx             # Navigation bar
│   │   ├── Footer.tsx             # Footer
│   │   ├── ChatWidget.tsx         # AI chat component
│   │   ├── ToolCard.tsx           # Tool display card
│   │   ├── CategoryCard.tsx       # Category cards
│   │   ├── ReviewSection.tsx      # Reviews display
│   │   └── ProtectedRoute.tsx     # Auth guard
│   ├── contexts/
│   │   ├── AuthContext.tsx        # Authentication state
│   │   └── ThemeContext.tsx       # Theme state (dark/light)
│   ├── pages/
│   │   ├── Index.tsx              # Homepage (/)
│   │   ├── Tools.tsx              # Tool directory (/tools)
│   │   ├── Discover.tsx           # AI discovery (/discover)
│   │   ├── ToolDetail.tsx         # Single tool view (/tools/:id)
│   │   ├── Submit.tsx             # Submit tool form (/submit)
│   │   ├── Login.tsx              # Login page (/login)
│   │   ├── Signup.tsx             # Signup page (/signup)
│   │   ├── ForgotPassword.tsx     # Password reset (/forgot-password)
│   │   ├── Dashboard.tsx          # User dashboard (/dashboard)
│   │   └── NotFound.tsx           # 404 page
│   ├── hooks/
│   │   ├── use-mobile.tsx         # Mobile breakpoint detection
│   │   ├── use-toast.ts           # Toast hook
│   │   └── useGithubStats.ts      # GitHub stats integration
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts          # Supabase client
│   │       └── types.ts           # TypeScript types
│   ├── lib/
│   │   ├── types.ts               # Core TypeScript types
│   │   ├── sampleData.ts          # 260+ tool database
│   │   ├── score.ts               # Scoring logic
│   │   ├── reviews.ts             # Reviews utilities
│   │   ├── storage.ts             # LocalStorage helpers
│   │   └── utils.ts               # Utility functions
│   ├── App.tsx                    # Root component with routing
│   ├── App.css                    # Global styles
│   ├── index.css                  # Tailwind imports
│   ├── main.tsx                   # App entry point
│   └── vite-env.d.ts              # Vite environment types
├── supabase/
│   ├── functions/
│   │   ├── discover-repos/        # Tool discovery function
│   │   └── oss-chat/              # AI chat function
│   └── migrations/                # Database migrations
├── public/
│   ├── favicon.ico                # Site favicon
│   ├── robots.txt                 # SEO robots file
│   └── placeholder.svg
├── vite.config.ts                 # Vite build config
├── tailwind.config.ts             # Tailwind CSS config
├── tsconfig.json                  # TypeScript config
├── eslint.config.js               # ESLint config
├── postcss.config.js              # PostCSS config
├── package.json                   # Dependencies
├── index.html                     # HTML entry point
└── README.md                      # This file
```

---

## API & Routing

### Frontend Routes

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Index | Homepage with featured tools and categories |
| `/tools` | Tools | Complete tool directory with search/filter |
| `/tools/:id` | ToolDetail | Detailed view of a single tool |
| `/discover` | Discover | AI-powered tool discovery chat |
| `/submit` | Submit | Form to submit new open-source tools |
| `/login` | Login | User login |
| `/signup` | Signup | User registration |
| `/forgot-password` | ForgotPassword | Password reset |
| `/dashboard` | Dashboard | User profile and submitted tools |
| `*` | NotFound | 404 error page |

### Data Sources

#### 1. **Sample Data (Client-side)**
- **File**: `src/lib/sampleData.ts`
- **Count**: 260+ tools
- **Format**: TypeScript objects with tool metadata
- **Usage**: Used for initial data, caching, filtering

#### 2. **Supabase Database (Backend)**
- **Tables**:
  - `tools` - Tool records
  - `users` - User accounts
  - `submissions` - User-submitted tools
  - `reviews` - Tool reviews
  
- **Features**:
  - Real-time subscriptions
  - PostgreSQL full-text search
  - Row-level security (RLS)

#### 3. **Supabase Functions (Serverless)**

**Function 1: `oss-chat`** (AI Discovery)
- **Endpoint**: `/functions/v1/oss-chat`
- **Method**: POST
- **Input**: `{ messages: Array<{role, content}> }`
- **Output**: AI-generated tool recommendations
- **Integration**: OpenAI API via Supabase
- **Used by**: Discover page ChatWidget

**Function 2: `discover-repos`** (Tool Discovery)
- **Endpoint**: `/functions/v1/discover-repos`
- **Purpose**: GitHub integration and tool metadata fetching
- **Used by**: Tool database population

### API Calls Flow

```
Frontend (React)
    ↓
TanStack Query (caching + retry)
    ↓
Supabase Client (REST calls)
    ↓
Supabase Backend
├── Auth API
├── PostgreSQL REST API
├── Serverless Functions
│   ├── oss-chat → OpenAI
│   └── discover-repos → GitHub API
└── Real-time subscriptions
```

### Authentication Flow

```
User Input (Login/Signup)
    ↓
React Hook Form (validation)
    ↓
Supabase Auth API
    ↓
JWT Token (stored in localStorage)
    ↓
AuthContext (manages current user)
    ↓
Protected Routes (ProtectedRoute component)
```

---

## Database

### Schema Overview

#### Tools Table
```sql
CREATE TABLE tools (
  id VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  longDescription TEXT,
  category VARCHAR,
  license VARCHAR,
  tags TEXT[],
  platforms TEXT[],
  difficulty VARCHAR,
  alternativeTo TEXT[],
  website VARCHAR,
  repo VARCHAR,
  featured BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  username VARCHAR UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Submissions Table
```sql
CREATE TABLE submissions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  tool_id VARCHAR REFERENCES tools(id),
  name VARCHAR NOT NULL,
  description TEXT,
  category VARCHAR,
  url VARCHAR,
  status VARCHAR DEFAULT 'pending', -- pending, approved, rejected
  created_at TIMESTAMP DEFAULT NOW()
);
```

### LocalStorage Usage

| Key | Purpose |
|-----|---------|
| `auth_token` | JWT authentication token |
| `theme` | User theme preference (light/dark) |
| `user` | Current user profile |
| `submitted_tools` | Cached user submissions |

---

## Setup & Installation

### Prerequisites

- Node.js 16+ or Bun runtime
- npm, yarn, or bun package manager
- Git
- Docker or Podman (optional)

### Option 1: Local Development

```bash
# Clone the repository
git clone https://github.com/alham-rizvi/opensometing.git
cd opensometing

# Install dependencies
npm install
# or
yarn install
# or
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials:
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_PUBLISHABLE_KEY=your_public_key

# Start development server
npm run dev
```

Visit `http://localhost:5173/` (or `8080` if configured)

### Option 2: Docker

```bash
# Build Docker image
docker build -t open-stacker .

# Run container
docker run -p 5173:5173 open-stacker
```

### Option 3: Podman

```bash
# Build image
podman build -t open-stacker .

# Run container
podman run -p 5173:5173 open-stacker
```

### Environment Variables

Create `.env.local` in the project root:

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key

# Optional: OpenAI (if using local chat)
OPENAI_API_KEY=sk-...
```

---

## Development

### Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Build in development mode
npm run build:dev

# Preview production build
npm run preview

# Run linting
npm run lint

# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch
```

### Adding New Pages

1. Create new file in `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx`:
   ```typescript
   <Route path="/new-page" element={<NewPage />} />
   ```
3. Import and use in components

### Adding UI Components

Use shadcn/cli to add pre-built components:

```bash
npx shadcn-ui@latest add [component-name]
# Examples: npx shadcn-ui@latest add button
#           npx shadcn-ui@latest add dialog
#           npx shadcn-ui@latest add form
```

### Form Handling with React Hook Form

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
});

type FormData = z.infer<typeof schema>;

const MyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
      <button type="submit">Submit</button>
    </form>
  );
};
```

### Authentication with Supabase

```typescript
import { supabase } from '@/integrations/supabase/client';

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
});

// Get current user
const { data: { user } } = await supabase.auth.getUser();

// Sign out
await supabase.auth.signOut();
```

### API Calls with TanStack Query

```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Fetch tools
const { data: tools, isLoading, error } = useQuery({
  queryKey: ['tools'],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('tools')
      .select('*');
    if (error) throw error;
    return data;
  },
});

// Mutation example
const { mutate: submitTool } = useMutation({
  mutationFn: async (newTool) => {
    const { data, error } = await supabase
      .from('submissions')
      .insert([newTool]);
    if (error) throw error;
    return data;
  },
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['tools'] });
  },
});
```

---

## Building & Deployment

### Production Build

```bash
npm run build
# Output in: dist/

# Test production build locally
npm run preview
```

### Deployment Options

1. **Vercel** (Recommended for React/Vite)
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify**
   - Connect GitHub repo to Netlify
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Docker/Kubernetes**
   ```bash
   docker build -t open-stacker:latest .
   docker push your-registry/open-stacker:latest
   ```

4. **Self-hosted with Podman**
   - Pull image and run with persistent volumes

### Environment Variables for Production

Set these in your deployment platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

---

## Contributing

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/new-feature`
3. **Make** your changes
4. **Test** locally: `npm run dev` and `npm run test`
5. **Lint** code: `npm run lint`
6. **Commit** with clear messages: `git commit -m "Add: new feature"`
7. **Push** to your fork
8. **Create** a Pull Request

### Adding New Tools

Edit `src/lib/sampleData.ts`:

```typescript
{
  repo: 'owner/repo', 
  id: 'unique-id', 
  name: 'Tool Name',
  category: 'category-name',
  description: 'Short description',
  longDescription: 'Detailed description',
  license: 'MIT',
  tags: ['tag1', 'tag2'],
  platforms: ['Windows', 'macOS', 'Linux'],
  difficulty: 'beginner',
  alternativeTo: ['Paid Tool Name'],
  website: 'https://example.com',
  featured: false,
},
```

---

## Languages & Technologies Used

### Languages
- **TypeScript** - Main language for type safety
- **JavaScript/JSX** - React components
- **SQL** - Database queries (PostgreSQL via Supabase)
- **CSS/SCSS** - Styling with Tailwind
- **HTML** - Page structure
- **Bash** - Build scripts and deployment

### Key Technologies
- React 18 (UI framework)
- Vite (Build tool)
- TypeScript (Type safety)
- Tailwind CSS (Styling)
- Supabase (Backend)
- PostgreSQL (Database)
- TanStack Query (Data fetching)
- React Router (Routing)
- React Hook Form (Form handling)
- Zod (Validation)
- OpenAI API (AI features)

---

## Support & References

### Official Documentation
- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase Docs](https://supabase.com/docs)
- [TypeScript](https://www.typescriptlang.org)
- [React Router](https://reactrouter.com)
- [TanStack Query](https://tanstack.com/query)

### Related Resources
- [shadcn/ui Components](https://ui.shadcn.com)
- [Radix UI Primitives](https://radix-ui.com)
- [OpenAI API](https://platform.openai.com/docs)
- [PostgreSQL](https://www.postgresql.org)

### Getting Help
- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Ask questions in GitHub Discussions

---

## Roadmap

- [ ] Mobile app with React Native
- [ ] Advanced filtering and search
- [ ] Community reviews and ratings
- [ ] Recommendation engine
- [ ] Multi-language support
- [ ] GraphQL API
- [ ] Browser extension
- [ ] API for third-party integration

---

**Made with ❤️ for the open-source community**
