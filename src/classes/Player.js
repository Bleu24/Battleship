import { Gameboard } from "./Gameboard.js";

export class Player {
  constructor(name = "AI") {
    this.name = name;
    this.gameboard = new Gameboard();
  }
}
