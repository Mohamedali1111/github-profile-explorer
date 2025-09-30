'use client';

import { useState } from 'react';
import CompareTable, { type CompareMetrics } from '@/components/CompareTable';
import type { GitHubRepo as Repo } from '@/components/RepoCard';

async function fetchJson<T>(url: string) {
	const res = await fetch(url, { cache: 'no-store' });
	if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
	return res.json() as Promise<T>;
}

interface GitHubProfile {
	login: string;
	name: string | null;
	avatar_url: string;
	followers: number;
	public_repos: number;
}

async function getUserMetrics(username: string): Promise<CompareMetrics> {
	const profile = await fetchJson<GitHubProfile>(`https://api.github.com/users/${encodeURIComponent(username)}`);
	const repos = await fetchJson<Repo[]>(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`);

	const repoCount = profile.public_repos ?? repos.length;
	const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

	// Approx commit activity: sum commits on up to 5 recent repos' default branch (best effort)
	const topRepos = repos.slice(0, 5);
	let approxCommits = 0;
	for (const repo of topRepos) {
		try {
			const commits = await fetchJson<unknown[]>(`https://api.github.com/repos/${profile.login}/${repo.name}/commits?per_page=30`);
			approxCommits += commits.length;
		} catch {
			// ignore errors for private/empty repos etc.
		}
	}

	return {
		username: profile.login,
		name: profile.name ?? null,
		avatarUrl: profile.avatar_url,
		followers: profile.followers ?? 0,
		repoCount,
		totalStars,
		approxCommits,
	};
}

export default function ComparePage() {
	const [left, setLeft] = useState('');
	const [right, setRight] = useState('');
	const [metrics, setMetrics] = useState<{ a: CompareMetrics | null; b: CompareMetrics | null }>({ a: null, b: null });
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const onCompare = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		if (!left.trim() || !right.trim()) {
			setError('Please enter two GitHub usernames');
			return;
		}
		if (left.trim().toLowerCase() === right.trim().toLowerCase()) {
			setError('Please enter two different usernames');
			return;
		}
		setLoading(true);
		try {
			const [a, b] = await Promise.all([
				getUserMetrics(left.trim()),
				getUserMetrics(right.trim()),
			]);
			setMetrics({ a, b });
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : 'Comparison failed';
			setError(message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="container mx-auto max-w-5xl px-6 py-12">
			<h1 className="h1 text-center">Compare GitHub Users</h1>
			<form onSubmit={onCompare} className="mt-8 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-3">
				<input
					value={left}
					onChange={(e) => setLeft(e.target.value)}
					placeholder="Left username"
					className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<button type="submit" className="md:order-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-colors disabled:bg-gray-400" disabled={loading}>
					{loading ? 'Comparing...' : 'Compare'}
				</button>
				<input
					value={right}
					onChange={(e) => setRight(e.target.value)}
					placeholder="Right username"
					className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</form>
			{error && <p className="mt-3 text-center text-sm text-red-600">{error}</p>}

			<div className="mt-10">
				{metrics.a && metrics.b ? (
					<CompareTable a={metrics.a} b={metrics.b} />
				) : (
					<p className="text-center text-gray-600">Enter two usernames and click Compare.</p>
				)}
			</div>
		</main>
	);
}
