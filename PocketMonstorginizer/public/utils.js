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
 * Ensure proper text case and handle special cases for hyphens, e.g. (ho-oh).
 *
 * @param  target   the name of the Pokémon.
 * @return string   the hyphenated Pokémon name.
 */
export function specialPokeName(target) {
  // Replace all hyphens with spaces
  let updatedName = target.split("-").join(" ");

  // Return name
  return updatedName.toLowerCase();
}
