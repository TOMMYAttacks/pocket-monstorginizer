import * as utils from "./utils.js";

export function getPokeTypeA(pokemon) {
  return pokemon.types[0].type.name;
}

export function getPokeTypeB(pokemon) {
  return pokemon.types.length == 2 ? pokemon.types[1].type.name : "";
}

export function getPokeEggGroup1(pokemonSpecies) {
  return updateEggGroupName(pokemonSpecies.egg_groups[0].name);
}

export function getPokeEggGroup2(pokemonSpecies) {
  return pokemonSpecies.egg_groups.length == 2
    ? updateEggGroupName(pokemonSpecies.egg_groups[1].name)
    : "";
}

function updateEggGroupName(eggGroup) {
  switch (eggGroup) {
    case "ground":
      return "field";
    case "plant":
      return "grass";
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

export function getPokeGenderRate(pokemonSpecies) {
  let rate = "";
  switch (pokemonSpecies.gender_rate) {
    case 0:
      rate = "Male Only (100% M, 0% F)";
      break;
    case 1:
      rate = "Normally Male (87.5% M, 12.5% F)";
      break;
    case 2:
    case 3:
      rate = "Usually Male (75% M, 25% F)";
      break;
    case 4:
      rate = "Even Male or Female (50% M, 50% F)";
      break;
    case 5:
    case 6:
      rate = "Usually Female (25% M, 75% F)";
      break;
    case 7:
      rate = "Normally Female (12.5% M, 87.5% F)";
      break;
    case 8:
      rate = "Female Only (0% M, 100% F)";
      break;
    default:
      rate = "Gender Unknown (0% M, 0% F)";
      break;
  }
  return rate;
}

export function getPokeColor(pokemonSpecies) {
  return pokemonSpecies.color.name;
}

export function getPokeShape(pokemonSpecies) {
  return pokemonSpecies.shape.name;
}

export function getPokeGeneration(pokemonSpecies) {
  return formatPokeGeneration(pokemonSpecies.generation.name);
}

function formatPokeGeneration(genName) {
  let spaceIndex = genName.indexOf("-");
  return (
    utils.capitalize(genName.substring(0, spaceIndex)) +
    " " +
    genName.substring(spaceIndex + 1).toUpperCase()
  );
}

export async function getPokeEvoStage(pokemonSpecies) {
  let evoChainMembers = getPokeEvoChainMembers(pokemonSpecies);

  let basicMember = (await evoChainMembers).basic;
  let stage1Members = (await evoChainMembers).stage1;
  let stage2Members = (await evoChainMembers).stage2;

  if (basicMember.includes(pokemonSpecies.name)) {
    return "Basic";
  } else if (stage1Members.includes(pokemonSpecies.name)) {
    return "Stage 1";
  } else if (stage2Members.includes(pokemonSpecies.name)) {
    return "Stage 2";
  } else {
    return "Unknown Stage";
  }
}

export async function getIsBranching(pokemonSpecies) {
  let evoChainMembers = getPokeEvoChainMembers(pokemonSpecies);

  //let basicMember = (await evoChainMembers).basic
  let stage1Members = (await evoChainMembers).stage1;
  let stage2Members = (await evoChainMembers).stage2;

  if (stage1Members.length > 1 || stage2Members.length > 1) {
    return "Branching Evolution Line";
  } else {
    return "Linear Evolution Line";
  }
}

export async function getPokeEvoLineType(pokemonSpecies) {
  let evoChain = await getPokeEvoChain(pokemonSpecies);
  let evoType = "";
  //console.log(pokemonSpecies.name + "'s Evo Chain");
  //console.log(evoChain);
  //console.log(evoChain.chain);
  //console.log(evoChain.chain.evolves_to);

  if (evoChain.chain.evolves_to.length == 0) {
    evoType = "No Evolution";
  } else {
    if (evoChain.chain.evolves_to[0].evolves_to.length == 0) {
      evoType = "Two-Stage Evolution";
    } else {
      evoType = "Three-Stage Evoluiton";
    }
  }
  //console.log(evoType);
  return evoType;
}

async function getPokeEvoChain(pokemonSpecies) {
  try {
    let res = await fetch(pokemonSpecies.evolution_chain.url);
    let pokeEvoChain = await res.json();

    //console.log(pokeEvoChain);
    return pokeEvoChain;
  } catch {
    console.log("Opps! No chain!");
  }
}

async function getPokeEvoChainMembers(pokemonSpecies) {
  let evoChain = await getPokeEvoChain(pokemonSpecies);

  let basicEvoLineMembers = [evoChain.chain.species.name];
  let stage1EvoLineMembers = [];
  let stage2EvoLineMembers = [];
  evoChain.chain.evolves_to.forEach((stage1Pokemon) => {
    stage1EvoLineMembers.push(stage1Pokemon.species.name);

    stage1Pokemon.evolves_to.forEach((stage2Pokemon) => {
      stage2EvoLineMembers.push(stage2Pokemon.species.name);
    });
  });

  let pokeEvoChainMembers = {
    basic: basicEvoLineMembers,
    stage1: stage1EvoLineMembers,
    stage2: stage2EvoLineMembers,
  };

  return pokeEvoChainMembers;
}
