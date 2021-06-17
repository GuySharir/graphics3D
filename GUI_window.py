from tkinter import *
from tkinter import filedialog
import shapes

class GUI_window():
    def __init__(self):
        window = Tk()
        window.title("3D transformations")
        window.geometry("1000x600")

        # add massage box to contact with the user
        self.messages = Label(window, bg='pink', text="Lets start! Please upload file", anchor='w')
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
        menubar.add_command(label="Exit", command=window.destroy)
        window.config(menu=menubar)

        self.img_size = 700
        self.canvas = Canvas(window, width=self.img_size,height=self.img_size, background='white')
        self.canvas.pack(fill=X)
        img = PhotoImage(width=self.img_size, height=self.img_size)
        self.canvas.create_image((self.img_size // 2, self.img_size // 2), image=img, state="normal")

        window.mainloop()

    def clean_canvas(self):
        '''clean canvas'''
        self.canvas.delete("all")
        self.messages.config(text="All clean! Let's start again")

        self.img = PhotoImage(width=self.img_size, height=self.img_size)
        self.canvas.create_image((self.img_size // 2, self.img_size // 2), image=self.img_size, state="normal")

    def browseFiles(self):
        '''upload file'''
        filename = filedialog.askopenfilename(initialdir="/",
                                                  title="Select a File",
                                                  filetypes=(("Text files",
                                                              "*.txt*"),
                                                             ("all files",
                                                              "*.*")))
        self.getFileObjects(filename)

    def getFileObjects(self, fileName):
        '''read file content into two lists - points and polygons'''
        read_object = "empty"
        point_number = []
        point = []
        polygon_number = []
        polygon = []

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
                        print(space_split)
                        point_number.append(space_split[0])
                        point.append(space_split[1])

                    elif read_object == "polygons":
                        space_split = line.split(' ')
                        print(space_split)
                        polygon_number.append(space_split[0])
                        polygon.append(space_split[1])

        print("number of points:", point_number, "points:", point, "\n")   
        print("number of polygon:", polygon_number, "polygon:", polygon, "\n") 
        shapes.shapes(point_number, point, polygon)         

        self.draw_polygons()

    def draw_polygons(self):
        print('draw polygon')

   

   

