import { EventListener } from "../classes/EventListener.js";
import { GameService } from "../services/GameService.js";

export const renderBoard = (gameboard, boardEl) => {
  for (let x = 0; x < gameboard.board.length; x++) {
    for (let y = 0; y < gameboard.board[x].length; y++) {
      const cellEl = boardEl.querySelector(
        `.cell[data-x="${x}"][data-y="${y}"]`,
      );

      if (!cellEl) continue;

      const hasShip = gameboard.isOccupied(x, y);
      cellEl.classList.toggle("has-ship", hasShip);
      cellEl.classList.remove("hovered");
    }
  }
};

export const createBoard = (strategy = false) => {
  const container = document.createElement("div");
  let valid = true;
  let remove = false;
  container.className = "board";

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.x = i;
      cell.dataset.y = j;

      container.appendChild(cell);
    }
  }

  const highlight = (cell, orientation, shipLength) => {
    const id = document.querySelector(".board")?.id;
    const anchor = { x: parseInt(cell.dataset.x), y: parseInt(cell.dataset.y) };
    const cells = [];
    valid = true;

    if (orientation === "horizontal") {
      for (let i = 0; i < shipLength; i++) {
        const c = container.querySelector(
          `.cell[data-x="${anchor.x}"][data-y="${anchor.y + i}"]`,
        );

        if (!c) {
          valid = false;
          break;
        }

        if (GameService.isOccupied(id, parseInt(c.dataset.x), parseInt(c.dataset.y))) {
          valid = false;
        };

        cells.push(c);
      }

      for (const cell of cells) {
        cell.classList.add("hovered");
        if (!valid) cell.classList.add("invalid");
      }
    } else if (orientation === "vertical") {
      for (let i = 0; i < shipLength; i++) {
        const c = container.querySelector(
          `.cell[data-x="${anchor.x + i}"][data-y="${anchor.y}"]`,
        );

        if (!c) {
          valid = false;
          break;
        }

        if (GameService.isOccupied(id, parseInt(c.dataset.x), parseInt(c.dataset.y))) {
          valid = false;
        };

        cells.push(c);
      }
    }
    for (const cell of cells) {
      cell.classList.add("hovered");
      if (!valid) cell.classList.add("invalid");
    }
  };

  const undoHighlight = (cell, orientation, shipLength) => {
    const anchor = { x: parseInt(cell.dataset.x), y: parseInt(cell.dataset.y) };
    const cells = [];


    if (orientation === "horizontal") {
      for (let i = 0; i < shipLength; i++) {
        const c = container.querySelector(
          `.cell[data-x="${anchor.x}"][data-y="${anchor.y + i}"]`,
        );

        if (!c) break;

        cells.push(c);
      }

      for (const cell of cells) {
        cell.classList.remove("hovered", "invalid");
      }

    } else if (orientation === "vertical") {
      for (let i = 0; i < shipLength; i++) {
        const c = container.querySelector(
          `.cell[data-x="${anchor.x + i}"][data-y="${anchor.y}"]`,
        );

        if (!c) break;

        cells.push(c);
      }
    }
    for (const cell of cells) {
      cell.classList.remove("hovered", "invalid");
    }
  };

  if (strategy) {
    container.addEventListener("pointerover", (e) => {
      const cell = e.target.closest(".cell");
      const orientation = document.querySelector("[data-orientation]")?.dataset.orientation;
      const ship = document.querySelector("[data-selected=\"true\"]")?.dataset.ship;
      const shipLength = ship ? GameService.getShipsDict()[ship] : 0;

      if (!cell) return;
      highlight(cell, orientation, shipLength);
    });

    container.addEventListener("pointerout", (e) => {
      const cell = e.target.closest(".cell");
      const orientation = document.querySelector("[data-orientation]")?.dataset.orientation;
      const ship = document.querySelector("[data-selected=\"true\"]")?.dataset.ship;
      const shipLength = ship ? GameService.getShipsDict()[ship] : 0;

      if (!cell) return;
      undoHighlight(cell, orientation, shipLength);
    });
  }

  container.addEventListener("click", (e) => {
    const board = document.querySelector(".board");
    const cell = e.target.closest(".cell");

    // Crashes when holding the click and dragging it to other cell
    if (!cell) return;

    const coords = { x: parseInt(cell.dataset.x), y: parseInt(cell.dataset.y) };

    // If strategy mode is enabled
    if (strategy) {
      // Assumes there is atleast one ship available and remove is set to true
      if (remove && GameService.isOccupied(board.id, coords.x, coords.y)) {
        // targetShip uses actual object reference since there is no identifier
        const targetShip = GameService.getShip(board.id, coords.x, coords.y);
        GameService.removeShip(board.id, targetShip);
        const gameboard = GameService.getBoard(board.id);
        renderBoard(gameboard, board);
        EventListener.emit("ship:remove", targetShip);

        if (GameService.getAllShips(board.id).length === 0) EventListener.emit("board:empty");

        return;
      }

      const shipType = document.querySelector("[data-selected=\"true\"]")?.dataset.ship;
      const ship = GameService.createShip(shipType);
      const orientation = document.querySelector("[data-orientation]")?.dataset.orientation;

      if (!shipType) return;

      if (GameService.isOccupied(board.id, coords.x, coords.y)) {
        console.error(`cell: ${coords.x}, ${coords.y} is already occupied`);
        return;
      }

      if (!valid) {
        console.error("Invalid move! Try again");
        return;
      }

      GameService.placeShip(board.id, ship, coords.x, coords.y, orientation);
      const gameboard = GameService.getBoard(board.id);
      renderBoard(gameboard, board);
      if (GameService.getAllShips(board.id).length > 0) EventListener.emit("board:place");

      if (GameService.getAllShips(board.id).length === 5) EventListener.emit("board:finalize");

    }


    // TODO: write a spec for attack
  });


  EventListener.subscribe("remove:clicked", (isEnabled) => remove = isEnabled);
  EventListener.subscribe("remove:disable", () => remove = false);

  return container;
};
