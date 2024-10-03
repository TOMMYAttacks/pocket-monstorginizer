/**
 * Pocket Monsorginizer
 * Poke Search
 * 
 * This script contains and demonstraits all the functions required to find particular traits on a pokemon species,
 * such as its name, reginal dex number, typeing(of its default form), egg groups, what evolution stage it is in, and more.
 * This script also generates links to the pokemon's bulbapedia and smogon pages, allowing users to further reasearch the pokemon given.
 * The functions in this script will be used in the main app, where we can filter pokemon based on these atributes and disyplay this information.
 * 
 * This informaion is drawn from the PokeAPI, a free to use database for pokemon inforation.
 * https://pokeapi.co/
 * 
 * 
 * 
 * 
 */

let pokeName = document.getElementById("PokeName");
let pokeInfo = document.getElementById("PokeInfo");

let pokeImg = document.getElementById("PokeImg")

let pokeTypeA = document.getElementById("TypeA");
let pokeTypeB = document.getElementById("TypeB");

let pokeGrouping = document.getElementById("Grouping")

let pokeIDNum = document.getElementById("IDNum");
let pokeGen = document.getElementById("PokeGen");

let pokeEvoStage = document.getElementById("PokeEvoStage");
let pokeEvoLineType = document.getElementById("PokeEvoLineType");
let pokeEvoDoesBranch = document.getElementById("PokeEvoDoesBranch");

let pokeColor = document.getElementById("PokeColor");
let pokeShape = document.getElementById("PokeShape");
let pokeEggGroup1 = document.getElementById("PokeEggGroup1");
let pokeEggGroup2 = document.getElementById("PokeEggGroup2");
let pokeGenderRate = document.getElementById("PokeGenderRate");

let searchButton = document.getElementById("enter");
let pokeSearch = document.getElementById("PokeSearch");

let linkBulba = document.getElementById("BulbaLink");
let linkSmog = document.getElementById("SmogLink");

searchButton.addEventListener("click", function(){searchPokemon()})

