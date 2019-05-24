/* https://github.com/rafalswierczek/JS-Storm-Anomaly */

/////////////////// OPTIONS ///////////////////

const anomalyRadius = 150;

const smallBall = {
	maxAmount: 100,
	color: "rgb(200, 200, 255)",
	radius: 2,
	speed: 8,
	acceleration: 0.1,
	spawnRate: 20,
	type: "small", // read-only
	balls: [] // read-only
};
const mediumBall = {
	maxAmount: 50,
	color: "rgb(210, 210, 230)",
	radius: 5,
	speed: 5,
	acceleration: 0.1,
	spawnRate: 50,
	type: "medium", // read-only
	balls: [] // read-only
};
const largeBall = {
	maxAmount: 20,
	color: "rgb(220, 220, 255)",
	radius: 7,
	speed: 2,
	acceleration: 0.1,
	spawnRate: 200,
	type: "large", // read-only
	balls: [] // read-only
};

///////////////////////////////////////////////

class Ball
{
	constructor(x, y, r, currentSpeed, color, context)
	{
		this.x = x;
		this.y = y;
		this.r = r;
		this.forceHorizontal = 0;
		this.forceVertical = 0;
		this.currentSpeed = currentSpeed;
		this.color = color;
		this.context = context;
	}

	createBall()
	{
		this.context.beginPath();
		this.context.fillStyle = this.color;
		this.context.arc(this.x, this.y, this.r, 0, 2*Math.PI);
		this.context.fill();
	}
}

function rand(min, max)
{
	return Math.floor(Math.random() * (max-min+1) + min);
}

function createBallInterval(ballObject, xMin, yMin, yMax, canvas, context)
{
	let ballCounter = 0;
	if(ballObject.maxAmount > 0)
	{
		let interval = setInterval(()=>
		{
			const x = rand(xMin, canvas.width - xMin);
			const y = rand(yMin, yMax);

			ballObject.balls[ballCounter] = new Ball(x, y, ballObject.radius, ballObject.speed, ballObject.color, context);
			if(ballCounter === ballObject.maxAmount - 1)
				clearInterval(interval);
			ballCounter++;
		}, ballObject.spawnRate);
	}
}

/*async*/function processAnomaly(ballObject, xMin, yMin, yMax, mX, mY, canvas)
{
	
	ballObject.balls.forEach(ball =>
	{
		if(ball.y >= canvas.height)
		{
			const x = rand(xMin, canvas.width - xMin);
			const y = rand(yMin, yMax);
			ball.x = x;
			ball.y = y;
			ball.currentSpeed = ballObject.speed;
			ball.createBall();
			return;
		}

		let ballVector = Math.sqrt(Math.pow(mX - ball.x, 2) + Math.pow(mY - ball.y, 2)); // length between ball and mouse
		if( ballVector <= (anomalyRadius + ball.r)) // if ball is inside anomaly
		{
			if( ball.x < mX){ ball.x -= 1;}
			if( ball.x > mX){ ball.x += 1;}
			if( ball.y < mY){ ball.y -= 1;}
			if( ball.y > mY){ ball.y += 1;}
			ball.createBall();
		}
		else
		{
			ball.x += ball.forceHorizontal;
			ball.y += ball.forceVertical;
			ball.y += ball.currentSpeed;
			ball.currentSpeed += ballObject.acceleration;

			ballVector = Math.sqrt(Math.pow(mX - ball.x, 2) + Math.pow(mY - ball.y, 2)); 
			if(ballVector <= (anomalyRadius + ball.r))
			{
				const forceX = rand(5, 40);
				const forceY = rand(10, 35);

				ball.y -= ball.currentSpeed;
				ball.currentSpeed = ballObject.speed;
				ball.forceVertical -= forceY;
				
				if(ball.x >= mX)
					ball.forceHorizontal += forceX;
				else
					ball.forceHorizontal -= forceX;
			}
			
			// if force is 0 then nothing
			if(ball.forceHorizontal > 0)
				ball.forceHorizontal--;
			else if(ball.forceHorizontal < 0)
				ball.forceHorizontal++;
			if(ball.forceVertical > 0)
				ball.forceVertical--;
			if(ball.forceVertical < 0)
				ball.forceVertical++;

			ball.createBall();
		}
	});
}

