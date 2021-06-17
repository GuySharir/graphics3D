class point_3D():
    def __init__(self, x, y, z, id):
        self.x = x
        self.y = y
        self.z = z
        self.id = id
    def __repr__(self):
        return "point_3D object"
        
    def __str__(self):
        print({'x':self.x, 'y':self.y, 'z':self.z, 'id':self.id})

    def update(self, x, y, z):
        self.x = x
        self.y = y
        self.z = z
        self.id = id

class point_2D():
    def __init__(self, x, y, id):
        self.x = x
        self.y = y

    def update(self, x, y):
        self.x = x
        self.y = y

class polygon():
    def __init__(self, point_3D_list):
        lineColor = "#000000"
        # points3D
        # points2D
        # fill_color
        # visible
        # normal
        self.features_calc()

    def __repr__(self):
        pass

    def features_calc(self):
        pass
