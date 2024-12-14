/**
 * List
 * 
 * The list on the side used for saving Pokémon to be referenced later
 */


import * as utils from "./utils.js";
import * as api from "./api.js";

let pokeListArr = [];
let pokeListCode = "";

document.addEventListener("DOMContentLoaded", () => {
        const addToListButton = document.getElementById("addToList");
        const clearListButton = document.getElementById("clearList");
        
		const applyCodeButton = document.getElementById("ApplyCode");
        const pokeList = document.getElementById("pokeList");
		const pokeListCodeBox = document.getElementById("ListCodeBox");
		
		
        // Function to add the current Pokémon to the list
        async function addCurrentPokemonToList() {
          const pokemonName = document
            .getElementById("PokeName")
            ?.textContent.trim();
          const pokemonID = document
            .getElementById("IDNum")
            ?.textContent.trim();

          // //console.log("Adding to list:", pokemonName, pokemonID);

          if (pokemonName && pokemonID && pokemonID !== "#0000") {
            const listItem = document.createElement("li");
            listItem.textContent = `${pokemonName} (${pokemonID})`;
			

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Remove";
            deleteButton.onclick = async () => {
			  pokeListArr.splice(getItemIndexInList(pokeList.children, listItem),1);
			  //console.log(pokeListArr);
              listItem.remove();
              //console.log(`Removed ${pokemonName} from list`);
			  pokeListCode = await generateListCode();
			  pokeListCodeBox.value = pokeListCode;
            };

            listItem.appendChild(deleteButton);
            pokeList.appendChild(listItem);
			
			pokeListArr.push(pokemonID.substring(1));
			pokeListCode = await generateListCode();
			pokeListCodeBox.value = pokeListCode;
			//console.log(pokemonName + " is at index " + getItemIndexInList(pokeList.children, listItem));
			//console.log(pokeListArr);
			
            
			//console.log("Pokémon added to list:", listItem.textContent);
          } else {
            //console.warn("No valid data to add to list.");
            alert("Please search for a Pokémon before adding it to the list.");
          }
        }
        async function clearPokemonList() {
          if (pokeList) {
            			
			//keep removeing the first element until empty
			while(pokeList.children.length != 0){
				pokeList.children[0].remove();				
			}

            //console.log("Pokémon list cleared.");
			
			pokeListArr = [];
			pokeListCode = await generateListCode();
			pokeListCodeBox.value = pokeListCode;
			
          } else {
            //console.error("No Pokémon list found to clear.");
          }
        }
		
		async function applyCode(){
			
			//Clear the pokelist
			while(pokeList.children.length != 0){
				pokeList.children[0].remove();				
			}
			pokeListArr = [];
			
			//console.log("Apply Now!");
			pokeListCode = (pokeListCodeBox.value).trim();
			//console.log(pokeListCode);
			
			pokeListCodeBox.value = pokeListCode
			
			
			
			let listLength = Math.floor(pokeListCode.length / 3);
			//console.log(listLength);
			
			try{
				//Convert parts of the string into the 
				for(let i = 0; i < listLength; i++){
					pokeListArr.push(
						parseInt(pokeListCode.substring(i * 3, (i * 3) + 3),16).toString(10)
					)
					if(isNaN(pokeListArr[i])){
						pokeListArr = [];
						//console.log(pokeListArr)
						
						throw "Not a number";
					}
				}
				//console.log(pokeListArr);
				
				pokeListArr.forEach(async (id) =>{
					let pokemonSpecies = await api.fetchPokemonData(id);
					//console.log(utils.normalizePokeName(pokemonSpecies.name));
					let pokemonName = utils.normalizePokeName(pokemonSpecies.name)
					let pokemonID = "#" + (id.padStart(3,"0"))
					
					const listItem = document.createElement("li");
					listItem.textContent = `${pokemonName} (${pokemonID})`;	

					const deleteButton = document.createElement("button");
					deleteButton.textContent = "Remove";
					deleteButton.onclick = async () => {
					pokeListArr.splice(getItemIndexInList(pokeList.children, listItem),1);
						//console.log(pokeListArr);
					    listItem.remove();
					    //console.log(`Removed ${pokemonName} from list`);
				  		pokeListCode = await generateListCode();
						pokeListCodeBox.value = pokeListCode;
					};

					listItem.appendChild(deleteButton);
					pokeList.appendChild(listItem);
					
					
				})
				
			}
			catch(error){
				//console.log(error);
				alert("Unable to apply List Code!");
			}

			//trims code in case its ended with useless data
			pokeListCode = await generateListCode();
			pokeListCodeBox.value = pokeListCode;
			
		}

        if (addToListButton) {
          addToListButton.addEventListener("click", addCurrentPokemonToList);
          //console.log("Add to List button listener attached.");
        } else {
          //console.error("Add to List button not found.");
        }

        if (clearListButton) {
          clearListButton.addEventListener("click", clearPokemonList);
          //console.log("Clear List button listener attached.");
        } else {
          //console.error("Clear List button not found.");
        }
		
		if(applyCodeButton){
			applyCodeButton.addEventListener("click", applyCode);
		}
		
      });
	  
	  
/**
 * Generates a code based on the current Pokémon List  
 */	  
async function generateListCode(){
	let code = "";
	pokeListArr.forEach((item) =>{
		code += parseInt(item).toString(16).padStart(3,"0");
	});
	return code;
	
	
}

/**
 * Returns the index of the item in the given list
 */
function getItemIndexInList(list,item){
	for(let i = 0; i < list.length; i++){
		if(list[i] == item){
			return i;
		}
	} 
	//This means the item wasn't in the list after all
	return -1;
}
	  