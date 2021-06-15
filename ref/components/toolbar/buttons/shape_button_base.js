/*
 *   Created by Ligal Levy & Shaked Zrihen & Avraham Lahmi
 */

class ShapeButtonBase extends ButtonBase {
  constructor(name, paint) {
    super(name, paint);
  }

  init() {
    this.btn = document.getElementById(this.name);
    this.btn.addEventListener("click", event => {
      this.paint.toolbar.clearSelected();
      this.select();
      this.handleButtonPress(event);
    });
  }

  clearSelect() {
    this.btn.style.backgroundColor = "";
  }

  select() {
    this.btn.style.backgroundColor = "#282828";
  }
}
