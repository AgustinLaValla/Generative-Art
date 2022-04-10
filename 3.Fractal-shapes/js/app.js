window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  //canvas styles
  ctx.fillStyle = "green";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";

  ctx.shadowColor = 'rgba(0,0,0,0.7)';
  ctx.shadowOffsetX = 10;
  ctx.shaddowOffetY = 10;
  ctx.shadowBlur = 10;

  //effect settings
  // let size = canvas.height / 2 - 20;
  let size = 200;
  let sides = 6; //Determines how many sides the fractal shape has
  let maxLevel = 4; //Determines depth for the fractal
  let scale = 0.5; //Determines how much smaller are the segments compare with the parent segement  
  let spread = 0.5; //Determines the angle in radians between parent and children segments
  let branches = 2;
  let color = `hsl(${Math.random() * 360}, 100%, 50%)`;

  // Draw a rectangule
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  let y = 0;
  function drawBranch(level) {
    if (level >= maxLevel) return;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size, y);
    ctx.stroke();

    for (let i = 0; i < branches; i++) {
      ctx.save();
      ctx.translate(size - (size / branches) * i, 0);
      ctx.rotate(spread);
      ctx.scale(scale, scale);
      drawBranch(level + 1);
      ctx.restore();

      ctx.save();
      ctx.translate(size - (size / branches) * i, 0);
      ctx.rotate(-spread);
      ctx.scale(scale, scale);
      drawBranch(level + 1);
      ctx.restore();
    }
  }

  function drawFractal() {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.strokeStyle = color;


    for (let i = 0; i < sides; i++) {
      ctx.rotate((Math.PI * 2) / sides);
      drawBranch(0);
    }

    ctx.restore();
  }

  drawFractal()
  ctx.restore();
});
