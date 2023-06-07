import { toid } from "./helpers.js";
import { Move } from "./GameClass.js"

export const resetBoard = () => {
  for (let xsmall = 0; xsmall < 3; xsmall++) {
    for (let ysmall = 0; ysmall < 3; ysmall++) {
      document
        .getElementById(toid("bg", { x: xsmall, y: ysmall }))
        .classList.remove("active", "cross", "naught");

      document
        .getElementById(toid("maintd", { x: xsmall, y: ysmall }))
        .classList.remove("active");

      const oltd = document.getElementById(
        toid("oltd", { x: xsmall, y: ysmall })
      );
      oltd.innerText = "";
      oltd.classList.remove("cross", "naught");
    }
  }

  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      const node = document.getElementById(toid("tddiv", { x, y }));
      node.classList.remove("active", "cross", "naught");
      node.innerText = "";

      document
        .getElementById(toid("tdbg", { x, y }))
        .classList.remove("active", "last");
    }
  }
};

export const updateBoard = (game) => {
  for (let xsmall = 0; xsmall < 3; xsmall++) {
    for (let ysmall = 0; ysmall < 3; ysmall++) {
      const squarewon = game.smallstate[xsmall][ysmall];
      if (squarewon) {
        document
          .getElementById(toid("bg", { x: xsmall, y: ysmall }))
          .classList.add(squarewon === 1 ? "cross" : "naught");
        const oltd = document.getElementById(
          toid("oltd", { x: xsmall, y: ysmall })
        );
        oltd.innerText = squarewon === 1 ? "X" : "O";
        oltd.classList.add(squarewon === 1 ? "cross" : "naught");
      }
    }
  }

  if (game.variant === "normal") {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // const bg = document.getElementById(toid("bg", { x: i, y: j }));
        // bg.classList.remove("active");

        const maintd = document.getElementById(toid("maintd", { x: i, y: j }));
        maintd.classList.remove("active");

        const active = game.getActiveSquares();

        if (!game.ended() && active[i][j]) {
          // bg.classList.add("active");
          maintd.classList.add("active");
        }
      }
    }
  }

  if (game.variant === "reversed") {
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        const tdbg = document.getElementById(toid("tdbg", { x, y }));
        tdbg.classList.remove("active");

        if (game.isLegal(new Move(x, y))) {
          tdbg.classList.add("active");
        }
      }
    }
  }

  if (game.moves.length > 1) {
    const { x, y } = game.moves[game.moves.length - 2];
    document
      .getElementById(toid("tdbg", { x, y }))
      .classList.remove("active", "last");
  }

  const { x, y } = game.getLast();
  const lastnode = document.getElementById(toid("tddiv", { x, y }));
  lastnode.innerText = game.moves.length % 2 ? "X" : "O";
  document.getElementById(toid("tdbg", { x, y })).classList.add("last");
  lastnode.classList.add(game.moves.length % 2 ? "cross" : "naught");
};
