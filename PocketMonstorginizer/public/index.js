/**
 * Search
 *
 * This file handles searching a Pokémon by name, fetching data from the Pokémon API, and updating the webpage
 * with the Pokémon's details (name, image, description, and external links).
 *
 * Functions:
 *
 * 1. sanitizeText(text) - Sanitizes descriptions by removing problematic characters.
 * 2. handleSearch() - Fetches data, updates the page with the Pokémon's details, and sets external links.
 * 3. updateExternalLinks(pokemonName) - Updates Bulbapedia and Smogon links for the searched Pokémon.
 * 4. Event Listeners:
 *    * Search button click and Enter key trigger the search.
 */

// Fetch data from the PokeAPI.
import { fetchPokemonData, fetchDefaultFormData } from "./api.js";
import { specialPokeName } from "./utils.js";

// Updates the page with fetched data, displays the image, and changes the background color based on the Pokémon's color.
import {
  updatePokeInfo,
  showPokeImage,
  changeColorOfBackground,
} from "./dom.js";

/**
 * Removes any hidden characters from rendering to the page.
 *
 * @param text The original text from the API.
 * @return The sanitized text without form feed characters.
 */
function sanitizeText(text) {
  // Replaces any \f (form feed) characters with a space. \f is a page breaking ASCII character.
  return text.split("\f").join(" ");
}

// Get the search button element from the page.
const searchButton = document.getElementById("enter");

// Get the text box element.
const pokeSearch = document.getElementById("PokeSearch");

/**
 * Handles the search function, fetches the data from the API, updates the page with the details,
 * and sets the image and links.
 *
 * @return none
 */
async function handleSearch() {
  // Get the Pokémon name, convert it to lowercase.
  let target = specialPokeName(pokeSearch.value.toLowerCase());

  // Fetch the data.
  let pokemonSpecies = await fetchPokemonData(target);

  // If successful
  if (pokemonSpecies) {
    // Update the page with the information (name, ID, etc.).
    updatePokeInfo(pokemonSpecies);

    // Get the description for the from the API data.
    let rawText = pokemonSpecies.flavor_text_entries[1].flavor_text;

    // Clean up the text to render without any problematic characters.
    let sanitizedText = sanitizeText(rawText);

    // Set the sanitized text to be rendered on the page.
    document.getElementById("PokeInfo").innerHTML = sanitizedText;

    // Fetch the default form data, which contains the image.
    let pokeDefaultForm = await fetchDefaultFormData(pokemonSpecies);

    // Display the image on the page.
    showPokeImage(pokeDefaultForm.sprites.front_default);

    // Get the Pokémon's color from the data and change the background of the page to match the color.
    let pokeColor = pokemonSpecies.color.name;
    changeColorOfBackground(pokeColor);

    // Get the name of the Pokémon from the API and update the Bulbapedia and Smogon links.
    const pokemonName = pokemonSpecies.name;
    updateExternalLinks(pokemonName); // Set the links based on the Pokémon's name.
  } else {
    // If no data was found, show an alert.
    alert("Pokemon not found!");
  }
}

// Listen for the search button click, run the search.
searchButton.addEventListener("click", handleSearch);

/**
 * Handles when the Enter key press.
 * Prevents the page from default action reloading, and runs the search.
 *
 * @param event The key press event.
 * @return None.
 */
pokeSearch.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    // If the Enter key is pressed.
    event.preventDefault(); // Prevent the browser from doing anything.
    handleSearch(); // Run the search.
  }
});

/**
 * Updates the Bulbapedia and Smogon links based on the Pokémon's name.
 *
 * @param  pokemonName   the name of the Pokémon.
 * @return none          doesn't return a value; it updates the web page with the new URLs.
 */
function updateExternalLinks(pokemonName) {
  // Create the URL for Bulbapedia using the Pokémon name.
  const bulbapediaURL = `https://bulbapedia.bulbagarden.net/wiki/${pokemonName}`;

  // Find the Bulbapedia link element and set its href to the Bulbapedia URL.
  document.getElementById("BulbaLink").href = bulbapediaURL;

  // Set the visible text of the Bulbapedia link to display the URL.
  document.getElementById("BulbaLink").innerHTML = bulbapediaURL;

  // Create the Smogon URL
  const smogonURL = `https://www.smogon.com/dex/sv/pokemon/${pokemonName.toLowerCase()}/`;

  // Find the Smogon link element and set its href to the Smogon URL.
  document.getElementById("SmogLink").href = smogonURL;

  // Display the URL.
  document.getElementById("SmogLink").innerHTML = smogonURL;
}
