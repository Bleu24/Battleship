export class Ship {

  length;
  timesHit = 0;

  constructor(length = 0) {
    this.length = length;
  }

  hit() {
    this.timesHit++;
  }

  isSunk() {
    return this.timesHit === this.length;
  }
}
