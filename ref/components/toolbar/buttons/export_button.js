/*
 *   Created by Ligal Levy & Shaked Zrihen & Avraham Lahmi
 */

class ExportBtn extends ButtonBase {
  constructor(name, paint) {
    super(name, paint);
  }

  export(output) {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:json/application;charset=utf-8," + JSON.stringify(output)
    );
    element.setAttribute("download", "output.json");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  handleButtonPress(event) {
    const output = this.paint.canvas.exportCanvas();
    this.export(output);
  }

  clearSelect() {}
  select() {}
}
