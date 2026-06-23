import { cloneDeep } from "lodash";
import { Player } from "../classes/Player.js";
import { EventListener } from "../classes/EventListener.js";
import { GameService } from "../services/GameService.js";
import { renderBoard } from "../ui/board.js";


export const Engine = (function () {
  const game = {
    ships: {
      carrier: 5,
      battleship: 4,
      cruiser: 3,
      submarine: 3,
      destroyer: 2,
    },
    players: [null, null],
    currentIndex: 0,
    mode: ""
  };

  const getState = () => cloneDeep(game);
  const setMode = (mode) => { game.mode = mode.toLowerCase(); };
  const getMode = () => game.mode;

  const getActivePlayer = () => cloneDeep(game.players[game.currentIndex]);

  const createPlayer = (id, name) => {
    const player = new Player(id, name);
    if (!game.players[0]) game.players[0] = player;
    else game.players[1] = player;
  };

  const getPlayer = (id) => {
    for (const player of game.players) {
      if (player.id === id) {
        return player;
      }
    }
  };

  const getBoard = (id) => {
    for (const player of game.players) {
      if (player.id === id) {
        return player.gameboard;
      }
    }
  };

  const changeTurn = () => {
    game.currentIndex = game.currentIndex === 0 ?
      game.currentIndex = 1 :
      game.currentIndex = 0;
  };

  EventListener.once("engine:start", ({ player, p1_board }) => {
    if (!player) return;

    // if player is not player 1
    if (player !== game.players[0]) {
      // Engine attack
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      GameService.receiveAttack(player.id, x, y);
      const gameboard = GameService.getBoard(player.id);
      renderBoard(gameboard, p1_board);
    }
  });

  // TODO: Improve ai attack;
  EventListener.subscribe("player:attack", ({ board, x, y }) => {

    const isOwnBoard = GameService.getActivePlayer().id === board.id;

    if (isOwnBoard) {
      console.error("You can't attack your own board");
      return;
    }

    const canChain = GameService.receiveAttack(board.id, x, y);
    if (!canChain) GameService.changeTurn();

    const ship = GameService.getShip(board.id, x, y);

    if (ship && ship.isSunk()) console.log(`Ship ${ship.type} has sunk`);

    const gameboard = getBoard(board.id);
    if (gameboard.getAllSunkenShips().length === 5) console.log(`Winner ${GameService.getActivePlayer().name}`);
  });

  EventListener.once("player:create", (p2_board) => {
    const player2Id = crypto.randomUUID();
    GameService.createPlayer(player2Id, "AI");
    const player2 = GameService.getPlayer(player2Id);

    p2_board.id = player2.id;
    p2_board.dataset.playerName = player2.name;

    player2.gameboard.randomize();
  });


  return {
    getState,
    getActivePlayer,
    createPlayer,
    getPlayer,
    getBoard,
    setMode,
    getMode,
    changeTurn
  };
})();
