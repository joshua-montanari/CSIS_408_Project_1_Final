var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 20;
var dx = 3;
var dy = 3;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;

var lives= 5;
var score = 0;

var brickRowCount = 5;
var brickColumnCount = 9;
var brickWidth = 80;
var brickHeight = 20;
var brickPadding = 5;
var brickOffsetTop = 20;
var brickOffsetLeft = 20;

//change difficulty
function difficultySelect(rowCount, columnCount, padding, width){
    brickRowCount = rowCount;
    brickColumnCount = columnCount;
    brickWidth = width;
    brickPadding = padding;
    console.log('function is called')
    console.log(brickRowCount)
    return brickRowCount, brickColumnCount, brickWidth, brickPadding
}

console.log(brickRowCount)

var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}


function playerLives() {
   
    if (lives !== 1){
          lives = lives - 1;
        document.getElementById("life").innerHTML = "Lives: " + lives; 
        
    }
    
    else { 
        document.getElementById("life").innerHTML = "Lives: " + lives; 
        //window.alert("Game Over");
        window.location.replace("lose.html");
        
    }
   
}

//brickColumnCount * brickRowCount)* 100

function playerScore(){
    score = score + 100;
    if(score >= (brickColumnCount * brickRowCount)* 100){
        //document.querySelector('winLives') = "Lives Left: " + lives;
        //document.querySelector('winScore') = "Score: " + score;
        window.location.replace("win.html");
    }
    document.getElementById("score").innerHTML = "Score: " + score;
}

function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    playerScore();
            
                }
            }
        }
    }
}



function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function ballReset(){
    playerLives();
    dx = -dx;
	y = canvas.width/3;
    x = canvas.height/2;
   
}



function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                switch(r){
                  case 0:
                      ctx.fillStyle = '#0000cc'
                      break;
                  case 1:
                      ctx.fillStyle = '#3399ff'
                      break;
                  case 2:
                      ctx.fillStyle = '#ccffff'
                      break;
                  case 3: 
                      ctx.fillStyle = '#ffff99'
                      break;
                  case 4:
                      ctx.fillStyle = 'yellow'
                      break;
                  default:
                    ctx.fillStyle = 'pink'     
                }
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}




function draw() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            if (y = y - paddleHeight) {
                dy = -dy;
            }
        }
        else {
           ballReset();
            //document.location.reload();
            //clearInterval(interval); // Needed for Chrome to end game
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
}

var interval = setInterval(draw, 10);