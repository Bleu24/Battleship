import { EventListener } from "../classes/EventListener";
import { Gameboard } from "../classes/Gameboard";
import { Player } from "../classes/Player";
import { Ship } from "../classes/Ship";

export const engine = (function () {
  const game = { player1: null, player2: null };

  const start = () => {
    players.push(new Player("Breezus"), new Player("AI"));

  };

  return {
    start,
  };
})();
