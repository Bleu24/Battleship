import { Ship } from "./Ship.js";
import { Engine } from "../core/engine.js";
import { cloneDeep } from "lodash";

export class Gameboard {
  constructor(size = 10) {
    this.board = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({ ship: null, shot: null })),
    );
  }

  place(ship, x, y, orientation) {
    switch (orientation) {
      case "horizontal":
        if (y + ship.length > this.board[x].length) {
          console.error("out of bounds");
          return;
        }

        for (let i = 0; i < ship.length; i++) {
          this.board[x][y + i].ship = ship;
        }
        break;
      case "vertical":
        if (x + ship.length > this.board.length) {
          console.error("out of bounds");
          return;
        }

        for (let i = 0; i < ship.length; i++) {
          this.board[x + i][y].ship = ship;
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

    return false;
  }

  getAllShips() {
    const ships = new Set();
    for (const row of this.board) {
      for (const cell of row) {
        if (cell.ship) {
          ships.add(cell.ship);
        }
      }
    }
    return Array.from(ships);
  }

  getShipFromCoordinate(x, y) {
    return cloneDeep(this.board[x][y].ship);
  }


  getAllSunkenShips() {
    const ships = this.getAllShips();
    return ships.filter((ship) => ship.isSunk());
  }

  get size() {
    let size = 0;
    for (const row of this.board) {
      size += row.length;
    }
    return size;
  }

  remove(ship) {
    for (const row of this.board) {
      for (const cell of row) {
        if (cell.ship?.type === ship.type) {
          cell.ship = null;
        }
      }
    }
  }

  canPlace(ship, x, y, orientation) {
    switch (orientation) {
      case "horizontal":
        for (let i = 0; i < ship.length; i++) {
          if (!this.board[x] ||!this.board[x][y + i]) return false;
          if (this.isOccupied(x, y + i)) return false;
        }
        break;
      case "vertical":
        for (let i = 0; i < ship.length; i++) {
          if (!this.board[x + i] || !this.board[x + i][y]) return false;
          if (this.isOccupied(x + i, y)) return false;
        }
        break;
    }

    return true;
  }

  randomize() {
    const orientations = ["horizontal", "vertical"];
    const ships = Engine.getState().ships;

    for (const key in ships) {
      const ship = new Ship(ships[key], key);
      let placed = false;

      while (!placed) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const idx = Math.floor(Math.random() * 2);
        const orientation = orientations[idx];

        if (this.canPlace(ship, x, y, orientation)) {
          this.place(ship, x, y, orientation);
          placed = true;
        }
      }
    }
  }
}
