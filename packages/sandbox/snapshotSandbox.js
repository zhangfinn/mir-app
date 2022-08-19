function iter(obj, callbackFn) {
  for (const prop in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(prop) || prop === "clearInterval") {
      callbackFn(prop);
    }
  }
}

export default class SnapshotSandbox {
  constructor(name) {
    this.name = name;
    this.proxy = window;
    this.sandboxRunning = true;
  }

  active() {
    this.windowSnapshot = {};
    iter(window, (prop) => {
      this.windowSnapshot[prop] = window[prop];
    });

    Object.keys(this.modifyPropsMap).forEach((p) => {
      window[p] = this.modifyPropsMap[p];
    });

    this.sandboxRunning = true;
  }

  inactive() {
    this.modifyPropsMap = {};

    iter(window, (prop) => {
      if (window[prop] !== this.windowSnapshot[prop]) {
        this.modifyPropsMap[prop] = window[prop];
        window[prop] = this.windowSnapshot[prop];
      }
    });

    this.sandboxRunning = false;
  }
}
