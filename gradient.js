var canvas = document.getElementById('canvas2');
var ctx = canvas.getContext('2d');


function test(){
    ctx.fillStyle='red';
ctx.fillRect(200,100,300,400);
}

function draw(){
    test();
}

function animate(){
    requestAnimationFrame(animate);
    draw()
}

animate();