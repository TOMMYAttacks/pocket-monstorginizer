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

  if (target.includes(" ")) {
    target = target.replace(" ", "-");
  }
  return target;
}

export function capitalize(inputString) {
  if (typeof inputString !== "string" || inputString.length === 0) {
    console.error("capitalize() received a non-string input:", inputString);
    return "";
  }

  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

export function specialPokeName(target) {
  let updatedName = target.split("-").join(" ");

  return updatedName.toLowerCase();
}

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
