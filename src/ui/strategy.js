import { createBoard } from "./board.js";
import { engine } from "../core/engine.js";

export const Strategy = (function () {

  const stage = document.createElement("div");
  const board = createBoard();
  const arsenal = document.createElement("div");

  stage.className = "strategy";
  arsenal.className = "arsenal";

  const ships = engine.getState().ships;

  for (const key in ships) {
    const button = document.createElement("button");
    button.className = `arsenal__btn`;
    button.dataset.ship = key;

    arsenal.appendChild(button);
  }

  stage.append(arsenal, board);

  arsenal.addEventListener("click", (e) => {
    const type = e.target.closest(".arsenal__btn").dataset.ship;

    switch (type) {
      case "carrier":
        // handle carrier selection
        break;
      case "battleship":
        // handle battleship selection
        break;
      case "cruiser":
        // handle cruiser selection
        break;
      case "submarine":
        // handle submarine selection
        break;
      case "destroyer":
        // handle destroyer selection
        break;
      default:
        // handle unknown type
        break;
    }
  });
})();
