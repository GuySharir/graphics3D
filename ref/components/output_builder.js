class OutputBuilder {
  constructor() {
    this.output = {
      points: [],
      lines: [],
      circles: [],
      bezierCurves: []
    };
  }
  withCirclesIfExist(circles) {
    circles.forEach(element => {
      if (element.type() === "Circle") {
        const circle = {
          radius: element.radius
        };
        for (let j = 0; j < this.output.points.length; ++j) {
          if (element.center.equal(this.output.points[j])) {
            circle.center = j;
            break;
          }
        }
        if (!circle.center && circle.center !== 0) {
          this.output.points.push(element.center);
          circle.center = this.output.points.length - 1;
        }
        this.output.circles.push(circle);
      }
    });
    return this;
  }

  withLinesIfExist(lines) {
    lines.forEach(element => {
      if (element.type() === "Line") {
        let line = {};

        for (let j = 0; j < this.output.points.length; ++j) {
          if (element.startPoint.equal(this.output.points[j])) {
            line.startPoint = j;
          }
          if (element.endPoint.equal(this.output.points[j])) {
            line.endPoint = j;
          }
        }
        if (!line.startPoint && line.startPoint !== 0) {
          this.output.points.push(element.startPoint);
          line.startPoint = this.output.points.length - 1;
        }
        if (!line.endPoint && line.endPoint !== 0) {
          this.output.points.push(element.endPoint);
          line.endPoint = this.output.points.length - 1;
        }
        this.output.lines.push(line);
      }
    });
    return this;
  }

  withBezierCurvesIfExist(curves) {
    curves.forEach(element => {
      if (element.type() === "Bezier curve") {
        let bezierCurve = { controlPoints: [] };
        let indexesFound = [];
        for (let i = 0; i < element.controlPoints.length; ++i) {
          for (let j = 0; j < this.output.points.length; ++j) {
            if (element.controlPoints[i].equal(this.output.points[j])) {
              indexesFound.push(i);
            }
          }
        }
        for (let i = 0; i < element.controlPoints.length; ++i) {
          let flag = false;
          for (let j = 0; j < indexesFound.length; ++j) {
            if (indexesFound[j] === i) {
              bezierCurve.controlPoints.push(j);
              flag = true;
            }
          }
          if (!flag) {
            this.output.points.push(element.controlPoints[i]);
            bezierCurve.controlPoints.push(this.output.points.length - 1);
          }
        }
        this.output.bezierCurves.push(bezierCurve);
      }
    });
    return this;
  }

  build() {
    return this.output;
  }
}
