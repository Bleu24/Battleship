import { EventListener } from "../classes/EventListener.js";
import { Gameboard } from "../classes/Gameboard.js";
import { Player } from "../classes/Player.js";
import { Ship } from "../classes/Ship.js";

export const engine = (function () {
  const game = { player1: null, player2: null };

  const start = () => {
    players.push(new Player("Breezus"), new Player("AI"));

  };

  return {
    start,
  };
})();
