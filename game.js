// Variables
var canvasWidth = 650;
var canvasHeight = 350;

var characterWidth = 864;
var characterHeight = 280;

var rows = 2;
var cols = 8;

var trackRight = 0;
var trackLeft = 1;

var width = characterWidth / cols;
var height = characterHeight / rows;

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
	ctx.drawImage(character, srcX, srcY, width, height, x, y, width, height);
	ctx.rect(0, 330, 700, 27);
	ctx.fillStyle = "red";
	ctx.fill();
}

setInterval(draw, 100);

document.addEventListener("keydown", keyDownHandler, false);
