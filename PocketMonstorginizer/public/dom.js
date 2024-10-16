import * as utils from "./utils.js";
import * as api from "./api.js";
import * as getInfo from "./getInfo.js";
import * as group from "./group.js";

export async function updatePokeInfo(pokemonSpecies) {
  document.getElementById("PokeName").innerHTML = utils.normalizePokeName(
    pokemonSpecies.name
  );

  document.getElementById("PokeInfo").innerHTML =
    pokemonSpecies.flavor_text_entries.length > 1
      ? pokemonSpecies.flavor_text_entries[1].flavor_text
      : pokemonSpecies.flavor_text_entries[0].flavor_text;

  document.getElementById("Grouping").innerHTML = await findPokeGrouping(
    pokemonSpecies
  );

  document.getElementById("IDNum").innerHTML =
    "#" + pokemonSpecies.id.toString().padStart(3, "0");

  document.getElementById("PokeGen").innerHTML =
    getInfo.getPokeGeneration(pokemonSpecies);

  let defultPokemonForm = await api.fetchDefaultFormData(pokemonSpecies);

  document.getElementById("TypeA").innerHTML = utils.capitalize(
    getInfo.getPokeTypeA(defultPokemonForm)
  );

  document.getElementById("TypeB").innerHTML =
    getInfo.getPokeTypeB(defultPokemonForm) != ""
      ? "/" + utils.capitalize(getInfo.getPokeTypeB(defultPokemonForm))
      : "";

  updatePokemonColor(pokemonSpecies);

  document.getElementById("PokeShape").innerHTML = utils.capitalize(
    getInfo.getPokeShape(pokemonSpecies)
  );

  document.getElementById("PokeGenderRate").innerHTML =
    getInfo.getPokeGenderRate(pokemonSpecies);

  document.getElementById("PokeEggGroup1").innerHTML = utils.capitalize(
    getInfo.getPokeEggGroup1(pokemonSpecies)
  );

  document.getElementById("PokeEggGroup2").innerHTML =
    getInfo.getPokeEggGroup2(pokemonSpecies) != ""
      ? "/" + utils.capitalize(getInfo.getPokeEggGroup2(pokemonSpecies))
      : "";

  document.getElementById("PokeEvoDoesBranch").innerHTML =
    await getInfo.getIsBranching(pokemonSpecies);

  document.getElementById("PokeEvoStage").innerHTML =
    await getInfo.getPokeEvoStage(pokemonSpecies);

  document.getElementById("PokeEvoLineType").innerHTML =
    await getInfo.getPokeEvoLineType(pokemonSpecies);
}

export function showPokeImage(imageUrl) {
  let pokeImg = document.getElementById("pokeImg");

  pokeImg.src = imageUrl;

  pokeImg.style.display = "block";
}

export async function findPokeGrouping(pokemonSpecies) {
  let grouping = "";
  if (await group.isStarter(pokemonSpecies)) {
    grouping = addSlashIfNeeded(grouping) + "First Partner";
  }
  if (await group.isLegend(pokemonSpecies)) {
    grouping = addSlashIfNeeded(grouping) + "Legendary";
  }
  if (await group.isMythic(pokemonSpecies)) {
    grouping = addSlashIfNeeded(grouping) + "Mythical";
  }
  if (await group.isUltraBeast(pokemonSpecies)) {
    grouping = addSlashIfNeeded(grouping) + "Ultra Beast";
  }
  if (await group.isParadox(pokemonSpecies)) {
    grouping = addSlashIfNeeded(grouping) + "Paradox";
  }
  if (await group.isFossil(pokemonSpecies)) {
    grouping = addSlashIfNeeded(grouping) + "Fossil";
  }
  if (await group.isBaby(pokemonSpecies)) {
    grouping = addSlashIfNeeded(grouping) + "Baby";
  }
  if (await group.isPseudoLegend(pokemonSpecies)) {
    grouping = addSlashIfNeeded(grouping) + "Pseudo-Legendary";
  }
  if (await group.isEeveelution(pokemonSpecies)) {
    grouping = addSlashIfNeeded(grouping) + "Eeveelution";
  }
  if (await group.isElectricRodent(pokemonSpecies)) {
    grouping = addSlashIfNeeded(grouping) + "Electric Rodent";
  }
  if (grouping == "") {
    grouping += "Regular";
  }

  return grouping;
}

function addSlashIfNeeded(string) {
  return string == "" ? string : string + "/";
}

export function changeColorOfBackground(color) {
  let newColor = "";

  // Decide which background color to set based on the Pokémon's color.
  switch (color) {
    case "red":
      newColor = "#ed5555";
      break;
    case "blue":
      newColor = "#4daff0";
      break;
    case "yellow":
      newColor = "#fcff4f";
      break;
    case "green":
      newColor = "#5fcf5f";
      break;
    case "black":
      newColor = "#808080";
      break;
    case "brown":
      newColor = "#a6695b";
      break;
    case "purple":
      newColor = "#8b5da6";
      break;
    case "gray":
      newColor = "#b5b0b0";
      break;
    case "white":
      newColor = "#fcfcfc";
      break;
    case "pink":
      newColor = "#ffccd5";
      break;
    default:
      newColor = "#aae1e1";
  }

  document.body.style.backgroundColor = newColor;
}

