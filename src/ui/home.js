import { Wizard } from "./wizard.js";

export const Home = (function () {
  const container = document.createElement("div");
  const heroTitle = document.createElement("h1");
  const hero = document.createElement("div");
  const start = document.createElement("button");

  container.className = "app";
  heroTitle.className = "hero__title";
  hero.className = "hero";
  start.className = "hero__start";

  heroTitle.textContent = "BATTLESHIP";
  start.textContent = "New Game";

  container.appendChild(hero);
  hero.append(heroTitle, start);

  start.addEventListener("click", () => {
    hero.remove();
    container.appendChild(Wizard);
  });

  return container;
})();
