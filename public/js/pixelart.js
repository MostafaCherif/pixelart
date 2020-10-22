$(document).ready(() => {
    var socket = io()

    var canvas = $("#pixelart")[0]

    var context = canvas.getContext("2d")

    var colour = "#FFF"

    socket.on("canvas", canvasData => {
        canvasData.forEach((row, rowindex) => {
            row.forEach((col, colindex) => {
                context.fillStyle = col
                context.fillRect(colindex * 4, rowindex * 4, 4, 4)
            })

        })
    })

    document.getElementById("red").addEventListener("click", function (event) {
        colour = "#F00"
    })

    document.getElementById("orange").addEventListener("click", function (event) {
        colour = "#FFA500"
    })

    document.getElementById("yellow").addEventListener("click", function (event) {
        colour = "#FF0"
    })

    document.getElementById("green").addEventListener("click", function (event) {
        colour = "#008000"
    })

    document.getElementById("blue").addEventListener("click", function (event) {
        colour = "0000FF"
    })

    document.getElementById("indigo").addEventListener("click", function (event) {
        colour = "#2E006C"
    })

    document.getElementById("violet").addEventListener("click", function (event) {
        colour = "#EE82EE"
    })

    document.getElementById("black").addEventListener("click", function (event) {
        colour = "#000"
    })

    document.getElementById("white").addEventListener("click", function (event) {
        colour = "#FFF"
    })

    canvas.addEventListener("mousemove", function (event) {
        let rect_canvas = canvas.getBoundingClientRect();
        let x = parseInt((event.clientX - rect_canvas.left) / 4) + 1;
        let y = parseInt((event.clientY - rect_canvas.top) / 4) + 1;
        document.getElementById("var-x-coord").textContent = x;
        document.getElementById("var-y-coord").textContent = y
    })

    canvas.addEventListener("mousedown", function (event) {
        let rect_canvas = canvas.getBoundingClientRect();
        let x = parseInt((event.clientX - rect_canvas.left) / 4) + 1;
        let y = parseInt((event.clientY - rect_canvas.top) / 4) + 1;
        socket.emit("color", {
            col: Number(x),
            row: Number(y),
            color: colour
        })
        canvas.classList.remove('front');
        canvas.classList.add('back');
        document.getElementById('inv_rect').classList.remove('back');
        document.getElementById('inv_rect').classList.add('front');
        setTimeout(function () {
            canvas.classList.remove('back');
            canvas.classList.add('front');
            document.getElementById('inv_rect').classList.remove('front');
            document.getElementById('inv_rect').classList.add('back');
        }, 5000)
    })
})