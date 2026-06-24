import { EventListener } from "../classes/EventListener.js";
import { Player } from "../classes/Player.js";
import { GameService } from "../services/GameService.js";
import { createBoard, renderBoard } from "./board.js";

// NOTE: p1 is the human player (for now)
export const Game = (function () {
  const stage = document.createElement("div");
  const boardsContainer = document.createElement("div");
  const activePlayerLabel = document.createElement("h2");
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

      activePlayerLabel.textContent = `${player1.name}'s Turn`;

      const gameboard = GameService.getBoard(player1.id);
      renderBoard(gameboard, p1_board);

      return;
    }

    if (!(player instanceof Player)) return;

    const gameboard = GameService.getBoard(player.id);
    p1_board.id = player.id;
    p1_board.dataset.playerName = player.name;
    activePlayerLabel.textContent = `${player}'s Turn!`;
    renderBoard(gameboard, p1_board);

    EventListener.emit("player:create", p2_board);
    EventListener.emit("engine:start", { player, p1_board });
  });

  EventListener.subscribe("ui:update", (activePlayer) => {
    const passDeviceModal = document.createElement("div");
    passDeviceModal.className = "stage__passModal";

    passDeviceModal.textContent = "Pass Device (Press Space To Continue)!";
    passDeviceModal.tabIndex = 0;
    stage.replaceChildren(passDeviceModal, ...stage.children);
    passDeviceModal.focus();

    passDeviceModal.addEventListener("keyup", (e) => {
      if (e.key === " " || e.key === "Spacebar") {
        activePlayerLabel.textContent = `${activePlayer.name}'s Turn`;
        passDeviceModal.remove();
      }
    });

  });

  stage.className = "stage";
  boardsContainer.className = "stage__boardsContainer";
  activePlayerLabel.className = "stage__label";
  p1_board.className = "p1 board";
  p2_board.className = "p2 board";

  boardsContainer.append(p1_board, p2_board);
  stage.append(activePlayerLabel, boardsContainer);
  return stage;
})();
