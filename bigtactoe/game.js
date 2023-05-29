import { updateClicks } from "./modules/clickNode.js";
import { clickNewGame } from "./modules/clickNewGame.js";
import { createGameTable } from "./modules/createGameTable.js";
import { changeInstruction } from "./modules/helpers.js";
import { initialstate } from "./modules/initialstate.js";

const gamebox = document.getElementById("gamebox");
document.getElementById("newgame").onclick = clickNewGame;
//changeInstruction("X starts")
createGameTable(gamebox);
//updateClicks(initialstate);
