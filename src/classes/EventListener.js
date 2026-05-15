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
        if (!data) cb();
        else cb(data);
      } catch (err) {
        console.error("EventListener callback error:", err);
      }
    });
  }

  static once(event, fun) {
    const wrapper = (data) => {
      fun(data);

      this.listeners[event] = this.listeners[event].filter(
        (listener) => listener !== wrapper,
      );
    };

    this.subscribe(event, wrapper);
  }
}
