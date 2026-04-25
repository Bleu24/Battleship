import { createBoard } from "./board.js";

export const Home = (function () {
  const bg = document.createElement("div");
  const p1_board = createBoard();

  p1_board.className = "p1 board";
  bg.className = "app";

  bg.appendChild(p1_board);

  return bg;
})();
