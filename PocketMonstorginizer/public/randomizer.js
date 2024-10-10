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


/**
 * Represents how many Pokémon Species there are. Each one has its own ID PokéAPI corisponding to its order in the National PokéDex
 */
const NUMBER_OF_POKEMON = 1025;

/**Returns a random ID for a Pokémon*/
export async function randomID(){
	return Math.floor(Math.random() * NUMBER_OF_POKEMON) + 1
};