const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const black = document.getElementById("black");
const red = document.getElementById("red");
const green = document.getElementById("green");
const blue = document.getElementById("blue");
const lightBlue = document.getElementById("lightBlue");
const pink = document.getElementById("pink");
const yellow = document.getElementById("yellow");
const orange = document.getElementById("orange");
const pencil = document.getElementById("pencil");
const eraser = document.getElementById("eraser");
const size1 = document.getElementById("size1");
const size2 = document.getElementById("size2");
const size3 = document.getElementById("size3");
const size4 = document.getElementById("size4");
const clear = document.getElementById("clear");
const cursor = document.getElementById("cursor");

canvas.width = 600;
canvas.height = 600;

canvas.style.border = "solid 2px #000";

const colors = ["#000", "#f00", "#228b22", "#00f", "#46a9df", "#ff69b4", "#ff0", "#f60", "#fff"];
const sizes = [2, 4, 6, 8];

// When true, moving cursor draws on the canvas
let mode = "pen";
let isErasing = false;
let isDrawing = false;
let x = 0; 
let y = 0;
let currentColor = [colors[0]];
let currentSize = [sizes[1]];

// Add the event listeners for mousedown, moseup, and mousemove
canvas.addEventListener("mousedown", e => {
    x = e.offsetX;
    y = e.offsetY;
    if (mode === "pen") isDrawing = true;
    if (mode === "erase") isErasing = true;
});

canvas.addEventListener("mousemove", e => {
    if (isDrawing === true) {
        draw(ctx, x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
    }

    if (isErasing === true) {
        erase(ctx, x, y);
        x = e.offsetX;
        y = e.offsetY;
    }
});

window.addEventListener("mouseup", e => {
    if (isDrawing === true) {
        draw(ctx, x, y, e.offsetX, e.offsetY);
        x = 0;
        y = 0;
        isDrawing = false;
    }
    if (isErasing === true) {
        erase(ctx, x, y);
        x = 0;
        y = 0;
        isErasing = false;
    }
});

canvas.addEventListener("mousemove", e => {
    let x = e.clientX;
    let y = e.clientY;

    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;

    cursor.style.border = "solid 2px #000";

    if (mode === "pen") {
        cursor.style.backgroundColor = currentColor[0];
        cursor.style.width = `${currentSize[0] * 2}px`;
        cursor.style.height = `${currentSize[0] * 2}px`;
    }

    if (mode === "erase") {
        cursor.style.backgroundColor = colors[8];
        cursor.style.width = `${currentSize[0] * 2}px`;
        cursor.style.height = `${currentSize[0] * 2}px`;
    }
});

black.onclick = () => {
    currentColor.length = 0;
    currentColor.push(colors[0]);
}

red.onclick = () => {
    currentColor.length = 0;
    currentColor.push(colors[1]);
}

green.onclick = () => {
    currentColor.length = 0;
    currentColor.push(colors[2]);
}

blue.onclick = () => {
    currentColor.length = 0;
    currentColor.push(colors[3]);
}

lightBlue.onclick = () => {
    currentColor.length = 0;
    currentColor.push(colors[4]);
}

pink.onclick = () => {
    currentColor.length = 0;
    currentColor.push(colors[5]);
}

yellow.onclick = () => {
    currentColor.length = 0;
    currentColor.push(colors[6]);
}

orange.onclick = () => {
    currentColor.length = 0;
    currentColor.push(colors[7]);
}

pencil.onclick = () => {
    mode = "pen"
}

eraser.onclick = () => {
    mode = "erase"
}

size1.onclick = () => {
    currentSize.length = 0;
    currentSize.push(sizes[0]);
}

size2.onclick = () => {
    currentSize.length = 0;
    currentSize.push(sizes[1]);
}

size3.onclick = () => {
    currentSize.length = 0;
    currentSize.push(sizes[2]);
}

size4.onclick = () => {
    currentSize.length = 0;
    currentSize.push(sizes[3]);
}

clear.onclick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw(ctx, x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.lineWidth = currentSize[0];
        ctx.strokeStyle = currentColor[0];
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
}

function erase(ctx, x, y) {
    ctx.beginPath();
    ctx.fillStyle = colors[8];
    ctx.arc(x, y, currentSize[0], 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
}
