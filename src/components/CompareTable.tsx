import Image from 'next/image';

export interface CompareMetrics {
	username: string;
	name: string | null;
	avatarUrl: string;
	repoCount: number;
	totalStars: number;
	followers: number;
	approxCommits: number;
}

export default function CompareTable({ a, b }: { a: CompareMetrics; b: CompareMetrics }) {
	const Row = ({ label, left, right }: { label: string; left: React.ReactNode; right: React.ReactNode }) => (
		<div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4 py-3 border-b border-gray-100">
			<div className="text-sm text-gray-500">{label}</div>
			<div className="font-semibold text-gray-900">{left}</div>
			<div className="font-semibold text-gray-900">{right}</div>
		</div>
	);

	const Card = ({ side }: { side: 'a' | 'b' }) => {
		const u = side === 'a' ? a : b;
		return (
			<div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-5 shadow-sm">
				<div className="flex items-center gap-3">
					<Image src={u.avatarUrl} alt={u.username} width={40} height={40} className="w-10 h-10 rounded-full" />
					<div>
						<div className="font-bold text-gray-900">{u.name || u.username}</div>
						<div className="text-sm text-gray-600">@{u.username}</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<section className="space-y-6">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<Card side="a" />
				<Card side="b" />
			</div>
			<div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-5 shadow-sm">
				<Row label="Repositories" left={a.repoCount} right={b.repoCount} />
				<Row label="Total Stars" left={a.totalStars} right={b.totalStars} />
				<Row label="Followers" left={a.followers} right={b.followers} />
				<Row label="Approx Commits" left={a.approxCommits} right={b.approxCommits} />
			</div>
		</section>
	);
}
