const canvas=document.querySelector('canvas');
const ctx=canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/*----- event listeners-----*/

window.addEventListener('mousemove',
  function(event){ // this anonymous function returns an event Object
  mouse.x = event.x;
  mouse.y = event.y;
});
function drawMouseCoordinates(){
    ctx.strokeStyle='black';
    ctx.font='20px Verdana';
    ctx.strokeText(mouse.x.toString()+','+mouse.y.toString()+'!',mouse.x+5, mouse.y)
}
/*----- variables -------*/
let counter = 0;
let on = true;
let mouse = {
    x: undefined,
    y: undefined
  }
/*----- drawing functions -------*/

const drawRect = (color,x,y,w,h) => {
    ctx.fillStyle=color;
    let adjustedX = x-(w*0.5);
    let adjustedY = y-(y*0.5);
    ctx.fillRect(adjustedX,adjustedY,w,h);
};

const expandoRect = (x,y) => {
    let width = (counter*5)+50;
    let height = (counter*5)+50;
    let adjustedX = x-(width*0.5);
    let adjustedY = y-(height*0.5);
    ctx.strokeRect(adjustedX,adjustedY,width,height);
};

const flickerBackground = (color1,color2,threshold) => {
    switch(on){
        case true:
        drawRect(color1,0,0,canvas.width,canvas.height);
        break;
        case false:
        drawRect(color2,0,0,canvas.width,canvas.height);
        break;
        default:
        drawRect(color1,0,0,canvas.width,canvas.height);
        break
    };
    flicker(threshold); 
}

const flicker = (threshold) => {
    r = Math.random();
    if(r<threshold){
        on = !on;
        return;
    }
}
const wobbleRect = (color,x,y,w,h,wobbleRange) => {
    ctx.fillStyle=color;
    let width = (Math.random()*wobbleRange) + w;
    let height = (Math.random()*wobbleRange) + h;
    let adjustedX = x-(width*0.5);
    let adjustedY = y-(height*0.5);
    ctx.fillRect(adjustedX,adjustedY,w,h);
};

const lineEntity = (color,x,y,w,h,wobbleRange) => {
    ctx.fillStyle=color;
    let width = (Math.random()*wobbleRange) + w;
    let height = (Math.random()*wobbleRange) + h;
    let adjustedX = x-(width*0.5);
    let adjustedY = y-(height*0.5);
    ctx.fillRect(adjustedX,adjustedY,w,h);
    ctx.beginPath();
    ctx.moveTo(adjustedX,adjustedY);
    ctx.lineTo(0,0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(adjustedX,adjustedY+h);
    ctx.lineTo(0,canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(adjustedX+w,adjustedY+h);
    ctx.lineTo(canvas.width,canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(adjustedX+w,adjustedY);
    ctx.lineTo(canvas.width,0);
    ctx.stroke();
}

/*--- animation control ----*/
function update(){
    counter = (counter+1)%100;
    //console.log(counter);
    //ctx.clearRect(0,0,canvas.width,canvas.height);
    flickerBackground('black','white',0.3);
    lineEntity('black',220,200,50,50,5);
    lineEntity('white',581,361,50,50,5);
    lineEntity('red',mouse.x,mouse.y,50,50,5);
    //drawMouseCoordinates();
}
const fps=15;
setInterval(update, 1000/fps);
