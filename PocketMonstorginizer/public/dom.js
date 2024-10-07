/**
 * Display Utilities
 *
 * This file provides functions for updating the webpage with details, such as name, image, category,
 * generation, and background color.
 *
 * Functions:
 * 1. updatePokeInfo(pokemonSpecies) - Updates the page with the Pokémon's name, description, ID, and generation.
 * 2. showPokeImage(imageUrl) - Renders the Pokémon's image on the page.
 * 3. findPokeGrouping(pokemonSpecies) - Determines if the Pokémon is a "Baby" or "Regular" category.
 * 4. changeColorOfBackground(color) - Changes the page's background color to match the Pokémon's color.
 */

// Helper function to Capitalize the first letter of a string to uppercase.
import { capitalize } from "./utils.js";

/**
 * Updates the Pokémon information on the webpage.
 *
 * @param  pokemonSpecies   the data of the Pokémon.
 * @return none             updates the page with the Pokémon info; no return.
 */
export function updatePokeInfo(pokemonSpecies) {
  // Update the Pokémon's name and capitalize the first letter.
  document.getElementById("PokeName").innerHTML = capitalize(
    pokemonSpecies.name
  );

  // Render a short description.
  document.getElementById("PokeInfo").innerHTML =
    pokemonSpecies.flavor_text_entries[1].flavor_text;

  // Show the Pokémon's grouping.
  document.getElementById("Grouping").innerHTML =
    findPokeGrouping(pokemonSpecies);

  // Display the Pokémon's ID number, formatted to 3 digits.
  document.getElementById("IDNum").innerHTML =
    "#" + pokemonSpecies.id.toString().padStart(3, "0");

  // Display the generation of the Pokémon.
  document.getElementById("PokeGen").innerHTML = pokemonSpecies.generation.name;
}

/**
 * Displays the Pokémon's image on the webpage.
 *
 * @param  imageUrl   the URL of the image.
 * @return none       update page with the image; no return.
 */
export function showPokeImage(imageUrl) {
  // Get the image element.
  let pokeImg = document.getElementById("PokeImg");

  // Set the image element's source to the image URL.
  pokeImg.src = imageUrl;

  // Render image.
  pokeImg.style.display = "block";
}

/**
 * Determines the category or grouping the Pokémon belongs to.
 *
 * @param  pokemonSpecies   the data of the Pokémon's 'category.
 * @return string           returns the category name.
 */
function findPokeGrouping(pokemonSpecies) {
  // Check if the Pokémon is categorized as a baby, and return the category.
  return pokemonSpecies.is_baby ? "Baby Pokémon" : "Regular Pokémon";
}

/**
 * Changes the background color of the page based on the Pokémon's main color.
 *
 * @param  color   the main color of the Pokémon.
 * @return none    updates the page's background color; no return.
 */
export function changeColorOfBackground(color) {
  // Background color variable.
  let newColor = "";

  // Decide which background color to set based on the Pokémon's color.
  switch (color) {
    case "red":
      newColor = "#ed5555";
      break;
    case "blue":
      newColor = "#4daff0";
      break;
    case "yellow":
      newColor = "#fcff4f";
      break;
    case "green":
      newColor = "#5fcf5f";
      break;
    case "black":
      newColor = "#808080";
      break;
    case "brown":
      newColor = "#a6695b";
      break;
    case "purple":
      newColor = "#8b5da6";
      break;
    case "gray":
      newColor = "#b5b0b0";
      break;
    case "white":
      newColor = "#fcfcfc";
      break;
    case "pink":
      newColor = "#ffccd5";
      break;
    default:
      newColor = "#aae1e1";
  }

  // Render new background color.
  document.body.style.backgroundColor = newColor;
}
