/**
 * Format a date to a string
 * @param date - The date to format
 * @returns The formatted date in short format (YYYY-MM-DD)
 */
export function formatDate(date: string | Date) {
    if (typeof date === 'string') return date.slice(0, 10);
    if (date instanceof Date) return date.toISOString().slice(0, 10);
    return '';
}