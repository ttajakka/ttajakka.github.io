export class Move {
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getSmallCoords() {
    return { xsmall: Math.floor(this.x / 3), ysmall: Math.floor(this.y / 3) };
  }
}

export class Game {
  variant;
  moves = [];
  bigstate = [
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
  smallstate = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  decided = [
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ];

  update(move) {
    this.moves.push(move);

    this.bigstate[move.x][move.y] = this.moves.length % 2 ? 1 : -1;

    const smallcoords = move.getSmallCoords();
    const won = this.squareWon(smallcoords);
    const full = this.squareFull(smallcoords);

    this.smallstate[smallcoords.xsmall][smallcoords.ysmall] = won;

    this.decided[smallcoords.xsmall][smallcoords.ysmall] = won || full;
  }

  getLast() {
    return this.moves[this.moves.length - 1];
  }

  getSquare({ xsmall, ysmall }) {
    const square = [];
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        row.push(this.bigstate[3 * xsmall + i][3 * ysmall + j]);
      }
      square.push(row);
    }
    return square;
  }

  getSquareContainingMove(move) {
    return this.getSquare(move.getSmallCoords());
  }

  testForWin(square) {
    for (let i = 0; i < 3; i++) {
      const rowsum = square[i][0] + square[i][1] + square[i][2]; // rows
      if (rowsum === 3) return 1; // cross wins
      if (rowsum === -3) return -1; // naught wins
      const colsum = square[0][i] + square[1][i] + square[2][i]; // columns
      if (colsum === 3) return 1;
      if (colsum === -3) return -1;
    }

    // diagonals
    const diagsum = square[0][0] + square[1][1] + square[2][2];
    if (diagsum === 3) return 1;
    if (diagsum === -3) return -1;

    const antidiagsum = square[0][2] + square[1][1] + square[2][0];
    if (antidiagsum === 3) return 1;
    if (antidiagsum === -3) return -1;

    // not over or draw
    return 0;
  }

  squareWon({ xsmall, ysmall }) {
    return this.testForWin(this.getSquare({ xsmall, ysmall }));
  }

  squareFull({ xsmall, ysmall }) {
    const count = this.getSquare({ xsmall, ysmall })
      .flat()
      .map((i) => Math.abs(i))
      .reduce((sum, a) => sum + a, 0);
    return count === 9;
  }

  squareDecided({ xsmall, ysmall }) {
    // if (this.squareFull({ xsmall, ysmall })) return true;
    // if (this.squareWon({ xsmall, ysmall })) return true;
    // return false;
    return this.decided[xsmall][ysmall];
  }

  isLegal(move) {
    if (this.moves.length === 0) return true;
    if (this.bigstate[move.x][move.y]) {
      return false;
    }
    if (this.squareDecided(move.getSmallCoords())) {
      return false;
    }
    return true;
  }

  victory() {
    return this.testForWin(this.smallstate);
  }

  log() {
    console.log(this);
  }
}

export class NormalGame extends Game {
  constructor(moves) {
    super(moves);
    this.variant = "normal";
  }

  // getNextSquare() {
  //   const last = this.getLast();
  //   return { xsmall: last.x % 3, ysmall: last.y % 3 };
  // }

  moveInNextSquare(move) {
    const { x, y } = this.getLast();
    const { xsmall, ysmall } = move.getSmallCoords();
    return x % 3 === xsmall && y % 3 === ysmall;
  }

  isLegal(move) {
    // test if first move
    if (this.moves.length === 0) return true;
    // test if move is already played or square is already decided
    if (!super.isLegal(move)) return false;

    // KEY STEP:
    // if the next square is not decided, must play there
    const { x, y } = this.getLast();
    if (!this.squareDecided({ xsmall: x % 3, ysmall: y % 3 })) {
      const { xsmall, ysmall } = move.getSmallCoords();
      return x % 3 === xsmall && y % 3 === ysmall;
    }
    return true;
  }
}

export class ReverseGame extends Game {
  constructor(moves) {
    super(moves);
    this.variant = "reversed";
  }

  isLegal(move) {
    // test if first move
    if (this.moves.length === 0) return true;
    // test if move is already played or square is already decided
    if (!super.isLegal(move)) return false;

    // KEY STEP:
    // if there are available next moves with reverse rules,
    // test for reverse rule
    const { xsmall: lastx, ysmall: lasty } = this.getLast().getSmallCoords();
    let availablecount = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const x = lastx + 3 * i;
        const y = lasty + 3 * j;
        const moveavailable =
          !this.bigstate[x][y] &&
          !this.squareDecided({
            xsmall: Math.floor(x / 3),
            ysmall: Math.floor(y / 3),
          });
        if (moveavailable) availablecount += 1;
      }
    }
    if (availablecount) return move.x % 3 === lastx && move.y % 3 === lasty;

    return true;
  }
}

// The following constructor definition might help with scrolling
// forwards and backdwards, or for analyzing your game
//
// constructor(moves) {
//   this.moves = moves;

//   for (let i = 0; i < moves.length; i++) {
//     this.bigstate[moves[i].x][moves[i].y] = i % 2 ? -1 : 1;
//   }

//   for (let i = 0; i < 3; i++) {
//     for (let j = 0; j < 3; j++) {
//       const localstate = smallToLocal(this.bigstate, {
//         xsmall: i,
//         ysmall: j,
//       });
//       const won = squareWon(localstate);
//       const full = squareFull(localstate);
//       this.smallstate[i][j] = won;
//       this.decided[i][j] = won || full;
//     }
//   }
// }
