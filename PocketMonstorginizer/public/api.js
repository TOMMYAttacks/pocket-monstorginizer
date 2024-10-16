import * as utils from "./utils.js";

export async function fetchPokemonData(target) {
  let targetAPIReady = utils.validatePokeName(target);

  const url = `https://pokeapi.co/api/v2/pokemon-species/${targetAPIReady}`;

  try {
    const response = await fetch(url);

    return await response.json();
  } catch (err) {
    console.error("Error fetching Pokemon data", err);
    return null;
  }
}

export async function fetchDefaultFormData(pokemonSpecies) {
  let pokeDefaultFormUrl = pokemonSpecies.varieties[0].pokemon.url;

  try {
    const response = await fetch(pokeDefaultFormUrl);

    return await response.json();
  } catch (err) {
    console.error("Error fetching default form data", err);
    return null;
  }
}
