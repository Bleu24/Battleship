import { Ship } from "../classes/Ship";
import { Gameboard } from "../classes/Gameboard.js";

describe("Gameboard Suite", () => {
  const gameboard = new Gameboard();

  test("Occupied cell", () => {
    const gameboard = new Gameboard();
    const carrier = new Ship(5);

    gameboard.place(carrier, 0, 0, "horizontal");

    expect(gameboard.isOccupied(0, 0)).toBeTruthy();
    expect(gameboard.isOccupied(0, 1)).toBeTruthy();
    expect(gameboard.isOccupied(0, 2)).toBeTruthy();
    expect(gameboard.isOccupied(0, 3)).toBeTruthy();
    expect(gameboard.isOccupied(0, 4)).toBeTruthy();
  });

  test("Receive attack", () => {
    const carrier = new Ship(5);

    gameboard.place(carrier, 0, 0, "horizontal");

    expect(gameboard.receiveAttack(0, 0)).toBeTruthy();
    expect(carrier.getHealth()).toBe(4);
  });

  test("Receive attack (same ship, different coords", () => {
    const frigate = new Ship(4);
    gameboard.place(frigate, 0, 0, "vertical");

    // initial hit (successful)
    gameboard.receiveAttack(0, 0); // health should be 3
    gameboard.receiveAttack(3, 0);
    expect(frigate.getHealth()).toBe(2);
  });
});
