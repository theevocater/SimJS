var x=15;
var y=15;
var ya=2;
var xa=2;
var height = 768;
var width = 1024;
var radius = 15;
function drawBall()
{
  var cxt = $("#myCanvas")[0].getContext("2d");
  x=x+xa;
  y=y+ya;

  if( x < 0 + radius || x > width - radius )
    xa = -xa;

  if( y < 0 + radius || y > height - radius )
    ya = -ya;

  cxt.fillStyle="#FFFFFF";
  cxt.fillRect(0,0,1024,768);
  cxt.fillStyle="#FF0000";
  cxt.beginPath();
  cxt.arc(x,y,15,0,Math.PI*2,true);
  cxt.closePath();
  cxt.fill();
  t=setTimeout('drawBall()',16);
}

