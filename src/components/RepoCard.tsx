import Link from 'next/link';
import type { GitHubRepo } from '@/types';
import NotesButton from './NotesButton';

interface RepoCardProps {
	repo: GitHubRepo;
	username: string;
}

export default function RepoCard({ repo, username }: RepoCardProps) {
	const formattedDate = new Date(repo.updated_at).toLocaleDateString(undefined, {
		year: 'numeric', month: 'short', day: 'numeric'
	});

	return (
		<div className="space-y-3">
			<div className="group rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-5 shadow-sm hover:shadow-md transition-all cursor-pointer">
				<div className="flex items-start justify-between gap-3">
					<div className="min-w-0">
						<Link href={repo.html_url} target="_blank" className="font-semibold text-gray-900 hover:text-blue-700 truncate">
							{repo.name}
						</Link>
						{repo.description && (
							<p className="mt-1 text-sm text-gray-600 line-clamp-2">{repo.description}</p>
						)}
					</div>
					<div className="flex items-center gap-2 text-sm text-gray-600 whitespace-nowrap">
						<svg className="w-4 h-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.175 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z"/></svg>
						<span>{repo.stargazers_count.toLocaleString()}</span>
					</div>
				</div>
				<div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
					{repo.language && (
						<span className="inline-flex items-center gap-1">
							<span className="w-2.5 h-2.5 rounded-full bg-gray-400" aria-hidden />
							{repo.language}
						</span>
					)}
					<span className="text-gray-500">Updated {formattedDate}</span>
				</div>
			</div>
			<div className="flex justify-end">
				<NotesButton storageKey={`note:repo:${username}:${repo.name}`} label="Add Repo Note" />
			</div>
		</div>
	);
}
