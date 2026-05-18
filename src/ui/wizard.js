import { Engine } from "../core/engine.js";
import { Router } from "../router.js";
import { EventListener } from "../classes/EventListener.js";
import { GameService } from "../services/GameService.js";

export const Wizard = (function () {
  const container = document.createElement("div");
  const prompt = document.createElement("label");
  const input = document.createElement("input");

  container.className = "wizard";
  prompt.className = "wizard__prompt";
  prompt.setAttribute("for", "username");
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
      const userName = input.value;
      input.setCustomValidity("");
      container.remove();

      EventListener.once("game:start", (data) => {
        GameService.createPlayer(data.username);
        Router.route("strategy");
        EventListener.emit("scene:strategy");
      });

      EventListener.emit("game:start", { username: userName});
    } else {
      input.setCustomValidity("");
    }
  });

  return container;
})();
