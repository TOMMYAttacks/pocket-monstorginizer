import * as utils from "./utils.js";

export async function isBaby(pokemonSpecies) {
  return pokemonSpecies.is_baby;
}

export async function isLegend(pokemonSpecies) {
  const correctionList = ["Type Null"];
  return (
    pokemonSpecies.is_legendary ||
    correctionList.includes(utils.normalizePokeName(pokemonSpecies.name))
  );
}

export async function isMythic(pokemonSpecies) {
  return pokemonSpecies.is_mythical;
}

export async function isStarter(pokemonSpecies) {
  const starterList = [
    "Bulbasaur",
    "Ivysaur",
    "Venusaur",
    "Charmander",
    "Charmeleon",
    "Charizard",
    "Squirtle",
    "Wartortle",
    "Blastoise",
    "Chikorita",
    "Bayleef",
    "Meganium",
    "Cyndaquil",
    "Quilava",
    "Typhlosion",
    "Totodile",
    "Croconaw",
    "Feraligatr",
    "Treecko",
    "Grovyle",
    "Sceptile",
    "Torchic",
    "Combusken",
    "Blaziken",
    "Mudkip",
    "Marshtomp",
    "Swampert",
    "Turtwig",
    "Grotle",
    "Torterra",
    "Chimchar",
    "Monferno",
    "Infernape",
    "Piplup",
    "Prinplup",
    "Empoleon",
    "Snivy",
    "Servine",
    "Serperior",
    "Tepig",
    "Pignite",
    "Emboar",
    "Oshawott",
    "Dewott",
    "Samurott",
    "Chespin",
    "Quilladin",
    "Chesnaught",
    "Fennekin",
    "Braixen",
    "Delphox",
    "Froakie",
    "Frogadier",
    "Greninja",
    "Rowlet",
    "Dartrix",
    "Decidueye",
    "Litten",
    "Torracat",
    "Incineroar",
    "Popplio",
    "Brionne",
    "Primarina",
    "Grookey",
    "Thwackey",
    "Rillaboom",
    "Scorbunny",
    "Raboot",
    "Cinderace",
    "Sobble",
    "Drizzile",
    "Inteleon",
    "Sprigatito",
    "Floragato",
    "Meowscarada",
    "Fuecoco",
    "Crocalor",
    "Skeledirge",
    "Quaxly",
    "Quaxwell",
    "Quaquaval",
  ];

  return starterList.includes(utils.capitalize(pokemonSpecies.name));
}

export async function isPseudoLegend(pokemonSpecies) {
  const pseudoLegendList = [
    "Dragonite",
    "Dragonair",
    "Dratini",
    "Tyranitar",
    "Pupitar",
    "Larvitar",
    "Salamence",
    "Shelgon",
    "Bagon",
    "Metagross",
    "Metang",
    "Beldum",
    "Garchomp",
    "Gabite",
    "Gible",
    "Hydreigon",
    "Zweilous",
    "Deino",
    "Goodra",
    "Sliggoo",
    "Goomy",
    "Kommo-o",
    "Hakamo-o",
    "Jangmo-o",
    "Dragapult",
    "Drakloak",
    "Dreepy",
    //"Goodra-Hisui", "Sliggoo-Hisui", "Goomy",
    "Baxcalibur",
    "Arctibax",
    "Frigibax",
  ];

  return pseudoLegendList.includes(utils.capitalize(pokemonSpecies.name));
}

export async function isUltraBeast(pokemonSpecies) {
  const ultraBeastList = [
    "Nihilego",
    "Buzzwole",
    "Pheromosa",
    "Xurkitree",
    "Celesteela",
    "Kartana",
    "Guzzlord",
    "Poipole",
    "Naganadel",
    "Stakataka",
    "Blacephalon",
  ];

  return ultraBeastList.includes(utils.capitalize(pokemonSpecies.name));
}

export async function isParadox(pokemonSpecies) {
  const paradoxList = [
    "Great Tusk",
    "Scream Tail",
    "Brute Bonnet",
    "Flutter Mane",
    "Slither Wing",
    "Sandy Shocks",
    "Iron Treads",
    "Iron Bundle",
    "Iron Hands",
    "Iron Jugulis",
    "Iron Moth",
    "Iron Thorns",
    "Roaring Moon",
    "Iron Valiant",
    "Walking Wake",
    "Iron Leaves",
    "Gouging Fire",
    "Raging Bolt",
    "Iron Boulder",
    "Iron Crown",
    "Koraidon",
    "Miraidon",
  ];

  return paradoxList.includes(utils.normalizePokeName(pokemonSpecies.name));
}

export async function isFossil(pokemonSpecies) {
  const fossilList = [
    "Omanyte",
    "Omastar",
    "Kabuto",
    "Kabutops",
    "Aerodactyl",
    "Lileep",
    "Cradily",
    "Anorith",
    "Armaldo",
    "Cranidos",
    "Rampardos",
    "Shieldon",
    "Bastidon",
    "Tirtouga",
    "Carracosta",
    "Archen",
    "Archeops",
    "Tyrunt",
    "Tyrantrum",
    "Amaura",
    "Aurorus",
    "Dracozolt",
    "Arctozolt",
    "Dracovish",
    "Arctovish",
  ];

  return fossilList.includes(utils.capitalize(pokemonSpecies.name));
}

export async function isEeveelution(pokemonSpecies) {
  const eeveelutonList = [
    "Eevee",
    "Vaporeon",
    "Jolteon",
    "Flareon",
    "Espeon",
    "Umbreon",
    "Leafeon",
    "Glaceon",
    "Sylveon",
  ];

  return eeveelutonList.includes(utils.capitalize(pokemonSpecies.name));
}

export async function isElectricRodent(pokemonSpecies) {
  const electricRodentList = [
    "Pikachu",
    "Raichu",
    "Pichu",
    "Plusle",
    "Minun",
    "Pachirisu",
    "Emolga",
    "Dedenne", //Raichu-Alola,
    "Togedemaru",
    "Morpeko",
    "Pawmi",
    "Pawmo",
    "Pawmot",
  ];

  return electricRodentList.includes(utils.capitalize(pokemonSpecies.name));
}

export async function isRegular(pokemonSpecies){
	return !(
		await isBaby(pokemonSpecies) ||
	 	await isEeveelution(pokemonSpecies) || 
		await isElectricRodent(pokemonSpecies) ||
		await isLegend(pokemonSpecies) ||
		await isMythic(pokemonSpecies) ||
		await isParadox(pokemonSpecies) ||
		await isPseudoLegend(pokemonSpecies) ||
		await isStarter(pokemonSpecies) ||
		await isFossil(pokemonSpecies) ||
		await isUltraBeast(pokemonSpecies) 
 )
}
