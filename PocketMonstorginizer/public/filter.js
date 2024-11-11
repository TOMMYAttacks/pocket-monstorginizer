/**
 * Filtering
 * 
 * This script contains the code for filtering Pokémon into a pool to randomize
 */

import * as api from "./api.js";
import * as info from "./getInfo.js";
import * as group from "./group.js";

import { showFilteringProgress, setFilteringProgressLabel, updateFilteringProgress } from "./dom.js";

/**
 * Represents how many Pokémon Species there are. Each one has its own ID PokéAPI corisponding to its order in the National PokéDex
 */
export const NUMBER_OF_POKEMON = 1025;


/**An object with all the filters and their corisonding checkboxes */
export const filters = {
	Grouping : {
		regular : document.getElementById("regular"),
		firstPartner : document.getElementById("firstPartner"),
		baby : document.getElementById("baby"),
		eeveelution : document.getElementById("eeveelution"),
		electricRodent : document.getElementById("electricRodent"),
		fossil : document.getElementById("fossil"),
		pseudoLegendary : document.getElementById("pseudoLegendary"),
		legendary : document.getElementById("legendary"),
		mythical : document.getElementById("mythical"),
		ultraBeast : document.getElementById("ultraBeast"),
		paradox : document.getElementById("paradox")		
	},
	
	Generation :{
		I : document.getElementById("generationI"),
		II : document.getElementById("generationII"),
		III : document.getElementById("generationIII"),
		IV : document.getElementById("generationIV"),
		V : document.getElementById("generationV"),
		VI : document.getElementById("generationVI"),
		VII : document.getElementById("generationVII"),
		VIII : document.getElementById("generationVIII"),
		IX : document.getElementById("generationIX")
	},
	
	PrimaryType : {
		Normal: document.getElementById("primaryNormal"),
		Fire: document.getElementById("primaryFire"),
		Water: document.getElementById("primaryWater"),
		Grass: document.getElementById("primaryGrass"),
		Electric: document.getElementById("primaryElectric"),
		Bug: document.getElementById("primaryBug"),
		Poison: document.getElementById("primaryPoison"),
		Flying: document.getElementById("primaryFlying"),
		Rock: document.getElementById("primaryRock"),
		Ground: document.getElementById("primaryGround"),
		Fighting: document.getElementById("primaryFighting"),
		Psychic: document.getElementById("primaryPsychic"),
		Ghost: document.getElementById("primaryGhost"),
		Ice: document.getElementById("primaryIce"),
		Dragon: document.getElementById("primaryDragon"),
		Dark: document.getElementById("primaryDark"),
		Ice: document.getElementById("primaryIce"),
		Steel: document.getElementById("primarySteel"),
		Fairy: document.getElementById("primaryFairy")
	},
	
	SecondaryType :{
		Normal: document.getElementById("secondaryNormal"),
		Fire: document.getElementById("secondaryFire"),
		Water: document.getElementById("secondaryWater"),
		Grass: document.getElementById("secondaryGrass"),
		Electric: document.getElementById("secondaryElectric"),
		Bug: document.getElementById("secondaryBug"),
		Poison: document.getElementById("secondaryPoison"),
		Flying: document.getElementById("secondaryFlying"),
		Rock: document.getElementById("secondaryRock"),
		Ground: document.getElementById("secondaryGround"),
		Fighting: document.getElementById("secondaryFighting"),
		Psychic: document.getElementById("secondaryPsychic"),
		Ghost: document.getElementById("secondaryGhost"),
		Ice: document.getElementById("secondaryIce"),
		Dragon: document.getElementById("secondaryDragon"),
		Dark: document.getElementById("secondaryDark"),
		Steel: document.getElementById("secondarySteel"),
		Fairy: document.getElementById("secondaryFairy"),
		None: document.getElementById("secondaryNone")
	},
	
	Color : {
		Black: document.getElementById("colorBlack"),
		Blue: document.getElementById("colorBlue"),
		Brown: document.getElementById("colorBrown"),
		Gray: document.getElementById("colorGray"),
		Green: document.getElementById("colorGreen"),
		Pink: document.getElementById("colorPink"),
		Purple: document.getElementById("colorPurple"),
		Red: document.getElementById("colorRed"),
		White: document.getElementById("colorWhite"),
		Yellow: document.getElementById("colorYellow")
	},
	
	Shape : {
		Ball: document.getElementById("shapeBall"),
		Squiggle: document.getElementById("shapeSquiggle"),
		Fish: document.getElementById("shapeFish"),
		Arms: document.getElementById("shapeArms"),
		Blob: document.getElementById("shapeBlob"),
		Upright: document.getElementById("shapeUpright"),
		Legs: document.getElementById("shapeLegs"),
		Quadruped: document.getElementById("shapeQuadruped"),
		Wings: document.getElementById("shapeWings"),
		Tentacles: document.getElementById("shapeTentacles"),
		Heads: document.getElementById("shapeHeads"),
		Humanoid: document.getElementById("shapeHumanoid"),
		BugWings: document.getElementById("shapeBugWings"),
		Armor: document.getElementById("shapeArmor")
	},
	
	GenderRate : {
		maleOnly: document.getElementById("maleOnly"),
		normallyMale: document.getElementById("normallyMale"),
		usuallyMale: document.getElementById("usuallyMale"),
		evenMaleFemale: document.getElementById("evenMaleFemale"),
		usuallyFemale: document.getElementById("usuallyFemale"),
		normallyFemale: document.getElementById("normallyFemale"),
		femaleOnly: document.getElementById("femaleOnly"),
		genderUnknown: document.getElementById("genderUnknown")
	},
	
	EvoStage : {
		basic: document.getElementById("basic"),
		firstStage: document.getElementById("firstStage"),
		secondStage: document.getElementById("secondStage")
	},
	
	EvoLineType : {
		noEvolution: document.getElementById("noEvolution"),
		twoStageEvolution: document.getElementById("twoStageEvolution"),
		threeStageEvolution: document.getElementById("threeStageEvolution")
	},
	
	BranchingEvo: {
		branching: document.getElementById("branching"),
		linear: document.getElementById("linear")
	},
	
	EggGroup: {
		Monster: document.getElementById("eggMonster"),
		HumanLike: document.getElementById("eggHumanLike"),
		Water1: document.getElementById("eggWater1"),
		Water2: document.getElementById("eggWater2"),
		Water3: document.getElementById("eggWater3"),
		Bug: document.getElementById("eggBug"),
		Mineral: document.getElementById("eggMineral"),
		Flying: document.getElementById("eggFlying"),
		Amorphous: document.getElementById("eggAmorphous"),
		Field: document.getElementById("eggField"),
		Fairy: document.getElementById("eggFairy"),
		Grass: document.getElementById("eggGrass"),
		Dragon: document.getElementById("eggDragon"),
		Ditto: document.getElementById("eggDitto"),
		NoEggs: document.getElementById("eggNoEggs")
		
	},
	
	OtherEggGroup: {
		Monster: document.getElementById("eggOtherMonster"),
		HumanLike: document.getElementById("eggOtherHumanLike"),
		Water1: document.getElementById("eggOtherWater1"),
		Water2: document.getElementById("eggOtherWater2"),
		Water3: document.getElementById("eggOtherWater3"),
		Bug: document.getElementById("eggOtherBug"),
		Mineral: document.getElementById("eggOtherMineral"),
		Flying: document.getElementById("eggOtherFlying"),
		Amorphous: document.getElementById("eggOtherAmorphous"),
		Field: document.getElementById("eggOtherField"),
		Fairy: document.getElementById("eggOtherFairy"),
		Grass: document.getElementById("eggOtherGrass"),
		Dragon: document.getElementById("eggOtherDragon"),
		None: document.getElementById("eggOtherNone")
		
	}
	
};


