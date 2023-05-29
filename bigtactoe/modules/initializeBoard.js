import { toNodeId, toSquareId } from "./helpers.js";

export const initializeBoard = () => {
  for (let xsmall = 0; xsmall < 3; xsmall++) {
    for (let ysmall = 0; ysmall < 3; ysmall++) {
      const square = document.getElementById(toSquareId({ xsmall, ysmall }));
      square.classList.remove("playable", "sq-cross", "sq-naught");
    }
  }

  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      const node = document.getElementById(toNodeId({ x, y }));
      node.classList.remove(
        "active",
        "last",
        "cross",
        "naught",
        "node-cross",
        "node-naught"
      );

      node.innerHTML = "";
    }
  }
};
