# import math
# from tkinter.constants import TRUE
# import numpy as np

# OBLIQUE = "oblique"
# PERSPECTIVE = "perspective"
# ORTHOGRAPHIC = "orthographic"


# # class point_3D:
# #     def __init__(self, x, y, z, id=-1):
# #         """constructor"""

# #         self.x = int(x)
# #         self.y = int(y)
# #         self.z = int(z)
# #         self.id = int(id)

# #     def __repr__(self):
# #         return "point_3D object"

# #     def __str__(self):
# #         """print point_3D info"""
# #         print({"x": self.x, "y": self.y, "z": self.z, "id": self.id})
# #         return "point_3D info"

# #     def update(self, x, y, z):
# #         """update point"""
# #         self.x = int(x)
# #         self.y = int(y)
# #         self.z = int(z)
# #         self.id = int(id)

# #     def subtract(self, point):
# #         """calc vector multiplication"""
# #         return point_3D(self.x - point.x, self.y - point.y, self.z - point.z)

# #     def mult_cross(self, point):
# #         point_x = self.y * point.z - self.z * point.y
# #         point_y = self.z * point.x - self.x * point.z
# #         point_z = self.x * point.y - self.y * point.x
# #         return point_3D(point_x, point_y, point_z)

# #     def multyplication(self, point):
# #         """multyplication between points"""
# #         return self.x * point.x + self.y * point.y + self.z * point.z

# #     def get_tuple(self):
# #         """get point using tuple"""
# #         return (self.x, self.y)

# #     def get_points(self):
# #         """get point using tuple"""
# #         return [self.x, self.y, self.z]


# class polygon:  # max_z, normal, visible, fill_color
#     """constructor"""

#     def __init__(self, points):
#         self.lineColor = "#000000"
#         self.points = points
#         # self.points3D = point_3D_list
#         # self.project_points = []

#         self.features_calc()

#     def __repr__(self):
#         return "polygon object"

#     def __str__(self):
#         """print polygon info"""
#         index = 0
#         index2 = 0
#         for point in self.points3D:
#             print("point_3D " + str(index) + ": ", point)
#             index += 1

#         for point in self.project_points:
#             print("point " + str(index2) + ": ", point)
#             index2 += 1
#         print("max_z", self.max_z)
#         print("normal", self.normal)
#         print("visible", self.visible)

#         return "polygon info"

#     def get_points_tuple(self):
#         """get list of points using tuple"""
#         points = []
#         for point in self.project_points:
#             points.extend(point.get_tuple())
#         return points

#     def set_new_points(self, points):
#         self.project_points = points

#     def get_points_list(self):
#         """get list of points using tuple"""
#         # print("project points: ", self.project_points)
#         points = []
#         for point in self.project_points:
#             print("curr point: ", point)
#             points.extend(point.get_points())
#         return points

#     def maxZ(self):
#         """find polygon's max depth"""
#         self.max_z = self.points3D[0].z
#         for point in self.points3D:
#             if point.z > self.max_z:
#                 self.max_z = point.z

#     def features_calc(self, full=True, perspective="oblique"):
#         """update polygon's features when creating polygon"""
#         if full:
#             self.maxZ()

#         self.choose_perspective(perspective)
#         self.normal_calc()
#         self.Visibility_calc()

#     def normal_calc(self):
#         """find polygon's normal"""
#         # vec_1 = self.points3D[0].subtract(self.points3D[1])
#         # vec_2 = self.points3D[0].subtract(self.points3D[2])

#         vec_1 = self.project_points[0].subtract(self.project_points[1])
#         vec_2 = self.project_points[0].subtract(self.project_points[2])
#         self.normal = vec_1.mult_cross(vec_2)  # point 3D type

#     def choose_perspective(self, perspective):
#         if perspective == PERSPECTIVE:
#             self.perspective_project()
#         elif perspective == OBLIQUE:
#             self.oblique_project()
#         elif perspective == ORTHOGRAPHIC:
#             self.orthographic_project()

#     def Visibility_calc(self):
#         """find polygon's visability"""

#         if self.normal.multyplication(point_3D(0, 0, 1)) < 0:
#             self.visible = 1
#         else:
#             self.visible = 0

#     def oblique_project(self):
#         """oblique projection"""
#         angle = (45 * math.pi) / 180
#         sin = math.sin(angle)
#         cos = math.cos(angle)

#         mtrix = np.array(
#             [[1, 0, 0, 0], [0, 1, 0, 0], [0.5 * cos, 0.5 * sin, 1, 0], [0, 0, 0, 1]]
#         )
#         for point in self.points3D:
#             vec = np.array([point.x, point.y, point.z, 1])
#             result = np.matmul(vec, mtrix)
#             # print('result', result)
#             self.project_points.append(
#                 point_3D(result[0], result[1], result[2]))

#     def perspective_project(self):
#         """prespective projection"""
#         pass

#     def orthographic_project(self):
#         """orthographic projection"""
#         for point in self.points3D:
#             self.project_points.append(point_3D(point.x, point.y, 0))
