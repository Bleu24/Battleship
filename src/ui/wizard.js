import { Router } from "../router.js";
import { EventListener } from "../classes/EventListener.js";
import { GameService } from "../services/GameService.js";
import { SessionService } from "../services/SessionService.js";

// TODO: Add difficulty, pvp, and pvai
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
    if (e.key === "Enter") {
      if (!input.value) {
        input.setCustomValidity("Username can't be empty!");
        input.reportValidity();
        return;
      }

      const userId = crypto.randomUUID();
      const userName = input.value;
      input.setCustomValidity("");
      container.remove();

      EventListener.once("game:start", (data) => {
        GameService.createPlayer(data.id, data.username);
        SessionService.saveSessionId(data.id);
        Router.route("strategy");

        const player = GameService.getPlayer(data.id);
        EventListener.emit("scene:strategy", player);
      });

      EventListener.emit("game:start", { username: userName, id: userId });
    } else {
      input.setCustomValidity("");
    }
  });

  return container;
})();