// thunderbolts
function lightning(ctx, canvas)
{
	boltTimeout = rand(200, 3500); // random lightning (ms)
	ctx.beginPath();
	ctx.fillStyle = "rgba(255,255,255,0.8)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	setTimeout(function()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		function drawBolt()
		{
			ctx.beginPath();
			ctx.strokeStyle = "rgba(255,255,255,1)";
			let part0 = rand(50, canvas.width - 50);
			ctx.moveTo(part0, 0);
	
			if(part0 < canvas.width/2)
			{
				let part1 = rand(50, canvas.width/2-1);
				ctx.lineTo(part1, canvas.height/6); ctx.moveTo(part1, canvas.height/6);
				if(part1 < canvas.width/4)
				{
					let part2 = rand(50, canvas.width/4-1);
					ctx.lineTo(part2, canvas.height/6*2); ctx.moveTo(part2, canvas.height/6*2);
					if(part2 < canvas.width/8)
					{
						let part3 = rand(50, canvas.width/8-1);
						ctx.lineTo(part3, canvas.height/6*3); ctx.moveTo(part3, canvas.height/6*3);
					}
					else
					{
						let part3 = rand(canvas.width/8, canvas.width/4-1);
						ctx.lineTo(part3, canvas.height/6*3); ctx.moveTo(part3, canvas.height/6*3);
					}

					let part4 = rand(50, canvas.width/4-1);
					ctx.lineTo(part4, canvas.height/6*4); ctx.moveTo(part4, canvas.height/6*4);
					let part5 = rand(50, canvas.width/4-1);
					ctx.lineTo(part5, canvas.height/6*5); ctx.moveTo(part5, canvas.height/6*5);
				}
				else
				{
					let part2 = rand(canvas.width/4, canvas.width/2-1);
					ctx.lineTo(part2, canvas.height/6*2); ctx.moveTo(part2, canvas.height/6*2);
					if(part2 < canvas.width/8*3)
					{
						let part3 = rand(canvas.width/4, canvas.width/8*3-1);
						ctx.lineTo(part3, canvas.height/6*3); ctx.moveTo(part3, canvas.height/6*3);
					}
					else
					{
						let part3 = rand(canvas.width/8*3, canvas.width/2-1);
						ctx.lineTo(part3, canvas.height/6*3); ctx.moveTo(part3, canvas.height/6*3);
					}

					let part4 = rand(canvas.width/4, canvas.width/2-1);
					ctx.lineTo(part4, canvas.height/6*4); ctx.moveTo(part4, canvas.height/6*4);
					let part5 = rand(canvas.width/4, canvas.width/2-1);
					ctx.lineTo(part5, canvas.height/6*5); ctx.moveTo(part5, canvas.height/6*5);
				}
			}
			else
			{
				let part1 = rand(canvas.width/2, canvas.width - 50);
				ctx.lineTo(part1, canvas.height/6); ctx.moveTo(part1, canvas.height/6);
				if(part1 < canvas.width/4*3)
				{
					let part2 = rand(canvas.width/2, canvas.width/4*3-1);
					ctx.lineTo(part2, canvas.height/6*2); ctx.moveTo(part2, canvas.height/6*2);
					if(part2 < canvas.width/8*5)
					{
						let part3 = rand(canvas.width/2, canvas.width/8*5-1);
						ctx.lineTo(part3, canvas.height/6*3); ctx.moveTo(part3, canvas.height/6*3);
					}
					else
					{
						let part3 = rand(canvas.width/8*5, canvas.width/4*3);
						ctx.lineTo(part3, canvas.height/6*3); ctx.moveTo(part3, canvas.height/6*3);
					}

					let part4 = rand(canvas.width/2, canvas.width/4*3-1);
					ctx.lineTo(part4, canvas.height/6*4); ctx.moveTo(part4, canvas.height/6*4);
					let part5 = rand(canvas.width/2, canvas.width/4*3-1);
					ctx.lineTo(part5, canvas.height/6*5); ctx.moveTo(part5, canvas.height/6*5);
				}
				else
				{
					let part2 = rand(canvas.width/4*3, canvas.width - 50);
					ctx.lineTo(part2, canvas.height/6*2); ctx.moveTo(part2, canvas.height/6*2);
					if(part2 < canvas.width/8*7)
					{
						let part3 = rand(canvas.width/4*3, canvas.width/8*7-1);
						ctx.lineTo(part3, canvas.height/6*3); ctx.moveTo(part3, canvas.height/6*3);
					}
					else
					{
						let part3 = rand(canvas.width/8*7, canvas.width - 50);
						ctx.lineTo(part3, canvas.height/6*3); ctx.moveTo(part3, canvas.height/6*3);
					}

					let part4 = rand(canvas.width/4*3, canvas.width - 50);
					ctx.lineTo(part4, canvas.height/6*4); ctx.moveTo(part4, canvas.height/6*4);
					let part5 = rand(canvas.width/4*3, canvas.width - 50);
					ctx.lineTo(part5, canvas.height/6*5); ctx.moveTo(part5, canvas.height/6*5);
				}
			}
		}

		drawBolt(); ctx.stroke();
		drawBolt(); ctx.stroke();
		let bolt = new Audio('bolt.ogg');
		bolt.play();
		bolt.remove();
	}, 30);

	setTimeout(function(){ ctx.clearRect(0, 0, canvas.width, canvas.height);}, 100);

	setTimeout(function()
	{
		lightning(ctx, canvas);
	}, boltTimeout);
}

