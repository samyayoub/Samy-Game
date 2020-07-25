var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Canvas Variables
var canvasWidth = 720;
var canvasHeight = 350;

// Character Variables
var characterWidth = 864;
var characterHeight = 280;

var characterRows = 2;
var characterColumns = 8;

var trackRight = 0;
var trackLeft = 1;

var width = characterWidth / characterColumns;
var height = characterHeight / characterRows;

var x = 100;
var y = 200;

var srcX;
var srcY;

// Ground Variables
var brickSize = 36;
var brickColumns = canvasWidth / brickSize;
var ground = [];
for (var i = 0; i < brickColumns; i++) {
	ground[i] = { x: 0, y: 0 };
}
var tempIllusion = -9;

// Obstacle Variables
var obstacleX = canvasWidth;
var obstacleY = canvasHeight - 2 * brickSize;
var obstacleSize = 36;
var obstacleHeight;

// Game Variables
var curFrame = 0;
var frameCount = 8;

var left = false;
var right = true;

var speed = 12;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Load images in variables
var character = new Image();
character.src = "images/character.png";
var brick = new Image();
brick.src = "images/brick.png";

// Function to give illusion of moving ground
function drawGround() {
	tempIllusion = -tempIllusion;
	for (let i = 0; i < ground.length; i++) {
		// tempIllusion = i + brickSize + tempIllusion;
		ctx.drawImage(
			brick,
			i * brickSize + tempIllusion,
			canvasHeight - brickSize,
			brickSize,
			brickSize
		);
	}
	window.requestAnimationFrame(drawGround);
}

// Function to draw Obstacle
function drawObstacle() {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	obstacleX -= 18;
	ctx.drawImage(brick, obstacleX, obstacleY, obstacleSize, obstacleSize);

	// window.requestAnimationFrame(drawObstacle);
}

// Function to update the frames
function updateFrame() {
	curFrame = ++curFrame % frameCount;
	ctx.clearRect(x, y, width, height);

	// Update variables to show character as running
	srcX = curFrame * width;
	srcY = trackRight * height;

	// Move character right or left based on keyboard input
	// if (left && x > 0) {
	// 	srcY = trackLeft * height;
	// 	x -= speed;
	// }
	// if (right && x < canvasWidth - width) {
	// srcY = trackRight * height;
	// 	x += speed;
	// }
}

// Function to handle keyboard buttons pressed
function keyDownHandler(e) {
	if (e.key == "Right" || e.key == "ArrowRight") {
		right = true;
		left = false;
	} else if (e.key == "Left" || e.key == "ArrowLeft") {
		right = false;
		left = true;
	}
}

function draw() {
	updateFrame();
	drawGround();
	drawObstacle();

	// Draw character
	ctx.drawImage(character, srcX, srcY, width, height, x, y, width, height);
}

setInterval(draw, 100);

document.addEventListener("keydown", keyDownHandler, false);
