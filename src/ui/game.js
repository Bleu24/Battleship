import { createBoard } from "./board.js";

export const Game = (function () {
  const p1_board = createBoard();

  p1_board.className = "p1 board";

  return p1_board;
})();
