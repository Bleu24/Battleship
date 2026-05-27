import { Gameboard } from "./Gameboard.js";

export class Player {
  constructor(id = crypto.randomUUID(), name = "AI") {
    this.id = id;
    this.name = name;
    this.gameboard = new Gameboard();
  }
}
