window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.strokeStyle = "brown";
  const sides = 2;

  function draw(startX, startY, length, angle, branchWidth) {
    ctx.lineWidth = branchWidth;
    ctx.beginPath();
    ctx.save();

    ctx.translate(startX, startY); //Determines the starting line point
    ctx.rotate((angle * Math.PI) / 180); //Determines the line direction
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -length);

    ctx.shadowBlur = 15;
    ctx.shadowColor = "rgba(0,0,0,0.8)";

    if (length <= 11) {
      ctx.strokeStyle = "green";
      ctx.lineCap = "round";
      ctx.lineWidth = 3;
    }

    ctx.stroke();

    if (length < 5) {
      ctx.restore();
      return;
    }

    draw(0, -length, length * 0.8, angle - 15, branchWidth * 0.8);
    draw(0, -length, length * 0.8, angle + 15, branchWidth * 0.8);

    ctx.restore();
  }

  draw(canvas.width / 2, canvas.height / 1.3, 120, 0, 10);
});
