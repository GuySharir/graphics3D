from tkinter import *
from tkinter import filedialog
from tkinter import colorchooser
from shapes_util import *
import os


class GUI_window():
    def __init__(self):
        window = Tk()
        window.title("3D transformations")
        window.geometry("1000x600")
        self.path = os.getcwd()
        self.data = None

        # for move
        self.move_val = 10
        # for rotate
        self.deg = 10

        self.color_code = '#ffa4a9'

        # add massage box to contact with the user
        self.messages = Label(
            window, bg='pink', text="Lets start! Please upload file", anchor='w')
        self.messages.pack(fill=X, side=BOTTOM)
        self.warning_mg = 0

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

    def warning(self):
        '''warning message to user'''
        if self.data == None:
            self.warning_mg = 1
            self.messages.config(text="warning!!! please load file")

    def angle_input(self, rotate):
        self.deg = int(rotate)

    def move_input(self, move):
        self.move_val = int(move)

    def choose_color(self):
        old_color = self.color_code
        self.color_code = colorchooser.askcolor(title="Choose color")[1]

        if self.color_code == '#ffffff':
            self.messages.config(
                text="warning! you are setting white shapes on white background. choose a different color")
            self.color_code = old_color

        elif self.data:
            self.draw_polygons()

    def move(self, axis='y'):
        self.warning()
        if self.warning_mg == 0:
            self.data.move_polygons(axis, self.move_val)
            self.draw_polygons()

    def rotate(self, case):
        self.warning()
        if self.warning_mg == 0:
            self.data.rotate(case, self.deg)
            self.draw_polygons()

    def clean_canvas(self, removeFile=False):
        '''clean canvas'''
        self.canvas.delete("all")
        self.messages.config(text="All clean! Let's start again")
        if removeFile:
            print("********** removing file ***********")
            self.data = None

    def change_perspective(self, case):
        self.warning()
        if self.warning_mg == 0:
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
            self.path = filename
            self.getFileObjects(filename)

    def getFileObjects(self, fileName):
        '''read file content into two lists - points and polygons'''
        read_object = "empty"
        points = {}
        polygons = []
        self.warning_mg = 0

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

        self.data = Shapes(points, polygons)
        self.draw_polygons()

    def draw_polygons(self):
        if self.data == None:
            pass
            # output to user - no file loaded

        self.clean_canvas()
        self.messages.config(text=f"Now displaying file: {self.path}")
        self.data.update_visibility_polygons()

        for poly in self.data.visible_polygons:
            point = poly.get_points_tuple()

            self.canvas.create_polygon(
                point, fill=self.color_code, width=2, outline='#ffffff')
