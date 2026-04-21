export class Gameboard {
  constructor(size = 10) {
    this.board = Array.from({ length: size }, () => Array(size).fill(null));
  }

  place(ship, x, y, orientation) {
    this.board[x][y] = ship;

    switch (orientation) {
      case "horizontal":
        for (let i = 0; i < ship.length; i++) {
          this.board[x][i] = ship;
        }
        break;
      case "vertical":
        for (let i = 0; i < ship.length; i++) {
          this.board[i][y] = ship;
        }
        break;
    }
  }

  isOccupied(x, y) {
    return this.board[x][y] !== null;
  }
}
