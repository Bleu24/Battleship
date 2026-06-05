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

  test("Receive attack", () => {
    const gameboard = new Gameboard();
    const carrier = new Ship(5);

    gameboard.place(carrier, 0, 0, "horizontal");

    expect(gameboard.receiveAttack(0, 0)).toBeTruthy();
    expect(carrier.getHealth()).toBe(4);
  });

  test("Receive attack (same ship, different coords)", () => {
    const gameboard = new Gameboard();
    const frigate = new Ship(4);
    gameboard.place(frigate, 0, 0, "vertical");

    // initial hit (successful)
    gameboard.receiveAttack(0, 0); // health should be 3
    gameboard.receiveAttack(3, 0);
    expect(frigate.getHealth()).toBe(2);
  });

  test("Get ships on board", () => {
    const gameboard = new Gameboard();
    const boat2 = new Ship(2);
    const boat = new Ship(1);

    gameboard.place(boat2, 6, 5, "horizontal");
    gameboard.place(boat, 0, 0, "vertical");
    expect(gameboard.getAllShips().length).toBe(2);
    expect(gameboard.isOccupied(6, 5)).toBeTruthy();
  });

  test("Get no. of ships (no duplicate)", () => {
    const gameboard = new Gameboard();
    const boat2 = new Ship(2);

    gameboard.place(boat2, 6, 5, "horizontal");
    gameboard.place(boat2, 1, 1, "vertical");

    expect(gameboard.getAllShips().length).toBe(1); // still one
  });

  test("Sink boat", () => {
    const gameboard = new Gameboard();
    const boat = new Ship(1);
    gameboard.place(boat, 0, 0, "horizontal");

    gameboard.receiveAttack(0, 0);
    expect(boat.isSunk()).toBeTruthy();
  });

  test("Get Sunken boat", () => {
    const gameboard = new Gameboard();
    const boat = new Ship(1);
    gameboard.place(boat, 0, 0, "horizontal");

    gameboard.receiveAttack(0, 0);
    expect(gameboard.getAllSunkenShips().length).toBe(1);
  });

  test("Get board size", () => {
    const gameboard = new Gameboard();
    expect(gameboard.size).toBe(100);
  });

  test("Remove ship from the board entirely", () => {
    const gameboard = new Gameboard();
    const carrier = new Ship(2);

    gameboard.place(carrier, 0, 0, "horizontal");

    expect(gameboard.isOccupied(0, 0)).toBeTruthy();
    expect(gameboard.isOccupied(0, 1)).toBeTruthy();

    gameboard.remove(carrier);

    expect(gameboard.isOccupied(0, 0)).toBeFalsy();
    expect(gameboard.isOccupied(0, 1)).toBeFalsy();
    expect(gameboard.size).toBe(100);
  });

  test("can place ship", () => {
    const gameboard = new Gameboard();
    const carrier = new Ship(5);
    const destroyer = new Ship(2);

    gameboard.place(carrier, 0, 0, "horizontal");

    expect(gameboard.canPlace(destroyer, 0, 0, "vertical")).toBeFalsy(); // at first loop returns false immediately
    expect(gameboard.canPlace(destroyer, 1, 0, "vertical")).toBeTruthy();
    expect(gameboard.canPlace(destroyer, 0, 9, "horizontal")).toBeFalsy(); // out of bounds
    expect(gameboard.canPlace(carrier, 6, 0, "vertical")).toBeFalsy(); // out of bounds
  });

  test("randomize ship placement", () => {
    const gameboard = new Gameboard();
    gameboard.randomize();
    const expected = [
      { length: 5, timesHit: 0, type: "carrier" },
      { length: 4, timesHit: 0, type: "battleship" },
      { length: 3, timesHit: 0, type: "cruiser" },
      { length: 3, timesHit: 0, type: "submarine" },
      { length: 2, timesHit: 0, type: "destroyer" },
    ];

    const actual = gameboard.getAllShips();

    expect(actual.length).toBe(5);

    // AI generated test code
    expect(actual).toEqual(
      expect.arrayContaining(expected.map((s) => expect.objectContaining(s)))
    );
  });

});
