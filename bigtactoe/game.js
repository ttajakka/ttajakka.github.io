import { createBoard } from "./modules/createBoard.js";
import { toid, changeInstruction } from "./modules/helpers.js";
import { Move, NormalGame, ReverseGame } from "./modules/GameClass.js";
import { clickNewGame } from "./modules/clickOps.js";

const gamebox = document.getElementById("box");
createBoard(gamebox);

document.getElementById("newgame").onclick = clickNewGame("normal");
document.getElementById("newreversegame").onclick = clickNewGame("reversed");
