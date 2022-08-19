import importHTML from "import-html-entry";
import { SandboxContainer } from "./sandbox";
import { getDefaultTplWrapper } from "./utils";

export class LoadApp {
  constructor({ name, entry, container }) {
    this.name = name;
    this.entry = entry;
    this.container = container;
    this.status = "created";
  }

  async load() {
    // fetch resources
    const { template, execScripts } = await importHTML(this.entry);
    // create shadowdom
    const _html = getDefaultTplWrapper(this.name)(template);
    this.render(_html);
    // create sandBox
    this.sandboxContainer = new SandboxContainer({
      name: this.name,
    });
    this.sandboxContainer.mount;
    const global = this.sandboxContainer.instance.proxy;
    await execScripts(global, true);
    this.mount();
  }

  render(_html) {
    const htmlDom = document.createRange().createContextualFragment(_html);
    htmlDom.innerHTML = _html;
    this._shadowRoot = this.container.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(htmlDom.cloneNode(true));
  }

  mount() {
    this.status = "mounted";
  }

  destroyed() {
    this.status = "unmounted";
    this.sandboxContainer.unmount();
    this.container.microApp = null;
  }
}
