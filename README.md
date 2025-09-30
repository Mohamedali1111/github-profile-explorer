# 🚀 GitHub Profile Explorer

A modern, full-featured Next.js application for exploring GitHub profiles and repositories. Built with TypeScript, featuring AI-powered analysis, user comparison, and personal note-taking capabilities.



## ✨ Features

### 🔍 **Profile Search & Analysis**
- Search any GitHub user by username
- View comprehensive profile information (avatar, bio, location, stats)
- Real-time data fetching from GitHub API
- Responsive design with premium UI

### 📊 **Repository Management**
- Browse all user repositories with detailed information
- **Smart Sorting**: By stars, last updated, or name
- **Language Filtering**: Filter repos by programming language
- Repository details: description, stars, language, last updated

### 🤖 **AI-Powered Insights**
- Generate intelligent profile summaries
- Analyze repository patterns and activity
- Technical focus identification
- Community engagement insights
- *Ready for OpenAI integration*

### ⚖️ **User Comparison**
- Compare two GitHub users side-by-side
- Key metrics: repository count, total stars, followers
- Approximate commit activity analysis
- Visual comparison with clean data presentation

### 📝 **Personal Notes System**
- Save notes for user profiles
- Individual notes for each repository
- Persistent storage using localStorage
- Clean modal interface for editing
- Notes persist across sessions

### 🎨 **Premium User Experience**
- Modern, clean design with Tailwind CSS
- Responsive layout for all devices
- Smooth animations and hover effects
- Scroll-to-top functionality
- Loading states and error handling
- Professional typography and spacing

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **API**: GitHub REST API
- **Deployment**: Vercel
- **Code Quality**: ESLint, TypeScript strict mode

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/github-profile-explorer.git
cd github-profile-explorer

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts
```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── summary/       # AI summary endpoint
│   ├── compare/           # User comparison page
│   ├── user/[username]/   # Dynamic user profile pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable UI components
│   ├── CompareTable.tsx   # User comparison table
│   ├── NoteModal.tsx      # Notes editing modal
│   ├── NotesButton.tsx    # Notes trigger button
│   ├── RepoCard.tsx       # Repository card
│   ├── RepoGrid.tsx       # Repository grid with filters
│   ├── SearchUser.tsx     # User search form
│   ├── SummaryBox.tsx     # AI summary display
│   └── ...               # Other components
├── lib/                   # Utility libraries
│   └── github.ts          # GitHub API helpers
├── types/                 # TypeScript definitions
│   └── index.ts           # Shared interfaces
└── utils.ts               # Helper functions
```

## 🔧 Configuration

### GitHub API
The app uses the public GitHub API (no authentication required for basic profile data).

### AI Summary
The AI summary feature uses a mock implementation by default. 


## 🎯 Live Demo

**🔗 [View Live Demo](https://github-profile-explorer-beryl.vercel.app/)**

Try searching for popular GitHub users like:
- `octocat` - GitHub's mascot
- `torvalds` - Linux creator
- `gaearon` - Redux creator


