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
			className="px-3 py-2 rounded-xl border border-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-100 cursor-pointer transition-colors"
			title="Toggle theme"
		>
			{theme === 'dark' ? (
				<span className="inline-flex items-center gap-2"><SunIcon /> Light</span>
			) : (
				<span className="inline-flex items-center gap-2"><MoonIcon /> Dark</span>
			)}
		</button>
	);
}

function SunIcon() {
	return (
		<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m4.95-14.95l-.707.707M7.757 19.778l-.707.707M21 12h-1M4 12H3m14.243 7.778l-.707-.707M7.05 5.05l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
		</svg>
	);
}

function MoonIcon() {
	return (
		<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
		</svg>
	);
}
