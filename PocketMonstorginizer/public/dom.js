/**
 * Display Utilities
 *
 * This file provides functions for updating the webpage with details, such as name, image, category,
 * generation, and background color.
 *
 * Functions:
 * 1. updatePokeInfo(pokemonSpecies) - Updates the page with the Pokémon's name, description, ID, and generation.
 * 2. showPokeImage(imageUrl) - Renders the Pokémon's image on the page.
 * 3. findPokeGrouping(pokemonSpecies) - Displays whatever grouping the Pokémon falls in
 * 4  addSlashIfNeeded(string) - Adds a slash to the PokeGroup string in cases that a Pokemon falls into more than one group.
 * 5. changeColorOfBackground(color) - Changes the page's background color to match the Pokémon's color.
 */

// Helper function to Capitalize the first letter of a string to uppercase.
import { capitalize, normalizePokeName } from "./utils.js";

import { fetchDefaultFormData } from "./api.js";

import {getPokeColor, getPokeEggGroup1, getPokeEggGroup2, getPokeGenderRate,
		getPokeGeneration, getPokeShape, getPokeTypeA, getPokeTypeB,
		getIsBranching, getPokeEvoLineType, getPokeEvoStage
		} from "./getInfo.js";
		
import {isBaby, isEeveelution, isElectricRodent,
		isFossil, isLegend, isMythic,
		isParadox, isPseudoLegend, isStarter, isUltraBeast } from "./group.js";

/**
 * Updates the Pokémon information on the webpage.
 *
 * @param  pokemonSpecies   the data of the Pokémon.
 * @return none             updates the page with the Pokémon info; no return.
 */
export async function updatePokeInfo(pokemonSpecies) {
  // Update the Pokémon's name and capitalize the first letter.
  document.getElementById("PokeName").innerHTML = normalizePokeName(
    pokemonSpecies.name
  );

  // Render a short description.
  document.getElementById("PokeInfo").innerHTML =
    pokemonSpecies.flavor_text_entries[1].flavor_text;

  // Show the Pokémon's grouping.
  document.getElementById("Grouping").innerHTML =
    await findPokeGrouping(pokemonSpecies)// + " Pokémon";

  // Display the Pokémon's ID number, formatted to 3 digits.
  document.getElementById("IDNum").innerHTML =
    "#" + pokemonSpecies.id.toString().padStart(3, "0");

  // Display the generation of the Pokémon.
  document.getElementById("PokeGen").innerHTML = getPokeGeneration(pokemonSpecies);
  
  
  let defultPokemonForm = await fetchDefaultFormData(pokemonSpecies)
  // Display Pokémon's First type
  document.getElementById("TypeA").innerHTML = capitalize(getPokeTypeA(defultPokemonForm));
  
  // Display Pokémon's Second type
  document.getElementById("TypeB").innerHTML = getPokeTypeB(defultPokemonForm) != "" ? "/" + capitalize(getPokeTypeB(defultPokemonForm)) : "";
  

  // Display Pokémon's color
  document.getElementById("PokeColor").innerHTML = capitalize(getPokeColor(pokemonSpecies));
  
  // Display Pokémon's shape
  document.getElementById("PokeShape").innerHTML = capitalize(getPokeShape(pokemonSpecies));
  
  
  //Display Pokémon's gender rate
  document.getElementById("PokeGenderRate").innerHTML = getPokeGenderRate(pokemonSpecies);
  
  
  //Display Pokémon's First Egg Group
  document.getElementById("PokeEggGroup1").innerHTML = capitalize(getPokeEggGroup1(pokemonSpecies));
  
  //Display Pokémon's Second Egg Group
  document.getElementById("PokeEggGroup2").innerHTML = getPokeEggGroup2(pokemonSpecies) != "" ? "/" + capitalize(getPokeEggGroup2(pokemonSpecies)) : "";
  
  
  //Display if the Pokémon's evolution line is branching or linear
  document.getElementById("PokeEvoDoesBranch").innerHTML = await getIsBranching(pokemonSpecies);
  
  //Display Pokémon Stage of Evolution
  document.getElementById("PokeEvoStage").innerHTML = await getPokeEvoStage(pokemonSpecies);
  
  //Display Pokémon's type of Evolution Line
  document.getElementById("PokeEvoLineType").innerHTML = await getPokeEvoLineType(pokemonSpecies);
  
  
  }
  


/**
 * Displays the Pokémon's image on the webpage.
 *
 * @param  imageUrl   the URL of the image.
 * @return none       update page with the image; no return.
 */
export function showPokeImage(imageUrl) {
  // Get the image element.
  let pokeImg = document.getElementById("pokeImg");

  // Set the image element's source to the image URL.
  pokeImg.src = imageUrl;

  // Render image.
  pokeImg.style.display = "block";
}

/**
 * Returns a string representing the group/groups that the Pokémon belongs to
 * 
 * @param  pokemonSpecies	Given Pokémon Species
 * @return string			Group/Groups Pokémon Belongs to
 */
export async function findPokeGrouping(pokemonSpecies){
	let grouping = "";
	if (await isStarter(pokemonSpecies)){grouping = addSlashIfNeeded(grouping) + "First Partner"};
	if (await isLegend(pokemonSpecies)){grouping = addSlashIfNeeded(grouping) + "Legendary"};
	if (await isMythic(pokemonSpecies)){grouping = addSlashIfNeeded(grouping) + "Mythical"};
	if (await isUltraBeast(pokemonSpecies)){grouping = addSlashIfNeeded(grouping) + "Ultra Beast"}
	if (await isParadox(pokemonSpecies)){grouping = addSlashIfNeeded(grouping) + "Paradox"}
	if (await isFossil(pokemonSpecies)){grouping = addSlashIfNeeded(grouping) + "Fossil"};
	if (await isBaby(pokemonSpecies)){grouping = addSlashIfNeeded(grouping) + "Baby"};
	if (await isPseudoLegend(pokemonSpecies)){grouping = addSlashIfNeeded(grouping) + "Pseudo-Legendary"}
	if (await isEeveelution(pokemonSpecies)){grouping = addSlashIfNeeded(grouping) + "Eeveelution"};
	if (await isElectricRodent(pokemonSpecies)){grouping = addSlashIfNeeded(grouping) + "Electric Rodent"};
	if (grouping == ""){grouping += "Regular"};

	return grouping;
	
}

/**Adds a slash to the PokeGroup string in cases that a Pokemon falls into more than one group. */
function addSlashIfNeeded(string){
	return string == "" ? string : string + "/";
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
