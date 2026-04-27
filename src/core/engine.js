import { EventListener } from "../classes/EventListener.js";
import { Gameboard } from "../classes/Gameboard.js";
import { Player } from "../classes/Player.js";
import { Ship } from "../classes/Ship.js";

export const engine = (function () {
  const game = {
    player1: null,
    player2: null,
    ships: {
      carrier: 5,
      battleship: 4,
      cruiser: 3,
      submarine: 3,
      destroyer: 2,
    },
  };

  const start = () => {
    game.player1 = new Player("Breezus");
    game.player2 = new Player("AI");

  };

  return {
    start,
  };
})();
