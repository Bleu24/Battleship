import { Router } from "../router.js";
import { EventListener } from "../classes/EventListener.js";
import { GameService } from "../services/GameService.js";
import { SessionService } from "../services/SessionService.js";

// TODO: Add difficulty, pvp, and pvai
export const Wizard = () => {
  const gameMode = GameService.getMode();

  if (gameMode === "pvp") {
    const container = document.createElement("div");

    const prompt1 = document.createElement("label");
    const input1 = document.createElement("input");
    prompt1.className = "wizard__prompt";
    prompt1.setAttribute("for", "username1");
    input1.id = "username1";
    input1.name = "userName1";
    prompt1.textContent = "Enter Player 1 username";
    input1.placeholder = "e.g. Player 1";

    const prompt2 = document.createElement("label");
    const input2 = document.createElement("input");
    prompt2.className = "wizard__prompt";
    prompt2.setAttribute("for", "username2");
    input2.id = "username2";
    input2.name = "userName2";
    prompt2.textContent = "Enter Player 2 username";
    input2.placeholder = "e.g. Player 2";

    container.className = "wizard";

    container.append(prompt1, input1, prompt2, input2);

    container.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        if (!input1.value) {
          input1.setCustomValidity("Username can't be empty!");
          input1.reportValidity();
          return;
        }
        if (!input2.value) {
          input2.setCustomValidity("Username can't be empty!");
          input2.reportValidity();
          return;
        }

        const userId1 = crypto.randomUUID();
        const userName1 = input1.value;
        const userId2 = crypto.randomUUID();
        const userName2 = input2.value;

        input1.setCustomValidity("");
        input2.setCustomValidity("");
        container.remove();

        EventListener.once("game:start", (data) => {
          GameService.createPlayer(data.p1.id, data.p1.username);
          GameService.createPlayer(data.p2.id, data.p2.username);
          SessionService.saveSessionId(data.p1.id);
          Router.route("strategy");

          const player = GameService.getPlayer(data.p1.id);
          EventListener.emit("scene:strategy", player);
        });

        EventListener.emit("game:start", {
          p1: { username: userName1, id: userId1 },
          p2: { username: userName2, id: userId2 },
        });
      } else {
        input1.setCustomValidity("");
        input2.setCustomValidity("");
      }
    });

    return container;
  }

  if (gameMode === "pvai") {
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
  }
};
