var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Canvas Variables
var canvasWidth = 720;
var canvasHeight = 350;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Character Variables
var characterImageWidth = 864;
var characterImageHeight = 280;

var characterRows = 2;
var characterColumns = 8;

var trackRight = 0;
var trackLeft = 1;

var characterWidth = characterImageWidth / characterColumns;
var characterHeight = characterImageHeight / characterRows;

var characterCoordinates = {
	x: 100,
	y: 200,
};

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
var obstacleCoordinates = {
	x: canvasWidth,
	y: canvasHeight - 2 * brickSize,
};
var obstacleSize = 36;

// Game Variables
var curFrame = 0;
var frameCount = 8;

var left = false;
var right = true;

var speed = 12;

var level = 5;

// Load images in variables
var character = new Image();
character.src = "images/character.png";
var brick = new Image();
brick.src = "images/brick.png";

// Function to draw character
function drawCharacter() {
	ctx.drawImage(
		character,
		srcX,
		srcY,
		characterWidth,
		characterHeight,
		characterCoordinates.x,
		characterCoordinates.y,
		characterWidth,
		characterHeight
	);
}

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
	obstacleCoordinates.x -= 18;
	ctx.drawImage(
		brick,
		obstacleCoordinates.x,
		obstacleCoordinates.y,
		obstacleSize,
		obstacleSize
	);
}

// Function to update the frames
function updateFrame() {
	curFrame = ++curFrame % frameCount;
	ctx.clearRect(
		characterCoordinates.x,
		characterCoordinates.y,
		characterWidth,
		characterHeight
	);

	// Update variables to show character as running
	srcX = curFrame * characterWidth;
	srcY = trackRight * characterHeight;

	// Move character right or left based on keyboard input
	// if (left && characterCoordinates.x > 0) {
	// 	srcY = trackLeft * characterHeight;
	// 	characterCoordinates.x -= speed;
	// }
	// if (right && characterCoordinates.x < canvasWidth - characterWidth) {
	// srcY = trackRight * characterHeight;
	// 	characterCoordinates.x += speed;
	// }
}

// Function to handle keyboard buttons pressed
function keyDownHandler(e) {
	if (e.keyCode == 38) {
		characterCoordinates.x += 150;
		characterCoordinates.y -= 100;
	}
}

// Function to determine if character hit obstacle
function detectCollision() {
	if (
		characterCoordinates.x + characterWidth >= obstacleCoordinates.x &&
		characterCoordinates.x + characterWidth <
			obstacleCoordinates.x + obstacleSize &&
		characterCoordinates.y + characterHeight >= obstacleCoordinates.y &&
		characterCoordinates.y + characterHeight >=
			obstacleCoordinates.y + obstacleSize
	) {
		alert("hit");
	}
}

function detectGameLevel() {
	// Determine the level of the game
	if (level === 1) {
		obstacleCoordinates.x -= 18;
	} else if (level === 2) {
		obstacleCoordinates.x -= 25;
	} else if (level === 3) {
		obstacleCoordinates.x -= 30;
	} else if (level === 4) {
		obstacleCoordinates.x -= 35;
	} else if (level === 5) {
		obstacleCoordinates.x -= 40;
	}
}

// Function to draw everything
function draw() {
	updateFrame();

	detectGameLevel();
	drawObstacle();
	drawGround();
	drawCharacter();
	detectCollision();

	// Return character to the original position
	characterCoordinates.y = 200;
	if (characterCoordinates.x != 100) {
		for (let i = 0; i < 5; i++) {
			characterCoordinates.x--;
		}
	}
}

setInterval(draw, 110);

document.addEventListener("keydown", keyDownHandler, false);
