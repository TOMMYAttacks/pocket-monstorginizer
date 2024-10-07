/**
 * API Data Fetching
 *
 * This file contains functions to fetch Pokémon data from the API.
 *
 * Functions:
 * 1. fetchPokemonData(target) - Retrieves the Pokémon data using the Pokémon's name.
 * 2. fetchDefaultFormData(pokemonSpecies) - Retrieves the Pokémon's default form.
 */

// Helper function to ensure the Pokémon name is valid for the API request.
import { validatePokeName } from "./utils.js";

/**
 * Fetches the data of a specific Pokémon from the API.
 *
 * @param  target   the name of the Pokémon.
 * @return          the data of the Pokémon if successful, or null if there is an error.
 */
export async function fetchPokemonData(target) {
  // Validate the Pokémon name.
  let targetAPIReady = validatePokeName(target);

  // Fetch the data with the validated name.
  const url = `https://pokeapi.co/api/v2/pokemon-species/${targetAPIReady}`;

  // Handle any errors while fetching the data.
  try {
    // Request the data from the API.
    const response = await fetch(url);

    // Convert the response to JSON and return it.
    return await response.json();
  } catch (err) {
    // If error, log to the console.
    console.error("Error fetching Pokemon data", err);
    return null; // Return null if there's an error.
  }
}

/**
 * Fetches the default form data of a Pokémon.
 *
 * @param  pokemonSpecies   the Pokémon data.
 * @return                  the Pokémon data or null if there is an error.
 */
export async function fetchDefaultFormData(pokemonSpecies) {
  // Get the URL for the Pokémon.
  let pokeDefaultFormUrl = pokemonSpecies.varieties[0].pokemon.url;

  // Handle any errors.
  try {
    // Fetch the data from the URL.
    const response = await fetch(pokeDefaultFormUrl);

    // Convert the response to JSON and return it.
    return await response.json();
  } catch (err) {
    console.error("Error fetching default form data", err); // If error, log to the console.
    return null; // Return null if there's an error.
  }
}
