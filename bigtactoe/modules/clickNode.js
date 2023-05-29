import { changeInstruction, toNodeId } from "./helpers.js";
import { updateBoard } from "./updateBoard.js";
import { updateState } from "./updateState.js";

export const updateClicks = (gamestate) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const node = document.getElementById(toNodeId({ x: i, y: j }));
      node.onclick = clickNode(gamestate, { x: i, y: j });
    }
  }
};

export const lockClicks = () => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const node = document.getElementById(toNodeId({ x: i, y: j }));
      node.onclick = () => null;
    }
  }
}

export const clickNode =
  (gamestate, { x, y }) =>
  () => {    
    if (!gamestate.active[x][y]) {
      return null;
    }

    const newstate = updateState(gamestate, { x, y });
    updateBoard(newstate);

    if (newstate.victory) {
      changeInstruction(newstate.victory === 1 ? "X wins!" : "O wins!");
      lockClicks();
      return null;
    }

    updateClicks(newstate);
    changeInstruction(newstate.toplay === "X" ? "X to play" : "O to play");
  };
