import { toSquareId, toNodeId } from "./helpers.js";
import { Move } from "./GameClass.js";

export const updateBoard = (game) => {
  for (let xsmall = 0; xsmall < 3; xsmall++) {
    for (let ysmall = 0; ysmall < 3; ysmall++) {
      const squarewon = game.smallstate[xsmall][ysmall];
      if (squarewon) {
        document
          .getElementById(toSquareId({ xsmall, ysmall }))
          .classList.add(squarewon === 1 ? "sq-cross" : "sq-naught");
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            document
              .getElementById(
                toNodeId({ x: 3 * xsmall + i, y: 3 * ysmall + j })
              )
              .classList.add(squarewon === 1 ? "node-cross" : "node-naught");
          }
        }
      }
    }
  }
  
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      const node = document.getElementById(toNodeId({ x, y }));
      node.classList.remove("active", "last");

      if (!game.victory() && game.isLegal(new Move(x, y))) {
        node.classList.add("active");
      }
    }
  }

  const lastnode = document.getElementById(toNodeId(game.getLast()));
  lastnode.innerHTML = game.moves.length % 2 ? "X" : "O";
  lastnode.classList.add("last");
  lastnode.classList.add(game.moves.length % 2 ? "cross" : "naught");
};

export const resetBoard = () => {
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
