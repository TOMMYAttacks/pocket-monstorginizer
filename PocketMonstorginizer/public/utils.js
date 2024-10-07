/**
 * Name Utilities
 *
 * This file contains utilities for formatting and validating Pokémon names for API requests and UI display.
 *
 * Functions:
 * 1. validatePokeName(target) - Sanitizes text and replacing spaces with hyphens.
 * 2. capitalize(string) - Capitalizes the first letter of a string.
 * 3. specialPokeName(target) - Handles special cases like hyphenated names to ensure proper formatting.
 */

/**
 * Validate the Pokémon name, remove any unwanted characters and replace spaces with hyphens.
 *
 * @param  target   the name of the Pokémon.
 * @return string   the validated name for API use.
 */
export function validatePokeName(target) {
  // Loop through each character of the name.
  for (let i = 0; i < target.length; i++) {
    let testChar = target.charAt(i); // Get the current character.

    // If the character is not a space, a '2', or a letter, remove it.
    if (
      testChar != " " &&
      testChar != "2" &&
      !(
        (testChar >= "a" && testChar <= "z") ||
        (testChar >= "A" && testChar <= "Z")
      )
    ) {
      target = target.substring(0, i) + target.substring(i + 1); // Remove the character.
      i--; // Adjust the index.
    }
  }

  // If the name contains a space, replace it with a hyphen.
  if (target.includes(" ")) {
    target = target.replace(" ", "-");
  }
  return target; // Return the sanitized name.
}

/**
 * Capitalize the first letter of a string and return the updated string.
 *
 * @param  string   the input string.
 * @return string   the sentence case string.
 */
export function capitalize(string) {
  // Convert the first character to uppercase and concatenate it.
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Ensure proper capitalization and handle special cases for hyphens, e.g. (ho-oh).
 *
 * @param  target   the name of the Pokémon.
 * @return string   the hyphenated Pokémon name.
 */
export function specialPokeName(target) {
  // List of Pokémon that have hyphens in their names.
  const hyphenExceptions = [
    "ho-oh",
    "porygon-z",
    "jangmo-o",
    "hakamo-o",
    "kommo-o",
    "ting-lu",
    "chien-pao",
    "wo-chien",
    "chi-yu",
  ];

  // Check if the name includes a hyphen.
  if (target.includes("-")) {
    // If the name isn't in the list, replace the hyphen with a space.
    if (!hyphenExceptions.includes(target)) {
      let spaceIndex = target.indexOf("-");
      // Capitalize both sides of the name split by the hyphen.
      target =
        capitalize(target.substring(0, spaceIndex)) +
        " " +
        capitalize(target.substring(spaceIndex + 1));
    }
  }
  // Capitalize the first letter of the name then return.
  return capitalize(target);
}
