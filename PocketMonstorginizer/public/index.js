import * as random from "./randomizer.js";
import * as dom from "./dom.js";
import * as search from "./search.js";

document.addEventListener("DOMContentLoaded", () => {
  dom.initializeTabs();
  dom.initializeSearchEvents(search.handleSearch, random.randomID);
  dom.initializeGenerationCheckboxes();
});
