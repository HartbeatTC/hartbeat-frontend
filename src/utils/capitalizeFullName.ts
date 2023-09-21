export function capitalizeFullName(fullName: string): string {
  // Split the full name into words and remove leading/trailing spaces

  const words = fullName
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean); // Filter out empty strings

  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word) => {
    // Handle hyphenated names (e.g., Aguila-Mandich)
    const hyphenatedParts = word.split('-');
    const capitalizedParts = hyphenatedParts.map((part) => {
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    });
    return capitalizedParts.join('-');
  });

  // Join the capitalized words back together with a single space
  const capitalizedFullName = capitalizedWords.join(' ');

  return capitalizedFullName;
}
