import polygon


class shapes:
    polygons = []
    visible_polygons = []
    point_3d = {}
    perspective = ""

    def __init__(self, point_number, point_list, polygon_list):
        """insert 3D point and polygons from file"""
        index = 0
        for obj in point_list:
            comma_split = obj.strip("\n").split(",")
            self.point_3d[point_number[index]] = polygon.point_3D(
                comma_split[0], comma_split[1], comma_split[2], point_number[index]
            )
            index += 1

        for obj in polygon_list:
            polygon_points = []
            comma_split = obj.strip("\n").split(",")
            for number in comma_split:
                polygon_points.append(self.point_3d[number])

            self.polygons.append(polygon.polygon(polygon_points.copy()))

        """1. sort polygons"""
        self.polygons.sort(key=lambda polygon_obj: polygon_obj.max_z, reverse=True)

        self.update_visibility_polygons()

    def update_visibility_polygons(self):
        # delete after test####################
        # inx = 0
        # for my_poly in self.polygons:
        #     print('polygon'+ str(inx), my_poly)
        #     inx += 1
        # #####################################

        """2. if visible = 1, add polygon to draw polygon list"""
        for my_poly in self.polygons:
            if my_poly.visible == 1:
                self.visible_polygons.append(my_poly)

    #### only if flag of perspective changed
    def changePerspective(self):
        for poly in self.polygons:
            poly.features_calc(False, self.perspective)

        self.update_visibility_polygons()

    def setPerspective(self, perspective):
        if perspective != self.perspective:
            self.perspective = perspective
            self.changePerspective()