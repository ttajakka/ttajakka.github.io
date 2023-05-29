import { changeInstruction } from "./helpers.js";
import { initializeBoard } from "./initializeBoard.js";
import { updateClicks } from "./clickNode.js";

export const clickNewGame = () => {
  const initialstate = {
    bigstate: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],

    smallstate: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],

    full: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],

    playable: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],

    active: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],

    toplay: "X",

    last: {
      x: -1,
      y: -1,
    },

    victory: 0,
  };

  changeInstruction("X starts");
  initializeBoard();
  updateClicks(initialstate);
};
