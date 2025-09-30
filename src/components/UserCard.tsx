import Image from 'next/image';
import type { GitHubUser } from '@/types';
import { formatDate } from '@/utils';

interface UserCardProps {
  user: GitHubUser;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Header with avatar and basic info */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <Image
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            width={128}
            height={128}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg"
          />
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {user.name || user.login}
            </h1>
            <p className="text-xl text-gray-600 mb-2">@{user.login}</p>
            {user.bio && (
              <p className="text-gray-700 text-lg leading-relaxed max-w-2xl">
                {user.bio}
              </p>
            )}
          </div>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
        </div>
      </div>

      {/* Stats and details */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {user.public_repos.toLocaleString()}
            </div>
            <div className="text-gray-600 font-medium">Public Repositories</div>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {user.followers.toLocaleString()}
            </div>
            <div className="text-gray-600 font-medium">Followers</div>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {user.following.toLocaleString()}
            </div>
            <div className="text-gray-600 font-medium">Following</div>
          </div>
        </div>

        {/* Additional info */}
        <div className="space-y-4">
          {user.location && (
            <div className="flex items-center gap-3 text-gray-700">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-medium">{user.location}</span>
            </div>
          )}
          <div className="flex items-center gap-3 text-gray-700">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">Joined {formatDate(user.created_at)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
