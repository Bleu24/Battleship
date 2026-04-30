import { createBoard } from "./board.js";

export const Game = (function () {
  const stage = document.createElement("div");
  const p1_board = createBoard();
  const p2_board = createBoard();

  stage.className = "stage";
  p1_board.className = "p1 board";
  p2_board.className = "p2 board";

  stage.append(p1_board, p2_board);
  return stage;
})();
