let canvas = null;
let context = null;

let width = 0;
let height = 0;
let timeValue = false;
let mouseDrawing = false;
let randomDrawing = false;

let mouseStart_x = 0;
let mouseStart_y = 0;

const updateBase = () => {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    width = canvas.width;
    height = canvas.height;
}

const drawPixel = () => {
    let x = Math.floor(Math.random() * 16777215) % width;
    let y = Math.floor(Math.random() * 16777215) % height;
    let size = getSize();
    context.fillRect(x, y, size, size)
}

// this function is responsible of getting all data from the various inputs 
const getSize = () => {

    let size = document.getElementById('size').value;

    // validate all inputs: not smaller then zero and not exceeding maximum bounds
    size = size <= 0 ? 1 : size;
    size = size > 4 ? 4 : size;

    return size
}

// function for drawing pixels randomly in the canvas, x and y are set randomly, size can be set by the relevant input
const drawRandomly = () => {
    randomDrawing = !randomDrawing;
    const button = document.getElementById('drawRandomly');

    if (randomDrawing) {
        button.innerHTML = "Stop Drawing"

        let i = 0;
        // delay function execution 
        timeValue = setInterval(function () {
            i++;
            if (i % 9 == 0) {
                context.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
                document.getElementById('color').value = context.fillStyle;
            }

            let x = Math.floor(Math.random() * 16777215) % width;
            let y = Math.floor(Math.random() * 16777215) % height;
            let size = getSize();

            context.fillRect(x, y, size, size)
        }, 10);
    }
    else {
        button.innerHTML = "Draw pixels randomly";
        clearInterval(timeValue);
    }


}

const drawLine = () => {
    let x1 = Math.floor(Math.random() * 16777215) % width;
    let y1 = Math.floor(Math.random() * 16777215) % height;

    let x2 = Math.floor(Math.random() * 16777215) % width;
    let y2 = Math.floor(Math.random() * 16777215) % height;

    DDA(x1, y1, x2, y2)
}

// receive mouse event for line start point
const setMouseStartPoint = (event) => {
    if (mouseDrawing) {
        mouseStart_x = event.layerX;
        mouseStart_y = event.layerY;
    }
}

// receive mouse event for line end point
const drawMouseLine = (event) => {
    if (mouseDrawing) {
        let mouseEnd_x = event.layerX;
        let mouseEnd_y = event.layerY;
        DDA(mouseStart_x, mouseStart_y, mouseEnd_x, mouseEnd_y);
    }
}

// draw a line using the DDA algorithm based on two dots
const DDA = (x1, y1, x2, y2) => {
    let range = Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2))
    let dx = (x2 - x1) / range;
    let dy = (y2 - y1) / range;

    let size = getSize();

    let _x = x1;
    let _y = y1;

    for (let i = 0; i < range; i++) {
        context.fillRect(Math.round(_x), Math.round(_y), size, size)
        _x = _x + dx;
        _y = _y + dy;
    }
}


const setColor = (event) => {
    context.fillStyle = event.target.value
}

// enable / disable mouse drawing
const toggleMouseDraw = () => {
    mouseDrawing = !mouseDrawing

    let button = document.getElementById('mouseDrawing')
    if (mouseDrawing)
        button.innerHTML = 'Disable mouse drawing';
    else
        button.innerHTML = 'Enable mouse drawing';
}


// clear the canvas content
const clearCanvas = () => {
    context.clearRect(0, 0, width, height);
}

window.onload = () => {
    window.addEventListener("resize", updateBase);
    document.getElementById('drawPixel').addEventListener('click', drawPixel)
    document.getElementById('clearCanvas').addEventListener('click', clearCanvas)
    document.getElementById('drawRandomly').addEventListener('click', drawRandomly)
    document.getElementById('drawLine').addEventListener('click', drawLine)
    document.getElementById('mouseDrawing').addEventListener('click', toggleMouseDraw)
    document.getElementById('color').addEventListener('change', setColor)

    document.getElementById('canvas').addEventListener('mousedown', setMouseStartPoint);
    document.getElementById('canvas').addEventListener('mouseup', drawMouseLine);
    updateBase()
}

