# GitHub Profile Explorer

A clean, modern Next.js application to search, view, compare, and analyze GitHub profiles and repositories. Includes AI-powered summaries and personal notes.

## Features
- Search GitHub users and view profile details
- List repositories with sorting (stars, updated, name) and language filter
- Dynamic user pages with stats (repos, followers, following)
- Compare two users on key metrics (repos, stars, followers, approx commits)
- AI summary of profile (via API route, pluggable to OpenAI)
- Notes for profiles and individual repos (localStorage)
- Responsive design, light/dark mode, scroll-to-top, skeleton loaders

## Tech Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS (v4)
- ESLint (Next.js config)

## Getting Started (Local)
```bash
# Install dependencies
npm install

# Run dev server (http://localhost:3000)
npm run dev

# Lint & build
npm run lint
npm run build
npm start
```

## Project Structure
```
src/
  app/
    compare/
      page.tsx
    user/
      [username]/
        page.tsx
    layout.tsx
    page.tsx
  components/
    CompareTable.tsx
    ErrorBoundary.tsx
    LoadingSpinner.tsx
    NoteModal.tsx
    NotesButton.tsx
    RepoCard.tsx
    RepoGrid.tsx
    RepoSkeleton.tsx
    ScrollTopButton.tsx
    SearchUser.tsx
    SummaryBox.tsx
    SummarySection.tsx
    ThemeToggle.tsx
  lib/
    github.ts
  types/
    index.ts
  utils.ts
```

## Environment & API Keys
- The AI summary uses a mock in `/api/summary`. To use OpenAI, swap the mock with an API call and add your `OPENAI_API_KEY`.

## Deployment (Vercel)
1. Push the repository to GitHub
2. Import the repo at Vercel
3. Set environment variables if using OpenAI (e.g., `OPENAI_API_KEY`)
4. Deploy

## Live Demo
- Coming soon: <YOUR_DEPLOYED_URL>

## Screenshots
- Add screenshots of the homepage, profile page, compare page, and AI summary here.
