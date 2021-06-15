/*
 *   Created by Ligal Levy & Shaked Zrihen & Avraham Lahmi
 */

class Transform3D {
  /**
   * resize object according to user's new scale ratio
   * @param {Canvas3D} canvas - the canvas where the object will drawing on
   * @param {Point3D} scaleVector - scale ratio on each axis
   * @param {Point3D} centerPoint - center point
   */
  static scale(canvas, scaleVector, centerPoint) {
    // Scale matrix
    const scaleMatrix = [
      [scaleVector.x, 0, 0, 0],
      [0, scaleVector.y, 0, 0],
      [0, 0, scaleVector.z, 0],
      [0, 0, 0, 1]
    ];

    // Scale all points
    canvas.points.forEach(point => {
      const pointVector = [
        [point.x - centerPoint.x, point.y - centerPoint.y, point.z, 1]
      ];
      const scaledPoints = multiplyMatrix(pointVector, scaleMatrix);

      point.x = scaledPoints[0][0] + centerPoint.x;
      point.y = scaledPoints[0][1] + centerPoint.y;
      point.z = scaledPoints[0][2];
    });
  }

  static fit(canvas) {
    let maxMinPoints = calculateMaxAndMinPointsInArray(canvas.points);
    const fitPoints = [];
    const centerDiff = {
      x: Math.abs(canvas.canvas.width / 2 - maxMinPoints[MAX].x),
      y: Math.abs(canvas.canvas.height / 2 - maxMinPoints[MAX].y)
    };
    canvas.points.forEach(point => {
      fitPoints.push(
        new Point3D(
          Math.abs(point.x - maxMinPoints[MIN].x) + centerDiff.x,
          Math.abs(point.y - maxMinPoints[MIN].y) + centerDiff.y,
          point.z
        )
      );
    });
    canvas.points = fitPoints;
  }

  /**
   * Rotate objects according to user's angles
   * @param {Canvas3D} canvas
   * @param {Point3D} centerPoint
   * @param {Point3D} angleVector - rotate angle on each axis
   */
  static rotate(canvas, centerPoint, angleVector) {
    // Calculate sin & cos for each angle in vector (for metrix)
    const cosX = Math.cos(angleVector.x);
    const sinX = Math.sin(angleVector.x);
    const cosY = Math.cos(angleVector.y);
    const sinY = Math.sin(angleVector.y);
    const cosZ = Math.cos(angleVector.z);
    const sinZ = Math.sin(angleVector.z);

    // Rotate matrix (from slides)
    const rotateMatrixX = [
      [1, 0, 0, 0],
      [0, cosX, sinX, 0],
      [0, -sinX, cosX, 0],
      [0, 0, 0, 1]
    ];

    const rotateMatrixY = [
      [cosY, 0, -sinY, 0],
      [0, 1, 0, 0],
      [sinY, 0, cosY, 0],
      [0, 0, 0, 1]
    ];

    const rotateMatrixZ = [
      [cosZ, sinZ, 0, 0],
      [-sinZ, cosZ, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];

    // Rotate each point
    canvas.points.forEach(point => {
      const pointVector = [
        [point.x - centerPoint.x, point.y - centerPoint.y, point.z, 1]
      ];

      // if all angles are 0 -> it will not rotate. else -> it will rotate according to axis
      const rotateX =
        angleVector.x === 0
          ? pointVector
          : multiplyMatrix(pointVector, rotateMatrixX);
      const rotateY =
        angleVector.y === 0 ? rotateX : multiplyMatrix(rotateX, rotateMatrixY);
      const rotateZ =
        angleVector.z === 0 ? rotateY : multiplyMatrix(rotateY, rotateMatrixZ);

      point.x = rotateZ[0][0] + centerPoint.x;
      point.y = rotateZ[0][1] + centerPoint.y;
      point.z = rotateZ[0][2];
    });
  }
}
