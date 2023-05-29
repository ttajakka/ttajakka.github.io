import {
  getSmallCoords,
  smallToLocal,
  squareFull,
  squareWon,
  nextFull,
  nextSmallCoords,
  nextWon,
} from "./gamestateHelper.js";

export const updateState = (previousstate, { x, y }) => {
  const { xsmall, ysmall } = getSmallCoords({ x, y });

  // update big state
  const newbigstate = previousstate.bigstate;
  newbigstate[x][y] = previousstate.toplay === "X" ? 1 : -1;

  // update small state
  const localstate = smallToLocal(previousstate.bigstate, { xsmall, ysmall });
  const localWon = squareWon(localstate);
  const newsmallstate = previousstate.smallstate;
  newsmallstate[xsmall][ysmall] = localWon;

  // update full
  const newfull = previousstate.full;
  newfull[xsmall][ysmall] = squareFull(localstate);

  // update the easy ones
  const newtoplay = previousstate.toplay === "X" ? "O" : "X";
  const newlast = { x, y };
  const newvictory = squareWon(newsmallstate);

  // update active
  const newactive = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const newplayable = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const nextfullorwon =
    nextFull(newbigstate, { x, y }) || nextWon(newbigstate, { x, y })
      ? true
      : false;

  const { xsmall: xsmallnext, ysmall: ysmallnext } = nextSmallCoords({ x, y });
  
  if (!newvictory) {
    if (!nextfullorwon) {
      newplayable[xsmallnext][ysmallnext] = 1
    } else {
      for (let ismall = 0; ismall < 3; ismall++) {
        for (let jsmall = 0; jsmall < 3; jsmall++) {
          const squarestate = newsmallstate[ismall][jsmall];
          const squareisnext = ismall === xsmallnext && jsmall === ysmallnext;
    
          newplayable[ismall][jsmall] =
            !squarestate && !squareisnext ? 1 : 0;
        }
      }
    }

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const nodestate = newbigstate[i][j];
        const { xsmall: ismall, ysmall: jsmall } = getSmallCoords({
          x: i,
          y: j,
        });
        // const nodeinnext = ismall === xsmallnext && jsmall === ysmallnext;
        const nodeplayable = newplayable[ismall][jsmall];

        // newactive[i][j] = !nodestate && nextfullorwon === !nodeinnext ? 1 : 0;
        newactive[i][j] = !nodestate && nodeplayable;
      }
    }
  }

  const newgamestate = {
    bigstate: newbigstate,
    smallstate: newsmallstate,
    full: newfull,
    active: newactive,
    playable: newplayable,
    toplay: newtoplay,
    last: newlast,
    victory: newvictory,
  };

  return newgamestate;
};
