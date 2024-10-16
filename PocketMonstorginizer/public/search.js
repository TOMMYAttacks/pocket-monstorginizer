import * as api from "./api.js";
import * as utils from "./utils.js";
import * as dom from "./dom.js";

function sanitizeText(text) {
  return text.split("\f").join(" ");
}

export async function handleSearch(target) {
  let pokemonSpecies = await api.fetchPokemonData(target);

  if (pokemonSpecies) {
    dom.updatePokeInfo(pokemonSpecies);

    let rawText =
      pokemonSpecies.flavor_text_entries.length > 1
        ? pokemonSpecies.flavor_text_entries[1].flavor_text
        : pokemonSpecies.flavor_text_entries[0].flavor_text;

    let sanitizedText = sanitizeText(rawText);
    document.getElementById("PokeInfo").innerHTML = sanitizedText;

    let pokeDefaultForm = await api.fetchDefaultFormData(pokemonSpecies);
    dom.showPokeImage(pokeDefaultForm.sprites.front_default);

    let pokeColor = pokemonSpecies.color.name;
    dom.changeColorOfBackground(pokeColor);

    updateExternalLinks(pokemonSpecies.name);
  } else {
    alert("Pokemon not found!");
  }
  document.getElementById("PokeSearch").value = "";
}

function updateExternalLinks(pokemonName) {
  const bulbapediaURL = `https://bulbapedia.bulbagarden.net/wiki/${utils.normalizePokeName(
    pokemonName
  )}`;
  document.getElementById("BulbaLink").href = bulbapediaURL;
  document.getElementById("BulbaLink").innerHTML = bulbapediaURL;

  const smogonURL = `https://www.smogon.com/dex/sv/pokemon/${pokemonName.toLowerCase()}/`;
  document.getElementById("SmogLink").href = smogonURL;
  document.getElementById("SmogLink").innerHTML = smogonURL;
}
