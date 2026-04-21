import { Ship } from "./Ship.js";

export class Gameboard {
  constructor(size = 10) {
    this.board = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({ ship: null, shot: null })),
    );
  }

  place(ship, x, y, orientation) {
    this.board[x][y].ship = ship;

    switch (orientation) {
      case "horizontal":
        for (let i = 0; i < ship.length; i++) {
          this.board[x][i].ship = ship;
        }
        break;
      case "vertical":
        for (let i = 0; i < ship.length; i++) {
          this.board[i][y].ship = ship;
        }
        break;
    }
  }

  isOccupied(x, y) {
    return this.board[x][y].ship !== null;
  }

  receiveAttack(x, y) {
    const cell = this.board[x][y];

    if (cell.shot === "miss" || cell.shot === "hit") return;

    if (cell.ship && cell.ship instanceof Ship) {
      cell.ship.hit();
      cell.shot = "hit";
      return true;
    } else cell.shot = "miss";
  }
}
