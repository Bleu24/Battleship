export class Ship {

  length;
  timesHit = 0;

  constructor() { }

  hit() {
    this.timesHit++;
  }
}
