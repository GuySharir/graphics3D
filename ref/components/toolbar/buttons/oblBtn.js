class OblBtn extends ButtonBase {
  constructor(name, paint) {
    super(name, paint);
  }

  handleButtonPress(event) {
    this.paint.toolbar.clearSelectedProjections();
    this.select();
    this.paint.canvas.clearListeners();
    this.paint.canvas.projection = OBLIQUE;
    this.paint.canvas.redrawPolygons();
  }

  clearSelect() {
    this.btn.style.backgroundColor = "";
  }

  select() {
    this.btn.style.backgroundColor = "#282828";
  }
}
