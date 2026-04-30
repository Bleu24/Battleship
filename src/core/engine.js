import { cloneDeep } from "lodash";
import { EventListener } from "../classes/EventListener.js";
import { Gameboard } from "../classes/Gameboard.js";
import { Player } from "../classes/Player.js";
import { Ship } from "../classes/Ship.js";

export const engine = (function () {
  const game = {
    ships: {
      carrier: 5,
      battleship: 4,
      cruiser: 3,
      submarine: 3,
      destroyer: 2,
    },
    turn: null,
    players: [null, null]
  };

  const start = (name) => {
    game.players[0] = new Player(name);
    game.players[1] = new Player("AI");

    game.turn = game.players[0];

  };

  const getState = () => cloneDeep(game);

  return {
    start,
    getState
  };
})();
