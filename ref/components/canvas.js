/*
 *   Created by Ligal Levy & Shaked Zrihen & Avraham Lahmi
 */

class Canvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.isInitialize = false;
    this.ctx = null;
    this.isMouseDown = false;
    this.context = null;
    this.points = [];
    this.centerPoint = null;
    this.storedSapes = [];
    this.redoItems = [];
  }

  exportCanvas() {
    const output = new OutputBuilder();
    const circles = this.storedSapes.filter(shape => shape.type() === "Circle");
    const lines = this.storedSapes.filter(shape => shape.type() === "Line");
    const curves = this.storedSapes.filter(
      shape => shape.type() === "Bezier curve"
    );
    return output
      .withCirclesIfExist(circles)
      .withLinesIfExist(lines)
      .withBezierCurvesIfExist(curves)
      .build();
  }

  importLines(lines) {
    lines.forEach(line => {
      this.storedSapes.push(
        new Line(this, this.points[line.startPoint], this.points[line.endPoint])
      );
    });
  }

  importCircles(circles) {
    circles.forEach(circle => {
      this.storedSapes.push(
        new Circle(this, this.points[circle.center], circle.radius)
      );
    });
  }

  importBezierCurves(bezierCurves) {
    bezierCurves.forEach(bezierCurve => {
      let controlPoints = [];
      bezierCurve.controlPoints.forEach(point => {
        controlPoints.push(this.points[point]);
      });
      this.storedSapes.push(new BezierCurve(this, controlPoints));
    });
  }

  update() {
    this.importCanvas(this.exportCanvas());
    this.centerPoint = this.calculateCenter();
  }

  importCanvas(canvasFile, fit = false) {
    this.points = [];
    canvasFile.points.forEach(point => {
      this.points.push(new Point(point.x, point.y));
    });
    this.storedSapes = [];
    this.importLines(canvasFile.lines);
    this.importCircles(canvasFile.circles);
    this.importBezierCurves(canvasFile.bezierCurves);
    if (fit) {
      Transform.fit(this);
    }
    this.redrawStoredShapes();
    this.centerPoint = this.calculateCenter();
  }

  init() {
    this.ctx = canvas.getContext("2d"); // Set canves to 2d canvac
    this.isInitialize = true;
  }

  calculateCenter() {
    const minAndMaxPoint = calculateMaxAndMinPointsInArray(this.points);
    const max = minAndMaxPoint[MAX];
    const min = minAndMaxPoint[MIN];
    const centerX = Math.round(max.x - (max.x - min.x) / 2);
    const centerY = Math.round(max.y - (max.y - min.y) / 2);
    return new Point(centerX, centerY);
  }

  setContext(shape) {
    this.context = shape;
    this.context.init();
  }

  addPoint(point) {
    for (let i = 0; i < this.points.length; i++) {
      if (point.equal(this.points[i])) {
        return i;
      }
    }
    this.points.push(point);
    return this.points.length - 1;
  }

  getMousePosition(event) {
    if (!this.isInitialize) {
      init();
    }
    const rect = this.canvas.getBoundingClientRect();
    const x =
      ((event.clientX - rect.left) / (rect.right - rect.left)) *
      this.canvas.width;
    const y =
      ((event.clientY - rect.top) / (rect.bottom - rect.top)) *
      this.canvas.height;
    return new Point(x, y);
  }

  redrawStoredShapes() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.storedSapes.length === 0) {
      return;
    }
    this.storedSapes.forEach(shape => {
      shape.draw();
    });
  }

  clearListeners() {
    let el, elClone;
    (el = document.getElementById("canvas")), (elClone = el.cloneNode(true));
    el.parentNode.replaceChild(elClone, el);
    this.canvas = document.getElementById("canvas");
    this.init();
    this.redrawStoredShapes();
  }
}