/**Searches the PokeAPI for the Pokemon requested and returns any information on that pokemon species*/
async function searchPokemon(){
	let target = (pokeSearch.value).toLowerCase();
	//alert(target);

	let targetAPIReady = validatePokeName(target);
	//alert(targetAPIReady);
	let targetBulbaReady = bulbapediaPokeName(normalizePokeName(target));
	
	
	//fetch('https://pokeapi.co/api/v2/pokemon/' + targetAPIReady) //Fetch the paricuar info from the API
	//console.log('https://pokeapi.co/api/v2/pokemon-species/' + targetAPIReady)
	fetch('https://pokeapi.co/api/v2/pokemon-species/' + targetAPIReady) //Fetch the paricuar info from the API
		.then(res => res.json()) //Turn that responce into a json file (we can use that!)
		.then(async pokemonSpecies => {
			console.log(pokemonSpecies)
			console.log(pokemonSpecies.name)
			
			pokeName.innerHTML = normalizePokeName(pokemonSpecies.name);
			
			//let pokeInfoEntrys = pokemon.species[0].flavor_text_entries;
			//pokeInfoEntrys = JSON.parse(pokeInfoEntrys);
			
			
			//console.log(pokemon.species.url);
			
			pokeInfo.innerHTML = pokemonSpecies.flavor_text_entries[1].flavor_text;
			
			pokeGrouping.innerHTML = findPokeGrouping(pokemonSpecies);
			
			pokeIDNum.innerHTML = "#" + (getPokeID(pokemonSpecies)).toString().padStart(3,"0");
			pokeGen.innerHTML = formatPokeGeneration(getPokeGeneration(pokemonSpecies));
			
			pokeEvoStage.innerHTML = await getPokeEvoStage(pokemonSpecies);
			pokeEvoLineType.innerHTML = await  getPokeEvoLineType(pokemonSpecies);
			pokeEvoDoesBranch.innerHTML = await getIsBranching(pokemonSpecies);


			pokeColor.innerHTML = captalize(getPokeColor(pokemonSpecies));
			pokeShape.innerHTML = captalize(getPokeShape(pokemonSpecies));
			pokeGenderRate.innerHTML = getPokeGenderRate(pokemonSpecies);
			
			pokeEggGroup1.innerHTML = captalize(getPokeEggGroup1(pokemonSpecies));
			if(getPokeEggGroup2(pokemonSpecies) != ""){
				pokeEggGroup2.innerHTML = "/" + captalize(getPokeEggGroup2(pokemonSpecies));
			}
			else{
				pokeEggGroup2.innerHTML = "";
			}
			
			//Just for fun, changes the color of the background based on the pokemon's color
			changeColorOfBackground(getPokeColor(pokemonSpecies));
			
			//The default form of the pokemon (not its reginal varient or something) we use this to find info on its typeing and sprites
			let pokeDefaultForm  = pokemonSpecies.varieties[0].pokemon.url;
			
			displayPokeImage(pokeDefaultForm);

			
			fetch(pokeDefaultForm)
				.then (res => res.json())
				.then (pokeDefault => {
					
					//pokeDefault.types.forEach((slot) => { alert(slot.type.name) });
					console.log(pokeDefault)
					
					pokeTypeA.innerHTML = captalize(getPokeTypeA(pokeDefault));
					if(getPokeTypeB(pokeDefault) != ""){
						pokeTypeB.innerHTML = "/" + captalize(getPokeTypeB(pokeDefault));
					}
					else{pokeTypeB.innerHTML = ""}
					
					//console.log(pokeDefaultForm.sprites.front_default)
					
					//pokeImg.src = pokeDefaultForm.sprites.front_default;
					//pokeImg.style.display = "block";
					
				
				})
			
			
			
			
			
			linkBulba.innerHTML = "https://bulbapedia.bulbagarden.net/wiki/" + targetBulbaReady;
			linkBulba.href = "https://bulbapedia.bulbagarden.net/wiki/" + targetBulbaReady;
			linkSmog.innerHTML = "https://www.smogon.com/dex/sv/pokemon/" + targetAPIReady;
			linkSmog.href = "https://www.smogon.com/dex/sv/pokemon/" + targetAPIReady;
			
			
			
		})
		.catch(err => {
				alert("Mosnter not found! " + err)
				pokeName.innerHTML = "MissingNo.";
				pokeImg.src = "";
				pokeImg.style.display = "none"
				pokeInfo.innerHTML = "Error. Pokémon Not found. (Have you misspelled something?) Please input a new name!"
				pokeTypeA.innerHTML = "???";
				pokeTypeB.innerHTML = "?";
				pokeIDNum.innerHTML = "#000";
				pokeGrouping.innerHTML = "???";
				pokeColor.innerHTML = "???";
				pokeShape.innerHTML  = "???";
				pokeEggGroup1.innerHTML  = "??";
				pokeEggGroup2.innerHTML  = "?";
				pokeGenderRate.innerHTML  = "???";
				pokeGen.innerHTML = "?????";
				pokeEvoStage.innerHTML = "????";
				pokeEvoLineType.innerHTML = "????";
				
				linkBulba.innerHTML = "";
				linkSmog.innerHTML = "";
				
				//changeColorOfBackground("#29adff");
				changeColorOfBackground("default");

		});

	
};

/**Changes the color of the background based on the Pokemon's main color.
To make sure the text pops out, the colors are manualy set to more saturated shades then the default html colors.*/
function changeColorOfBackground(color){
	let newColor = "";
	
	switch (color){
		case "red":
			newColor = "#ed5555"; break;
		case "blue":
			newColor = "#4daff0"; break;
		case "yellow":
			newColor = "#fcff4f"; break;
		case "green":
			newColor = "#5fcf5f"; break;
		case "black":
			newColor = "#808080"; break;
		case "brown":
			newColor = "#a6695b"; break;
		case "purple":
			newColor = "#8b5da6"; break;
		case "gray":
			newColor = "#b5b0b0"; break;
		case "white":
			newColor = "#fcfcfc"; break;
		case "pink":
			newColor = "#ffccd5"; break;
		default:
			newColor = "#aae1e1";
	}
	
	document.body.style.backgroundColor = newColor;
}


//------------------------------------


//Gets the image of the Pokemon
//It uses an async function to give it time to load in the image
async function displayPokeImage(pokemonLink){
	try{
		const res = await fetch(pokemonLink);
		const pokemon = await res.json();
		const imgElem = getPokeImage(pokemon);
		
		pokeImg.src = imgElem;
		pokeImg.style.display = "block"; 
	}
	catch{
		console.log("Opps! No image!");
		
	}
	
}

