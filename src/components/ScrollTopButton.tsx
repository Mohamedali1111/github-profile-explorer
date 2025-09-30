'use client';

import { useEffect, useState } from 'react';

export default function ScrollTopButton() {
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		const onScroll = () => setVisible(window.scrollY > 400);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	if (!visible) return null;

	return (
		<button
			onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
			className="fixed bottom-6 right-6 z-40 px-3 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
			title="Back to top"
		>
			<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
			</svg>
		</button>
	);
}
