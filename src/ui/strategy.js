import { createBoard } from "./board.js";
import { GameService } from "../services/GameService.js";
import { EventListener } from "../classes/EventListener.js";

export const Strategy = (function () {
  const stage = document.createElement("div");
  const boardContainer = document.createElement("div");
  const board = createBoard(true);
  const arsenal = document.createElement("div");
  const orientationBtn = document.createElement("button");

  stage.className = "strategy";
  arsenal.className = "arsenal";
  boardContainer.className = "boardContainer";
  orientationBtn.className = "arsenal__btn";

  orientationBtn.textContent = "Horizontal";
  orientationBtn.dataset.orientation = "horizontal";

  const ships = GameService.getShipsDict();

  for (const key in ships) {
    const button = document.createElement("button");
    button.className = `arsenal__btn`;
    button.dataset.ship = key;

    const [firstLetter, ...rest] = key.split("");

    button.textContent = `${firstLetter.toUpperCase() + rest.join("")}`;
    arsenal.appendChild(button);
  }

  arsenal.appendChild(orientationBtn);

  boardContainer.appendChild(board);
  stage.append(arsenal, boardContainer);

  arsenal.addEventListener("click", (e) => {
    const type = e.target.closest(".arsenal__btn");
    const lastSelected = document.querySelector("[data-selected]");

    if (!type) return;

    if (type.classList.contains("remove")) {
      if (lastSelected) lastSelected.removeAttribute("data-selected");
      const isEnabled = !JSON.parse(type.dataset.enabled);
      type.dataset.enabled = isEnabled;
      EventListener.emit("remove:clicked", isEnabled);
      return;

    }

    if (type.hasAttribute("data-orientation")) {
      if (type.textContent === "Horizontal") {
        type.textContent = "Vertical";
        type.dataset.orientation = "vertical";
      } else {
        type.textContent = "Horizontal";
        type.dataset.orientation = "horizontal";
      }
      return;
    }

    if (lastSelected) lastSelected.removeAttribute("data-selected");
    type.dataset.selected = true;
  });

  EventListener.subscribe("scene:strategy", (player) => {
    board.dataset.playerName = player.name;
    board.id = player.id;
  });

  EventListener.subscribe("board:place", () => {
    const shipBtns = document.querySelectorAll(".arsenal__btn[data-ship]");
    const filtered = Array.from(shipBtns).filter(btn => !(btn.hasAttribute("data-selected")));
    const removeBtn = document.querySelector(".remove") || document.createElement("button");

    if (!removeBtn.classList.contains("remove")) {
      removeBtn.className = "arsenal__btn";
      removeBtn.classList.add("remove");
      removeBtn.dataset.enabled = false;
      removeBtn.textContent = "Remove";
    }

    arsenal.replaceChildren(...filtered, orientationBtn, removeBtn);
  });

  EventListener.subscribe("board:remove", () => {

  });

  return stage;
})();
