/*
 *   Created by Ligal Levy & Shaked Zrihen & Avraham Lahmi
 */

class Paint {
  constructor(toolbar = null) {
    this.canvas = null;
    this.toolbar = toolbar;
  }

  init() {
    if (!this.canvas) {
      const canvasElement = document.getElementById("canvas"); // Create new canvas
      this.canvas = new Canvas3D(canvasElement);
      this.canvas.init();
    }
  }

  addToolbar(toolbar) {
    this.toolbar = toolbar;
  }
}
