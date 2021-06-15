/*
 *   Created by Ligal Levy & Shaked Zrihen & Avraham Lahmi
 */

function calculateMaxAndMinPointsInArray(points) {
  const maxY = Math.max.apply(
    Math,
    points.map(function(o) {
      return o.y;
    })
  );
  const maxX = Math.max.apply(
    Math,
    points.map(function(o) {
      return o.x;
    })
  );
  const minY = Math.min.apply(
    Math,
    points.map(function(o) {
      return o.y;
    })
  );
  const minX = Math.min.apply(
    Math,
    points.map(function(o) {
      return o.x;
    })
  );
  return [new Point(minX, minY), new Point(maxX, maxY)];
}

function createEmptyMatrix(row, column) {
  const newMatrix = [];
  for (let i = 0; i < row; i++) {
    newMatrix[i] = new Array(column);
  }
  return newMatrix;
}

/**
 * multiply two matrix.
 * @param {matrix} A - First matrix
 * @param {matrix} B - Second matrix
 */
function multiplyMatrix(A, B) {
  const ARowLength = A.length;
  const AColumnLength = A[0].length;

  const BRowLength = B.length;
  const BColumnLength = B[0].length;

  if (AColumnLength !== BRowLength) {
    throw new Error("Matrix cannot be multiply");
  }

  const newMatrix = createEmptyMatrix(ARowLength, BColumnLength);
  for (let i = 0; i < ARowLength; i++) {
    for (let j = 0; j < BColumnLength; j++) {
      let temp = 0;
      for (let k = 0; k < AColumnLength; k++) {
        temp += A[i][k] * B[k][j];
      }
      newMatrix[i][j] = temp;
    }
  }
  return newMatrix;
}

function randomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
