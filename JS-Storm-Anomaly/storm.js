// DO NOT FOLLOW creepy JavaScript syntax like so, thank you:

var c = document.getElementById("canvas"), ctx = c.getContext("2d"), bg;
c.width = 500;
c.height = 500;


var cLightning = document.createElement("canvas"), lightning = cLightning.getContext("2d"), lt = 1000,
l0x, l1x, l2x, l3x, l4x, l5x, l1y, l2y, l3y, l4y, l5y;
cLightning.style.position = "absolute";
cLightning.style.top = "0px";
cLightning.style.left = "0px";
cLightning.width = "500";
cLightning.height = "500";
document.body.appendChild(cLightning);


var loop, Is, Im, Il, itemS, itemM, itemL;
var xs = [], xm = [], xl = [], 
	ys = [], ym = [], yl = [], 
	s = [], m = [], l = [],
	vS = [], vM = [], vL = [],
	is = 0, im = 0, il = 0, mX = 0, mY = 0;


class snow
{
	constructor(x, y, r, ctx)
	{
		this.x = x;
		this.y = y;
		this.r = r;
		this.ctx = ctx;
	}
	createSnow()
	{
		ctx.beginPath();
		ctx.fillStyle = "white";
		ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
		ctx.fill();
	}
}

// snow create:
Is = setInterval(function()
{
	const xs = Math.floor((Math.random() * (490-10)) + 10);
	const ys = Math.floor((Math.random() * (-200+400)) - 200);
	s[is] = new snow(xs, ys, 2, ctx);
	is++;
	if(is == 600){ is = 0;} // repeating without losing fps
}, 20);
Im = setInterval(function()
{
	const xm = Math.floor((Math.random() * (490-10)) + 10);
	const ym = Math.floor((Math.random() * (-200+400)) - 200);
	m[im] = new snow(xm, ym, 5, ctx);
	im++;
	if(im == 300){ im = 0;}
}, 50);
Il = setInterval(function()
{
	const xl = Math.floor((Math.random() * (490-10)) + 10);
	const yl = Math.floor((Math.random() * (-200+400)) - 200);
	l[il] = new snow(xl, yl, 7, ctx);
	il++;
	if(il == 60){ il = 0;}
}, 200);

