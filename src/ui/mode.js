import { GameService } from "../services/GameService.js";
import { Router } from "../router.js";

export const Mode = (function () {
  const container = document.createElement("div");
  const modal = document.createElement("div");
  const heading = document.createElement("h1");
  const btnContainer = document.createElement("div");
  const btnNames = ["PvP", "PvAI"];

  container.className = "mode";
  modal.className = "modal";
  heading.className = "modal__heading";

  heading.textContent = "Choose Game Mode";

  modal.appendChild(heading);
  modal.appendChild(btnContainer);

  for (const btnName of btnNames) {
    const btn = document.createElement("button");
    btn.textContent = btnName;
    btn.className = `mode ${btnName.toLowerCase()}`;

    btnContainer.append(btn);
  }

  modal.addEventListener("click", (e) => {
    e.stopPropagation();

    const btn = e.target.closest(".mode");

    if (btn.classList.contains("pvp")) {
      GameService.setMode("pvp");
    }

    if (btn.classList.contains("pvai")) {
      GameService.setMode("pvai");
    }

    Router.route("Wizard");

  });

  container.appendChild(modal);

  return container;
})();
