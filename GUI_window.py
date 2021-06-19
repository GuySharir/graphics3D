from tkinter import *
from tkinter import filedialog
from tkinter import colorchooser
import shapes_util
import os


class GUI_window():
    def __init__(self):
        window = Tk()
        window.title("3D transformations")
        window.geometry("1000x600")
        self.path = os.getcwd()

        # for move
        self.move_val = 50

        # for rotate
        self.deg = 45

        # add massage box to contact with the user
        self.messages = Label(
            window, bg='pink', text="Lets start! Please upload file", anchor='w')
        self.messages.pack(fill=X, side=BOTTOM)

        # menu
        menubar = Frame(window)
        side_menu = Frame(window)
        # top buttons
        Button(menubar, text="File", command=self.browseFiles, height=2,
               width=10, bg='pink').grid(row=0, column=0, padx=10, pady=10)
        Button(menubar, text="Clean canvas", command=lambda: self.clean_canvas(
            True), height=2, width=10, bg='pink').grid(row=0, column=1, padx=10, pady=10)
        Button(menubar, text="perspective", command=lambda: self.change_perspective(
            'perspective'), height=2, width=10, bg='pink').grid(row=0, column=2, padx=10, pady=10)
        Button(menubar, text="oblique", command=lambda: self.change_perspective(
            'oblique'), height=2, width=10, bg='pink').grid(row=0, column=3, padx=10, pady=10)
        Button(menubar, text="orthographic", command=lambda: self.change_perspective(
            'orthographic'), height=2, width=10, bg='pink').grid(row=0, column=4, padx=10, pady=10)
        Button(menubar, text="color", command=self.choose_color, height=2,
               width=10, bg='pink').grid(row=0, column=5, padx=10, pady=10)
        Button(menubar, text="Exit", command=window.destroy, height=2,
               width=10, bg='pink').grid(row=0, column=6, padx=10, pady=10)
        menubar.pack(side=TOP)

        # left buttons
        Scale(side_menu, label='Rotate', from_=10, to=100, orient=HORIZONTAL, showvalue=0,
              tickinterval=30, command=self.angle_input).grid(row=0, column=0, padx=4, pady=4)
        Button(side_menu, text="Rotate by x", command=lambda: self.rotate(
            'x'), height=2, width=10, bg='pink').grid(row=1, column=0, padx=10, pady=10)
        Button(side_menu, text="Rotate by y", command=lambda: self.rotate(
            'y'), height=2, width=10, bg='pink').grid(row=2, column=0, padx=10, pady=10)
        Button(side_menu, text="Rotate by z", command=lambda: self.rotate(
            'z'), height=2, width=10, bg='pink').grid(row=3, column=0, padx=10, pady=10)
        Scale(side_menu, label='Move', from_=10, to=100, orient=HORIZONTAL, showvalue=0,
              tickinterval=30, command=self.move_input).grid(row=4, column=0, padx=10, pady=10)
        Button(side_menu, text="Move x", command=lambda: self.move(
            'x'), height=2, width=10, bg='pink').grid(row=5, column=0, padx=10, pady=10)
        Button(side_menu, text="Move y", command=lambda: self.move(
            'y'), height=2, width=10, bg='pink').grid(row=6, column=0, padx=10, pady=10)
        Button(side_menu, text="Move z", command=lambda: self.move(
            'z'), height=2, width=10, bg='pink').grid(row=7, column=0, padx=10, pady=10)
        side_menu.pack(side=LEFT)

        self.img_size = 700
        self.canvas = Canvas(window, width=self.img_size,
                             height=self.img_size, background='white')
        self.canvas.pack(fill=X)

        window.mainloop()

    def angle_input(self, rotate):
        self.deg = rotate

    def move_input(self, move):
        self.move_val = move

    def choose_color(self):
        self.color_code = colorchooser.askcolor(title="Choose color")

    def move(self, axis='y'):
        self.data.move_polygons(axis, self.move_val)
        self.draw_polygons()

    def rotate(self, case, val=15):
        self.data.rotate(case, val)
        self.draw_polygons()

    def clean_canvas(self, removeFile=False):
        '''clean canvas'''
        self.canvas.delete("all")
        self.messages.config(text="All clean! Let's start again")
        if removeFile:
            self.data = None

    def change_perspective(self, case):
        self.data.set_perspective(case)
        self.draw_polygons()

    def browseFiles(self):
        '''upload file'''
        filename = filedialog.askopenfilename(initialdir=self.path,
                                              title="Select a File",
                                              filetypes=(("Text files",
                                                          "*.txt*"),
                                                         ("all files",
                                                          "*.*")))

        if filename != '':
            self.getFileObjects(filename)
            self.path = filename

    def getFileObjects(self, fileName):
        '''read file content into two lists - points and polygons'''
        read_object = "empty"
        points = {}
        polygons = []

        if fileName:
            with open(fileName, 'r') as read_obj:
                for line in read_obj:
                    if "#points" in line:                         # detect points object reading
                        read_object = "points"
                    elif line == '\n':                            # detect object reading
                        read_object = "empty"
                    elif "#polygons" in line:                     # detect polygons object reading
                        read_object = "polygons"

                    elif read_object == "points":
                        space_split = line.split(' ')
                        tmp = space_split[1].strip("\n").split(",")
                        points[space_split[0]] = [float(x) for x in tmp]

                    elif read_object == "polygons":
                        space_split = line.split(' ')
                        tmp = space_split[1].strip("\n").split(",")
                        polygons.append([float(x) for x in tmp])

        self.data = shapes_util.Shapes(points, polygons)

        self.draw_polygons()

    def draw_polygons(self):
        if self.data == None:
            pass
            # output to user - no file loaded

        self.clean_canvas()
        self.data.update_visibility_polygons()
        # self.data.sort_polygons()

        polygons_display = [shapes_util.Polygon(
            x.get_points_list())for x in self.data.visible_polygons]

        for poly in polygons_display:
            poly.center_poly()
            self.canvas.create_polygon(poly.get_points_tuple(
            ), fill='#ffa4a9', width=2, outline='#ffffff')