// thunderbolts
(function flash(){
	lt = Math.floor(Math.random()*(3500-100)+100); // random flash

	lightning.beginPath();
	lightning.fillStyle = "rgba(255,255,255,0.8";
	lightning.fillRect(0,0,500,500);

	setTimeout(function()
	{
		lightning.clearRect(0,0,500,500);

		lightning.beginPath();
		lightning.strokeStyle = "rgba(255,255,255,1";
		l0x = Math.floor(Math.random()*(450-50)+50);
		lightning.moveTo(l0x, 0);

		if(l0x < 250)
		{
			l1x = Math.floor(Math.random()*(249-50)+50);
			lightning.lineTo(l1x, 100); lightning.moveTo(l1x, 100);
			if(l1x < 150)
			{
				l2x = Math.floor(Math.random()*(149-50)+50);
				lightning.lineTo(l2x, 200); lightning.moveTo(l2x, 200);
				if(l2x < 100)
				{
					l3x = Math.floor(Math.random()*(99-50)+50);
					lightning.lineTo(l3x, 300); lightning.moveTo(l3x, 300);
				}
				else
				{
					l3x = Math.floor(Math.random()*(149-100)+100);
					lightning.lineTo(l3x, 300); lightning.moveTo(l3x, 300);
				}
			}
			else
			{
				l2x = Math.floor(Math.random()*(249-150)+150);
				lightning.lineTo(l2x, 200); lightning.moveTo(l2x, 200);
				if(l2x < 200)
				{
					l3x = Math.floor(Math.random()*(199-150)+150);
					lightning.lineTo(l3x, 300); lightning.moveTo(l3x, 300);
				}
				else
				{
					l3x = Math.floor(Math.random()*(249-200)+200);
					lightning.lineTo(l3x, 300); lightning.moveTo(l3x, 300);
				}
			}
		}
		else
		{
			l1x = Math.floor(Math.random()*(450-250)+250);
			lightning.lineTo(l1x, 100); lightning.moveTo(l1x, 100);
			if(l1x < 350)
			{
				l2x = Math.floor(Math.random()*(349-250)+250);
				lightning.lineTo(l2x, 200); lightning.moveTo(l2x, 200);
				if(l2x < 300)
				{
					l3x = Math.floor(Math.random()*(299-250)+250);
					lightning.lineTo(l3x, 300); lightning.moveTo(l3x, 300);
				}
				else
				{
					l3x = Math.floor(Math.random()*(349-300)+300);
					lightning.lineTo(l3x, 300); lightning.moveTo(l3x, 300);
				}
			}
			else
			{
				l2x = Math.floor(Math.random()*(450-350)+350);
				lightning.lineTo(l2x, 200); lightning.moveTo(l2x, 200);
				if(l2x < 400)
				{
					l3x = Math.floor(Math.random()*(399-350)+350);
					lightning.lineTo(l3x, 300); lightning.moveTo(l3x, 300);
				}
				else
				{
					l3x = Math.floor(Math.random()*(450-400)+400);
					lightning.lineTo(l3x, 300); lightning.moveTo(l3x, 300);
				}
			}
		}

		l3x = Math.floor(Math.random()*(300-100)+100);
		lightning.lineTo(l3x, 350); lightning.moveTo(l3x, 350);
		l3x = Math.floor(Math.random()*(400-200)+200);
		lightning.lineTo(l3x, 410);
		lightning.stroke();

		lightning.beginPath();
		lightning.strokeStyle = "rgba(255,255,255,1";
		l0x = Math.floor(Math.random()*(450-50)+50);
		lightning.moveTo(l0x, 0);

		if(l0x < 250)
		{
			l1x = Math.floor(Math.random()*(249-50)+50);
			lightning.lineTo(l1x, 100); lightning.moveTo(l1x, 100);
			if(l1x < 150)
			{
				l2x = Math.floor(Math.random()*(149-50)+50);
				lightning.lineTo(l2x, 200); lightning.moveTo(l2x, 200);
				if(l2x < 100)
				{
					l3x = Math.floor(Math.random()*(99-50)+50);
					lightning.lineTo(l3x, 300); lightning.moveTo(l3x, 300);
				}
				else
				{
					l3x = Math.floor(Math.random()*(149-100)+100);
					lightning.lineTo(l3x, 300); lightning.moveTo(l3x, 300);
				}
			}
			else
			{
				l2x = Math.floor(Math.random()*(249-150)+150);
				lightning.lineTo(l2x, 200); lightning.moveTo(l2x, 200);
				if(l2x < 200)
				{
					l3x = Math.floor(Math.random()*(199-150)+150);
					lightning.lineTo(l3x, 300); lightning.moveTo(l3x, 300);
				}
				else
				{
					l3x = Math.floor(Math.random()*(249-200)+200);
					lightning.lineTo(l3x, 300); lightning.moveTo(l3x, 300);
				}
			}
		}
		else
		{
			l1x = Math.floor(Math.random()*(450-250)+250);
			lightning.lineTo(l1x, 100); lightning.moveTo(l1x, 100);
			if(l1x < 350)
			{
				l2x = Math.floor(Math.random()*(349-250)+250);
				lightning.lineTo(l2x, 200); lightning.moveTo(l2x, 200);
				if(l2x < 300)
				{
					l3x = Math.floor(Math.random()*(299-250)+250);
					lightning.lineTo(l3x, 300); lightning.moveTo(l3x, 300);
				}
				else
				{
					l3x = Math.floor(Math.random()*(349-300)+300);
					lightning.lineTo(l3x, 300); lightning.moveTo(l3x, 300);
				}
			}
			else
			{
				l2x = Math.floor(Math.random()*(450-350)+350);
				lightning.lineTo(l2x, 200); lightning.moveTo(l2x, 200);
				if(l2x < 400)
				{
					l3x = Math.floor(Math.random()*(399-350)+350);
					lightning.lineTo(l3x, 300); lightning.moveTo(l3x, 300);
				}
				else
				{
					l3x = Math.floor(Math.random()*(450-400)+400);
					lightning.lineTo(l3x, 300); lightning.moveTo(l3x, 300);
				}
			}
		}
		lightning.stroke();
	}, 30);

	setTimeout(function(){ lightning.clearRect(0,0,500,500);}, 60);

	setTimeout(function()
	{
		flash();
	}, lt);
}());


