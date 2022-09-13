const canvas = document.querySelector("canvas");
const lineWidth = document.getElementById("line-width");
const context = canvas.getContext("2d");
const color = document.getElementById("color");
const colorOptions = Array.from(document.querySelectorAll(".color-option")
);
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("des-btn");
canvas.width = 800;
canvas.height = 800;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
context.lineWidth = lineWidth.value;
let isPainting = false;
let isFilling = false;
const eraseBtn = document.getElementById("eraser-btn");
const imageFile = document.getElementById("file");
const textInput = document.getElementById("text");
context.lineCap = "round";
const saveBtn = document.getElementById("save");
function onColorClick(event) {
    context.strokeStyle = event.target.dataset.color;
    context.fillStyle = event.target.dataset.color;
    color.value = event.target.dataset.color;

}

function onMove(event) {
    if (isPainting) {
        context.lineTo(event.offsetX, event.offsetY);
        context.stroke();
        return;
    }
    context.beginPath();
    context.moveTo(event.offsetX, event.offsetY);

}
function onmousedown() {
    isPainting = true;
}

function cancle() {
    isPainting = false;
}

function onlineWidthChange(event) {
    context.lineWidth = event.target.value;
}
function oncolorchange(event) {
    context.strokeStyle = event.target.value;
    context.fillStyle = event.target.value;
}
function onModeClick() {
    if (isFilling) {
        isFilling = false;
        modeBtn.innerText = "채우기";
    }
    else {
        isFilling = true;
        modeBtn.innerText = "그리기";
    }
}

function onCanvasClick() {
    if (isFilling) {
        context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);
    }
}

function onDestroyClick() {
    context.fillStyle = "white";
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);

}
function onEraserClick() {
    context.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}

function onImageFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    // <img src=""/>
    image.src = url;
    image.onload = function () {
        context.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        imageFile.value = null;
        // image객체가 생성되어 속성들을 추가할수 있음

        // new Image(width, height); 파라미터를 넣어 미리 크기를 지정 가능
        // null 함으로서 새로 image 추가할수있는 공간 마련
    }
}
function onDoubleClick(event) {
    context.save();

    // save는 ctx의 현재상태 색상 스타일등을 저장하는 함수
    const text = textInput.value;
    if (text !== "") {
        context.lineWidth = 1;
        context.font = "68px serif";
        // size , font-family
        context.fillText(text, event.offsetX, event.offsetY);

        context.restore();
        // save와 restore 사이에서는 어떤 수정을 하던 간 저장되지 않음
    }
}
function onSaveClick() {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "jjalbangRoh.png"
    a.click();
}
// canvas.onmousemove = function(){

// } = canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onmousedown);
canvas.addEventListener("mouseup", cancle);
canvas.addEventListener("mouseleave", cancle);
lineWidth.addEventListener("change", onlineWidthChange);
color.addEventListener("change", oncolorchange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraseBtn.addEventListener("click", onEraserClick);
imageFile.addEventListener("change", onImageFileChange);
canvas.addEventListener("dblclick", onDoubleClick);
saveBtn.addEventListener("click", onSaveClick);
// 항상 마지막에 채워줘야 함.