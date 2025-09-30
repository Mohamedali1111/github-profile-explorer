'use client';

import { useEffect, useRef, useState } from 'react';

interface NoteModalProps {
	open: boolean;
	title: string;
	initialValue?: string;
	onClose: () => void;
	onSave: (value: string) => void;
}

export default function NoteModal({ open, title, initialValue = '', onClose, onSave }: NoteModalProps) {
	const [value, setValue] = useState(initialValue);
	const dialogRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === 'Escape') onClose();
		}
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [onClose]);

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-modal>
			<div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
			<div ref={dialogRef} className="relative z-10 w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
				<h3 className="text-lg font-semibold text-gray-900">{title}</h3>
				<textarea
					className="mt-4 w-full min-h-32 resize-y rounded-xl border border-gray-300 bg-white/90 p-3 outline-none focus:ring-2 focus:ring-blue-500"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder="Write your note here..."
				/>
				<div className="mt-5 flex justify-end gap-3">
					<button onClick={onClose} className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 bg-white hover:bg-gray-50">Cancel</button>
					<button onClick={() => onSave(value)} className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm">Save</button>
				</div>
			</div>
		</div>
	);
}
