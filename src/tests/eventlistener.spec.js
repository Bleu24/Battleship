import { EventListener } from "../classes/EventListener.js";

describe("Event Listener", () => {
  test("Hit event", () => {
    let result = null;
    EventListener.subscribe("ship:hit", (msg) => {
      result = msg;
    });

    EventListener.emit("ship:hit", "ship hit successfully!");

    expect(result).toBe("ship hit successfully!");
  });
});
