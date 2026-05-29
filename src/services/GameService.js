import { Ship } from "../classes/Ship.js";
import { Engine } from "../core/engine.js";

export const GameService = (function () {
  const getActivePlayer = () => Engine.getActivePlayer();

  const createPlayer = (id, name) => {
    Engine.createPlayer(id, name);
  };

  const getShipsDict = () => Engine.getState().ships;

  const getPlayer = (id) => Engine.getLocalPlayer(id);

  const getBoard = (id) => Engine.getBoard(id);

  const placeShip = (gameboard, ship, x, y, orientation) => {
    gameboard.place(ship, x, y, orientation);
  };

  const createShip = (shipType) => {
    const length = getShipsDict()[shipType];
    return new Ship(length);
  };

  return {
    getActivePlayer,
    createPlayer,
    getShipsDict,
    getPlayer,
    getBoard,
    placeShip,
    createShip
  };
})();
