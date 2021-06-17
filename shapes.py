import polygon

class shapes():
    polygons = []
    visible_polygons = []
    point_3d = {}
    
    def __init__(self, point_number, point_list, polygon_list):
        '''insert 3D point and polygons from file'''
        index = 0
        for obj in point_list:
            comma_split = obj.strip('\n').split(',')
            self.point_3d[point_number[index]] = polygon.point_3D(comma_split[0], comma_split[1], comma_split[2], point_number[index])
            index += 1

        for obj in polygon_list:
            polygon_points = []
            comma_split = obj.strip('\n').split(',')
            for number in comma_split:
                polygon_points.append(self.point_3d[number])
            self.polygons.append(polygon.polygon(polygon_points.copy()))

        self.sort_polygons()
    
    def sort_polygons(self):  
        '''sort polygon list according to z value = depth'''  
        # delete after test####################
        # inx = 0
        # for my_poly in self.polygons:
        #     print('polygon'+ str(inx), my_poly)
        #     inx += 1
        # #####################################
        '''1. sort polygons'''
        self.polygons.sort(key=lambda polygon_obj: polygon_obj.max_z, reverse=True)
        
        '''2. if visible = 1, add polygon to draw polygon list'''
        for my_poly in self.polygons:
            if my_poly.visible == 1:
                self.visible_polygons.append(my_poly)