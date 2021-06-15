/*
 *   Created by Ligal Levy & Shaked Zrihen & Avraham Lahmi
 */

class OrtBtn extends ButtonBase {
  constructor(name, paint) {
    super(name, paint);
  }

  handleButtonPress(event) {
    this.paint.toolbar.clearSelectedProjections();
    this.select();
    this.paint.canvas.clearListeners();
    this.paint.canvas.projection = ORTHOGRAPHIC;
    this.paint.canvas.redrawPolygons();
  }

  clearSelect() {
    this.btn.style.backgroundColor = "";
  }

  select() {
    this.btn.style.backgroundColor = "#282828";
  }
}
