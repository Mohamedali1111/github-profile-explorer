'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
	const [theme, setTheme] = useState<'light' | 'dark'>(() => {
		if (typeof window === 'undefined') return 'light';
		return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
	});

	useEffect(() => {
		if (typeof document !== 'undefined') {
			document.documentElement.classList.toggle('dark', theme === 'dark');
			localStorage.setItem('theme', theme);
		}
	}, [theme]);

	return (
		<button
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			className="px-3 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-800"
			title="Toggle theme"
		>
			{theme === 'dark' ? 'Light' : 'Dark'}
		</button>
	);
}
