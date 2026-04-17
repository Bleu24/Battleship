import { Ship } from "../classes/Ship";

describe("Ship suite", () => {
  const ship = new Ship();

  test("Hit Function", () => {
    ship.hit();
    expect(ship.timesHit).toBe(1);
  });

  test("Hit Function", () => {
    ship.hit()
    expect(ship.timesHit).toBe(2);
  });

  test("Hit Function", () => {
    ship.hit()
    expect(ship.timesHit).toBe(3);
  });


});
