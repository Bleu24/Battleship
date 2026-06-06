import { cloneDeep } from "lodash";
import { Player } from "../classes/Player.js";


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
    if (!game.players[0]) game.players[0] = player;
    else game.players[1] = player;
  };

  const getLocalPlayer = (id) => {
    for (const player of game.players) {
      if (player.id === id) {
        return player;
      }
    }
  };

  const getBoard = (id) => {
    for (const player of game.players) {
      if (player.id === id) {
        return player.gameboard;
      }
    }
  };


  return {
    getState,
    getActivePlayer,
    createPlayer,
    getLocalPlayer,
    getBoard
  };
})();
