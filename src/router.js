import { Home } from "./ui/home.js";
import { Strategy } from "./ui/strategy.js";
import { Wizard } from "./ui/wizard.js";
import { Game } from "./ui/game.js";

export const Router = {
  route(dest) {
    const app = document.querySelector(".app");

    if (!app || !dest) throw new Error("No app container or destination set");

    switch (dest.toLowerCase()) {
      case "home":
        app.replaceChildren(Home);
        break;
      case "strategy":
        app.replaceChildren(Strategy);
        break;
      case "wizard":
        app.replaceChildren(Wizard);
        break;
      case "game":
        app.replaceChildren(Game);
        break;
    }
  },
};
