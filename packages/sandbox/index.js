import SnapshotSandbox from "./snapshotSandbox";

export class SandboxContainer {
  constructor({ name }) {
    this.instance = new SnapshotSandbox(name);
  }
  async mount() {
    this.instance.active();
  }

  async unmount() {
    this.instance.inactive();
  }
}
