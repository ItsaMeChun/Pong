const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
const context = canvas.getContext("2d");
class Paddle {
    constructor({position}) {
        this.position = position;
        this.velocity = {x: 0, y: 0};
        this.width = 10;
        this.height = 100;
    }

    draw() {
        context.fillStyle = "white";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(){
        this.draw();
        if(this.position.y + this.velocity.y > 0 && this.position.y + this.height + this.velocity.y < canvas.height) {
            this.position.y += this.velocity.y;
        }
    }
}

class Ball {
    constructor({position}) {
        const speed = 7;
        const direction = {
            x: (Math.random() - 0.5) >= 0 ? -speed : speed,
            y: (Math.random() - 0.5) >= 0 ? -speed : speed,
        }
        this.position = position;
        this.velocity = {x: direction.x, y: direction.y};
        this.width = 10;
        this.height = 10;
    }

    draw() {
        context.fillStyle = "white";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        const rightSide = this.position.x + this.width + this.velocity.x;
        const leftSide = this.position.x + this.velocity.x;
        const bottomSide = this.position.y + this.height + this.velocity.y;
        const topSide = this.position.y + this.velocity.y;

        //Collision with paddle1
        if(leftSide <= paddle1.position.x + paddle1.width && bottomSide >= paddle1.position.y && topSide <= paddle1.position.y + paddle1.height) {
            this.velocity.x = -this.velocity.x;
        }

        //Collision with paddle2
        if(rightSide >= paddle2.position.x && bottomSide >= paddle2.position.y && topSide <= paddle2.position.y + paddle2.height){
            this.velocity.x = -this.velocity.x;
        }

        //Collision with wall
        if(bottomSide >= canvas.height || topSide <= 0) {
            this.velocity.y = -this.velocity.y + Math.random();
        }

        //Over
        if(leftSide <= 0 || rightSide >= canvas.width) {
            context.fillStyle = "white";
            context.font = "20px arial"
            context.fillText("Over", canvas.width / 2, canvas.height / 2)
            return;
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}
const paddle1 = new Paddle({position: {x: 10, y: 100}})
const paddle2 = new Paddle({position: {x: canvas.width - 10 * 2, y: 100}})
const ball = new Ball({position: {x: canvas.width / 2, y: canvas.height / 2}})
function animate(){
    requestAnimationFrame(animate);
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height)
    paddle1.update();
    paddle2.update();
    ball.update();
}
animate();

// MOVE
addEventListener('keydown', (event) => {
    const speed = 20;
    switch(event.key){
        case "w":
            paddle1.velocity.y = -speed;
            break;
        case "s":
            paddle1.velocity.y = speed;
            break;
        case "ArrowUp":
            paddle2.velocity.y = -speed;
            break;
        case "ArrowDown":
            paddle2.velocity.y = speed;
            break;
    }
});

// STOP
addEventListener('keyup', (event) => {
    switch(event.key) {
        case "w":
            if(paddle1.velocity.y < 0) {
                paddle1.velocity.y = 0;
            }
            break;
        case "s":
            if(paddle1.velocity.y > 0) {
                paddle1.velocity.y = 0;
            }
            break;
        case "ArrowUp":
            if(paddle2.velocity.y < 0) {
                paddle2.velocity.y = 0;
            }
            break;
        case "ArrowDown":
            if(paddle2.velocity.y > 0) {
                paddle2.velocity.y = 0;
            }
            break;   
    }
});

