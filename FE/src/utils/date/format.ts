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

/**
 * Format a date to a string
 * @param date - The date to format
 * @returns The formatted time in short format (HH:MM)
 */
export function formatTime(date: string | Date) {
    if (typeof date === 'string') return date.slice(11, 16);
    if (date instanceof Date) return date.toISOString().slice(11, 16);
    return '';
}