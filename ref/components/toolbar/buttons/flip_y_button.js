/*
 *   Created by Ligal Levy & Shaked Zrihen & Avraham Lahmi
 */

class FlipYBtn extends ButtonBase {
  constructor(name, paint) {
    super(name, paint);
    this.isMouseDown = false;
    this.firstPoint = null;
  }

  handleButtonPress(event) {
    this.paint.toolbar.clearSelected();
    this.select();
    this.paint.canvas.clearListeners();
    Transform.flipY(this.paint.canvas);
    this.paint.canvas.redrawStoredShapes();
  }

  clearSelect() {
    this.btn.style.backgroundColor = "";
  }

  select() {
    this.btn.style.backgroundColor = "";
  }
}