window.onmousemove = function(e)
{
	mX = e.clientX;
	mY = e.clientY;
}


function loop()
{
	ctx.clearRect(0,0,500,500);

	// Anomaly
	ctx.beginPath();
	ctx.fillStyle = "transparent";
	ctx.strokeStyle = "#434951";
	ctx.arc(mX, mY, 100, 0, Math.PI*2);
	ctx.fill();
	ctx.stroke();

	for(itemS = 0; itemS < 600; itemS++) // small ball
	{
		if( typeof s[itemS] != "undefined")
		{// black magic:
			vS[itemS] = Math.sqrt(Math.pow(mX-s[itemS].x,2)+Math.pow(mY-s[itemS].y,2));
			if( vS[itemS] <= (100+s[itemS].r)) // 
			{
				if( s[itemS].x < mX){ s[itemS].x-=1;}
				if( s[itemS].x > mX){ s[itemS].x+=1;}
				if( s[itemS].y < mY){ s[itemS].y-=1;}
				if( s[itemS].y > mY){ s[itemS].y+=1;}
				s[itemS].createSnow();
			}
			else
			{
				s[itemS].y+=5;

				// a tutaj mały fix, który poprawia drgania cząsteczek śniegu przy zderzeniu z anomalią :]
				vS[itemS] = Math.sqrt(Math.pow(mX-s[itemS].x,2)+Math.pow(mY-s[itemS].y,2)); 
				if(vS[itemS] <= (100+s[itemS].r))
				{
					s[itemS].y-=4;
				}

				s[itemS].createSnow();
			}
		}
	}
	
	for(itemM = 0; itemM < 300; itemM++) // medium ball
	{
		if( typeof m[itemM] != "undefined")
		{
			vM[itemM] = Math.sqrt(Math.pow(mX-m[itemM].x,2)+Math.pow(mY-m[itemM].y,2));
			if( vM[itemM] <= (100+m[itemM].r))
			{
				if( m[itemM].x < mX){ m[itemM].x-=1;}
				if( m[itemM].x > mX){ m[itemM].x+=1;}
				if( m[itemM].y < mY){ m[itemM].y-=1;}
				if( m[itemM].y > mY){ m[itemM].y+=1;}
				m[itemM].createSnow();
			}
			else
			{
				m[itemM].y+=3;
				vM[itemM] = Math.sqrt(Math.pow(mX-m[itemM].x,2)+Math.pow(mY-m[itemM].y,2));
				if(vM[itemM] <= (100+m[itemM].r))
				{
					m[itemM].y-=2;
				}
				m[itemM].createSnow();
			}
		}
	}

	for(itemL = 0; itemL < 60; itemL++) // large ball
	{
		if( typeof l[itemL] != "undefined")
		{
			vL[itemL] = Math.sqrt(Math.pow(mX-l[itemL].x,2)+Math.pow(mY-l[itemL].y,2));
			if( vL[itemL] <= (100+l[itemL].r))
			{
				if( l[itemL].x < mX){ l[itemL].x-=1;}
				if( l[itemL].x > mX){ l[itemL].x+=1;}
				if( l[itemL].y < mY){ l[itemL].y-=1;}
				if( l[itemL].y > mY){ l[itemL].y+=1;}
				l[itemL].createSnow();
			}
			else
			{
				l[itemL].y+=2;
				vL[itemM] = Math.sqrt(Math.pow(mX-l[itemL].x,2)+Math.pow(mY-l[itemL].y,2));
				if(vL[itemL] <= (100+l[itemL].r))
				{
					l[itemL].y-=1;
				}
				l[itemL].createSnow();
			}
		}
	}
	
	window.requestAnimationFrame(loop);
}window.requestAnimationFrame(loop);