/*
 *   Created by Ligal Levy & Shaked Zrihen & Avraham Lahmi
 */

class BaseShape {
  constructor(canvas) {
    this.canvas = canvas;
    this.color = null;
    this.isInitialize = false;
  }

  setCanvas(canvas) {
    if (typeof canvas === typeof Canvas) {
      this.canvas = canvas;
    } else throw TypeError("canvas must be from type Canvas");
  }

  setColor(color) {
    this.color = color;
  }

  drawPixel(x, y) {
    if (canvas) {
      this.canvas.ctx.fillRect(x, y, 1, 1);
    }
  }

  draw(event) {
    throw new Error("You should implement draw function");
  }

  init() {
    this.canvas.clearListeners();
    this.canvas.canvas.addEventListener("mousedown", event =>
      this.handleMouseDown(event)
    );
    this.canvas.canvas.addEventListener("mousemove", event =>
      this.handleMouseMove(event)
    );
    this.canvas.canvas.addEventListener("mouseup", event =>
      this.handleMouseUp(event)
    );
    this.canvas.canvas.addEventListener("click", event =>
      this.handleMouseClick(event)
    );
  }

  handleMouseDown(event) {}

  handleMouseMove(event) {}

  handleMouseUp(event) {}

  handleMouseClick(event) {}

  type() {
    return "Base Shape";
  }
}
