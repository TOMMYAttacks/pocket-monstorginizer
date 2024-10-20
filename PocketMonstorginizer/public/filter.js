/**
 * Filtering
 * 
 * This script contains the code for filtering Pokémon into a pool to randomize
 */

/**An object with all the filters and their corisonding checkboxes */
export const filters = {
	Grouping : {
		regular : document.getElementById("regular"),
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
		Fairy: document.getElementById("eggMonster"),
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
		Fairy: document.getElementById("eggOtherMonster"),
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




