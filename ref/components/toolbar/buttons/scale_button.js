/*
 *   Created by Ligal Levy & Shaked Zrihen & Avraham Lahmi
 */

class ScaleBtn extends ButtonBase {
  constructor(name, paint) {
    super(name, paint);
  }

  handleButtonPress(event) {
    this.paint.toolbar.clearSelected();
    this.select();
    this.paint.canvas.clearListeners();
    const setterBtn = document.getElementById("setter-btn");
    setterBtn.addEventListener("click", event => {
      this.rescale(this.paint.canvas);
    });
    setterBtn.innerHTML = "scale";
    document.getElementById("setter-value").value = 1.0;
  }

  rescale(canvas) {
    const scaleRatio = document.getElementById("setter-value").value;
    if (isNaN(scaleRatio) || scaleRatio <= 0) {
      alert("Must input a positive number");
      return;
    }
    Transform3D.scale(
      canvas,
      new Point3D(scaleRatio, scaleRatio, scaleRatio),
      canvas.centerPoint
    );
    canvas.redrawPolygons();
  }

  clearSelect() {
    this.btn.style.backgroundColor = "";
    document.getElementById("setter").style.display = "none";
    const setterBtn = document.getElementById("setter-btn");
    const new_element = setterBtn.cloneNode(true);
    setterBtn.parentNode.replaceChild(new_element, setterBtn);
  }

  select() {
    this.btn.style.backgroundColor = "#282828";
    document.getElementById("setter").style.display = "block";
  }
}
