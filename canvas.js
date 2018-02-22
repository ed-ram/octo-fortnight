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
//   c.stroke();
//   c.strokeStyle = 'rgba(0,',255,col,col,',0.9)';
// // }

var mouse = { //here we create a mouse object
  x: undefined,
  y: undefined
}
var maxRadius = 10;
// var minRadius = 2;
// var mouseRadius = 100;

var colorArray = [
  '#333333',
  '#00E8DC',
  '#FF0071',
  '#0032E8',
  '#B5B4B3'
];



window.addEventListener('mousemove',
  function(event){ // this anonymous function returns an event Object
  mouse.x = event.x;
  mouse.y = event.y;
});
window.addEventListener('resize',
    function(){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    }
);


function Circle(x,y,dx,dy,rad){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.rad = rad;
    this.minRadius = rad;
    this.color = colorArray[Math.floor(Math.random()*(colorArray.length))];
    
    this.draw = function(){ //anonymous function
      c.beginPath();
      c.arc(this.x,this.y, this.rad, 0, Math.PI *2, false);
      c.fillStyle = this.color;
      c.stroke();
      c.fill();
    }
    this.update = function(){
      this.x += this.dx;
      this.y+= this.dy;
      if(this.x + this.rad>=innerWidth || this.x-this.rad <= 0){
          this.x = canvas.width/2;
          this.rad = 0;
          this.dx = (Math.random()-0.5)*10;
          this.dy = (Math.random()-0.5)*10;
        }
      if(this.y + this.rad>=innerHeight || this.y-this.rad <= 0){
          this.dy = -this.dy;       
          this.dx = this.dx*2;   
      }
      // interactiviy
/*      if(mouse.x-this.x <50 && mouse.x-this.x>-50 && mouse.y-this.y <50 && mouse.y-this.y>-50){
          if(this.rad < maxRadius){
            this.rad += 2;
          }
      } else if(this.rad > this.minRadius){
          this.rad -= 1;
      }
*/
        if((canvas.width/2)-this.x <10 && (canvas.width/2)-this.x>-10) {
            if(this.rad < maxRadius){
                this.rad += 0.1;
            }else if(this.rad > this.minRadius) {
                this.rad -= 2.0;
            }

        }
        
      this.draw();
  }
}

//MAke a sample of randomly valued objects with array and for loop \,;,/

var circleArray = [];  //create an empty array

function init(){
      circleArray = [];

      for (var i = 0; i < 50; i++) { // populate that mfer with random circles using .push method, new Circle
      var rad = 0; // +1 in case rand returns a zero
      var x = canvas.width/2;
      var y = Math.random()*(innerHeight - rad*2);
      var dx = (Math.random()-0.5)*10;
      var dy = (Math.random()-0.5)*10;
      
      circleArray.push(new Circle(x,y,dx,dy,rad));
 console.log(circleArray);  //look at these objects in the console
  }
}

var timer = 0;

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth,  innerHeight);  //takes x, y, width and height
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
        c.fillStyle='white';
c.fillRect(100,100,100,100)
    }
    
//    circle.update();
    // c.beginPath();
    // c.arc(x, y, rad, 0, Math.PI *2, false);
    // c.strokeStyle = 'red';
    // c.stroke();
}

init();
animate();
