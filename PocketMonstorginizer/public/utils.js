/**
 * Name Utilities
 *
 * This file contains utilities for formatting and validating Pokémon names for API requests and UI display.
 */


/**
 * Validate the Pokémon name, remove any unwanted characters and replace spaces with hyphens.
 *
 * @param  target   the name of the Pokémon.
 * @return string   the validated name for API use.
 */
export function validatePokeName(target) {
  for (let i = 0; i < target.length; i++) {
    let testChar = target.charAt(i);

    if (
      testChar != " " &&
      !(
        (testChar >= "0" && testChar <= "9") ||
        (testChar >= "a" && testChar <= "z") ||
        (testChar >= "A" && testChar <= "Z")
      )
    ) {
      target = target.substring(0, i) + target.substring(i + 1);
      i--;
    }
  }

  console.log(target);
  
  if (target.includes(" ")) {
    target = target.replace(" ", "-");
  }
  return target;
}

/**
 * Capitalize the first letter of a string and return the updated string.
 *
 * @param  string   the input string.
 * @return string   the sentence case string.
 */
export function capitalize(inputString) {
  if (typeof inputString !== "string" || inputString.length === 0) {
    console.error("capitalize() received a non-string input:", inputString);
    return "";
  }

  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}


/**
 * Ensure proper text case and handle special cases for hyphens, e.g. (ho-oh).
 *
 * @param  target   the name of the Pokémon.
 * @return string   the hyphenated Pokémon name.
 */
export function specialPokeName(target) {
	
	if ((target + "").includes("-")) {
	  target = target.replace("-", " ");
	}

  return (target + "").toLowerCase();
}


/**
 * 
 * Takes the Pokémon's name from the PokeAPI and returns the Pokemon's name as how it's written normally.
 * This includes captalizeing all sections of the name, as well as adding any non letter/number characters.
 * (e.g., pikachu -> Pikachu, great-tusk -> Great Tusk, ho-oh -> Ho-Oh)
 * 
 * @param target	the name of the Pokémon in the API
 * @return string	the normalized Pokémon name
 */
export function normalizePokeName(target) {
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
  if (target.includes("-")) {
    if (!hyphenExceptions.includes(target)) {
      let spaceIndex = target.indexOf("-");
      target =
        capitalize(target.substring(0, spaceIndex)) +
        " " +
        capitalize(target.substring(spaceIndex + 1));
    } else {
      if (target != "jangmo-o" && target != "hakamo-o" && target != "kommo-o") {
        let spaceIndex = target.indexOf("-");
        target =
          capitalize(target.substring(0, spaceIndex)) +
          "-" +
          capitalize(target.substring(spaceIndex + 1));
      }
    }
  }
  target = capitalize(target);
  target = correctPokeName(target);

  return target;
}

/**
 * Corrects spelling of the Pokémon name in cases when it would need special characters added.
 * To be used within normalizePokeName
 * 
 * @param target	the current spelling of the Pokémon
 * @return string	the corrected Pokémon name
 */
function correctPokeName(target) {
  const namesWithoutPeriod = ["Mime Jr", "Mr Mime", "Mr Rime"];
  const namesWithPeriod = ["Mime Jr.", "Mr. Mime", "Mr. Rime"];

  const namesWithoutApostrophe = ["Farfetchd", "Sirfetchd"];
  const namesWithApostrophe = ["Farfetch'd", "Sirfetch'd"];

  const namesWithoutDiacritic = ["Flabebe"];
  const namesWithDiacritic = ["Flabébé"];

  const namesWithoutGenderSymbol = ["Nidoran F", "Nidoran M"];
  const namesWithGenderSymbol = ["Nidoran♀", "Nidoran♂"];

  const namesWithoutColon = ["Type Null"];
  const namesWithColon = ["Type: Null"];

  const namesWithoutExtraCharacters = [
    namesWithoutPeriod,
    namesWithoutApostrophe,
    namesWithoutDiacritic,
    namesWithoutGenderSymbol,
    namesWithoutColon,
  ];
  const namesWithExtraCharacters = [
    namesWithPeriod,
    namesWithApostrophe,
    namesWithDiacritic,
    namesWithGenderSymbol,
    namesWithColon,
  ];

  for (let i = 0; i < namesWithoutExtraCharacters.length; i++) {
    for (let j = 0; j < namesWithoutExtraCharacters[i].length; j++) {
      if (target == namesWithoutExtraCharacters[i][j]) {
        target = namesWithExtraCharacters[i][j];
      }
    }
  }

  return target;
}