/**Returns an image of the Pokemon*/
function getPokeImage(pokemon){
	return pokemon.sprites.front_default
}

/**Makes sure the target name is usable for the API by removeing any unexepted characters and replaceing the space with a hyphen*/
function validatePokeName(target){

	
	//Remove any parts that arn't a character or a space
	for(let i = 0; i < target.length; i++){
		let testChar = target.charAt(i);
		if(testChar != ' ' && testChar != '2' && !(testChar >= 'a'&& testChar <= 'z' || testChar >= 'A' && testChar <= "Z") ){
			target = target.substring(0,i) + target.substring(i + 1);
			i--; 
		}
	}
	
	if(target.includes(" ")){
		let spaceIndex = target.indexOf(" ")
		target = target.substring(0,spaceIndex) + "-" + target.substring(spaceIndex + 1);
	}
	
	return target;
}

/**Makes the target Pokemon name useable in for a Bulbapedia link*/
function bulbapediaPokeName(target){
	if(target.includes(" ")){
		let spaceIndex = target.indexOf(" ")
		target = captalize(target.substring(0,spaceIndex)) + "_" + captalize(target.substring(spaceIndex + 1));
	}
	return target;
}

/**Captalizes a string, setting its first character to uppercase */
function captalize(string){
	return (string.charAt(0) + "").toUpperCase() + string.substring(1);
}

/**Takes the Pokemon's name from the PokeAPI and returns the Pokemon's name as how it's written normally.
 * This includes captalizeing all sections of the name, as well as adding any non letter/number characters.
 * (e.g., pikachu -> Pikachu, great-tusk -> Great Tusk, ho-oh -> Ho-Oh)
*/
function normalizePokeName(target){
	//These pokemon already have hyphens in their names
	const hyphenExceptions = [ "ho-oh", "porygon-z", "jangmo-o", "hakamo-o", "kommo-o", "ting-lu", "chien-pao", "wo-chien", "chi-yu"];
	if(target.includes("-")){
		//Remove the hypthens (if they wern't already there) and replace them with spaces.
		if(!hyphenExceptions.includes(target)){//If the target isn't one of the exceptions
			let spaceIndex = target.indexOf("-");
			target = captalize(target.substring(0,spaceIndex)) + " " + captalize(target.substring(spaceIndex + 1));
		}
		else{
			//In all cases other then the kommo-o line, both sides will need to be captalized
			if(target != "jangmo-o" && target != "hakamo-o" && target != "kommo-o"){
				let spaceIndex = target.indexOf("-");
				target = captalize(target.substring(0,spaceIndex)) + "-" + captalize(target.substring(spaceIndex + 1));
			}
		}
	}
	target = captalize(target);
	target = correctPokeName(target);
	
	
	return target;
}

/**Used as part of normalizePokeName().
 * In some cases, the Pokemon's name will have to have punctuation or the like added in to be accurate.
 * This function will return the corrected spelling of the Pokemon name in these cases.
 */
function correctPokeName(target){
	const namesWithoutPeriod = ["Mime Jr", "Mr Mime", "Mr Rime"]
	const namesWithPeriod = ["Mime Jr.", "Mr. Mime", "Mr. Rime"]
	
	const namesWithoutApostrophe = ["Farfetchd","Sirfetchd"]
	const namesWithApostrophe = ["Farfetch'd","Sirfetch'd"]
	
	const namesWithoutDiacritic = ["Flabebe"]
	const namesWithDiacritic = ["Flabébé"]
	
	const namesWithoutGenderSymbol = ["Nidoran F", "Nidoran M"]
	const namesWithGenderSymbol = ["Nidoran♀", "Nidoran♂"]
	
	const namesWithoutColon = ["Type Null"]
	const namesWithColon = ["Type: Null"]
	
	const namesWithoutExtraCharacters = [namesWithoutPeriod,namesWithoutApostrophe,namesWithoutDiacritic,namesWithoutGenderSymbol,namesWithoutColon]
	const namesWithExtraCharacters = [namesWithPeriod,namesWithApostrophe,namesWithDiacritic,namesWithGenderSymbol,namesWithColon]
	
	for(let i = 0; i < namesWithoutExtraCharacters.length; i++){
		for(let j = 0; j < namesWithoutExtraCharacters[i].length; j++){
			if ( target == namesWithoutExtraCharacters[i][j]){
				target = namesWithExtraCharacters[i][j]
			}
			
		}
	}
	
	return target;
}

