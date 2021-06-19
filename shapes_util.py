import math
from tkinter.constants import TRUE
import numpy as np

OBLIQUE = "oblique"
PERSPECTIVE = "perspective"
ORTHOGRAPHIC = "orthographic"


def subtract_points(l_point, r_point):
    """calc vector multiplication"""
    return [l_point[0] - r_point[0], l_point[1] - r_point[1], l_point[2] - r_point[2]]


def mult_cross_points(l_point, r_point):
    point_x = l_point[1] * r_point[2] - l_point[2] * r_point[1]
    point_y = l_point[2] * r_point[0] - l_point[0] * r_point[2]
    point_z = l_point[0] * r_point[1] - l_point[1] * r_point[0]
    return [point_x, point_y, point_z]


def multyplication_points(l_point, r_point):
    """multyplication between points"""

    return l_point[0] * r_point[0] + l_point[1] * r_point[1] + l_point[2] * r_point[2]


class Polygon:
    """constructor"""

    def __init__(self, points):
        self.lineColor = "#000000"
        self.points = points        # [[x,y,z],[x,y,z],[x,y,z],[x,y,z]]
        self.originalPoints = points
        self.visible = False
        self.normal = []
        self.features_calc()

    def __repr__(self):
        return "polygon object"

    def __str__(self):
        """print polygon info"""
        print("points: ", self.points)
        print("max_z", self.max_z)
        print("normal", self.normal)
        print("visible", self.visible)

        return "polygon info"

    def get_points_tuple(self):
        """get list of points using tuple"""
        points = []
        for point in self.points:
            points.extend([point[0] + 400, point[1] + 300])

        return points

    def set_new_points(self, points):
        self.points = points

    def get_points_list(self):
        return self.points

    def maxZ(self):
        """find polygon's max depth"""
        self.max_z = self.points[0][2]
        for point in self.points:
            if point[2] > self.max_z:
                self.max_z = point[2]

    def features_calc(self, full=True):
        """update polygon's features when creating polygon"""
        if full:
            self.maxZ()

        self.normal_calc()
        self.Visibility_calc()

    def normal_calc(self):
        """find polygon's normal"""

        vec_1 = subtract_points(self.points[0], self.points[1])
        vec_2 = subtract_points(self.points[0], self.points[2])
        self.normal = mult_cross_points(vec_1, vec_2)

    def choose_perspective(self, perspective):
        if perspective == PERSPECTIVE:
            self.perspective_project()
        elif perspective == OBLIQUE:
            self.oblique_project()
        elif perspective == ORTHOGRAPHIC:
            self.orthographic_project()

        self.features_calc(False)

    def Visibility_calc(self):
        """find polygon's visability"""
        if multyplication_points(self.normal, [0, 0, 1]) < 0:
            self.visible = True
        else:
            self.visible = False

    def oblique_project(self):
        """oblique projection"""
        angle = (45 * math.pi) / 180
        sin = math.sin(angle)
        cos = math.cos(angle)

        mtrix = np.array(
            [[1, 0, 0, 0],
             [0, 1, 0, 0],
             [0.5 * cos, 0.5 * sin, 1, 0],
             [0, 0, 0, 1]]
        )

        new_points = []
        for point in self.originalPoints:
            vec = np.array([point[0], point[1], point[2], 1])
            result = np.matmul(vec, mtrix)

            new_points.append([result[0], result[1], result[2]])

        self.points = new_points

    def perspective_project(self):
        """prespective projection"""
        center = (450, 300)
        prespectivePoints = []

        for point in self.points:
            s = 1 / (1 + point.z / center.z)
            matrix = [[s, 0, 0, 0], [0, s, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]

            vec = [point[0] - center[0], point[1] - center[1], point[2], 1]
            res = np.matmul(vec, matrix)

            prespectivePoints.append(
                res[0][0] + center.x, res[0][1] + center.y)

        self.points = prespectivePoints

    def orthographic_project(self):
        """orthographic projection"""
        new_points = []
        for point in self.originalPoints:
            new_points.append([point[0], point[1], 0])

        self.points = new_points

    def move(self, axis, val):
        for point in self.points:
            if axis == 'x':
                point[0] += val

            if axis == 'y':
                point[1] += val

            if axis == 'z':
                point[2] += val

        # self.originalPoints = self.points

    def center_poly(self):
        # print(f"before: {self.points}")
        for point in self.points:
            point[0] += 400
            point[1] += 300

        # print(f"after: {self.points}")


class Shapes:
    polygons = []
    visible_polygons = []
    points = {}
    perspective = "oblique"

    def __init__(self, point_list, polygon_list):
        """insert 3D point and polygons from file"""

        for point_number in point_list:
            self.points[point_number] = point_list[point_number]

        tmp = []
        for polygon in polygon_list:
            for point_number in polygon:
                tmp.append(self.points[str(int(point_number))])

            self.polygons.append(Polygon(tmp))
            tmp = []

        for poly in self.polygons:
            poly.choose_perspective(self.perspective)

    def center_scene(self):
        max_x = 0
        max_y = 0
        min_x = 0
        min_y = 0

        for poly in self.polygons:
            for point in poly.points:
                max_x = max(max_x, point[0])
                max_y = max(max_y, point[1])
                min_x = min(min_x, point[0])
                min_y = min(min_y, point[1])

        for poly in self.polygons:
            for point in poly.points:
                if min_x < 0:
                    point[0] += 450 - min_x

                if min_y < 0:
                    point[1] += 300 - min_y

                if max_x > 700:
                    point[0] += max_x - 450

                if max_y > 700:
                    point[1] = max_y - 300

    def sort_polygons(self):
        self.polygons.sort(
            key=lambda polygon_obj: polygon_obj.max_z, reverse=False)

    def move_polygons(self, axis='x', amount='50'):
        for poly in self.polygons:
            poly.move(axis, amount)

    def update_visibility_polygons(self):
        """2. if visible = 1, add polygon to draw polygon list"""

        self.sort_polygons()
        self.visible_polygons = []

        for poly in self.polygons:
            if poly.visible:
                self.visible_polygons.append(poly)

    # only if flag of perspective changed
    def change_perspective(self):
        for poly in self.polygons:
            poly.choose_perspective(self.perspective)

        # self.update_visibility_polygons()

    def set_perspective(self, perspective):
        if perspective != self.perspective:
            print(f"was: {self.perspective} changing to: {perspective}")
            self.perspective = perspective
            self.change_perspective()

    def rotate(self, direction, angle):
        ''' Rotation transformation multiplier every value
        with the mulMatrix that was build also by the wanted angle
        the direction by the wanted transformation: x,y,z '''
        mat = []
        cos = math.cos(angle * math.pi / 180)
        sin = math.sin(angle * math.pi / 180)

        if direction == 'x':
            mat = ([
                [1, 0, 0, 0],
                [0, cos, sin, 0],
                [0, -sin, cos, 0],
                [0, 0, 0, 1]
            ])

        elif direction == 'y':
            mat = ([
                [cos, 0, -sin, 0],
                [0, 1, 0, 0],
                [sin, 0, cos, 0],
                [0, 0, 0, 1]
            ])

        elif direction == 'z':
            mat = ([
                [cos, sin, 0, 0],
                [-sin, cos, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]
            ])

        for poly in self.polygons:

            new_points = []
            points = poly.get_points_list()
            for point in points:
                new_point = [float(point[0]), float(
                    point[1]), float(point[2]), 1]

                new_point = np.matmul(new_point, mat)
                # new_point = [float(x) for x in tmp]
                new_point = list(new_point[:-1])
                new_points.append(new_point)

            poly.set_new_points(new_points)
            # poly.originalPoints = poly.points

            poly.features_calc()

        self.update_visibility_polygons()
