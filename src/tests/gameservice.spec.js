import { GameService } from "../services/GameService.js";

describe("Game Suite", () => {

  test("Create and register player into game", () => {
    const id = crypto.randomUUID();
    GameService.createPlayer(id, "Bryan");

    const player = GameService.getActivePlayer();

    expect(player).toHaveProperty("name", "Bryan");
  });

  test("Get player board size", () => {
    const id = crypto.randomUUID();
    GameService.createPlayer(id, "Bryan");
    const player = GameService.getPlayer(id);

    expect(player.gameboard.size).toBe(100);

  });




});
