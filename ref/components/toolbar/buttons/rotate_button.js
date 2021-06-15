/*
 *   Created by Ligal Levy & Shaked Zrihen & Avraham Lahmi
 */

class RotateBtn extends ButtonBase {
  constructor(name, paint, axis) {
    super(name, paint);
    this.axis = axis;
  }

  handleButtonPress(event) {
    this.paint.toolbar.clearSelected();
    this.select();
    this.paint.canvas.clearListeners();
    const setterBtn = document.getElementById("setter-btn");
    setterBtn.addEventListener("click", event =>
      this.rotate(this.paint.canvas)
    );
    setterBtn.innerHTML = "rotate";
    document.getElementById("setter-value").value = 45;
  }

  rotate(canvas) {
    const degree = document.getElementById("setter-value").value;
    if (isNaN(degree)) {
      alert("Must input a number");
      return;
    }
    const angle = (degree * Math.PI) / 180;
    let angleVector;
    if (this.axis == "x") angleVector = new Point3D(angle, 0, 0);
    if (this.axis == "y") angleVector = new Point3D(0, angle, 0);
    if (this.axis == "z") angleVector = new Point3D(0, 0, angle);
    Transform3D.rotate(canvas, canvas.centerPoint, angleVector);
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
