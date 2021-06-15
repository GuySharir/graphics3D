/*
 *   Created by Ligal Levy & Shaked Zrihen & Avraham Lahmi
 */

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  multiply(k) {
    return new Point(this.x * k, this.y * k);
  }

  add(point) {
    return new Point(this.x + point.x, this.y + point.y);
  }

  equal(point) {
    return this.x === point.x && this.y === point.y;
  }
}
