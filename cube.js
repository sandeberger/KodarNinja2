const canvas_cube = document.getElementById('cubeCanvas');
const terminal_cube = document.getElementById('terminal');
const ctx_cube = canvas_cube.getContext('2d');
canvas_cube.width = window.innerWidth;
canvas_cube.height = window.innerHeight;
canvas_cube.style.display='none';

class Point {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

const cubePoints = [
  new Point(-1, 1, 1),
  new Point(1, 1, 1),
  new Point(1, -1, 1),
  new Point(-1, -1, 1),
  new Point(-1, 1, -1),
  new Point(1, 1, -1),
  new Point(1, -1, -1),
  new Point(-1, -1, -1),
];

const cubeEdges = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

const rotationSpeed = 0.01;
const rotationSpeedY = 0.02;
let angleY = 0;
let angleX = 0;
let zPosition = 20;
let zSpeed = 0.15;
//const aspectRatio = canvas_cube.width / canvas_cube.height;
const distance = 5;
let mouseX = canvas_cube.width / 2;
let mouseY = canvas_cube.height / 2;

function project(point) {
 
  const z = point.z + zPosition;
  const xProjected = (point.x * distance) / (z + distance);
  const yProjected = (point.y * distance) / (z + distance);
  return new Point(xProjected * canvas_cube.width / 2 + canvas_cube.width / 2, yProjected * canvas_cube.width / 2 + canvas_cube.height / 2, z);
/*
  const scale = canvas_cube.width / 4;
  const perspective = point.z + 4;
  const x = point.x * scale / perspective + canvas_cube.width / 2;
  const y = point.y * scale / perspective + canvas_cube.height / 2;
  return new Point(x, y, 0);*/
}

function rotate(point, angleX, angleY) {
  const cosX = Math.cos(angleX);
  const sinX = Math.sin(angleX);
  const cosY = Math.cos(angleY);
  const sinY = Math.sin(angleY);

  let x = point.x;
  let y = point.y * cosX - point.z * sinX;
  let z = point.z * cosX + point.y * sinX;

  const newX = x * cosY - z * sinY;
  const newZ = z * cosY + x * sinY;

  return new Point(newX, y, newZ);
}


function drawCube() {
  ctx_cube.clearRect(0, 0, canvas_cube.width, canvas_cube.height);
  
  ctx_cube.shadowColor = 'rgba(173, 216, 230, 1)';
  ctx_cube.shadowBlur = 60;
  
  ctx_cube.strokeStyle = 'rgba(173, 216, 230, 0.5)';
  ctx_cube.lineWidth = 4;

  const angleWithMouseX = angleX + (mouseX - canvas_cube.width / 2) * 0.002;
  const angleYWithMouseY = angleY + (mouseY - canvas_cube.height / 2) * 0.002;

  cubeEdges.forEach(([i, j]) => {
    const rotatedPointI = rotate(cubePoints[i], angleWithMouseX, angleYWithMouseY);
    const rotatedPointJ = rotate(cubePoints[j], angleWithMouseX, angleYWithMouseY);
    
    const p1 = project(rotatedPointI);
    const p2 = project(rotatedPointJ);
    
    ctx_cube.beginPath();
    ctx_cube.moveTo(p1.x, p1.y);
    ctx_cube.lineTo(p2.x, p2.y);
    ctx_cube.stroke();
  });
}



function animate() {
  drawCube();
  angleX += rotationSpeed;
  angleY += rotationSpeedY;

  zPosition += zSpeed;
  if (zPosition > 200 || zPosition < 15) {
    zSpeed = -zSpeed;
  }

  requestAnimationFrame(animate);
}

function initCanvas(){
  const canvas_cube = document.getElementById('cubeCanvas');
  const ctx_cube = canvas_cube.getContext('2d');
  canvas_cube.width = window.innerWidth;
  canvas_cube.height = window.innerHeight;
  //aspectRatio = canvas_cube.width / canvas_cube.height
}


terminal_cube.addEventListener('mousemove', (event) => {
  mouseX = event.clientX - crt.getBoundingClientRect().left;
  mouseY = event.clientY - crt.getBoundingClientRect().top;
});


animate();

window.addEventListener('resize', initCanvas);
