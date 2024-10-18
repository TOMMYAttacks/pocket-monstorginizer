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
	
	//Object.keys(filters).forEach(filterGroup => {
	//	Object.keys(filterGroup).forEach(filter => {
			//code += filters[filterGroup][filter].checked ? "1" : "0";
	//	})
	//});
	let count = 0;
	Object.values(filters).forEach(filterGroup =>{
		Object.values(filterGroup).forEach(filter =>{
			code += filter.checked ? "1" : "0";
			count++;
		})
	});
	
	//console.log(filters.Grouping.regular.checked);
	//console.log(count);

	return code;
}

/**Applys a filter code  */
export async function applyFilterCode(code){
	
	if(code.length != 125){
		alert("Not a valid Filter Code! \n Must be 125 characters.");
		return;
	}

	
	let values = [];
	
	for(let i = 0; i < code.length; i++){
		
		switch(code.charAt(i)){
			case "0":
				values[i] = false; break;
			case "1":
				values[i] = true; break;
			default:
				alert("Not a valid Filter Code! \n Must contain only 1s and 0s.");
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









