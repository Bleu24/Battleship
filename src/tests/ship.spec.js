import { Ship } from "../classes/Ship";

describe("Ship suite", () => {
  const ship = new Ship();

  test("Hit Function", () => {
    expect(ship.hit()).toBe(1);
  });

  test("Hit Function", () => {
    expect(ship.hit()).toBe(2);
  });

  test("Hit Function", () => {
    expect(ship.hit()).toBe(3);
  });


});
