import { Ship } from "../classes/Ship";

describe("Ship suite", () => {
  const ship = new Ship(3);

  test("Hit Function", () => {
    ship.hit();
    expect(ship.timesHit).toBe(1);
  });

  test("isSunk Function", () => {
    expect(ship.isSunk()).toBeFalsy();
  });

  test("Hit Function", () => {
    ship.hit();
    expect(ship.timesHit).toBe(2);
  });

  test("isSunk Function", () => {
    expect(ship.isSunk()).toBeFalsy();
  });

  test("Hit Function", () => {
    ship.hit();
    expect(ship.timesHit).toBe(3);
  });

  test("isSunk Function", () => {
    expect(ship.isSunk()).toBeTruthy();
  });

});
