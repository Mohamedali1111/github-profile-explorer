import type { GitHubRepo, GitHubUser } from '@/types';

const BASE = 'https://api.github.com';

async function getJson<T>(url: string, init?: RequestInit): Promise<T> {
	const res = await fetch(url, init);
	if (!res.ok) throw new Error(`Request failed: ${res.status}`);
	return res.json() as Promise<T>;
}

export async function fetchUser(username: string, revalidateSeconds = 300): Promise<GitHubUser> {
	return getJson<GitHubUser>(`${BASE}/users/${encodeURIComponent(username)}`, {
		next: { revalidate: revalidateSeconds },
	});
}

export async function fetchUserRepos(username: string, revalidateSeconds = 120, perPage = 50): Promise<GitHubRepo[]> {
	return getJson<GitHubRepo[]>(`${BASE}/users/${encodeURIComponent(username)}/repos?per_page=${perPage}&sort=updated`, {
		next: { revalidate: revalidateSeconds },
	});
}

export async function fetchRepoCommits(owner: string, repo: string, perPage = 30): Promise<unknown[]> {
	return getJson<unknown[]>(`${BASE}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/commits?per_page=${perPage}`, {
		cache: 'no-store',
	});
}
