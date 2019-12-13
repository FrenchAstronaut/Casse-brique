window.onload = function() {
	let casseBrique = new CasseBrique();
	casseBrique.initialize('tutoriel');
}

CasseBrique = function() {
	var self = this;
	this.myCanvas;
	this.ctx;
	this.canvasWidth;
	this.canvasHeight;
	this.interval;
	this.nbLine;
	this.paddleStep;
	this.ballStep;
	this.score;
	this.bricks = new Array(); // Bricks's position (x, y)
	this.brick = {w: 20, h: 10} // Width, Height
	this.paddle = {x:0, y:0, w:100, h:10}; // x, y, Width, Height
	this.ball = {x:250, y:445, r:10, dY:'up', dX:'right'}; // x, y, Ray, DirectionX, DirectionY
	this.initialize = function(idElementTarget) {
		self.myCanvas = document.getElementById(idElementTarget);
		self.ctx = self.myCanvas.getContext('2d');
		self.canvasWidth = self.myCanvas.width;
		self.canvasHeight = self.myCanvas.height;
		self.score = 0;
		self.nbLine = 4;
		self.paddleStep = 10;
		self.ballStep = 5;
		self.paddle.x = (self.canvasWidth * 0.5) - (0.5 * self.paddle.w);
		this.paddle.y = (self.canvasHeight * 0.9) - (0.5 * self.paddle.h)

		let space = self.ball.r * 3;
		for(let y = space, currentLine = 0; currentLine < self.nbLine; y += (self.brick.h + self.ball.r), currentLine++) { // espacement des briques = rayon de la balle
			for(let x = space; x < (self.canvasWidth - space); x += (self.brick.w + self.ball.r)) {
				self.bricks.push({posX: x, posY: y});
			}
		}

		document.addEventListener('keydown', self.movePaddle.bind(this));

		self.interval = setInterval(self.initEvent, 10);
	}

	// Game

	this.initEvent = function() {
		self.clearCanvas();
		self.drawBall();
		self.drawBricks();
		self.drawPaddle();
		self.moveBall();
		self.writeScore()
		self.gameOver();
	}

	// Paddle (Draw, Move)

	this.drawPaddle = function() {
		self.drawRect(self.paddle.x, self.paddle.y, self.paddle.w, self.paddle.h, 'rgba(232, 39, 230 , 1)');
	}

	this.movePaddle = function(event) {
		const keyPressed = event.key;
		console.log(keyPressed);
		if(keyPressed == 'ArrowRight' && self.paddle.x < (self.canvasWidth - self.paddle.w)) {
			self.paddle.x += self.paddleStep;
		} else if(keyPressed == 'ArrowLeft' && self.paddle.x > 0) {
			self.paddle.x -= self.paddleStep;
		}
	}

	// Bricks (Draw, Collision)

	this.drawBricks = function() {
		for(let i = 0; i < self.bricks.length; i++) {
			self.drawRect(self.bricks[i].posX, self.bricks[i].posY, self.brick.w, self.brick.h, 'rgba(37, 186, 198, 1)');
		}
	}

	this.collisionBricks = function() {
		let index = self.bricks.indexOf(self.bricks.find(obj => obj.posX <= self.ball.x && self.ball.x <= (obj.posX + self.brick.w) && obj.posY <= self.ball.y && self.ball.y <= (obj.posY + self.brick.h)));
		if(index > -1 ) {
			self.bricks.splice(index, 1);
			self.score += 1;
			console.log(self.score);
			return true;
		}
	}

	// Ball (Draw, Move)

	this.drawBall = function() {
		self.drawCircle(self.ball.x, self.ball.y, self.ball.r, 'rgba(232, 39, 230, 1)');
	}

	this.moveBall = function() {
		if( self.ball.y >= (self.canvasHeight - self.ball.r)) { // touch the bottom border
			self.ball.dY = 'up';
		} else if( self.ball.y <= self.ball.r) { // touch the top border
			self.ball.dY = 'down';
		}

		if( self.ball.x <= self.ball.r ) { // touch the left border
			self.ball.dX = 'right';
		} else if( self.ball.x >= (self.canvasWidth - self.ball.r)) { // touch the right border
			self.ball.dX = 'left';
		}

		if(self.ball.y >= (self.paddle.y - self.ball.r) && self.ball.y <= self.paddle.y && self.paddle.x <= self.ball.x && self.ball.x <= (self.paddle.x + self.paddle.w)) {
			self.ball.dY = 'up';
		}

		if( self.ball.dY == 'down') {
			self.ball.y += self.ballStep;
		} else if( self.ball.dY == 'up') {
			self.ball.y -= self.ballStep;
		}
		if( self.ball.dX == 'left') {
			self.ball.x -= self.ballStep;
		} else if( self.ball.dX == 'right') {
			self.ball.x += self.ballStep;
		}

		if(self.collisionBricks() == true) {
			if(self.ball.dY == 'up') {
				self.ball.dY = 'down';
			} else if(self.ball.dY == 'down') {
				self.ball.dY = 'up';
			} else if(self.ball.dX == 'right') {
				self.ball.dX = 'left';
			} else {
				self.ball.dX = 'right';
			}
		}
	}

	// Draw forms

	this.drawRect = function(x, y, l, h, color) {
		self.ctx.beginPath();
		self.ctx.rect(x, y, l, h);
		self.ctx.fillStyle = color;
		self.ctx.fill();
		self.ctx.closePath();
	}

	this.drawCircle = function(x, y, r, color) {
		self.ctx.beginPath()
		self.ctx.arc(x, y, r, 0, 2 * Math.PI, false)
		self.ctx.fillStyle = color;
		self.ctx.fill()
		self.ctx.closePath()
	}


	// Clean the canvas

	this.clearCanvas = function() {
		self.ctx.clearRect(0, 0, self.canvasWidth, self.canvasHeight)
	}

	// Write score

	this.writeScore = function() {
		self.ctx.font = '30px arial';
		self.ctx.textBaseline = 'hanging';
		self.ctx.fillText('Score: ' + self.score, 0, 470);
	}

	// Game Over

	this.gameOver = function() {
		if(self.ball.y >= (self.canvasHeight * 0.95)) {
			clearInterval(self.interval);
			if(confirm('Do you want to retry ? \nScore: ' + self.score)) {
					document.location.reload(true);
				}
			}
		if(self.bricks.length == 0) {
				alert('Sucess ! \nScore: ' + self.score);
			}
		}
}