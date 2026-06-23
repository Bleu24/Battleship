import { Home } from "./ui/home.js";
import { Strategy } from "./ui/strategy.js";
import { Wizard } from "./ui/wizard.js";
import { Game } from "./ui/game.js";
import { Mode } from "./ui/mode.js";

let currentView = null;

export const Router = {
  route(dest) {
    const app = document.querySelector(".app");
    let nextView;

    if (!app || !dest) throw new Error("No app container or destination set");
    if (currentView && typeof currentView.clearsubs === "function") currentView.clearsubs();

    switch (dest.toLowerCase()) {
      case "home":
        nextView = Home;
        break;
      case "strategy":
        nextView = Strategy();
        break;
      case "wizard":
        nextView = Wizard();
        break;
      case "game":
        nextView = Game;
        break;
      case "mode":
        nextView = Mode;
        break;
    }

    currentView = nextView;
    app.replaceChildren(currentView);

    return;
  },
};
