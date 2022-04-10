window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  //canvas styles
  ctx.fillStyle = "green";
  ctx.strokeStyle = "white";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";

  //effect settings
  // let size = canvas.height / 2 - 20;
  let size = 200;
  let sides = 77; //Determines how many sides the fractal shape has
  let maxLevel = 4;
  let spread = 0.8;
  let scale = 0.5;
  let branches = 2;

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
    ctx.scale(1, 1);
    ctx.rotate(0);

    for (let i = 0; i < sides; i++) {
      ctx.rotate((Math.PI * 2) / sides);
      drawBranch(0);
    }

    ctx.restore();
  }

  drawFractal();
});
