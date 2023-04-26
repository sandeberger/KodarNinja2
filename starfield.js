const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars;
const numStars = 2600;
let width;
let height;
let centerX;
let centerY;
let speed;

function initCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  centerX = width / 2;
  centerY = height / 2;
  canvas.width = width;
  canvas.height = height;
  createStars();
}
/*
function createStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const z = Math.random() * width/4;
    const speedFactor = Math.random() * 0.5 + 0.5; // Hastighetsfaktor mellan 0.5 och 1
    stars.push({ x, y, z, speedFactor });
  }
}
*/
function createStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const z = Math.random() * (width / 2000); // Stjärnor startar närmare betraktaren
    const speedFactor = Math.random() * 0.9 + 0.1; // Hastighetsfaktor mellan 0.5 och 1

    // Sprid stjärnor jämnt över skärmen
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * (width / 2000);

    const posX = centerX + distance * Math.cos(angle);
    const posY = centerY + distance * Math.sin(angle);

    stars.push({ x: posX, y: posY, z, speedFactor });
  }
}


function draw() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);

  const minDistance = 20;
  const starSizeBase = 3.0;
  const maxDepth = width/64;

  for (let i = 0; i < stars.length; i++) {
    const star = stars[i];
    const x = (star.x - centerX) * (speed / star.z);
    const y = (star.y - centerY) * (speed / star.z);

    const normalizedDepth = star.z / maxDepth *1024;
    
    const opacity = (1 - (normalizedDepth));// * star.speedFactor;
    let starSize = (starSizeBase- (starSizeBase*normalizedDepth/* * (star.speedFactor*0.9)*/));
    starSize = starSize < 0 ? 0 : starSize;
    /*if(i===1){
      console.log("x: " + x + " y: " + y + " z: " + star.z + " speedFactor: " + star.speedFactor + " normalizedDepth: " + normalizedDepth + " starSize: " + starSize);
    }*/

    if (Math.sqrt(x * x + y * y) > minDistance) {
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;

      ctx.beginPath();
      ctx.arc(x + centerX, y + centerY, starSize, 0, Math.PI * 2);
      ctx.fill();
    }

    star.z -= speed/10000 * star.speedFactor;

    if (star.z <= 0) {
      star.z = maxDepth;
    }
  }
}



function update() {
  speed = 1;
  draw();
  requestAnimationFrame(update);
}

window.addEventListener('resize', initCanvas);
initCanvas();
update();
