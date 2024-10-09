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
 * 11. getPokeEvoStage(pokemonSpecies) - Gets what stage of evolution this Pokemon is in.
 * 12. getIsBranching(pokemonSpecies) - Gets if this Pokémon is part of a branching evolution line or a linear evolution line. 
 * 13. getPokeEvoLineType(pokemonSpecies) - Gets what sort of evolution line this Pokemon's belongs to in terms of how many times it can evolve
 * 14. getPokeEvoChain(pokemonSpecies) - Gets the Pokemon's evolution chain as an object to be used by other functions.
 * 15. getPokeEvoChainMembers(pokemonSpecies) - Gets the Pokemon's evolution chain as an object to be used by other functions
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

/**Gets what stage of evolution the Pokemon is in.
 *
 * @param  pokemonSpecies	Given Pokémon Species
 * @return string			The Pokémon's current stage of evolution. 
 * 
 * @description	 			This function uses termanalogy from the Pokémon Tradeing Card Game;  
 *							Basic: The Pokémon hasn't evolved.
 * 							Stage 1: The Pokémon evolved once.
 * 							Stage 2: The Pokémon evolved twice.
 * @example  Pichu -> Basic, Pikachu -> stage 1, Raichu -> stage 2
 *
*/
export async function getPokeEvoStage(pokemonSpecies){
	//let evoChain = await getPokeEvoChain(pokemonSpecies);
	let evoChainMembers = getPokeEvoChainMembers(pokemonSpecies)
	
	let basicMember = (await evoChainMembers).basic
	let stage1Members = (await evoChainMembers).stage1
	let stage2Members = (await evoChainMembers).stage2
	
	//console.log("Basic: " + basicMember)
	//console.log("Stage 1: " + stage1Members)
	//console.log("Stage 2: " + stage2Members)
	
	if(basicMember.includes(pokemonSpecies.name)){
		return "Basic"
	}
	else if (stage1Members.includes(pokemonSpecies.name)){
		return "Stage 1"
	}
	else if(stage2Members.includes(pokemonSpecies.name)){
		return "Stage 2"
	}
	else{
		return "Unknown Stage"
	}

}


/**Gets if this Pokémon is part of a branching evolution line or a linear evolution line. 
 *
 * @param  pokemonSpecies	Given Pokémon Species
 * @return string			Message stateing if its a branching evolution line or a linear evolution line. 
 * 
 * @description			Branching Evolution Line - the line contains a species that can evolve into two or more different other pokemon species. (e.g Eevee, Oddish, Slowpoke)
 * 						Linear Evolution Line - each Pokémon in the species can only evolve into at most one other Pokémon. (e.g. Mankey, Psyduck, Vulpix)
 *						Note: Pokemon who don't evolve at all are considered to be in a linear evolution line. (e.g. Miltank, Mewtwo, Aerodactyl)
 * 
*/
export async function getIsBranching(pokemonSpecies){
	
	let evoChainMembers = getPokeEvoChainMembers(pokemonSpecies)

	//let basicMember = (await evoChainMembers).basic
	let stage1Members = (await evoChainMembers).stage1
	let stage2Members = (await evoChainMembers).stage2
	
	if(stage1Members.length > 1 || stage2Members.length > 1){
		return "Branching Evolution Line"
	}
	else{
		return "Linear Evolution Line"
	}
	
}

/**Gets what sort of evolution line this Pokemon's belongs to in terms of how many times it can evolve
 *
 * @param  pokemonSpecies	Given Pokémon Species
 * @return string			What sort of evolution line the Pokémon belongs to.
 * 	
 * @description				No Evolution - The Pokémon's line can not evolve. (e.g. Miltank, Mewtwo, Aerodactyl)
 * 							Two-Stage Evolution - The Pokémon may evolve once in its line. (e.g. Meowth, Steelix, Flareon)
 * 							Theee-Stage Evolution - The Pokémon may evolve twice in its line. (e.g. Charmander, Clefairy, Bellossom)
*/
export async function getPokeEvoLineType(pokemonSpecies){
	let evoChain = await getPokeEvoChain(pokemonSpecies)
	let evoType = ""
	//console.log(pokemonSpecies.name + "'s Evo Chain");
	//console.log(evoChain);
	//console.log(evoChain.chain);
	//console.log(evoChain.chain.evolves_to);
	
	if (evoChain.chain.evolves_to.length == 0){
		evoType = "No Evolution";
	}
	else{
		if(evoChain.chain.evolves_to[0].evolves_to.length == 0){
			evoType = "Two-Stage Evolution";
		}
		else{
			evoType = "Three-Stage Evoluiton";
		}
	}
	//console.log(evoType);
	return evoType;
	
}

/**Gets the Pokemon's evolution chain as an object to be used by other functions
 * 
 * @param pokemonSpecies	Given Pokémon Species
 * @return url string		The PokeAPI url to the given Pokémon Species's evolution chain
 */
async function getPokeEvoChain(pokemonSpecies){
	try{
		let res = await fetch(pokemonSpecies.evolution_chain.url);
		let pokeEvoChain = await res.json();
		
		//console.log(pokeEvoChain);
		return pokeEvoChain;
	}
	catch{
		console.log("Opps! No chain!");
		
	}
		
}

/**Returns each member of the pokemon evolution chain, seperated by stage of evolution.
 * To be used by other functions.
 * 
 * @param pokemonSpecies	Given Pokémon Species
 * @return Object			The members of the Pokémon's evolution chain, seperated by evolution stage
 * 
 * @description Note: When calling you'll have to await for the values:  (await pokeEvoChainMembers).stage1 -> stage1)
 */
async function getPokeEvoChainMembers(pokemonSpecies){
	let evoChain = await getPokeEvoChain(pokemonSpecies);

	//Get a list of the names of every pokemon in each evo line
	let basicEvoLineMembers = [evoChain.chain.species.name]
	let stage1EvoLineMembers = [];
	let stage2EvoLineMembers = [];
	evoChain.chain.evolves_to.forEach(stage1Pokemon =>{
		stage1EvoLineMembers.push(stage1Pokemon.species.name);
		
		stage1Pokemon.evolves_to.forEach(stage2Pokemon =>{
			stage2EvoLineMembers.push(stage2Pokemon.species.name);
		})
	})

	let pokeEvoChainMembers = {
		basic : basicEvoLineMembers,
		stage1 : stage1EvoLineMembers,
		stage2 : stage2EvoLineMembers
	}
	
	return pokeEvoChainMembers;
	
}


