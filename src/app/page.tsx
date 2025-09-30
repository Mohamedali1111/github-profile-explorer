export default function Home() {
	return (
		<main className="container mx-auto max-w-4xl px-6 py-16">
			<section className="text-center">
				<h1 className="h1">GitHub Profile Explorer</h1>
				<p className="mt-4 text-gray-600">
					Search, compare, and analyze GitHub profiles.
				</p>
				<div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-gray-200 bg-white/60 px-4 py-3 shadow-sm backdrop-blur">
					<span className="text-sm text-gray-500">Next.js 15 • TypeScript • Tailwind</span>
				</div>
			</section>
		</main>
	);
}
