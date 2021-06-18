from tkinter import *
from tkinter import filedialog
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
        menubar = Menu(window)

        # add file upload option
        file_menu = Menu(menubar)
        menubar.add_cascade(label="File", menu=file_menu)
        file_menu.add_command(label="Browse File", command=self.browseFiles)
        file_menu.add_separator()
        # file_menu.add_command(label="File Help", command=self.file_help)

        menubar.add_command(label="Clean canvas", command=self.clean_canvas)

        menubar.add_command(label="Rotate by X",
                            command=lambda: self.rotate('x'))
        menubar.add_command(label="Rotate by Y",
                            command=lambda: self.rotate('y'))
        menubar.add_command(label="Rotate by Z",
                            command=lambda: self.rotate('z'))

        menubar.add_command(label="Move x", command=lambda: self.move('x'))
        menubar.add_command(label="Move y", command=lambda: self.move('y'))
        menubar.add_command(label="Move z", command=lambda: self.move('z'))

        menubar.add_command(label="Exit", command=window.destroy)
        window.config(menu=menubar)

        self.img_size = 700
        self.canvas = Canvas(window, width=self.img_size,
                             height=self.img_size, background='white')
        self.canvas.pack(fill=X)
        img = PhotoImage(width=self.img_size, height=self.img_size)
        self.canvas.create_image(
            (self.img_size // 2, self.img_size // 2), image=img, state="normal")

        window.mainloop()

    def move(self, axis='y'):
        self.data.move_polygons(axis, self.move_val)
        self.data.update_visibility_polygons()
        self.draw_polygons()

    def rotate(self, case):
        self.data.rotate(case)

    def clean_canvas(self):
        '''clean canvas'''
        self.canvas.delete("all")
        self.messages.config(text="All clean! Let's start again")

        self.img = PhotoImage(width=self.img_size, height=self.img_size)
        self.canvas.create_image(
            (self.img_size // 2, self.img_size // 2), image=self.img, state="normal")

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
        print('draw polygon')
        self.clean_canvas()
        for poly in self.data.visible_polygons:
            self.canvas.create_polygon(poly.get_points_tuple(
            ), fill='#ffa4a9', width=2, outline='#ffffff')