/**Generates a filter code that represents which filters are on and which are off */
export async function generateFilterCode(){
	let code = "";
	
	let count = 0;
	Object.values(filters).forEach(filterGroup =>{
		Object.values(filterGroup).forEach(filter =>{
			code += filter.checked ? "1" : "0";
			count++;
			if(count % 24 == 0){
				code += " "}
		})
	});
	
	//console.log(parseInt(code));
	//console.log(parseInt(code,2));
	//console.log(parseInt(code,2).toString(16));
	
	//console.log(binaryStringToHex(code));
	//console.log(binaryStringToHex(code).replace(/ /g,""));
	


	return binaryStringToHex(code);
}

/**Applys a filter code  */
export async function applyFilterCode(code){
	
	console.log(code);
	
	
	if(code.length != 41){
		alert("Not a valid Filter Code! \n Must be 125 characters.");
		return;
	}
	
	for(let i = 0; i < code.replace(/ /g,"").length; i++){
		let testChar = code.replace(/ /g,"").charAt(i)
		if(testChar != " "){
			if( !(
			   (testChar >= "0" && testChar <= "9") ||
			   (testChar.toLowerCase() >= "a" && testChar.toLowerCase() <= "f"))) {
				alert("Not a valid Filter Code! \n Must be a series of hexidecimal numbers.");
				//console.log(testChar);
				//console.log("f".toLowerCase())
				return;
			}
		}
	}
	
	//console.log(hexStringToBinary(code));
	let binaryCode = hexStringToBinary(code).replace(/ /g,"");
	//console.log(binaryCode)
	
	
	let values = [];
	
	for(let i = 0; i < binaryCode.length; i++){
		
		switch(binaryCode.charAt(i)){
			case "0":
				values[i] = false; break;
			case "1":
				values[i] = true; break;
			default:
				alert("Not a valid Filter Code!\nMust contain only 1s and 0s.\n" + "Error char -> " + code.charAt(i));
				return;
		}
		
	}
	
	let item = 0;
	Object.values(filters).forEach(filterGroup =>{
		Object.values(filterGroup).forEach(filter =>{
			filter.checked = values[item];
			item++;
		})
	});
	return
}

