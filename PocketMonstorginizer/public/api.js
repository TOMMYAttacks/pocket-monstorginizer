/**
 * API Data Fetching
 *
 * This file contains functions to fetch Pokémon data from the API.
 */


import * as utils from "./utils.js";


/**
 * Fetches the data of a specific Pokémon from the API.
 *
 * @param  target   the name of the Pokémon.
 * @return          the data of the Pokémon if successful, or null if there is an error.
 */
export async function fetchPokemonData(target) {
  let targetAPIReady = utils.validatePokeName(utils.specialPokeName(target));

  const url = `https://pokeapi.co/api/v2/pokemon-species/${targetAPIReady}`;

  try {
    const response = await fetch(url);

    return await response.json();
  } catch (err) {
    console.error("Error fetching Pokemon data", err);
    return null;
  }
}

/**
 * Fetches the default form data of a Pokémon.
 *
 * @param  pokemonSpecies   the Pokémon data.
 * @return                  the Pokémon data or null if there is an error.
 */
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
