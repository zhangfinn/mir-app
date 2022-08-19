import { LoadApp } from "./loader";
import { componentName } from "./utils";

class Pango extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["name", "entry"];
  }

  async connectedCallback() {
    this.microApp = new LoadApp({
      name: this.name,
      entry: this.entry,
      container: this,
    });
    await this.microApp.load();
  }

  disconnectedCallback() {
    this.microApp.destroyed();
  }

  attributeChangedCallback(attrName, _oldVal, newVal) {
    this[attrName] = newVal;
  }
}

!window.customElements.get(componentName) &&
  window.customElements.define(componentName, Pango);