/**If a false bool, apply the default filter code */
export async function applyDefaultFilterCode(){
	applyFilterCode("ffffff ffffff ffffff ffffff ffffff f80000");
}

/**Converts a string of binary chunks to hexadecimal */
function binaryStringToHex(binaryString){
	
	//console.log("------Binary To Hex Start-------")
	//console.log("input:" + binaryString);
	
	//Segment the string into 16 bit chuncks
	let chunks = 1;
	for(let i = 0; i < binaryString.length; i++){
		if(binaryString.charAt(i) == " "){
			chunks++;
		}
	}
	//console.log("chunkCount = " + chunks);

	
	let hexString = "";
	
	//Go through each chunk and translate them into hexidecimal
	for(let chunck = 0; chunck < chunks; chunck++){
		let currentChunk = binaryString.substr(chunck * (24 + 1), 24).padEnd(24,"0");
		//currentChunk = currentChunk.padEnd(24,"0"); //Adds 0s to end of last string if its less then the usual length
		//console.log("chunk " + chunck + ": " + currentChunk);
		//console.log(parseInt(currentChunk,2).toString(16));
		//console.log(parseInt(currentChunk,2).toString(16).padStart(6,"0"));
		
		hexString += parseInt(currentChunk,2).toString(16).padStart(6,"0") + " ";
	}
	//console.log(hexString.trim());
	//console.log("------Binary To Hex End-------")
	
	return hexString.trim();
	
}

/**Converts a string of hexadecimal chunks to binary */
function hexStringToBinary(hexString){
	
	//console.log("-------Hex to Binary Start------")
	//console.log("input:" + hexString);
	
	
	//Segment the string into 16 bit chuncks
	let chunks = 1;
	for(let i = 0; i < hexString.length; i++){
		if(hexString.charAt(i) == " "){
			chunks++;
		}
	}
	//console.log("chunkCount = " + chunks);
	
	//console.log(hexString);
	
	let binaryString = "";
	
	//Go through each chunk and translate them into binary
	for(let chunck = 0; chunck < chunks; chunck++){
		let currentChunk = hexString.substr(chunck * (6 + 1), 6).padEnd(6,"0");
		//currentChunk = currentChunk.padEnd(6,"0"); //Adds 0s to end of last string if its less then the usual length
		//console.log("chunk " + chunck + ": " + currentChunk);
		//console.log(parseInt(currentChunk,16).toString(2).padStart(24,"0"));
		
		binaryString += parseInt(currentChunk,16).toString(2).padStart(24,"0") + " ";
	}
	
	//console.log(binaryString.trim());
	//console.log("------Hex to Binary End-------")
	
	return binaryString.trim();
	
}


//--------------------------------------------------------------------

/**
 * Generates a new pool of pokemon to draw from based on the currently applyed filters
 */
