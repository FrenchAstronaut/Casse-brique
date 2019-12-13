window.onload = function() {
	var myCanvas = document.getElementById('tutoriel');
	var ctx = myCanvas.getContext('2d');
	var canvasWidth = myCanvas.width;
	var canvasHeight = myCanvas.height;
	setInterval(init, 10, ctx, canvasWidth, canvasHeight);
}

function init(ctx, canvasWidth, canvasHeight) {
	clearCanvas(ctx, canvasWidth, canvasHeight);
	drawCircle(ctx, getRandomInt(canvasWidth), getRandomInt(canvasHeight), 25);
}

function drawRect(ctx, x, y) {
	ctx.beginPath();
	ctx.rect(y, x, 10, 10);
	ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
	ctx.fill();
	ctx.closePath();
}

function drawCircle(ctx, x, y, r) {
	ctx.beginPath()
	ctx.arc(x, y, r, 0, 2 * Math.PI, false)
	ctx.fillStyle = 'rgba(255, 100, 100, 1)'
	ctx.fill()
	ctx.closePath()
}

function clearCanvas(ctx, canvasWidth, canvasHeight) {
	ctx.clearRect(0, 0, canvasHeight, canvasWidth)
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}