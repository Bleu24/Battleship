import { GameService } from "../services/GameService.js";

describe("Game Suite", () => {

  test("Create and register player into game", () => {
    GameService.createPlayer("Bryan");

    const player = GameService.getActivePlayer();

    expect(player).toHaveProperty("name", "Bryan");
  });

  test("Check active player", () => {

  });




});
