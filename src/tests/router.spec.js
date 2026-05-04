/**
 * @jest-environment jsdom
 */

import { Router } from "../router.js";

const app = document.createElement("div");
app.className = "app";
document.body.appendChild(app);

describe("Router Suite", () => {
  test("route", () => {
    Router.route("Home");

    expect(document.querySelector(".app").children.length).toBe(1);
  });

  test("route (no param)", () => {
    expect(() => Router.route()).toThrow();
  });
});
