import { GameService } from "../services/GameService.js";

export const createBoard = (hover = false) => {
  const container = document.createElement("div");
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

  const renderBoard = (boardState, boardEl) => {
    for (let x = 0; x < boardState.length; x++) {
      for (let y = 0; y < boardState[x].length; y++) {
        const cellEl = boardEl.querySelector(
          `.cell[data-x="${x}"][data-y="${y}"]`
        );

        if (!cellEl) continue;

        const hasShip = boardState[x][y].ship !== null;
        cellEl.classList.toggle("has-ship", hasShip);
      }
    }
  };

  const highlight = (cell, orientation, shipLength) => {
    const anchor = { x: parseInt(cell.dataset.x), y: parseInt(cell.dataset.y) };
    const cells = [];

    if (orientation === "horizontal") {
      for (let i = 0; i < shipLength; i++) {
        const c = container.querySelector(
          `.cell[data-x="${anchor.x}"][data-y="${anchor.y + i}"]`
        );
        if (!c) break;
        cells.push(c);
      }

      for (const cell of cells) {
        if (cells.length !== shipLength) {
          cell.style.backgroundColor = "red";
        } else {
          cell.style.backgroundColor = "gray";
        }
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
      if (cells.length !== shipLength) {
        cell.style.backgroundColor = "red";
      } else {
        cell.style.backgroundColor = "gray";
      }
    }
  };

  const undoHighlight = (cell, orientation, shipLength) => {
    const anchor = { x: parseInt(cell.dataset.x), y: parseInt(cell.dataset.y) };
    const cells = [];

    if (orientation === "horizontal") {
      for (let i = 0; i < shipLength; i++) {
        const c = container.querySelector(
          `.cell[data-x="${anchor.x}"][data-y="${anchor.y + i}"]`
        );
        if (!c) break;
        cells.push(c);
      }

      for (const cell of cells) {
        cell.style.backgroundColor = "black";
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
      cell.style.backgroundColor = "white";
    }
  };

  container.addEventListener("pointerover", (e) => {
    if (hover) {
      const cell = e.target.closest(".cell");
      const orientation =
        document.querySelector("[data-orientation]")?.dataset.orientation;
      const ship = document.querySelector("[data-selected=\"true\"]")?.dataset
        .ship;
      const shipLength = ship ? GameService.getShipsDict()[ship] : 0;

      if (!cell) return;
      highlight(cell, orientation, shipLength);
    }
  });

  container.addEventListener("pointerout", (e) => {
    if (hover) {
      const cell = e.target.closest(".cell");
      const orientation =
        document.querySelector("[data-orientation]")?.dataset.orientation;
      const ship = document.querySelector("[data-selected=\"true\"]")?.dataset
        .ship;
      const shipLength = ship ? GameService.getShipsDict()[ship] : 0;

      if (!cell) return;
      undoHighlight(cell, orientation, shipLength);
    }
  });

  container.addEventListener("click", (e) => {
    const cell = e.target.closest(".cell");
    const coords = { x: parseInt(cell.dataset.x), y: parseInt(cell.dataset.y) };


  });

  return container;
};
