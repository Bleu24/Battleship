import { EventListener } from "../classes/EventListener.js";
import { Player } from "../classes/Player.js";
import { GameService } from "../services/GameService.js";
import { createBoard, renderBoard } from "./board.js";

// NOTE: p1 is the human player (for now)
export const Game = (function () {
  const stage = document.createElement("div");
  const p1_board = createBoard();
  const p2_board = createBoard();

  // TODO: integrate logic depending on game mode
  EventListener.subscribe("game:start", (player) => {

    if (player instanceof Array) {
      const [player1, player2] = player;
      p1_board.id = player1.id;
      p1_board.dataset.playerName = player1.name;
      p2_board.id = player2.id;
      p2_board.dataset.playerName = player2.name;

      const gameboard = GameService.getBoard(player1.id);
      renderBoard(gameboard, p1_board);

      return;
    }

    if (!(player instanceof Player)) return;

    const gameboard = GameService.getBoard(player.id);
    p1_board.id = player.id;
    p1_board.dataset.playerName = player.name;
    renderBoard(gameboard, p1_board);

    EventListener.emit("player:create", p2_board);
    EventListener.emit("engine:start", { player, p1_board });
  });

  stage.className = "stage";
  p1_board.className = "p1 board";
  p2_board.className = "p2 board";

  stage.append(p1_board, p2_board);
  return stage;
})();
