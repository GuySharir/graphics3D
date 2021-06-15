/*
 *   Created by Ligal Levy & Shaked Zrihen & Avraham Lahmi
 */

class ButtonBase {
  constructor(name, paint) {
    this.name = name;
    this.paint = paint;
    this.btn = null;
  }

  init() {
    this.btn = document.getElementById(this.name);
    this.btn.addEventListener("click", event => {
      this.handleButtonPress(event);
    });
  }

  handleButtonPress(event) {
    throw new Error("Not Implement");
  }

  handleButtonHover(event) {
    throw new Error("Not Implement");
  }

  clearSelect() {
    throw new Error("Not Implement");
  }

  select() {
    throw new Error("Not Implement");
  }
}
