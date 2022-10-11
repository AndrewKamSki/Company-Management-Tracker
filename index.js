const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

init();

// Display logo text, load main prompts
function init() {
  // loadPrompts();
}

// Exit the application
function quit() {
  console.log("Goodbye!");
  process.exit();
}
