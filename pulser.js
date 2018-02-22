var canvas = document.querySelector('canvas'); //this method searches through the document calling this script for
    // the string 'canvas' and returns the docs element, binds dat element to var canvas

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// getContext described as a "super object", gives us access to shitloads of blackbox functions w/which to draw
var c = canvas.getContext('2d');

// methods like fillRect for example which would be a ballache to try and re-invent




//
// //draw a line
// c.beginPath();
// c.moveTo(100,100);
// c.lineTo(400,450);
// c.moveTo(100, 100);
// c.lineTo(450,400)
// c.moveTo(100, 100);
// c.lineTo(400,400);
// c.strokeStyle = "green"
// c.stroke();
//
// //draw circles using arc
// c.beginPath();
// c.arc(400,400, 50, 0, Math.PI *2, false); //arc takes (x,y, radius, startAngle, endAngle, true or false - clockwise?)
// c.stroke();
// //
// for (var i=0; i<20; i++){
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;
//   var col= Math.random()*255;
//   c.beginPath();
//   c.arc(x,y, i*2, 0, Math.PI * 2, false);
//   c.strokeStyle = 'rgba(0,',255,col,col,',0.9)';
//   c.stroke();
// }

var x = 200;

let mouse = {
  x: undefined,
  y: undefined
}
window.addEventListener('mousemove',
  function(event){ // this anonymous function returns an event Object
  mouse.x = event.x;
  mouse.y = event.y;
});
function drawMouseCoordinates(){
    c.strokeStyle='black';
    c.font='20px Verdana';
    c.strokeText(mouse.x.toString()+','+mouse.y.toString()+'!',mouse.x+5, mouse.y)
}


function animate(){
  requestAnimationFrame(animate);
    if(x<=450){
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);  //takes x, y, width and height
    c.beginPath();
    c.arc(x, 200, 100, 0, Math.PI *2, false);
    c.strokeStyle = 'red';
    c.stroke();
    x+=1;
  } else if(x<=600){
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    c.arc(450, 200, 100, (x*0.1), Math.PI *2, false);
    c.strokeStyle = 'red';
    c.stroke();
    c.clearRect(440, 160, 200, 50);
    c.font = '30px Arial';
    c.strokeStyle='yellow';
    c.strokeText('browser death  ', 450, 200);
    x+=1;
}
else{
  c.fillStyle='green';
  c.fillRect(500,210, x-600, 1);
  c.fillRect(500,160, x-610, 1);
  c.fillRect(500,180, x-610, 1);
  x+=1;
}
drawMouseCoordinates();
}
