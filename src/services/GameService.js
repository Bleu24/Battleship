import { Engine } from "../core/engine.js";

export const GameService = (function () {
  const getActivePlayer = () => Engine.getActivePlayer();

  const createPlayer = (id, name) => {
    Engine.createPlayer(id, name);
  };

  const getShipsDict = () => Engine.getState().ships;

  const getPlayer = (id) => Engine.getLocalPlayer(id);

  return {
    getActivePlayer,
    createPlayer,
    getShipsDict,
    getPlayer
  };
})();
