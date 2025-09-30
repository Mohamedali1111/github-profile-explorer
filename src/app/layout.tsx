import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollTopButton from "@/components/ScrollTopButton";
import Link from "next/link";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "GitHub Profile Explorer",
	description: "Search and analyze GitHub profiles",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}> 
				<div className="min-h-dvh">
					<header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-gray-200">
						<div className="container mx-auto max-w-4xl px-6 py-3 flex items-center justify-between">
							<Link href="/" className="font-semibold hover:opacity-90">GitHub Explorer</Link>
							<div className="flex items-center gap-3">
								<Link href="/compare" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Compare</Link>
							</div>
						</div>
					</header>
					{children}
				</div>
				<ScrollTopButton />
			</body>
		</html>
	);
}
