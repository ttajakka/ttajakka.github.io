import { toNodeId, toSquareId } from "./helpers.js";

export const updateBoard = (gamestate) => {
  for (let xsmall = 0; xsmall < 3; xsmall++) {
    for (let ysmall = 0; ysmall < 3; ysmall++) {
      const square = document.getElementById(toSquareId({ xsmall, ysmall }));
      square.classList.remove("playable");

      const squarewon = gamestate.smallstate[xsmall][ysmall];
      if (squarewon) {
        square.classList.add(squarewon === 1 ? "sq-cross" : "sq-naught");
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const node = document.getElementById(
              toNodeId({ x: 3 * xsmall + i, y: 3 * ysmall + j })
            );
            node.classList.add(squarewon === 1 ? "node-cross" : "node-naught")
          }
        }
      }

      if (gamestate.playable[xsmall][ysmall]) {
        square.classList.add("playable");
      }
    }
  }

  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      const node = document.getElementById(toNodeId({ x, y }));
      node.classList.remove("active", "last");

      if (gamestate.active[x][y]) {
        node.classList.add("active");
      }
    }
  }

  const lastcoords = gamestate.last;
  const laststate = gamestate.bigstate[lastcoords.x][lastcoords.y];
  const lastnode = document.getElementById(toNodeId(lastcoords));
  lastnode.innerHTML = laststate === 1 ? "X" : "O";
  lastnode.classList.add("last");
  lastnode.classList.add(laststate === 1 ? "cross" : "naught");
};
