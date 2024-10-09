/**
 * 
 * Pokémon Groups
 * 
 * This script has export functions for finding if a Pokémon Species is in a particular group.
 * All the export functions in this script return boolean values.
 * 
 * 
 * 
 */

import { capitalize, normalizePokeName } from "./utils.js";


/**Is this Pokémon a baby Pokémon?*/
export async function isBaby(pokemonSpecies){
	return pokemonSpecies.is_baby
}

/**Is this Pokémon a legendary Pokémon? */
export async function isLegend(pokemonSpecies){
	//In some cases, the pokemon isn't correctly labled as a ledgendary, so we correct it here.
	const correctionList = ["Type Null"]
	return pokemonSpecies.is_legendary || correctionList.includes(normalizePokeName(pokemonSpecies.name))
}

/**Is this Pokémon a mythical Pokémon?*/
export async function isMythic(pokemonSpecies){
	return pokemonSpecies.is_mythical
}


/**Is this Pokémon a member of the First Parter Pokémon lines (Otherwise known as a Starter)?*/
export async function isStarter(pokemonSpecies){
	const starterList = ["Bulbasaur", "Ivysaur", "Venusaur",
						 "Charmander", "Charmeleon", "Charizard",
						 "Squirtle", "Wartortle", "Blastoise",
						 "Chikorita", "Bayleef", "Meganium",
						 "Cyndaquil", "Quilava", "Typhlosion",
						 "Totodile",  "Croconaw", "Feraligatr",
						 "Treecko", "Grovyle", "Sceptile",
						 "Torchic", "Combusken", "Blaziken",
						 "Mudkip", "Marshtomp", "Swampert",
						 "Turtwig", "Grotle", "Torterra",
						 "Chimchar", "Monferno", "Infernape",
						 "Piplup", "Prinplup", "Empoleon",
						 "Snivy", "Servine", "Serperior",
						 "Tepig", "Pignite", "Emboar",
						 "Oshawott", "Dewott", "Samurott",
						 "Chespin", "Quilladin", "Chesnaught",
						 "Fennekin", "Braixen", "Delphox",
						 "Froakie", "Frogadier", "Greninja",
						 "Rowlet", "Dartrix", "Decidueye",
						 "Litten", "Torracat", "Incineroar",
						 "Popplio", "Brionne", "Primarina",
						 "Grookey", "Thwackey", "Rillaboom",
						 "Scorbunny", "Raboot", "Cinderace",
						 "Sobble", "Drizzile", "Inteleon",
						 "Sprigatito", "Floragato", "Meowscarada",
						 "Fuecoco", "Crocalor", "Skeledirge",
						 "Quaxly", "Quaxwell", "Quaquaval"];
						 
	return starterList.includes(capitalize(pokemonSpecies.name))
}

/**Is this Pokémon a member of the Powerhouse Pokémon lines (Otherwise known as Pseudo-Legendary)?*/
export async function isPseudoLegend(pokemonSpecies){
	const pseudoLegendList = [	"Dragonite", "Dragonair", "Dratini",
								"Tyranitar", "Pupitar", "Larvitar",
								"Salamence", "Shelgon", "Bagon",
								"Metagross", "Metang", "Beldum",
								"Garchomp", "Gabite", "Gible",
								"Hydreigon", "Zweilous", "Deino",
								"Goodra", "Sliggoo", "Goomy",
								"Kommo-o", "Hakamo-o", "Jangmo-o",
								"Dragapult", "Drakloak", "Dreepy",
								//"Goodra-Hisui", "Sliggoo-Hisui", "Goomy",
								"Baxcalibur", "Arctibax", "Frigibax"];
	
	return pseudoLegendList.includes(capitalize(pokemonSpecies.name))
}

/**Is this Pokémon an Ultra Beast?*/
export async function isUltraBeast(pokemonSpecies){
	const ultraBeastList = [ "Nihilego", "Buzzwole","Pheromosa",
							 "Xurkitree", "Celesteela", "Kartana",
							 "Guzzlord", "Poipole", "Naganadel",
							 "Stakataka", "Blacephalon" ];
							
	return ultraBeastList.includes(capitalize(pokemonSpecies.name))
}

/**Is this Pokémon a Paradox Pokémon?*/
export async function isParadox(pokemonSpecies){
	const paradoxList = [	"Great Tusk", "Scream Tail", "Brute Bonnet",
							"Flutter Mane", "Slither Wing", "Sandy Shocks",
							"Iron Treads", "Iron Bundle", "Iron Hands",
							"Iron Jugulis", "Iron Moth", "Iron Thorns",
							"Roaring Moon", "Iron Valiant", "Walking Wake",
							"Iron Leaves", "Gouging Fire", "Raging Bolt",
							"Iron Boulder", "Iron Crown", "Koraidon", "Miraidon" ];
							
	return paradoxList.includes(normalizePokeName(pokemonSpecies.name))
}

/**Is this Pokémon a Fossil Pokémon? */
export async function isFossil(pokemonSpecies){
	const fossilList = [ 	"Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl",
							"Lileep", "Cradily", "Anorith", "Armaldo",
							"Cranidos", "Rampardos", "Shieldon", "Bastidon",
							"Tirtouga", "Carracosta", "Archen", "Archeops",
							"Tyrunt", "Tyrantrum", "Amaura", "Aurorus",
							"Dracozolt", "Arctozolt", "Dracovish", "Arctovish" ];
							
	return fossilList.includes(capitalize(pokemonSpecies.name))
}


/**Is this Pokémon a member of the Eevee line (Otherwise known as an Eeveelution)? */
export async function isEeveelution(pokemonSpecies){
	const eeveelutonList = [ 	"Eevee", "Vaporeon", "Jolteon", "Flareon",
								"Espeon", "Umbreon", "Leafeon", "Glaceon", "Sylveon"];
	
	return eeveelutonList.includes(capitalize(pokemonSpecies.name))
}

/**Is this Pokémon an Electric Rodent -- i.e., an electric type who is a member of the Pikachu line or resembles Pikachu?*/
export async function isElectricRodent(pokemonSpecies){
	const electricRodentList = [	"Pikachu", "Raichu", "Pichu",
									"Plusle", "Minun", "Pachirisu",
									"Emolga", "Dedenne", //Raichu-Alola,
									"Togedemaru", "Morpeko",
									"Pawmi", "Pawmo", "Pawmot"];
									
	return electricRodentList.includes(capitalize(pokemonSpecies.name))
}