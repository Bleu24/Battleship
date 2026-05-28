import { GameService } from "../services/GameService.js";

describe("GameService Suite", () => {

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

  test("Get board", () => {
    const id = crypto.randomUUID();
    GameService.createPlayer(id, "Bryan");
    const board = GameService.getBoard(id);

    expect(board).toBeDefined();
    expect(board.board).toHaveLength(10);
  });




});
