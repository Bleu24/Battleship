import { Engine } from "../core/engine.js";
import { Player } from "../classes/Player.js";


export const GameService = (function () {
  const getActivePlayer = () => Engine.getActivePlayer();

  const createPlayer = (name) => {
    Engine.createPlayer(name);
  };

  return {
    createPlayer,
    getActivePlayer,
  };
})();
