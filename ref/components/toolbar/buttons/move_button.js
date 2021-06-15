/*
 *   Created by Ligal Levy & Shaked Zrihen & Avraham Lahmi
 */

class MoveBtn extends ButtonBase {
  constructor(name, paint) {
    super(name, paint);
    this.isMouseDown = false;
    this.firstPoint = null;
  }

  handleButtonPress(event) {
    this.paint.toolbar.clearSelected();
    this.select();
    this.paint.canvas.clearListeners();
    this.paint.canvas.canvas.addEventListener("mousedown", event =>
      this.handleMouseDown(event)
    );
    this.paint.canvas.canvas.addEventListener("mousemove", event =>
      this.handleMouseMove(event)
    );
    this.paint.canvas.canvas.addEventListener("mouseup", event =>
      this.handleMouseUp(event)
    );
  }

  handleMouseDown(event) {
    this.firstPoint = this.paint.canvas.getMousePosition(event);
  }

  handleMouseMove(event) {
    if (this.firstPoint) {
      this.paint.canvas.update();
      const sPoint = this.paint.canvas.getMousePosition(event);
      Transform.move(this.paint.canvas, this.firstPoint, sPoint);
      this.paint.canvas.redrawStoredShapes();
      this.firstPoint = sPoint;
    }
  }

  handleMouseUp(event) {
    this.firstPoint = null;
  }

  clearSelect() {
    this.btn.style.backgroundColor = "";
  }

  select() {
    this.btn.style.backgroundColor = "#282828";
  }
}
