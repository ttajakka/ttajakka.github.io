// smallToLocal returns state of 3x3 square given by (xsmall, ysmall)
export const smallToLocal = (bigstate, { xsmall, ysmall }) => {
  const localstate = [];
  for (let i = 0; i < 3; i++) {
    const row = [];
    for (let j = 0; j < 3; j++) {
      row.push(bigstate[3 * xsmall + i][3 * ysmall + j]);
    }
    localstate.push(row);
  }
  return localstate;
};

// returns the small coordinates of the 3x3 square a node belongs in
export const getSmallCoords = ({ x, y }) => {
  return { xsmall: Math.floor(x / 3), ysmall: Math.floor(y / 3) };
};

// returns small coords of square the next player must play in
// when previous player played (x,y)
export const nextSmallCoords = ({ x, y }) => {
  return { xsmall: x % 3, ysmall: y % 3 };
};

// getLocalState takes as input the coordinates of a node,
// returns the state of the 3x3 square it belongs to
export const getLocalState = (bigstate, { x, y }) => {
  return smallToLocal(bigstate, getSmallCoords(x, y));
};


// squareFull checks if a 3x3 square is full
export const squareFull = (localstate) => {
  const b = localstate
    .flat()
    .map((i) => Math.abs(i))
    .reduce((sum, a) => sum + a, 0);
  return b === 9 ? true : false;
};

export const currentFull = (bigstate, { x, y }) => {
  return squareFull(smallToLocal(bigstate, getSmallCoords({ x, y })));
};

// nextFull checks if the square the next player must play is already full
// when previous player played (x,y)
// export const nextFull = (gamestate) => {
//   const bigstate = gamestate.bigstate;
//   const x = gamestate.last.x;
//   const y = gamestate.last.y;
//   return squareFull(smallToLocal(bigstate, nextSmallCoords({ x, y })));
// };

export const nextFull = (bigstate, { x, y }) => {
  return squareFull(smallToLocal(bigstate, nextSmallCoords({ x, y })));
};

// squareWon takes as input a 3x3 square,
// returns +/-1 if +/-1 wins, 0 otherwise
export const squareWon = (localstate) => {
  for (let i = 0; i < 3; i++) {
    const rowsum = localstate[i][0] + localstate[i][1] + localstate[i][2]; // rows
    if (rowsum === 3) return 1; // cross wins
    if (rowsum === -3) return -1; // naught wins
    const colsum = localstate[0][i] + localstate[1][i] + localstate[2][i]; // columns
    if (colsum === 3) return 1;
    if (colsum === -3) return -1;
  }

  // diagonals
  const diagsum = localstate[0][0] + localstate[1][1] + localstate[2][2];
  if (diagsum === 3) return 1;
  if (diagsum === -3) return -1;

  const antidiagsum = localstate[0][2] + localstate[1][1] + localstate[2][0];
  if (antidiagsum === 3) return 1;
  if (antidiagsum === -3) return -1;

  // not over or draw
  return 0;
};

export const nextWon = (bigstate, { x, y }) => {
  return squareWon(smallToLocal(bigstate, nextSmallCoords({ x, y })));
}
