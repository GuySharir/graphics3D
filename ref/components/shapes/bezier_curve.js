/*
 *   Created by Ligal Levy & Shaked Zrihen & Avraham Lahmi
 */

class BezierCurve extends BaseShape {
  constructor(canvas, controlPoints = [], numberOfLines = 100) {
    super(canvas);
    this.controlPoints = controlPoints;
    this.numberOfLines = numberOfLines;
  }

  handleMouseClick(event) {
    if (this.controlPoints.length >= 3) {
      this.controlPoints.push(this.canvas.getMousePosition(event));
      this.canvas.storedSapes.push(
        new BezierCurve(this.canvas, this.controlPoints, this.numberOfLines)
      );
      this.controlPoints = [];
      this.canvas.redrawStoredShapes();
    } else {
      this.canvas.redrawStoredShapes();
      this.controlPoints.push(this.canvas.getMousePosition(event));
      this.draw(event);
    }
  }

  factorial(n) {
    let f = 1;
    while (n > 0) {
      f *= n;
      n--;
    }
    return f;
  }

  coefactor(n, p) {
    return this.factorial(n) / (this.factorial(p) * this.factorial(n - p));
  }

  // generic bezier calculation according to slides
  BezierPoint(controlPoints, t) {
    let bezierPoint = new Point(0, 0);
    const n = controlPoints.length - 1;
    for (let i in controlPoints) {
      const coefactor = this.coefactor(n, i);
      const k = coefactor * Math.pow(t, i) * Math.pow(1 - t, n - i);
      bezierPoint = bezierPoint.add(controlPoints[i].multiply(k));
    }
    return bezierPoint;
  }

  draw(event) {
    let accuracy = 1.0 / this.numberOfLines; //this'll give the bezier of numberOfLines lines segments
    let startPoint = this.controlPoints[0];
    for (let i = 0; i < 1; i += accuracy) {
      let p = this.BezierPoint(this.controlPoints, i);
      new Line(this.canvas, startPoint, p).draw();
      startPoint = p;
    }
  }

  type() {
    return "Bezier curve";
  }
}
