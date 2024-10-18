/**
 * 
 * Pokémon Randomizer
 * 
 * This script contains the functions used to randomly get a Pokémon for the randomizer.
 * It first goes through each possible Pokémon ID, then checks if the given Pokemon is a fits particular atributes baced on the filters.
 * If so, the Pokemon's is added to the draw pool.
 * When we ask for a random Pokémon, that Pokémon's id will be taken from the draw pool, and we will search for a Pokemon's using that ID.
 * 
 * 
 * 
 */


import * as ftrs from "./filter.js";

/**
 * Represents how many Pokémon Species there are. Each one has its own ID PokéAPI corisponding to its order in the National PokéDex
 */
const NUMBER_OF_POKEMON = 1025;

/**
 * The default filter code for when there is no Pokemon filtered out
 */
//const DEFAULT_FILTER_CODE = "11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
export const DEFAULT_FILTER_CODE = "ffffff ffffff ffffff ffffff ffffff f80000"

/**A code represnting what filters are active */
let filterCode = "";

/**The pool of Pokemon you are able to draw from */
let pokePool = [];

/**Test FilterCode */
let testFtrCode = "ffffff ffffff ff003f ffffff ffffff f80000"

/**Returns a random ID for a Pokémon without any filtering*/
export async function randomID() {

  return Math.floor(Math.random() * NUMBER_OF_POKEMON) + 1;
}

export async function filterdRandom(){
	
	console.log(document.getElementById("FilterCodeBox").value)
	
	filterCode = document.getElementById("FilterCodeBox").value
	
	if(filterCode == ""){
		filterCode = DEFAULT_FILTER_CODE;
		//console.log(filterCode);
	}
	
	//ftrs.applyFilterCode(filterCode);
	
	console.log(filterCode);
	
	
	let newFilterCode = await ftrs.generateFilterCode();
	//let newFilterCode = testFtrCode;
	console.log(newFilterCode);
	
	if(newFilterCode == filterCode){
		console.log("Filter Unchanged!");
	}
	else{
		filterCode = newFilterCode;
	}
	
	document.getElementById("FilterCodeBox").value = filterCode;
	
	if(filterCode == DEFAULT_FILTER_CODE){
		console.log("No Filters applyed!");
		return randomID();
	}
	else{
		pokePool = [1,2,3];
	}
	console.log(filterCode);
	
	return pokePool[Math.floor(Math.random() * pokePool.length)];
}


