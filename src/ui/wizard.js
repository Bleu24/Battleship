import { Game } from "./game.js";
import { engine } from "../core/engine.js";

export const Wizard = (function () {
  const container = document.createElement("div");
  const prompt = document.createElement("label");
  const input = document.createElement("input");

  container.className = "wizard";
  prompt.className = "wizard__prompt";
  prompt.for = "username";
  input.id = "username";
  input.name = "userName";

  prompt.textContent = "Enter your username";
  input.placeholder = "e.g. Breezus";

  container.append(prompt, input);

  container.addEventListener("keyup", (e) => {
    const app = document.querySelector(".app");
    if (e.key === "Enter") {
      if (!input.value) {
        input.setCustomValidity("Username can't be empty!");
        input.reportValidity();
        return;
      }
      input.setCustomValidity("");
      container.remove();
      app.appendChild(Game);
      engine.start();
    } else {
      input.setCustomValidity("");
    }
  });

  return container;
})();
