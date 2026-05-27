import { cloneDeep } from "lodash";
import { EventListener } from "../classes/EventListener.js";
import { Gameboard } from "../classes/Gameboard.js";
import { Player } from "../classes/Player.js";
import { Ship } from "../classes/Ship.js";
import { SessionService } from "../services/SessionService.js";


export const Engine = (function () {
  const game = {
    ships: {
      carrier: 5,
      battleship: 4,
      cruiser: 3,
      submarine: 3,
      destroyer: 2,
    },
    players: [null, null],
    currentIndex: 0,
  };

  const getState = () => cloneDeep(game);
  const getActivePlayer = () => cloneDeep(game.players[game.currentIndex]);

  const createPlayer = (id, name) => {
    const player = new Player(id, name);
    SessionService.saveSessionId(player.id);
    if (!game.players[0]) game.players[0] = player;
    else game.players[1] = player;
  };

  const getLocalPlayer = (id) => {
    for (const player of game.players) {
      if (player.id === id) {
        return player
      }
    }
  }

  return {
    getState,
    getActivePlayer,
    createPlayer,
    getLocalPlayer
  };
})();
