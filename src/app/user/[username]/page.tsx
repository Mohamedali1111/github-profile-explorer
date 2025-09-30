import { Suspense } from 'react';
import Link from 'next/link';
import UserCard from '@/components/UserCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorBoundary from '@/components/ErrorBoundary';
import type { GitHubRepo } from '@/types';
import RepoGrid from '@/components/RepoGrid';
import SummarySection from '@/components/SummarySection';
import NotesButton from '@/components/NotesButton';
import { fetchUser, fetchUserRepos } from '@/lib/github';

async function UserProfile({ username }: { username: string }) {
  const user = await fetchUser(username);
  return (
    <div className="space-y-4">
      <UserCard user={user} />
      <div className="flex justify-end">
        <NotesButton storageKey={`note:user:${user.login}`} label="Add User Note" />
      </div>
    </div>
  );
}

async function UserRepos({ username }: { username: string }) {
  const repos: GitHubRepo[] = await fetchUserRepos(username);

  if (!repos.length) {
    return (
      <p className="text-center text-gray-500">No public repositories found.</p>
    );
  }

  return (
    <div className="space-y-3">
      <RepoGrid repos={repos} />
      {repos.map((repo) => (
        <div key={repo.id} className="flex justify-end">
          <NotesButton storageKey={`note:repo:${username}:${repo.name}`} label="Add Repo Note" />
        </div>
      ))}
    </div>
  );
}

export default async function UserPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  return (
    <main className="container mx-auto max-w-4xl px-6 py-8 space-y-8">
      <div className="mb-2">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Search
        </Link>
      </div>

      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <UserProfile username={username} />
        </Suspense>
      </ErrorBoundary>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Repositories</h2>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <UserRepos username={username} />
          </Suspense>
        </ErrorBoundary>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">AI Analysis</h2>
        <SummarySection username={username} />
      </section>
    </main>
  );
}
