/*
 *   Created by Ligal Levy & Shaked Zrihen & Avraham Lahmi
 */

class Point3D {
  constructor(x, y, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  multiply(k) {
    return new Point3D(this.x * k, this.y * k, this.z * k);
  }

  add(point) {
    return new Point3D(this.x + point.x, this.y + point.y, this.z + point.z);
  }

  subtract(point) {
    return new Point3D(this.x - point.x, this.y - point.y, this.z - point.z);
  }

  equal(point) {
    return this.x === point.x && this.y === point.y && this.z === point.z;
  }

  multiplyPoint(point) {
    return this.x * point.x + this.y * point.y + this.z * point.z;
  }

  crossProduct(point) {
    const x = this.y * point.z - this.z * point.y;
    const y = this.z * point.x - this.x * point.z;
    const z = this.x * point.y - this.y * point.x;
    return new Point3D(x, y, z);
  }
}
