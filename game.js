// Variables
var canvasWidth = 720;
var canvasHeight = 350;

var characterWidth = 864;
var characterHeight = 280;

var brickSize = 36;
var brickColumns = canvasWidth / brickSize;

var characterRows = 2;
var characterColumns = 8;

var trackRight = 0;
var trackLeft = 1;

var width = characterWidth / characterColumns;
var height = characterHeight / characterRows;

var curFrame = 0;
var frameCount = 8;

var x = 0;
var y = 200;

var srcX;
var srcY;

var left = false;
var right = true;

var speed = 12;

var canvas = document.getElementById("myCanvas");
canvas.width = canvasWidth;
canvas.height = canvasHeight;

var ctx = canvas.getContext("2d");

var character = new Image();
character.src = "images/character.png";

var brick = new Image();
brick.src = "images/brick.png";

// Function to update the frames
function updateFrame() {
	curFrame = ++curFrame % frameCount;
	srcX = curFrame * width;
	ctx.clearRect(x, y, width, height);

	if (left && x > 0) {
		srcY = trackLeft * height;
		x -= speed;
	}
	if (right && x < canvasWidth - width) {
		srcY = trackRight * height;
		x += speed;
	}
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

	// Draw character
	ctx.drawImage(character, srcX, srcY, width, height, x, y, width, height);

	// Draw bricks
	for (let i = 0; i < brickColumns; i++) {
		ctx.drawImage(
			brick,
			i * brickSize,
			canvasHeight - 30,
			brickSize,
			brickSize
		);
	}
	// ctx.rect(0, 330, 700, 27);
	// ctx.fillStyle = "red";
	// ctx.fill();
}

setInterval(draw, 100);

document.addEventListener("keydown", keyDownHandler, false);
