'use client';

import { useMemo, useState } from 'react';
import RepoCard from './RepoCard';
import type { GitHubRepo } from '@/types';

type SortKey = 'stars' | 'updated' | 'name';

interface RepoGridProps {
	repos: GitHubRepo[];
}

export default function RepoGrid({ repos }: RepoGridProps) {
	const [sortKey, setSortKey] = useState<SortKey>('updated');
	const [language, setLanguage] = useState<string>('all');

	const languages = useMemo(() => {
		const set = new Set<string>();
		repos.forEach(r => { if (r.language) set.add(r.language); });
		return ['all', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
	}, [repos]);

	const filtered = useMemo(() => {
		let list = repos;
		if (language !== 'all') list = list.filter(r => r.language === language);
		switch (sortKey) {
			case 'stars':
				return [...list].sort((a, b) => b.stargazers_count - a.stargazers_count);
			case 'name':
				return [...list].sort((a, b) => a.name.localeCompare(b.name));
			case 'updated':
			default:
				return [...list].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
		}
	}, [repos, sortKey, language]);

	return (
		<div className="space-y-4">
			<div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
				<div className="inline-flex items-center gap-2">
					<label className="text-sm text-gray-600">Sort by</label>
					<select value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)} className="px-3 py-2 rounded-xl border border-gray-300 bg-white">
						<option value="updated">Last updated</option>
						<option value="stars">Stars</option>
						<option value="name">Name</option>
					</select>
				</div>
				<div className="inline-flex items-center gap-2">
					<label className="text-sm text-gray-600">Language</label>
					<select value={language} onChange={(e) => setLanguage(e.target.value)} className="px-3 py-2 rounded-xl border border-gray-300 bg-white">
						{languages.map(l => (
							<option key={l} value={l}>{l}</option>
						))}
					</select>
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{filtered.map(repo => (
					<RepoCard key={repo.id} repo={repo} />
				))}
			</div>
		</div>
	);
}
