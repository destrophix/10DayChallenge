let canvas = document.getElementById("canvas");
let increaseBtn = document.getElementById("increase");
let decreaseBtn = document.getElementById("decrease");
let sizeEl = document.getElementById("size");
let clearBtn = document.getElementById("clear");
let colorEl = document.getElementById("color");
let ctx = canvas.getContext("2d");

let x = undefined;
let y = undefined;
let size = 15;
let isPressed = false;
let color = 'black';

canvas.addEventListener('mousedown',(e)=>{
    isPressed = true;
    
})

canvas.addEventListener('mousemove',(e)=>{
    if(isPressed){
        let x1 = e.offsetX;
        let y1 = e.offsetY;
        drawCircle(x1,y1)
        drawLine(x,y,x1,y1);
        x = x1;
        y = y1;
    }
})

canvas.addEventListener('mouseup',(e) =>{
    isPressed = false;
    x = undefined;
    y = undefined;
})

canvas.addEventListener('mouseout',(e) =>{
    isPressed = false;
})

increaseBtn.addEventListener('click',(e) => {
    size += 2;
    if(size > 30){
        size = 30;
    }
    updateSize();
})

decreaseBtn.addEventListener('click',(e) => {
    size -= 2;
    if(size < 2){
        size = 2;
    }
    updateSize();
})

colorEl.addEventListener('change', (e) => {
    color = e.target.value;
})

clearBtn.addEventListener('click',()=>{
    ctx.clearRect(0,0, canvas.width, canvas.height);
})

function updateSize(){
    sizeEl.innerText = size;
}

function drawCircle(x,y){
    ctx.beginPath();
    ctx.arc(x,y,size,0, 2* Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.moveTo(x1,y1)
    ctx.lineTo(x2,y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

