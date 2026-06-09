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
    return new Ship(length, shipType);
  };

  const isOccupied = (id, x, y) => {
    const gameboard = getBoard(id);
    return gameboard.isOccupied(x, y);
  };

  const getAllShips = (id) => {
    const gameboard = getBoard(id);
    return cloneDeep(gameboard.getAllShips());
  };

  const getShip = (id, x, y) => {
    // use actual gameboard since ships don't have identifiers
    const gameboard = Engine.getBoard(id);
    return gameboard.getShipFromCoordinate(x,y);

  };

  const removeShip = (id, ship) => {
    const gameboard = Engine.getBoard(id);
    gameboard.remove(ship);
  };

  const receiveAttack = (id, x, y) => {
    const gameboard = Engine.getBoard(id);
    gameboard.receiveAttack(x, y);
  };

  const setMode = (mode) => Engine.setMode(mode);
  const getMode = () => Engine.getMode();

  const changeTurn = () => Engine.changeTurn();



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
    getShip,
    removeShip,
    receiveAttack,
    setMode,
    getMode,
    changeTurn
  };
})();