/**Returns the id number of the Pokemon -- i.e., its National Pokédex Number */
function getPokeID(pokemonSpecies){
	return pokemonSpecies.id;
}

/**Returns the primary type of the Pokemon -- i.e., the type in its first slot*/
function getPokeTypeA(pokemon){
	return pokemon.types[0].type.name;
}

/**Returns the secondary type of the Pokemon -- i.e., the type in its second slot -- if there is one*/
function getPokeTypeB(pokemon){
	return pokemon.types.length == 2 ? pokemon.types[1].type.name : "";
}


/**Returns the first listed egg group of the Pokemon*/
function getPokeEggGroup1(pokemonSpecies){
	return updateEggGroupName(pokemonSpecies.egg_groups[0].name);
}

/**Returns the second listed egg group of the Pokemon, if there is one*/
function getPokeEggGroup2(pokemonSpecies){
	return pokemonSpecies.egg_groups.length == 2 ? updateEggGroupName(pokemonSpecies.egg_groups[1].name): "";
}

/**Used as part of getPokeEggGroup1 and getPokeEggGroup2.
 * In cases when the API's name of an egg group is outdated from modern termanaligy,
 * updates the given egg group name to its current name*/
function updateEggGroupName(EggGroup){
	switch (EggGroup){
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
			return EggGroup;
	}
}