export async function generateNewPokePool(){
	let newPokepool = [];
	
	let testPokemonSpecies;
	let testPokemonDefaultForm;
	
	let count = 0;

	showFilteringProgress(true);
	setFilteringProgressLabel("Filtering Pokémon...\n", true);
	
	for(let i = 1; i <= NUMBER_OF_POKEMON; i++){
		
		updateFilteringProgress(i - 1);
		
		testPokemonSpecies = await api.fetchPokemonData(i);
		
		console.log(i + " " + testPokemonSpecies);
		console.log(testPokemonSpecies);
		
		//Check pokemon's grouping
		
		if(!filters.Grouping.regular.checked){
			if(await group.isRegular(testPokemonSpecies)){
				//console.log("is this pokemon normal?" + await group.isRegular(testPokemonSpecies))
				//count++;
				continue;
			}
		}
		
		if(!filters.Grouping.firstPartner.checked){
			if(await group.isStarter(testPokemonSpecies)){
				continue;
			}
		}
		
		if(!filters.Grouping.legendary.checked){
			if(await group.isLegend(testPokemonSpecies)){
				continue;
			}
		}
		
		if(!filters.Grouping.mythical.checked){
			if(await group.isMythic(testPokemonSpecies)){
				continue;
			}
		}
		
		if(!filters.Grouping.pseudoLegendary.checked){
			if(await group.isPseudoLegend(testPokemonSpecies)){
				continue;
			}
		}
		
		if(!filters.Grouping.paradox.checked){
			if(await group.isParadox(testPokemonSpecies)){
				continue;
			}
		}
		
		if(!filters.Grouping.ultraBeast.checked){
			if(await group.isUltraBeast(testPokemonSpecies)){
				continue;
			}
		}
		
		if(!filters.Grouping.fossil.checked){
			if(await group.isFossil(testPokemonSpecies)){
				continue;
			}
		}
		
		
		if(!filters.Grouping.electricRodent.checked){
			if(await group.isElectricRodent(testPokemonSpecies)){
				continue;
			}
		}
		
		if(!filters.Grouping.baby.checked){
			if(await group.isBaby(testPokemonSpecies)){
				continue;
			}
		}
		
		if(!filters.Grouping.eeveelution.checked){
			if(await group.isEeveelution(testPokemonSpecies)){
				continue;
			}
		}
		
		//Check Pokemon's Generation
		
		
		if(!filters.Generation.I.checked){
			if(info.getPokeGeneration(testPokemonSpecies) == "Generation I"){
				continue;
			}
		}
		
		if(!filters.Generation.II.checked){
			if(info.getPokeGeneration(testPokemonSpecies) == "Generation II"){
				continue;
			}
		}
		
		if(!filters.Generation.III.checked){
			if(info.getPokeGeneration(testPokemonSpecies) == "Generation III"){
				continue;
			}
		}
		
		if(!filters.Generation.IV.checked){
			if(info.getPokeGeneration(testPokemonSpecies) == "Generation IV"){
				continue;
			}
		}
		
		if(!filters.Generation.V.checked){
			if(info.getPokeGeneration(testPokemonSpecies) == "Generation V"){
				continue;
			}
		}
		
		if(!filters.Generation.VI.checked){
			if(info.getPokeGeneration(testPokemonSpecies) == "Generation VI"){
				continue;
			}
		}
		
		if(!filters.Generation.VII.checked){
			if(info.getPokeGeneration(testPokemonSpecies) == "Generation VII"){
				continue;
			}
		}
		
		if(!filters.Generation.VIII.checked){
			if(info.getPokeGeneration(testPokemonSpecies) == "Generation VIII"){
				continue;
			}
		}
		
		if(!filters.Generation.IX.checked){
			if(info.getPokeGeneration(testPokemonSpecies) == "Generation IX"){
				continue;
			}
		}
		
		//Check Pokemon's color
		if(!filters.Color.Black.checked){
			if(info.getPokeColor(testPokemonSpecies) == "black"){
				continue;
			}
		}
		
		if(!filters.Color.Blue.checked){
			if(info.getPokeColor(testPokemonSpecies) == "blue"){
				continue;
			}
		}
		
		if(!filters.Color.Brown.checked){
			if(info.getPokeColor(testPokemonSpecies) == "brown"){
				continue;
			}
		}
		
		if(!filters.Color.Gray.checked){
			if(info.getPokeColor(testPokemonSpecies) == "gray"){
				continue;
			}
		}
		
		if(!filters.Color.Green.checked){
			if(info.getPokeColor(testPokemonSpecies) == "green"){
				continue;
			}
		}
		
		if(!filters.Color.Pink.checked){
			if(info.getPokeColor(testPokemonSpecies) == "pink"){
				continue;
			}
		}
		
		if(!filters.Color.Purple.checked){
			if(info.getPokeColor(testPokemonSpecies) == "purple"){
				continue;
			}
		}
		
		if(!filters.Color.Red.checked){
			if(info.getPokeColor(testPokemonSpecies) == "red"){
				continue;
			}
		}
		
		if(!filters.Color.White.checked){
			if(info.getPokeColor(testPokemonSpecies) == "white"){
				continue;
			}
		}
		
		if(!filters.Color.Yellow.checked){
			if(info.getPokeColor(testPokemonSpecies) == "yellow"){
				continue;
			}
		}
		
		//Check pokemon's shape
		
		if(!filters.Shape.Armor.checked){
			if(info.getPokeShape(testPokemonSpecies) == "armor"){
				continue;
			}
		}
		
		if(!filters.Shape.Arms.checked){
			if(info.getPokeShape(testPokemonSpecies) == "arms"){
				continue;
			}
		}
		
		if(!filters.Shape.Ball.checked){
			if(info.getPokeShape(testPokemonSpecies) == "ball"){
				continue;
			}
		}
		
		if(!filters.Shape.Blob.checked){
			if(info.getPokeShape(testPokemonSpecies) == "blob"){
				continue;
			}
		}
		
		if(!filters.Shape.BugWings.checked){
			if(info.getPokeShape(testPokemonSpecies) == "bug-wings"){
				continue;
			}
		}

		if(!filters.Shape.Fish.checked){
			if(info.getPokeShape(testPokemonSpecies) == "fish"){
				continue;
			}
		}
		
		if(!filters.Shape.Heads.checked){
			if(info.getPokeShape(testPokemonSpecies) == "heads"){
				continue;
			}
		}
		
		if(!filters.Shape.Humanoid.checked){
			if(info.getPokeShape(testPokemonSpecies) == "humanoid"){
				continue;
			}
		}
		
		if(!filters.Shape.Legs.checked){
			if(info.getPokeShape(testPokemonSpecies) == "legs"){
				continue;
			}
		}
		
		if(!filters.Shape.Quadruped.checked){
			if(info.getPokeShape(testPokemonSpecies) == "quadruped"){
				continue;
			}
		}
		
		if(!filters.Shape.Squiggle.checked){
			if(info.getPokeShape(testPokemonSpecies) == "squiggle"){
				continue;
			}
		}
		
		if(!filters.Shape.Tentacles.checked){
			if(info.getPokeShape(testPokemonSpecies) == "tentacles"){
				continue;
			}
		}
		
		if(!filters.Shape.Upright.checked){
			if(info.getPokeShape(testPokemonSpecies) == "upright"){
				continue;
			}
		}
		
		if(!filters.Shape.Wings.checked){
			if(info.getPokeShape(testPokemonSpecies) == "wings"){
				continue;
			}
		}
		
		//Get Gender Rate
		
		if(!filters.GenderRate.maleOnly.checked){
			if(info.getPokeGenderRate(testPokemonSpecies) == "Male Only (100% M, 0% F)"){
				continue;
			}
		}
		
		if(!filters.GenderRate.normallyMale.checked){
			if(info.getPokeGenderRate(testPokemonSpecies) == "Normally Male (87.5% M, 12.5% F)"){
				continue;
			}
		}
		
		if(!filters.GenderRate.usuallyMale.checked){
			if(info.getPokeGenderRate(testPokemonSpecies) == "Usually Male (75% M, 25% F)"){
				continue;
			}
		}
		
		if(!filters.GenderRate.evenMaleFemale.checked){
			if(info.getPokeGenderRate(testPokemonSpecies) == "Even Male or Female (50% M, 50% F)"){
				continue;
			}
		}
		
		if(!filters.GenderRate.usuallyFemale.checked){
			if(info.getPokeGenderRate(testPokemonSpecies) == "Usually Female (25% M, 75% F)"){
				continue;
			}
		}
		
		if(!filters.GenderRate.normallyFemale.checked){
			if(info.getPokeGenderRate(testPokemonSpecies) == "Normally Female (12.5% M, 87.5% F)"){
				continue;
			}
		}
		
		if(!filters.GenderRate.femaleOnly.checked){
			if(info.getPokeGenderRate(testPokemonSpecies) == "Female Only (0% M, 100% F)"){
				continue;
			}
		}
		
		if(!filters.GenderRate.genderUnknown.checked){
			if(info.getPokeGenderRate(testPokemonSpecies) == "Gender Unknown (0% M, 0% F)"){
				continue;
			}
		}
		
		//Check egg group
		
		if(!filters.EggGroup.Ditto.checked){
			if(info.getPokeEggGroup1(testPokemonSpecies) == "ditto"){
				continue;
			}
		}
		
		if(!filters.EggGroup.NoEggs.checked){
			if(info.getPokeEggGroup1(testPokemonSpecies) == "no eggs discovered"){
				continue;
			}
		}
		
		if(!filters.EggGroup.Amorphous.checked){
			if(info.getPokeEggGroup1(testPokemonSpecies) == "amorphous"){
				continue;
			}
		}
		
		if(!filters.EggGroup.Bug.checked){
			if(info.getPokeEggGroup1(testPokemonSpecies) == "bug"){
				continue;
			}
		}
		
		if(!filters.EggGroup.Dragon.checked){
			if(info.getPokeEggGroup1(testPokemonSpecies) == "dragon"){
				continue;
			}
		}
		
		if(!filters.EggGroup.Fairy.checked){
			if(info.getPokeEggGroup1(testPokemonSpecies) == "fairy"){
				continue;
			}
		}
		
		if(!filters.EggGroup.Field.checked){
			if(info.getPokeEggGroup1(testPokemonSpecies) == "field"){
				continue;
			}
		}
		
		if(!filters.EggGroup.Flying.checked){
			if(info.getPokeEggGroup1(testPokemonSpecies) == "flying"){
				continue;
			}
		}
		
		if(!filters.EggGroup.Grass.checked){
			if(info.getPokeEggGroup1(testPokemonSpecies) == "grass"){
				continue;
			}
		}
		
		if(!filters.EggGroup.HumanLike.checked){
			if(info.getPokeEggGroup1(testPokemonSpecies) == "human-like"){
				continue;
			}
		}
		
		if(!filters.EggGroup.Mineral.checked){
			if(info.getPokeEggGroup1(testPokemonSpecies) == "mineral"){
				continue;
			}
		}
		
		if(!filters.EggGroup.Monster.checked){
			if(info.getPokeEggGroup1(testPokemonSpecies) == "monster"){
				continue;
			}
		}
		
		if(!filters.EggGroup.Water1.checked){
			if(info.getPokeEggGroup1(testPokemonSpecies) == "water1"){
				continue;
			}
		}
		
		if(!filters.EggGroup.Water2.checked){
			if(info.getPokeEggGroup1(testPokemonSpecies) == "water2"){
				continue;
			}
		}
		
		if(!filters.EggGroup.Water3.checked){
			if(info.getPokeEggGroup1(testPokemonSpecies) == "water3"){
				continue;
			}
		}
		
		//Check other egg group
		if(!filters.OtherEggGroup.None.checked){
			if(info.getPokeEggGroup2(testPokemonSpecies) == ""){
				continue;
			}
		}
		
		if(!filters.OtherEggGroup.Amorphous.checked){
			if(info.getPokeEggGroup2(testPokemonSpecies) == "amorphous"){
				continue;
			}
		}

		if(!filters.OtherEggGroup.Bug.checked){
			if(info.getPokeEggGroup2(testPokemonSpecies) == "bug"){
				continue;
			}
		}

		if(!filters.OtherEggGroup.Dragon.checked){
			if(info.getPokeEggGroup2(testPokemonSpecies) == "dragon"){
				continue;
			}
		}

		if(!filters.OtherEggGroup.Fairy.checked){
			if(info.getPokeEggGroup2(testPokemonSpecies) == "fairy"){
				continue;
			}
		}

		if(!filters.OtherEggGroup.Field.checked){
			if(info.getPokeEggGroup2(testPokemonSpecies) == "field"){
				continue;
			}
		}

		if(!filters.OtherEggGroup.Flying.checked){
			if(info.getPokeEggGroup2(testPokemonSpecies) == "flying"){
				continue;
			}
		}

		if(!filters.OtherEggGroup.Grass.checked){
			if(info.getPokeEggGroup2(testPokemonSpecies) == "grass"){
				continue;
			}
		}

		if(!filters.OtherEggGroup.HumanLike.checked){
			if(info.getPokeEggGroup2(testPokemonSpecies) == "human-like"){
				continue;
			}
		}

		if(!filters.OtherEggGroup.Mineral.checked){
			if(info.getPokeEggGroup2(testPokemonSpecies) == "mineral"){
				continue;
			}
		}

		if(!filters.OtherEggGroup.Monster.checked){
			if(info.getPokeEggGroup2(testPokemonSpecies) == "monster"){
				continue;
			}
		}

		if(!filters.OtherEggGroup.Water1.checked){
			if(info.getPokeEggGroup2(testPokemonSpecies) == "water1"){
				continue;
			}
		}

		if(!filters.OtherEggGroup.Water2.checked){
			if(info.getPokeEggGroup2(testPokemonSpecies) == "water2"){
				continue;
			}
		}

		if(!filters.OtherEggGroup.Water3.checked){
			if(info.getPokeEggGroup2(testPokemonSpecies) == "water3"){
				continue;
			}
		}
		
		
		//Get branching evo
		if(!filters.BranchingEvo.branching.checked){
			if(await info.getIsBranching(testPokemonSpecies) == "Branching Evolution Line"){
				continue;
			}
		}
		
		if(!filters.BranchingEvo.linear.checked){
			if(await info.getIsBranching(testPokemonSpecies) == "Linear Evolution Line"){
				continue;
			}
		}
		
		//Get Evo Line type
		if(!filters.EvoLineType.noEvolution.checked){
			if(await info.getPokeEvoLineType(testPokemonSpecies) == "No Evolution"){
				continue;
			}
		}
		
		if(!filters.EvoLineType.twoStageEvolution.checked){
			if(await info.getPokeEvoLineType(testPokemonSpecies) == "Two-Stage Evolution"){
				continue;
			}
		}

		if(!filters.EvoLineType.threeStageEvolution.checked){
			if(await info.getPokeEvoLineType(testPokemonSpecies) == "Three-Stage Evoluiton"){
				continue;
			}
		}
		
		//Get Evo Stage
		
		if(!filters.EvoStage.basic.checked){
			if(await info.getPokeEvoStage(testPokemonSpecies) =="Basic"){
				continue;
			}
		}
		
		if(!filters.EvoStage.firstStage.checked){
			if(await info.getPokeEvoStage(testPokemonSpecies) =="Stage 1"){
				continue;
			}
		}
		
		if(!filters.EvoStage.secondStage.checked){
			if(await info.getPokeEvoStage(testPokemonSpecies) =="Stage 2"){
				continue;
			}
		}
		
		//Get Pokemon's primaty type
		
		testPokemonDefaultForm = await api.fetchDefaultFormData(testPokemonSpecies);
		
		if(!filters.PrimaryType.Bug.checked){
			if(await info.getPokeTypeA(testPokemonDefaultForm) == "bug"){
				continue;
			}
		}
		
		if(!filters.PrimaryType.Dark.checked){
			if(await info.getPokeTypeA(testPokemonDefaultForm) == "dark"){
				continue;
			}
		}
		
		if(!filters.PrimaryType.Dragon.checked){
			if(await info.getPokeTypeA(testPokemonDefaultForm) == "dragon"){
				continue;
			}
		}
		
		if(!filters.PrimaryType.Electric.checked){
			if(await info.getPokeTypeA(testPokemonDefaultForm) == "electric"){
				continue;
			}
		}
		
		if(!filters.PrimaryType.Fairy.checked){
			if(await info.getPokeTypeA(testPokemonDefaultForm) == "fairy"){
				continue;
			}
		}
		
		if(!filters.PrimaryType.Fighting.checked){
			if(await info.getPokeTypeA(testPokemonDefaultForm) == "fighting"){
				continue;
			}
		}
		
		if(!filters.PrimaryType.Fire.checked){
			if(await info.getPokeTypeA(testPokemonDefaultForm) == "fire"){
				continue;
			}
		}
		
		if(!filters.PrimaryType.Flying.checked){
			if(await info.getPokeTypeA(testPokemonDefaultForm) == "flying"){
				continue;
			}
		}
		
		if(!filters.PrimaryType.Ghost.checked){
			if(await info.getPokeTypeA(testPokemonDefaultForm) == "ghost"){
				continue;
			}
		}
		
		if(!filters.PrimaryType.Grass.checked){
			if(await info.getPokeTypeA(testPokemonDefaultForm) == "grass"){
				continue;
			}
		}
		
		if(!filters.PrimaryType.Ground.checked){
			if(await info.getPokeTypeA(testPokemonDefaultForm) == "ground"){
				continue;
			}
		}
		
		if(!filters.PrimaryType.Ice.checked){
			if(await info.getPokeTypeA(testPokemonDefaultForm) == "ice"){
				continue;
			}
		}
		
		if(!filters.PrimaryType.Normal.checked){
			if(await info.getPokeTypeA(testPokemonDefaultForm) == "normal"){
				continue;
			}
		}
		
		if(!filters.PrimaryType.Poison.checked){
			if(await info.getPokeTypeA(testPokemonDefaultForm) == "poison"){
				continue;
			}
		}
		
		if(!filters.PrimaryType.Psychic.checked){
			if(await info.getPokeTypeA(testPokemonDefaultForm) == "psychic"){
				continue;
			}
		}
		
		if(!filters.PrimaryType.Rock.checked){
			if(await info.getPokeTypeA(testPokemonDefaultForm) == "rock"){
				continue;
			}
		}
		
		if(!filters.PrimaryType.Steel.checked){
			if(await info.getPokeTypeA(testPokemonDefaultForm) == "steel"){
				continue;
			}
		}
		
		if(!filters.PrimaryType.Water.checked){
			if(await info.getPokeTypeA(testPokemonDefaultForm) == "water"){
				continue;
			}
		}
		
		
		//Get Pokemon's secondary type
		if(!filters.SecondaryType.Bug.checked){
			if(await info.getPokeTypeB(testPokemonDefaultForm) == "bug"){
				continue;
			}
		}

		if(!filters.SecondaryType.Dark.checked){
			if(await info.getPokeTypeB(testPokemonDefaultForm) == "dark"){
				continue;
			}
		}

		if(!filters.SecondaryType.Dragon.checked){
			if(await info.getPokeTypeB(testPokemonDefaultForm) == "dragon"){
				continue;
			}
		}

		if(!filters.SecondaryType.Electric.checked){
			if(await info.getPokeTypeB(testPokemonDefaultForm) == "electric"){
				continue;
			}
		}

		if(!filters.SecondaryType.Fairy.checked){
			if(await info.getPokeTypeB(testPokemonDefaultForm) == "fairy"){
				continue;
			}
		}

		if(!filters.SecondaryType.Fighting.checked){
			if(await info.getPokeTypeB(testPokemonDefaultForm) == "fighting"){
				continue;
			}
		}

		if(!filters.SecondaryType.Fire.checked){
			if(await info.getPokeTypeB(testPokemonDefaultForm) == "fire"){
				continue;
			}
		}

		if(!filters.SecondaryType.Flying.checked){
			if(await info.getPokeTypeB(testPokemonDefaultForm) == "flying"){
				continue;
			}
		}

		if(!filters.SecondaryType.Ghost.checked){
			if(await info.getPokeTypeB(testPokemonDefaultForm) == "ghost"){
				continue;
			}
		}

		if(!filters.SecondaryType.Grass.checked){
			if(await info.getPokeTypeB(testPokemonDefaultForm) == "grass"){
				continue;
			}
		}

		if(!filters.SecondaryType.Ground.checked){
			if(await info.getPokeTypeB(testPokemonDefaultForm) == "ground"){
				continue;
			}
		}

		if(!filters.SecondaryType.Ice.checked){
			if(await info.getPokeTypeB(testPokemonDefaultForm) == "ice"){
				continue;
			}
		}

		if(!filters.SecondaryType.Normal.checked){
			if(await info.getPokeTypeB(testPokemonDefaultForm) == "normal"){
				continue;
			}
		}

		if(!filters.SecondaryType.Poison.checked){
			if(await info.getPokeTypeB(testPokemonDefaultForm) == "poison"){
				continue;
			}
		}

		if(!filters.SecondaryType.Psychic.checked){
			if(await info.getPokeTypeB(testPokemonDefaultForm) == "psychic"){
				continue;
			}
		}

		if(!filters.SecondaryType.Rock.checked){
			if(await info.getPokeTypeB(testPokemonDefaultForm) == "rock"){
				continue;
			}
		}
		
		if(!filters.SecondaryType.None.checked){
			if(await info.getPokeTypeB(testPokemonDefaultForm) == ""){
				continue;
			}
		}

		
				
		
		
		//With all the filters done, add to the pokepool
		newPokepool.push(i);
	}
		
		
	console.log(newPokepool);
	
	setFilteringProgressLabel(newPokepool.length + " Pokémon found!\n")
	//console.log(count + " Pokemon are not regular!");
	return newPokepool
	
}











