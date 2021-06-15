/*
 *   Created by Ligal Levy & Shaked Zrihen & Avraham Lahmi
 */

class Transform {
  /**
   * Change object size according to x, y ratio.
   * the function scales the objects relative to Point(0,0)
   * @param canvas - the canvas where the object is on it
   * @param ratioX - ratio to resize all x points
   * @param ratioY - ratio to resize all y points (default is null for fixed shapes (scale x and y in the       same ratio))
   * @param updateCanvas - parameters that tells if we need to update canvas
   */
  static scale(canvas, ratioX, ratioY = null, updateCanvas = true) {
    const center = canvas.calculateCenter();
    ratioY = ratioY === null ? ratioX : ratioY;
    Transform.move(canvas, center, new Point(0, 0), false);
    // if the shape is Circle -> we need to resize the raius also
    for (let i = 0; i < canvas.storedSapes.length; ++i) {
      let currentShape = canvas.storedSapes[i];
      if (currentShape.type() === "Circle") {
        currentShape.radius = currentShape.radius * ratioX;
      }
    }
    // for all shapes (include the circles) we need to resize their points
    for (let i = 0; i < canvas.points.length; ++i) {
      const point = canvas.points[i];
      point.x = point.x * ratioX;
      point.y = point.y * ratioY;
    }
    Transform.move(canvas, new Point(0, 0), center, false);
    if (updateCanvas) {
      canvas.update();
    }
  }

  /**
   * the function rotate the object clockwise in angle's angle
   * @param canvas - the canvas where the object is on it
   * @param centerPoint - center of the object
   * @param angle (in radians)
   * @param updateCanvas - parameters that tells if we need to update canvas
   */
  static rotate(canvas, centerPoint, angle, updateCanvas = true) {
    // save the first center because it can change while we change the points
    const tempCenter = centerPoint;
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    Transform.move(canvas, centerPoint, new Point(0, 0), false);
    for (let i = 0; i < canvas.points.length; ++i) {
      const point = canvas.points[i];
      // save first values
      const tempx = point.x;
      const tempy = point.y;
      point.x = tempx * cosA - tempy * sinA;
      point.y = tempx * sinA + tempy * cosA;
    }
    Transform.move(canvas, new Point(0, 0), tempCenter, false);
    if (updateCanvas) {
      canvas.update();
    }
  }

  static move(canvas, firstPoint, secondPoint, updateCanvas = true) {
    const aX = secondPoint.x - firstPoint.x;
    const aY = secondPoint.y - firstPoint.y;
    Transform.moveBy(canvas, aX, aY, updateCanvas);
  }

  static moveBy(canvas, x, y, updateCanvas = true) {
    for (let i = 0; i < canvas.points.length; ++i) {
      const point = canvas.points[i];
      point.x = point.x + x;
      point.y = point.y + y;
    }
    if (updateCanvas) {
      canvas.update();
    }
  }

  /**
   * Shear on X axis according to assignment's requirement
   * @param canvas
   * @param firstPoint
   * @param secondPoint
   * @param updateCanvas
   */
  static shearing(canvas, firstPoint, secondPoint, updateCanvas = true) {
    const dx = -1 * (secondPoint.x - firstPoint.x);
    const max = calculateMaxAndMinPointsInArray(canvas.points)[MAX];
    const a = 0.006 * dx;
    Transform.move(canvas, max, new Point(0, 0));
    for (let i = 0; i < canvas.points.length; ++i) {
      const point = canvas.points[i];
      point.x = point.x + a * point.y;
    }
    Transform.move(canvas, new Point(0, 0), max);
    if (updateCanvas) {
      canvas.update();
    }
  }

  static flipX(canvas, updateCanvas = true) {
    const tempCenter = canvas.centerPoint;
    Transform.move(canvas, canvas.centerPoint, new Point(0, 0));

    for (let i = 0; i < canvas.points.length; ++i) {
      const point = canvas.points[i];
      point.y = point.y * -1;
    }
    Transform.move(canvas, new Point(0, 0), tempCenter);

    if (updateCanvas) {
      canvas.update();
    }
  }

  static flipY(canvas, updateCanvas = true) {
    const tempCenter = canvas.centerPoint;
    Transform.move(canvas, canvas.centerPoint, new Point(0, 0));

    for (let i = 0; i < canvas.points.length; ++i) {
      const point = canvas.points[i];
      point.x = point.x * -1;
    }
    Transform.move(canvas, new Point(0, 0), tempCenter);

    if (updateCanvas) {
      canvas.update();
    }
  }

  // fit points to canvas size (window to viewport transformation)
  static fit(canvas, updateCanvas = false) {
    let maxMinPoints = calculateMaxAndMinPointsInArray(canvas.points);
    Transform.moveBy(
      canvas,
      -1 * maxMinPoints[MIN].x,
      -1 * maxMinPoints[MIN].y
    );
    const S =
      Math.abs(
        Math.min(
          canvas.canvas.width / maxMinPoints[MAX].x,
          canvas.canvas.height / maxMinPoints[MAX].y
        )
      ) * 0.8;
    Transform.scale(canvas, S, S, updateCanvas);
    maxMinPoints = calculateMaxAndMinPointsInArray(canvas.points);
    Transform.moveBy(
      canvas,
      -1 * maxMinPoints[MIN].x,
      -1 * maxMinPoints[MIN].y
    );
    maxMinPoints = calculateMaxAndMinPointsInArray(canvas.points);
    Transform.moveBy(
      canvas,
      0.1 * maxMinPoints[MAX].x,
      0.1 * maxMinPoints[MAX].y
    );
    if (updateCanvas) {
      canvas.update();
    }
  }
}
