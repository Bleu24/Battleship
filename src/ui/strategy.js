import { createBoard } from "./board.js";
import { GameService } from "../services/GameService.js";
import { EventListener } from "../classes/EventListener.js";
import { Router } from "../router.js";

export const Strategy = () => {
  const stage = document.createElement("div");
  const boardLabel = document.createElement("h2");
  const boardContainer = document.createElement("div");
  const board = createBoard(true);
  const arsenal = document.createElement("div");
  const orientationBtn = document.createElement("button");

  const subs = [];

  const sub = (event, fun) => {
    EventListener.subscribe(event, fun);
    subs.push({ event, fun });
  };

  stage.className = "strategy";
  boardLabel.className = "strategy__label";
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

  boardContainer.append(boardLabel, board);
  stage.append(arsenal, boardContainer);

  arsenal.addEventListener("click", (e) => {
    const type = e.target.closest(".arsenal__btn");
    const lastSelected = arsenal.querySelector("[data-selected]");
    const removeBtn = arsenal.querySelector(".remove");

    if (!type) return;

    if (type.classList.contains("remove")) {
      if (lastSelected) lastSelected.removeAttribute("data-selected");
      const isEnabled = !JSON.parse(type.dataset.enabled);
      type.dataset.enabled = isEnabled;
      EventListener.emit("remove:clicked", isEnabled);
      return;

    }

    if (type.classList.contains("finalize")) {
      if (GameService.getMode() === "pvai") {
        Router.route("game");
        EventListener.emit("game:start", GameService.getPlayer(board.id));
      } else if (GameService.getMode() === "pvp") {
        const [player1, player2] = GameService.getPlayers();
        const bothHaveShips = (GameService.getAllShips(player1.id).length === 5 && GameService.getAllShips(player2.id).length === 5);

        if (bothHaveShips) {
          Router.route("game");
          EventListener.emit("game:start", [player1, player2]);
        } else {
          Router.route("Strategy");
          EventListener.emit("scene:strategy", player2);
        }

      }
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

    // if removeBtn is present and not used set everything to false
    if (removeBtn) {
      removeBtn.dataset.enabled = false;
      EventListener.emit("remove:disable");

    }

    type.dataset.selected = true;
  });

  EventListener.once("scene:strategy", (player) => {
    board.dataset.playerName = player.name;
    board.id = player.id;
    boardLabel.textContent = `${player.name}'s Board`;
  });

  sub("board:place", () => {
    const shipBtns = arsenal.querySelectorAll(".arsenal__btn[data-ship]");
    const filtered = Array.from(shipBtns).filter(btn => !(btn.hasAttribute("data-selected")));
    const removeBtn = arsenal.querySelector(".remove") || document.createElement("button");

    if (!removeBtn.classList.contains("remove")) {
      removeBtn.className = "arsenal__btn";
      removeBtn.classList.add("remove");
      removeBtn.dataset.enabled = false;
      removeBtn.textContent = "Remove";
    }

    arsenal.replaceChildren(...filtered, orientationBtn, removeBtn);
  });

  // Restores button of the ship removed
  sub("ship:remove", (removedShip) => {
    const shipBtns = Array.from(arsenal.querySelectorAll(".arsenal__btn[data-ship"));
    const removeBtn = arsenal.querySelector(".remove");
    const restoredBtn = document.createElement("button");
    const finalizeBtn = arsenal.querySelector(".finalize") || null;
    const [first, ...rest] = removedShip.type.split("");

    if (finalizeBtn) arsenal.removeChild(finalizeBtn);


    restoredBtn.textContent = `${first.toUpperCase() + rest.join("")}`;
    restoredBtn.className = "arsenal__btn";
    restoredBtn.dataset.ship = removedShip.type;

    shipBtns.unshift(restoredBtn);

    arsenal.replaceChildren(...shipBtns, orientationBtn, removeBtn);
  });

  sub("board:empty", () => {
    const removeBtn = arsenal.querySelector(".arsenal__btn.remove");
    const isEnabled = false;
    removeBtn.dataset.enabled = isEnabled;
    EventListener.emit("remove:clicked", isEnabled);
    removeBtn.remove();
  });

  sub("board:finalize", () => {
    const finalizeBtn = document.createElement("button");
    finalizeBtn.className = "arsenal__btn finalize";

    finalizeBtn.textContent = "Finalize";

    arsenal.appendChild(finalizeBtn);
  });

  stage.clearsubs = () => {
    subs.forEach(({ event, fun }) => {
      EventListener.unsubscribe(event, fun);
    });
  };

  return stage;
};
