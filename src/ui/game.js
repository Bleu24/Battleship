import { EventListener } from "../classes/EventListener.js";
import { GameService } from "../services/GameService.js";
import { createBoard, renderBoard } from "./board.js";

// NOTE: p1 is the human player (for now)
export const Game = (function () {
  const stage = document.createElement("div");
  const p1_board = createBoard();
  const p2_board = createBoard();

  EventListener.subscribe("game:start", (player) => {
    const gameboard = GameService.getBoard(player.id);
    p1_board.id = player.id;
    p1_board.dataset.playerName = player.name;
    renderBoard(gameboard, p1_board);
  });

  stage.className = "stage";
  p1_board.className = "p1 board";
  p2_board.className = "p2 board";

  stage.append(p1_board, p2_board);
  return stage;
})();
