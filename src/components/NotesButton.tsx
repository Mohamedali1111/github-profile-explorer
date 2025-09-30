'use client';

import { useEffect, useState } from 'react';
import NoteModal from './NoteModal';

interface NotesButtonProps {
	storageKey: string;
	label?: string;
}

export default function NotesButton({ storageKey, label = 'Add Note' }: NotesButtonProps) {
	const [open, setOpen] = useState(false);
	const [note, setNote] = useState<string | null>(null);

	useEffect(() => {
		try {
			const saved = localStorage.getItem(storageKey);
			if (saved) setNote(saved);
		} catch {}
	}, [storageKey]);

	const onSave = (value: string) => {
		try {
			localStorage.setItem(storageKey, value);
			setNote(value);
			setOpen(false);
		} catch {}
	};

	return (
		<div className="inline-flex items-center gap-3">
			<button
				onClick={() => setOpen(true)}
				className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-800"
			>
				<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
				</svg>
				{label}
			</button>
			{note && <span className="text-sm text-gray-500">Saved</span>}
			<NoteModal
				open={open}
				title="Edit Note"
				initialValue={note ?? ''}
				onClose={() => setOpen(false)}
				onSave={onSave}
			/>
		</div>
	);
}
