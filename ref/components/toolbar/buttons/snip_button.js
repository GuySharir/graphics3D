/*
 *   Created by Ligal Levy & Shaked Zrihen & Avraham Lahmi
 */

class SnipBtn extends ButtonBase {
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
    this.paint.canvas.update();
    const minMax = calculateMaxAndMinPointsInArray(this.paint.canvas.points);
    const minY = minMax[MIN].y;
    this.firstPoint = this.paint.canvas.getMousePosition(event);
    // Check if mouse on top of the shape
    if (this.firstPoint.y < minY - 20 || this.firstPoint.y > minY + 20) {
      this.firstPoint = null;
    }
  }

  handleMouseMove(event) {
    if (this.firstPoint) {
      this.paint.canvas.update();

      const sPoint = this.paint.canvas.getMousePosition(event);
      Transform.shearing(this.paint.canvas, this.firstPoint, sPoint);
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
