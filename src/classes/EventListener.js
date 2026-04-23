export class EventListener {
  static listeners = {};

  static subscribe(event, fun) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(fun);
  }

  static emit(event, data) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach((cb) => {
      try {
        cb(data);
      } catch (err) {
        console.error("EventListener callback error:", err);
      }
    });
  }
}