function start()
{
	const cursorElement = document.createElement("div");
	cursorElement.id = "cursor";
	document.body.appendChild(cursorElement);
	const cursor = document.querySelector("#cursor");
	cursor.style.width = (anomalyRadius * 2)+"px";
	cursor.style.height = (anomalyRadius * 2)+"px";

	let mX = 0, mY = 0;
	window.addEventListener("mousemove", e=>
	{
		mX = e.clientX;
		mY = e.clientY;
		cursor.style.display = "block";
		cursor.style.left = (mX - anomalyRadius)+"px";
		cursor.style.top = (mY - anomalyRadius)+"px";
	});

	const bgImg = new Image();
	bgImg.src = "http://bestanimations.com/Nature/Water/rain/rain-nature-animated-gif-31.gif";
	document.body.appendChild(bgImg);

	const canvas = document.createElement("canvas");
	canvas.id = "mainCanvas";
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	const ctx = canvas.getContext("2d"); 
	document.body.appendChild(canvas);

	const canvasBolt = document.createElement("canvas");
	canvasBolt.id = "canvasBolt";
	canvasBolt.width = window.innerWidth;
	canvasBolt.height = window.innerHeight;
	const boltCtx = canvasBolt.getContext("2d")
	document.body.appendChild(canvasBolt);

	let storm = new Audio('storm.ogg');
	storm.loop = true;
	storm.play();

	lightning(boltCtx, canvasBolt);
	
	createBallInterval(smallBall, 10, -200, 0, canvas, ctx);
	createBallInterval(mediumBall, 10, -200, 0, canvas, ctx);
	createBallInterval(largeBall, 10, -200, 0, canvas, ctx);

	function loop()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.beginPath();
		ctx.fillStyle = "transparent";
		ctx.strokeStyle = "#434951";
		ctx.arc(mX, mY, anomalyRadius, 0, Math.PI*2);
		ctx.fill();
		ctx.stroke();

		processAnomaly(smallBall, 10, -200, 0, mX, mY, canvas);
		processAnomaly(mediumBall, 10, -200, 0, mX, mY, canvas);
		processAnomaly(largeBall, 10, -200, 0, mX, mY, canvas);
		
		window.requestAnimationFrame(loop);
	}

	window.requestAnimationFrame(loop);
}

document.querySelector("#play").addEventListener("click", function()
{
	this.remove();
	start();
});