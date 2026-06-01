import { cloneDeep } from "lodash";
import { Ship } from "../classes/Ship.js";
import { Engine } from "../core/engine.js";

export const GameService = (function () {
  const getActivePlayer = () => Engine.getActivePlayer();

  const createPlayer = (id, name) => {
    Engine.createPlayer(id, name);
  };

  const getShipsDict = () => Engine.getState().ships;

  const getPlayer = (id) => Engine.getLocalPlayer(id);

  const getBoard = (id) => cloneDeep(Engine.getBoard(id));

  const placeShip = (id, ship, x, y, orientation) => {
    const gameboard = Engine.getBoard(id);
    gameboard.place(ship, x, y, orientation);
  };

  const createShip = (shipType) => {
    const length = Engine.getState().ships[shipType];
    return new Ship(length);
  };

  const isOccupied = (id, x, y) => {
    const gameboard = getBoard(id);
    return gameboard.isOccupied(x, y);
  };

  const getAllShips = (id) => {
    const gameboard = getBoard(id);
    return cloneDeep(gameboard.getAllShips());
  };

  const removeShip = (id, ship) => {
    const gameboard = Engine.getBoard(id);
    gameboard.remove(ship);
  };

  return {
    getActivePlayer,
    createPlayer,
    getShipsDict,
    getPlayer,
    getBoard,
    placeShip,
    createShip,
    isOccupied,
    getAllShips,
    removeShip
  };
})();
