import { createGameTable } from "./modules/createGameTable.js";
import { clickNewGame } from "./modules/clickOps.js";

document.getElementById("newnormal").onclick = clickNewGame("normal");
document.getElementById("newreverse").onclick = clickNewGame("reversed");
createGameTable(document.getElementById("gamebox"));
