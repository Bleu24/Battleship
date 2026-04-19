export class Gameboard {

  size = 10;
  board = Array.from({ length: this.size }, () => Array(this.size).fill(null));

  constructor() {

  }
}
