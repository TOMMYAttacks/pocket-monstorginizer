/**
 * 
 * Get Information on a Pokémon
 * 
 * This file handles getting and returning particar infomation on a Pokémon or Pokémon species, such as its typeing, egg groups, shape, etc.
 * without the need to directy pull from the api.
 * 
 * 1. getPokeTypeA(pokemon) - Returns the primary type of the Pokémon -- i.e., the type in its first slot
 * 2. getPokeTypeB(pokemon) - Returns the secondary type of the Pokemon -- i.e., the type in its second slot -- if there is one
 * 3. getPokeEggGroup1(pokemonSpecies) - Returns the first listed egg group of the Pokemon
 * 4. getPokeEggGroup2(pokemonSpecies) - Returns the second listed egg group of the Pokemon, if there is one
 * 5. updateEggGroupName(eggGroup) - Updates the given egg group name to its current name in cases when the API's name of an egg group is outdated from modern termanaligy.
 * 6. getPokeGenderRate(pokemonSpecies) - Gets the gender rate of the Pokémon Species
 * 7. getPokeColor(pokemonSpecies) - Gets the main color of the Pokémon
 * 8. getPokeShape(pokemonSpecies) - Gets the shape of the Pokémon
 * 9. getPokeGeneration(pokemonSpecies) - Gets the generation that the Pokémon was introduced in
 * 10. formatPokeGeneration(genName) - Returns the given generation name formated to a more standard style. (e.g., generation-vi -> Generation VI) Used with getPokeGeneration
 * 
 * 
 */

import { capitalize } from "./utils.js";

/**Returns the primary type of the Pokémon -- i.e., the type in its first slot
 * 
 * @param  pokemon	Given Pokémon, idealy in its default form
 * @return string		The Pokémon's type in the first slot
*/
export function getPokeTypeA(pokemon){
	return pokemon.types[0].type.name;
}


/**Returns the secondary type of the Pokemon -- i.e., the type in its second slot -- if there is one
  *
  * @param  pokemon		Given Pokémon, idealy in its default form
  * @return string		The Pokémon's type in the second slot. If there isn't one, will return a blank string.
 */
export function getPokeTypeB(pokemon){
	return pokemon.types.length == 2 ? pokemon.types[1].type.name : "";
}

/**Returns the first listed egg group of the Pokemon
 * 
 * @param  pokemonSpecies		Given Pokémon Species
 * @return string				The Pokémon Species's first listed Egg Group.
 * 
*/
export function getPokeEggGroup1(pokemonSpecies){
	return updateEggGroupName(pokemonSpecies.egg_groups[0].name);
}

/**Returns the second listed egg group of the Pokemon, if there is one
 * 
 * @param  pokemonSpecies		Given Pokémon Species
 * @return string				The Pokémon Species's second listed Egg Group. If there isn't one, returns an empty string.
 * 
*/
export function getPokeEggGroup2(pokemonSpecies){
	return pokemonSpecies.egg_groups.length == 2 ? updateEggGroupName(pokemonSpecies.egg_groups[1].name): "";
}


/** 
 * Updates the given egg group name to its current name in cases when the API's name of an egg group is outdated from modern termanaligy.
 * 
 * @param  eggGroup		Name of Egg Group from the API.
 * @return string		Update to date name of the given Egg Group.
 */
function updateEggGroupName(eggGroup){
	switch (eggGroup){
		case "ground":
			return "field";
		case "plant":
			return "grass"
		case "indeterminate":
			return "amorphous";
		case "humanshape":
			return "human-like";
		case "no-eggs":
			return "no eggs discovered";
		default:
			return eggGroup;
	}
}

/**Gets the gender rate of the Pokémon Species.
 * 
 * @param  pokemonSpecies	Given Pokémon Species
 * @return string			A message representing the rate of males vs females of the Pokémon Species
 * 
 * */
export function getPokeGenderRate(pokemonSpecies){
	let rate = "";
	switch(pokemonSpecies.gender_rate){
		case 0:
			rate = "Male Only (100% M, 0% F)" ; break;
		case 1:
			rate = "Normally Male (87.5% M, 12.5% F)"; break;
		case 2:
		case 3:
			rate = "Usually Male (75% M, 25% F)"; break;
		case 4:
			rate = "Even Male or Female (50% M, 50% F)"; break;
		case 5:
		case 6:
			rate = "Usually Female (25% M, 75% F)"; break;
		case 7:
			rate = "Normally Female (12.5% M, 87.5% F)"; break;
		case 8:
			rate = "Female Only (0% M, 100% F)"; break;
		default:
			rate = "Gender Unknown (0% M, 0% F)"; break;
	}
	return rate;
}

/**Gets the main color of the Pokémon
 * 
 * @param  pokemonSpecies	Given Pokémon Species
 * @return string			The Pokémon Species's color
*/
export function getPokeColor(pokemonSpecies){
	return pokemonSpecies.color.name;
}

/**Gets the shape of the Pokémon
 * 
 * @param  pokemonSpecies	Given Pokémon Species
 * @return string			The Pokémon Species's shape
*/
export function getPokeShape(pokemonSpecies){
	return pokemonSpecies.shape.name;
}

/**Gets the generation that the Pokémon was introduced in
 * 
 * @param  pokemonSpecies	Given Pokémon Species
 * @return string			The Pokémon Species's debut generation, formated to a standard style
*/
export function getPokeGeneration(pokemonSpecies){
	return formatPokeGeneration(pokemonSpecies.generation.name);
}

/**Returns the given generation name formated to a more standard style. (e.g., generation-vi -> Generation VI) Used with getPokeGeneration
* @param  genName		Given generation name
* @return string		the generation name formated to a more modern style
*/
function formatPokeGeneration(genName){
	let spaceIndex = genName.indexOf("-");
	return capitalize(genName.substring(0,spaceIndex)) + " " + genName.substring(spaceIndex + 1).toUpperCase();
}


