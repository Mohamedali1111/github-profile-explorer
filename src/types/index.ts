export interface GitHubUser {
	id: number;
	login: string;
	name: string | null;
	bio: string | null;
	location: string | null;
	avatar_url: string;
	public_repos: number;
	followers: number;
	following: number;
	html_url: string;
	created_at: string;
	updated_at: string;
}

export interface GitHubRepo {
	id: number;
	name: string;
	description: string | null;
	stargazers_count: number;
	language: string | null;
	html_url: string;
	updated_at: string;
	fork: boolean;
	archived: boolean;
	visibility?: string;
}

export interface CompareMetrics {
	username: string;
	name: string | null;
	avatarUrl: string;
	repoCount: number;
	totalStars: number;
	followers: number;
	approxCommits: number;
}