/**Gets the gender rate of the Pokemon, returning a message representing that rate of males vs females of the Pokemon*/
function getPokeGenderRate(pokemonSpecies){
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

/**Returns the main color of the Pokemon*/
function getPokeColor(pokemonSpecies){
	return pokemonSpecies.color.name;
}

/**Returns the shape of the Pokemon*/
function getPokeShape(pokemonSpecies){
	return pokemonSpecies.shape.name;
}

/**Returns the generation that the Pokemon was introduced in*/
function getPokeGeneration(pokemonSpecies){
	return pokemonSpecies.generation.name;
}

/**Returns the given generation name formated to a more standard style.
*(e.g., generation-vi -> Generation VI)*/
function formatPokeGeneration(genName){
	let spaceIndex = genName.indexOf("-");
	return captalize(genName.substring(0,spaceIndex)) + " " + genName.substring(spaceIndex + 1).toUpperCase();
}

/**Returns what stage of evolution this Pokemon is in.
*It uses TCG termanalogy. (e.g., pichu -> basic, pikachu -> stage 1, raichu -> stage 2)
*This is an async function, as to give it time to get the evolution chain link from the API.*/
async function getPokeEvoStage(pokemonSpecies){
	//let evoChain = await getPokeEvoChain(pokemonSpecies);
	let evoChainMembers = getPokeEvoChainMembers(pokemonSpecies)
	
	let basicMember = (await evoChainMembers).basic
	let stage1Members = (await evoChainMembers).stage1
	let stage2Members = (await evoChainMembers).stage2
	
	console.log("Basic: " + basicMember)
	console.log("Stage 1: " + stage1Members)
	console.log("Stage 2: " + stage2Members)
	
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


/**Returns if this Pokemon is part of a branching evolution line or a linear evolution line*/
async function getIsBranching(pokemonSpecies){
	
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

/**Returns what sort of evolution line this Pokemon's evolution line is.
It uses an async function to give it time get the chain link*/
async function getPokeEvoLineType(pokemonSpecies){
	let evoChain = await getPokeEvoChain(pokemonSpecies)
	let evoType = ""
	console.log(pokemonSpecies.name + "'s Evo Chain");
	console.log(evoChain);
	console.log(evoChain.chain);
	console.log(evoChain.chain.evolves_to);
	
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
	console.log(evoType);
	return evoType;
	
}

/**Returns the Pokemon's evolution chain as an object to be used by other functions
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

/**Gets each member of the pokemon evolution chain, seperated by stage of evolution.
//Note: You'll have to await for the values:  (await pokeEvoChainMembers).stage1 -> stage1)*/
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

/**Returns a String representing what group or groups the Pokemon is catigorized in.*/
function findPokeGrouping(pokemonSpecies){
	let pokeGrouping = "" //No grouping
	if (isBaby(pokemonSpecies)){
		if (isElectricRodent(pokemonSpecies)){pokeGrouping = "Baby/Electric Rodent"}//Pichu is both a baby and an electric rodent.
		else{pokeGrouping = "Baby"}}
	else if (isLegend(pokemonSpecies)) {
		if (isParadox(pokemonSpecies)){pokeGrouping = "Legendary/Paradox"} // Koraidon and Miraidon are legendarys and paradoxes.
		else {pokeGrouping = "Legendary"}}
	else if (isMythic(pokeGrouping)) {pokeGrouping = "Mythical"}
	else if (isStarter(pokemonSpecies)){pokeGrouping = "First Partner"}
	else if (isPseudoLegend(pokemonSpecies)){pokeGrouping = "Pseudo-Legendary"}
	else if (isUltraBeast(pokemonSpecies)){pokeGrouping = "Ultra Beast"}
	else if (isParadox(pokemonSpecies)){pokeGrouping = "Paradox"}
	else if (isEeveelution(pokemonSpecies)){pokeGrouping = "Eeveelution"}
	else if (isElectricRodent(pokemonSpecies)){pokeGrouping = "Electric Rodent"}
	else {pokeGrouping = "Regular"}
	return pokeGrouping;
}

/**Is this Pokemon a baby Pokemon?*/
function isBaby(pokemonSpecies){
	return pokemonSpecies.is_baby
}

/**Is this Pokemon a legendary Pokemon? */
function isLegend(pokemonSpecies){
	//In some cases, the pokemon isn't correctly labled as a ledgendary, so we correct it here.
	const correctionList = ["Type Null"]
	return pokemonSpecies.is_legendary || correctionList.includes(normalizePokeName(pokemonSpecies.name))
}

/**Is this Pokemon a mythical Pokemon?*/
function isMythic(pokemonSpecies){
	return pokemonSpecies.is_mythical
}


/**Is this Pokemon a member of the First Parter Pokemon lines (Otherwise known as a Starter)?*/
function isStarter(pokemonSpecies){
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
						 
	return starterList.includes(captalize(pokemonSpecies.name))
}

/**Is this Pokemon a member of the Powerhouse Pokemon lines (Otherwise known as Pseudo-Legendary)?*/
function isPseudoLegend(pokemonSpecies){
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
	
	return pseudoLegendList.includes(captalize(pokemonSpecies.name))
}

/**Is this Pokemon an Ultra Beast?*/
function isUltraBeast(pokemonSpecies){
	const ultraBeastList = [ "Nihilego", "Buzzwole","Pheromosa",
							 "Xurkitree", "Celesteela", "Kartana",
							 "Guzzlord", "Poipole", "Naganadel",
							 "Stakataka", "Blacephalon" ];
							
	return ultraBeastList.includes(captalize(pokemonSpecies.name))
}

/**Is this Pokemon a Paradox Pokemon?*/
function isParadox(pokemonSpecies){
	const paradoxList = [	"Great Tusk", "Scream Tail", "Brute Bonnet",
							"Flutter Mane", "Slither Wing", "Sandy Shocks",
							"Iron Treads", "Iron Bundle", "Iron Hands",
							"Iron Jugulis", "Iron Moth", "Iron Thorns",
							"Roaring Moon", "Iron Valiant", "Walking Wake",
							"Iron Leaves", "Gouging Fire", "Raging Bolt",
							"Iron Boulder", "Iron Crown", "Koraidon", "Miraidon" ];
							
	return paradoxList.includes(normalizePokeName(pokemonSpecies.name))
}

/**Is this Pokemon a member of the Eevee line (Otherwise known as an Eeveelution)? */
function isEeveelution(pokemonSpecies){
	const eeveelutonList = [ 	"Eevee", "Vaporeon", "Jolteon", "Flareon",
								"Espeon", "Umbreon", "Leafeon", "Glaceon", "Sylveon"];
	
	return eeveelutonList.includes(captalize(pokemonSpecies.name))
}

/**Is this Pokemon an Electric Rodent -- i.e., an electric type who is a member of the Pikachu line or resembles Pikachu?*/
function isElectricRodent(pokemonSpecies){
	const electricRodentList = [	"Pikachu", "Raichu", "Pichu",
									"Plusle", "Minun", "Pachirisu",
									"Emolga", "Dedenne",//Raichu-Alola,
									"Togedemaru", "Morpeko",
									"Pawmi", "Pawmo", "Pawmot"];
									
	return electricRodentList.includes(captalize(pokemonSpecies.name))
}
