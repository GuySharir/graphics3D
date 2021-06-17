import polygon

class shapes():
    polygons = []
    point_3d = {}
    
    def __init__(self, point_number, point_list, polygon_list):
        '''insert 3D point and polygons from file'''
        index = 0
        for obj in point_list:
            comma_split = obj.strip('\n').split(',')
            print('comma split', comma_split)
            self.point_3d[point_number[index]] = polygon.point_3D(comma_split[0], comma_split[1], comma_split[2], point_number[index])
            print('point 3d', self.point_3d[point_number[index]])
            index += 1

        polygon_points = []
        for obj in polygon_list:
            comma_split = obj.strip('\n').split(',')
            for number in comma_split:
                polygon_points.append(self.point_3d[number])
            for point_3d in polygon_points:
                print("polygon_points:", point_3d)
            self.polygons.append(polygon.polygon(polygon_points))
        
        # self.sort_polygons()
    
    def sort_polygons():  
        '''sort polygon list according to z value = depth'''  
        pass