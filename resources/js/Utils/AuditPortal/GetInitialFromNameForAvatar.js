/**
 * Generates initials from a name string.
 * - Single word: Returns first two letters.
 * - Multiple words: Returns first letter of first word and last word.
 */
export const getBusinessInitials = (name) => {
    if (!name) return "??";

    // Clean leading/trailing spaces and handle multiple spaces between words
    const words = name.trim().split(/\s+/);

    if (words.length === 0) return "??";

    if (words.length === 1) {
        // Single word: return first two letters (e.g., "Pandey" -> "PA")
        return words[0].substring(0, 2).toUpperCase();
    }

    // Multiple words: First letter of first word + First letter of last word
    const firstInitial = words[0].charAt(0);
    const lastInitial = words[words.length - 1].charAt(0);

    return (firstInitial + lastInitial).toUpperCase();
};