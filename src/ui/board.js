import { EventListener } from "../classes/EventListener.js";
import { GameService } from "../services/GameService.js";

export const createBoard = (hover = false) => {
  const container = document.createElement("div");
  let valid = true;
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

  const renderBoard = (gameboard, boardEl) => {
    for (let x = 0; x < gameboard.board.length; x++) {
      for (let y = 0; y < gameboard.board[x].length; y++) {
        const cellEl = boardEl.querySelector(
          `.cell[data-x="${x}"][data-y="${y}"]`,
        );

        if (!cellEl) continue;

        const hasShip = gameboard.isOccupied(x, y);
        cellEl.classList.toggle("has-ship", hasShip);
      }
    }
  };

  const highlight = (cell, orientation, shipLength) => {
    const id = document.querySelector(".board")?.id;
    const gameboard = GameService.getBoard(id);
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

        if (GameService.isOccupied(gameboard, parseInt(c.dataset.x), parseInt(c.dataset.y))) {
          valid = false;
        };

        cells.push(c);
      }

      for (const cell of cells) {
        cell.style.backgroundColor = valid ? "gray" : "red";
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

        if (GameService.isOccupied(gameboard, parseInt(c.dataset.x), parseInt(c.dataset.y))) {
          valid = false;
        };

        cells.push(c);
      }
    }
    for (const cell of cells) {
      cell.style.backgroundColor = valid ? "gray" : "red";
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
        cell.removeAttribute("style");
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
      cell.removeAttribute("style");
    }
  };

  if (hover) {
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
    const gameboard = GameService.getBoard(board.id);
    const shipType = document.querySelector("[data-selected=\"true\"]")?.dataset.ship;
    const ship = GameService.createShip(shipType);
    const cell = e.target.closest(".cell");
    const coords = { x: parseInt(cell.dataset.x), y: parseInt(cell.dataset.y) };
    const orientation = document.querySelector("[data-orientation]")?.dataset.orientation;

    if (!gameboard) return;

    if (gameboard.isOccupied(coords.x, coords.y)) {
      console.error(`cell: ${coords.x}, ${coords.y} is already occupied`);
      return;
    }

    //TODO: If all ships are placed proceed to the actual game


    if (!valid) {
      console.error("Invalid move! Try again");
      return;
    }



    GameService.placeShip(gameboard, ship, coords.x, coords.y, orientation);
    renderBoard(gameboard, board);
    EventListener.emit("board:place");
  });

  return container;
};
