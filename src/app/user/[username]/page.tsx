import { Suspense } from 'react';
import Link from 'next/link';
import UserCard from '@/components/UserCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorBoundary from '@/components/ErrorBoundary';

interface UserPageProps {
  params: {
    username: string;
  };
}

async function fetchUserData(username: string) {
  const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
    next: { revalidate: 300 }, // Cache for 5 minutes
  });

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('User not found');
    }
    throw new Error('Failed to fetch user data');
  }

  return res.json();
}

async function UserProfile({ username }: { username: string }) {
  const user = await fetchUserData(username);
  return <UserCard user={user} />;
}

export default function UserPage({ params }: UserPageProps) {
  const { username } = params;

  return (
    <main className="container mx-auto max-w-4xl px-6 py-8">
      <div className="mb-8">
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
    </main>
  );
}
