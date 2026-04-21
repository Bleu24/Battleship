import { Ship } from "../classes/Ship";
import { Gameboard } from "../classes/Gameboard.js";

describe("Gameboard Suite", () => {
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
});
