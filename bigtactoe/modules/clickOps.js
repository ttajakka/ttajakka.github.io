import { changeInstruction, toid } from "./helpers.js";
import { resetBoard } from "./boardOps.js";
import { Move, NormalGame, ReverseGame } from "./GameClass.js";
import { updateBoard } from "./boardOps.js";

const clickNode = (game, move) => () => {
  if (!game.isLegal(move)) {
    return null;
  }

  game.update(move);
  updateBoard(game);

  if (game.ended()) {
    changeInstruction(
      game.victory() ? (game.moves.length % 2 ? "X wins!" : "O wins!") : "Draw"
    );
  } else {
    changeInstruction(game.moves.length % 2 ? "O to play" : "X to play");
  }

  updateClicks(game);

  return null;
};

const updateClicks = (game) => {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      document.getElementById(toid("td", { x, y })).onclick = clickNode(
        game,
        new Move(x, y)
      );
    }
  }
};

export const clickNewGame = (mode) => () => {
  document.getElementById("modeinfo").innerText = `rules: ${mode}`;
  document.getElementById("information").style.display = "initial";
  changeInstruction("X starts");
  resetBoard();

  const game = mode === "normal" ? new NormalGame() : new ReverseGame();
  updateClicks(game);
};
