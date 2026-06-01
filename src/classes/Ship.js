export class Ship {
  length;
  timesHit = 0;
  type;

  constructor(length = 0, type = null) {
    this.length = length;
    this.type = type;
  }

  hit() {
    this.timesHit++;
  }

  isSunk() {
    return this.timesHit === this.length;
  }

  getHealth() {
    return this.length - this.timesHit;
  }
}
