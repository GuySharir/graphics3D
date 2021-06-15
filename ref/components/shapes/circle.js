/*
 *   Created by Ligal Levy & Shaked Zrihen & Avraham Lahmi
 */

class Circle extends BaseShape {
  constructor(canvas, center, radius = null) {
    super(canvas);
    this.center = null;
    if (center) {
      this.center = center;
    }
    this.radius = radius;
    this.isDown = false;
  }

  handleMouseDown(event) {
    if (!this.center) {
      this.center = this.canvas.getMousePosition(event);
      this.isDown = true;
    }
  }

  handleMouseMove(event) {
    if (this.isDown) {
      this.canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.canvas.redrawStoredShapes();
      this.draw(event);
    }
  }

  handleMouseUp(event) {
    if (this.radius) {
      this.canvas.storedSapes.push(
        new Circle(this.canvas, this.center, this.radius)
      );
      this.isDown = false;
      this.center = null;
      this.radius = null;
      this.canvas.redrawStoredShapes();
    }
  }

  plotCirclePoint(x, y) {
    this.drawPixel(x + this.center.x, y + this.center.y);
    this.drawPixel(y + this.center.x, x + this.center.y);
    this.drawPixel(-x + this.center.x, y + this.center.y);
    this.drawPixel(-y + this.center.x, x + this.center.y);
    this.drawPixel(-x + this.center.x, -y + this.center.y);
    this.drawPixel(-y + this.center.x, -x + this.center.y);
    this.drawPixel(x + this.center.x, -y + this.center.y);
    this.drawPixel(y + this.center.x, -x + this.center.y);
  }

  draw(event) {
    if (event) {
      const point = this.canvas.getMousePosition(event);
      this.radius = Math.sqrt(
        Math.pow(this.center.x - point.x, 2) +
          Math.pow(this.center.y - point.y, 2)
      );
    }
    let x = 0;
    let y = this.radius;
    let radiusError = 3 - 2 * this.radius; // p

    while (x < y) {
      this.plotCirclePoint(x, y);
      if (radiusError < 0) {
        radiusError += 4 * x + 6;
      } else {
        radiusError += 4 * (x - y) + 10;
        y--;
      }
      x++;
    }
    if (x == y) {
      this.plotCirclePoint(x, y);
    }
  }

  type() {
    return "Circle";
  }
}
