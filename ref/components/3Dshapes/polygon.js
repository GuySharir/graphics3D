/*
 *   Created by Ligal Levy & Shaked Zrihen & Avraham Lahmi
 */

class Polygon {
  constructor(
    canvas,
    points,
    lineColor = "#000000",
    fillColor = null,
    visible = true
  ) {
    this.canvas = canvas;
    this.points = points;
    this.lineColor = lineColor;
    this.fillColor = fillColor;
    this.visible = visible;
    this.normal = this.getNormal();
  }

  getNormal() {
    const a = this.points[0].subtract(this.points[1]);
    const b = this.points[0].subtract(this.points[2]);
    return a.crossProduct(b);
  }
  initOblique() {
    const angle = (45 * Math.PI) / 180;
    const obliquePoints = [];
    const sinAngle = Math.sin(angle);
    const cosAngle = Math.cos(angle);

    // matrix
    const matrix = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0.5 * cosAngle, 0.5 * sinAngle, 1, 0],
      [0, 0, 0, 1]
    ];

    // multiply each point with matrix
    this.points.forEach(point => {
      const vec = [[point.x, point.y, point.z, 1]];
      const res = multiplyMatrix(vec, matrix);

      obliquePoints.push(new Point3D(res[0][0], res[0][1], res[0][2]));
    });

    return obliquePoints;
  }
  initPrespective() {
    const center = this.canvas.centerPoint;
    const prespectivePoints = [];

    this.points.forEach(point => {
      const s = 1 / (1 + point.z / center.z);
      const matrix = [[s, 0, 0, 0], [0, s, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];

      const vec = [[point.x - center.x, point.y - center.y, point.z, 1]];
      const res = multiplyMatrix(vec, matrix);

      prespectivePoints.push(
        new Point3D(res[0][0] + center.x, res[0][1] + center.y)
      );
    });

    return prespectivePoints;
  }

  initOrthographic() {
    const orthographic = [];
    const matrix = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 1]];

    this.points.forEach(point => {
      const vec = [[point.x, point.y, 0, 1]];
      const res = multiplyMatrix(vec, matrix);
      orthographic.push(new Point3D(res[0][0], res[0][1]));
    });

    return orthographic;
  }

  getVisibility(projectionPoints) {
    const tmp1 = new Point3D(
      this.points[0].x,
      this.points[0].y,
      this.points[0].z
    );
    const tmp2 = new Point3D(
      this.points[1].x,
      this.points[1].y,
      this.points[1].z
    );
    const tmp3 = new Point3D(
      this.points[2].x,
      this.points[2].y,
      this.points[2].z
    );

    const tempPoints = [tmp1, tmp2, tmp3];
    this.points[0].x = projectionPoints[0].x;
    this.points[0].y = projectionPoints[0].y;

    this.points[1].x = projectionPoints[1].x;
    this.points[1].y = projectionPoints[1].y;

    this.points[2].x = projectionPoints[2].x;
    this.points[2].y = projectionPoints[2].y;

    const normal = this.getNormal();
    const visibility = normal.multiplyPoint(new Point3D(0, 0, 1)) < 0;
    this.points = tempPoints;
    return visibility;
  }

  getMaxZ() {
    let max = this.points[0].z;
    for (let i = 1; i < this.points.length; ++i) {
      if (this.points[i].z > max) max = this.points[i].z;
    }
    return max;
  }

  getMinX() {
    let min = this.points[0].z;
    for (let i = 1; i < this.points.length; ++i) {
      if (this.points[i].z < min) min = this.points[i].z;
    }
    return min;
  }

  getMaxX() {
    let max = this.points[0].x;
    for (let i = 1; i < this.points.length; ++i) {
      if (this.points[i].x > max) max = this.points[i].x;
    }
    return max;
  }

  getMinX() {
    let min = this.points[0].x;
    for (let i = 1; i < this.points.length; ++i) {
      if (this.points[i].x < min) min = this.points[i].x;
    }
    return min;
  }

  getMaxY() {
    let max = this.points[0].y;
    for (let i = 1; i < this.points.length; ++i) {
      if (this.points[i].y > max) max = this.points[i].y;
    }
    return max;
  }

  getMinY() {
    let min = this.points[0].y;
    for (let i = 1; i < this.points.length; ++i) {
      if (this.points[i].y < min) min = this.points[i].y;
    }
    return min;
  }

  drawPolygon(points) {
    this.canvas.ctx.fillStyle = this.fillColor;
    this.canvas.ctx.beginPath();
    this.canvas.ctx.moveTo(points[0].x, points[0].y);
    for (let nextPoint = 1; nextPoint < points.length; ++nextPoint) {
      this.canvas.ctx.lineTo(points[nextPoint].x, points[nextPoint].y);
    }
    this.canvas.ctx.closePath();
    this.canvas.ctx.fill();
    this.canvas.ctx.strokeStyle = this.lineColor;
    this.canvas.ctx.stroke();
  }

  draw(projection) {
    let projectionPoints;
    if (projection === PRESPECTIVE) {
      projectionPoints = this.initPrespective();
    }
    if (projection === OBLIQUE) {
      projectionPoints = this.initOblique();
    }
    if (projection === ORTHOGRAPHIC) {
      projectionPoints = this.initOrthographic();
    }
    this.visible = this.getVisibility(projectionPoints);
    if (!this.visible) {
      return;
    }
    this.drawPolygon(projectionPoints);
  }
}
