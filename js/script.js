const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

ctx.canvas.width = innerWidth;
ctx.canvas.height = innerHeight;

let particleArray;

// Create Constructor Function
function Particle(x, y, dx, dy, size, fillColor, strokeColor) {

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;

}

Particle.prototype.draw = function() {

    ctx.beginPath();

    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.fillColor;
    ctx.fill();
    ctx.strokeStyle = this.strokeColor;
    ctx.stroke();

}

Particle.prototype.update = function() {

    if(this.x + this.size > canvas.width || this.x - this.size < 0) {
        this.dx *= -1;
    }

    if(this.y + this.size > canvas.height || this.y - this.size < 0) {
        this.dy *= -1;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();

}

function init() {

    particleArray = [];
    for (let i = 0; i < 200; i++) {
        
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.width;
        let dx = (Math.random() * 1) - .5;
        let dy = (Math.random() * 1) - .5;
        let size = Math.random() * 20;
        let fillColor = 'transparent';
        let strokeColor = 'black';

        particleArray.push(new Particle(x, y, dx, dy, size, fillColor, strokeColor));

    }

}

function animate() {

    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particleArray.length; i++) {

        particleArray[i].update();

    }

}

init();
animate();

window.addEventListener('resize', function() {

    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();

});