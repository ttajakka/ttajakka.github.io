import { changeInstruction, toNodeId } from "./helpers.js";
import { updateBoard, resetBoard } from "./boardOps.js";
import { Move, NormalGame, ReverseGame } from "./GameClass.js";

export const clickNode = (game, move) => () => {
  if (!game.isLegal(move)) {
    return null;
  }

  game.update(move);
  updateBoard(game);

  changeInstruction(
    game.victory()
      ? game.moves.length % 2
        ? "X wins!"
        : "O wins!"
      : game.moves.length % 2
      ? "O to play"
      : "X to play"
  );

  updateClicks(game);

  return null;
};

const updateClicks = (game) => {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      document.getElementById(toNodeId({ x, y })).onclick = game.victory()
        ? () => {
            return null;
          }
        : clickNode(game, new Move(x, y));
    }
  }
};

export const clickNewGame = (mode) => () => {
  document.getElementById("modeinfo").innerText = `rules: ${mode}`;
  changeInstruction("X starts");
  resetBoard();

  const game = mode === "normal" ? new NormalGame() : new ReverseGame();
  updateClicks(game);
};
