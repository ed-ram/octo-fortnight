const canvas=document.querySelector('canvas');
const ctx=canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



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

const clickHandler = () => {
    if((Math.abs(mouse.x - coordinates.obj1.x)<=10)&&(Math.abs(mouse.y - coordinates.obj1.y)<=10)){
        console.log('clicked black');
    }
    if((Math.abs(mouse.x - coordinates.obj2.x)<=10)&&(Math.abs(mouse.y - coordinates.obj2.y)<=10)){
        console.log('clicked white');
    }
}

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

const flickerBackground = (color1,color2,x,y,w,h) => {
    switch(on){
        case true:
        ctx.fillStyle=color1;
        ctx.fillRect(x,y,w,h);
        break;
        case false:
        ctx.fillStyle=color2;
        ctx.fillRect(x,y,w,h);
        break;
        default:
        fillRect(x,y,w,h);
        break
    };
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

function lineEntity(color,x,y,w,h,wobbleRange) {
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
};

function Entity(color,x,y, blockSize) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.w = blockSize;
    this.h = blockSize;
    this.wobbleRange = 5;

    this.draw = function() {
        lineEntity(this.color,this.x,this.y,this.w,this.h,this.wobbleRange);
    }
    this.update = function() {
        this.draw();
    }
    
};


    
 let entityIterations = [];

let coordinates = {
    obj1:{x:canvas.width*0.25, y:canvas.height*0.3},
    obj2:{x:canvas.width*0.67, y:canvas.height*0.68},
}

function init(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    coordinates.obj1={x:canvas.width*0.25, y:canvas.height*0.3};
    coordinates.obj2={x:canvas.width*0.67, y:canvas.height*0.68};
    let blockSize = canvas.width*0.08;
    entityIterations = [];
    entityIterations.push(new Entity('black',coordinates.obj1.x, coordinates.obj1.y,blockSize), 
    new Entity('white',coordinates.obj2.x, coordinates.obj2.y,blockSize));
}

/*--- animation control ----*/
function update(){
    //counter = (counter+1)%100;
    //console.log(counter);
    //ctx.clearRect(0,0,canvas.width,canvas.height);
    flicker(0.1); 
    flickerBackground('#070a36','#0f19a9',0,0,canvas.width,canvas.height);    
    for (var i=0; i<entityIterations.length; i++){
        entityIterations[i].update();
    };
    let pointX = mouse.x/canvas.width;
    let pointY = mouse.y/canvas.height;
    //console.log(pointX + ',' + pointY);
    /*lineEntity('black',220,200,50,50,5);
    lineEntity('white',581,361,50,50,5);
    lineEntity('red',mouse.x,mouse.y,50,50,5);
    */
    //drawMouseCoordinates();
};
init();
const fps=15;
setInterval(update, 1000/fps);
/*----- event listeners-----*/

window.addEventListener('resize', function(){
    init();
})

window.addEventListener('mousemove',
  function(event){ //  anonymous function returns an event Object
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('click', clickHandler);