export function initializeTabs() {
  const tabLinks = document.querySelectorAll(".tablinks");
  const tabContents = document.querySelectorAll(".tabcontent");

  tabContents.forEach((content) => {
    content.style.display = "none";
  });

  tabLinks.forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabName = this.getAttribute("data-tab");

      const targetTabContent = document.getElementById(tabName);

      if (targetTabContent.style.display === "none") {
        tabContents.forEach((content) => (content.style.display = "none"));

        tabLinks.forEach((link) => link.classList.remove("active"));

        targetTabContent.style.display = "block";
        this.classList.add("active");
      } else {
        targetTabContent.style.display = "none";
        this.classList.remove("active");
      }
    });
  });
}

export function initializeSearchEvents(handleSearch, randomIDFunc) {
  const searchButton = document.getElementById("enter");
  const pokeSearch = document.getElementById("PokeSearch");
  const randomButton = document.getElementById("randomDraw");

  searchButton.addEventListener("click", () => {
    const searchValue = pokeSearch.value.trim().toLowerCase();
    if (searchValue) {
      handleSearch(searchValue);
    } else {
      alert("Please enter a valid Pokémon name or ID");
    }
  });

  randomButton.addEventListener("click", async () => {
    try {
      const randomId = await randomIDFunc();
      if (randomId) {
        handleSearch(randomId.toString());
      } else {
        console.error("Random ID function returned an invalid value");
      }
    } catch (error) {
      console.error("Error while fetching random ID:", error);
    }
  });

  pokeSearch.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const searchValue = pokeSearch.value.trim().toLowerCase();
      if (searchValue) {
        handleSearch(searchValue);
      } else {
        alert("Please enter a valid Pokémon name or ID");
      }
    }
  });
}

async function updatePokemonColor(pokemonSpecies) {
  const defaultFormData = await api.fetchDefaultFormData(pokemonSpecies);

  if (defaultFormData && defaultFormData.color) {
    const pokeColor = defaultFormData.color.name;
    const capitalizedColor = utils.capitalize(pokeColor);
    document.getElementById("PokeColor").innerHTML = capitalizedColor;
  } else {
    console.error("Color data is missing or undefined");
  }
}

export function openTab(event, tabName) {
  const tabcontent = document.getElementsByClassName("tabcontent");

  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  const tablinks = document.getElementsByClassName("tablinks");

  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  const selectedTabContent = document.getElementById(tabName);
  if (selectedTabContent) {
    selectedTabContent.style.display = "block";
    event.currentTarget.className += " active";
  } else {
    console.error("Tab content not found for:", tabName);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  function manageSelectNoneAndAll(
    tabId,
    checkboxSelector,
    selectAllId,
    selectNoneId
  ) {
    const checkboxes = [
      ...document.querySelectorAll(`#${tabId} ${checkboxSelector}`),
    ];
    const selectAll = document.getElementById(selectAllId);
    const selectNone = document.getElementById(selectNoneId);

    const filteredCheckboxes = checkboxes.filter(
      (checkbox) => checkbox !== selectAll && checkbox !== selectNone
    );

    selectAll.addEventListener("click", function () {
      filteredCheckboxes.forEach((checkbox) => {
        checkbox.checked = true;
      });
      selectNone.checked = false;
    });

    selectNone.addEventListener("click", function () {
      filteredCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
      selectAll.checked = false;
    });

    filteredCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("click", function () {
        if (this.checked) {
          selectNone.checked = false;
        }

        if (filteredCheckboxes.every((cb) => cb.checked)) {
          selectAll.checked = true;
        } else {
          selectAll.checked = false;
        }

        if (!this.checked) {
          selectAll.checked = false;
        }
      });
    });
  }

  manageSelectNoneAndAll(
    "Generation-Tab",
    "input[type='checkbox']",
    "generationSelectAll",
    "generationSelectNone"
  );

  manageSelectNoneAndAll(
    "Grouping-Tab",
    "input[type='checkbox']",
    "groupingSelectAll",
    "groupingSelectNone"
  );

  manageSelectNoneAndAll(
    "PrimaryType-Tab",
    "input[type='checkbox']",
    "primarySelectAll",
    "primarySelectNone"
  );

  manageSelectNoneAndAll(
    "SecondaryType-Tab",
    "input[type='checkbox']",
    "secondarySelectAll",
    "secondarySelectNone"
  );

  manageSelectNoneAndAll(
    "Color-Tab",
    "input[type='checkbox']",
    "colorSelectAll",
    "colorSelectNone"
  );

  manageSelectNoneAndAll(
    "Shape-Tab",
    "input[type='checkbox']",
    "shapeSelectAll",
    "shapeSelectNone"
  );

  manageSelectNoneAndAll(
    "GenderRate-Tab",
    "input[type='checkbox']",
    "genderRateSelectAll",
    "genderRateSelectNone"
  );

  manageSelectNoneAndAll(
    "EvoStag-Tab",
    "input[type='checkbox']",
    "evoStagSelectAll",
    "evoStagSelectNone"
  );

  manageSelectNoneAndAll(
    "EvoLineType-Tab",
    "input[type='checkbox']",
    "evoLineTypeSelectAll",
    "evoLineTypeSelectNone"
  );

  manageSelectNoneAndAll(
    "BranchingEvo-Tab",
    "input[type='checkbox']",
    "branchingEvoSelectAll",
    "branchingEvoSelectNone"
  );

  manageSelectNoneAndAll(
    "EggGroup-Tab",
    "input[type='checkbox']",
    "eggGroupSelectAll",
    "eggGroupSelectNone"
  );

  manageSelectNoneAndAll(
    "OtherEggGroup-Tab",
    "input[type='checkbox']",
    "otherEggGroupSelectAll",
    "otherEggGroupSelectNone"
  );
});
