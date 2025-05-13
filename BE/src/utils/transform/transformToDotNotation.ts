/**
 * Transforms a nested object into dot notation format for MongoDB updates
 * @param data The object to transform
 * @returns An object with dot notation keys
 * @example
 * // Input:
 * { name: { en: "Hello", ar: "مرحبا" } }
 * // Output:
 * { "name.en": "Hello", "name.ar": "مرحبا" }
 */
export const transformToDotNotation = <T extends Record<string, object | unknown>>(data: T): Record<string, unknown> => {
    return Object.entries(data).reduce((acc, [key, value]) => {
        if (typeof value === 'object' && value !== null) {
            Object.entries(value).forEach(([nestedKey, nestedValue]) => {
                acc[`${key}.${nestedKey}`] = nestedValue;
            });
        } else {
            acc[key] = value;
        }
        return acc;
    }, {} as Record<string, unknown>);
};