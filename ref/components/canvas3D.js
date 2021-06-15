/*
 *   Created by Ligal Levy & Shaked Zrihen & Avraham Lahmi
 */

class Canvas3D {
  constructor(canvas) {
    this.canvas = canvas;
    this.isInitialize = false;
    this.ctx = null;
    this.isMouseDown = false;
    this.points = [];
    this.centerPoint = null;
    this.polygons = [];
    this.file = null;
    this.projection = PRESPECTIVE;
    this.colors = [];
  }

  importCanvas(canvasFile) {
    this.file = canvasFile;
    this.points = [];

    canvasFile.points.forEach(point => {
      this.points.push(new Point3D(point.x, point.y, point.z));
    });
    Transform3D.fit(this);
    canvasFile.polygons.forEach(polygon => {
      this.colors.push(randomColor());
    });

    this.updatePolygons();
    this.calculateCenter();
    this.redrawPolygons();
  }

  updatePolygons() {
    this.polygons = [];
    this.file.polygons.forEach((polygon, i) => {
      const polygonPoints = [];
      polygon.forEach(point => {
        const currPoint = this.points[point];
        polygonPoints.push(new Point3D(currPoint.x, currPoint.y, currPoint.z));
      });

      const newPolygon = new Polygon(
        this,
        polygonPoints,
        "#000000",
        this.colors[i]
      );
      this.polygons.push(newPolygon);
    });
  }

  calculateCenterTest() {
    let maxX = -10000000;
    let minX = 10000000;
    let maxY = -10000000;
    let minY = 10000000;
    this.polygons.forEach(polygon => {
      const polygonMaxX = polygon.getMaxX();
      const polygonMaxY = polygon.getMaxY();
      const polygonMinX = polygon.getMinX();
      const polygonMinY = polygon.getMinY();
      if (polygonMaxX > maxX) maxX = polygonMaxX;
      if (polygonMaxY > maxY) maxY = polygonMaxY;
      if (polygonMinX < minX) minX = polygonMinX;
      if (polygonMinY < minY) minY = polygonMinY;
    });
    const xDiff = (maxX - minX) / 2;
    const yDiff = (maxY - minY) / 2;
    this.centerPoint = new Point3D(xDiff, yDiff, -1000);
  }

  calculateCenter() {
    this.centerPoint = new Point3D(
      this.canvas.width / 2,
      this.canvas.height / 2,
      -1000
    );
  }

  init() {
    this.ctx = canvas.getContext("2d"); // Set canves to 2d canvac
    this.isInitialize = true;
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

  redrawPolygons() {
    this.updatePolygons();
    // Draw from min Z to max Z

    this.polygons.sort((a, b) =>
      a.getMaxZ() > b.getMaxZ() ? 1 : a.getMaxZ() < b.getMaxZ() ? -1 : 0
    );

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.polygons.length === 0) {
      return;
    }
    this.polygons.forEach(polygon => {
      polygon.draw(this.projection);
    });
  }

  clearListeners() {
    let el, elClone;
    (el = document.getElementById("canvas")), (elClone = el.cloneNode(true));
    el.parentNode.replaceChild(elClone, el);
    this.canvas = document.getElementById("canvas");
    this.init();
    this.redrawPolygons();
  }
}
