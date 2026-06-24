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

  test("Unsubscribe all subscriptions", () => {
    const mock = jest.fn();
    for (let i = 0; i < 5; i++) {
      EventListener.subscribe("test", mock);
    }

    expect(EventListener.listeners).toMatchObject({ "test": [mock, mock, mock, mock, mock ]});

    EventListener.unsubscribeAll();

    expect(EventListener.listeners).toMatchObject({});

  });
});
