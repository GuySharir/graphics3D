/*
 *   Created by Ligal Levy & Shaked Zrihen & Avraham Lahmi
 */

class Toolbar {
  constructor() {
    this.buttons = [];
    this.projections = [];
  }

  addButton(button) {
    button.init();
    this.buttons.push(button);
  }

  addProjections(button) {
    button.init();
    this.projections.push(button);
  }

  clearSelectedProjections() {
    this.projections.forEach(button => {
      button.clearSelect();
    });
  }

  clearSelected() {
    this.buttons.forEach(button => {
      button.clearSelect();
    });
  }
}
