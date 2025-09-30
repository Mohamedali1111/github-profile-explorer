export function formatDate(dateString: string, locale?: string) {
	return new Date(dateString).toLocaleDateString(locale || undefined, {
		year: 'numeric', month: 'long', day: 'numeric'
	});
}
