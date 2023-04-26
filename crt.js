const crt_canvas = document.getElementById('crt');
const crt_ctx = crt_canvas.getContext('2d');

crt_canvas.width = window.innerWidth;
crt_canvas.height = window.innerHeight;

let scanlines = [];
let scanlineHeight = 2;
let numberOfScanlines = Math.ceil(crt_canvas.height / scanlineHeight);

for (let i = 0; i < numberOfScanlines; i++) {
    scanlines.push({
        y: i * scanlineHeight,
        opacity: 0
    });
}

function animateScanlines() {
    crt_ctx.clearRect(0, 0, crt_canvas.width, crt_canvas.height);

    for (let i = 0; i < scanlines.length; i++) {
        let scanline = scanlines[i];

        if (i % 2 === 0) {
            scanline.opacity += 0.01;
        } else {
            scanline.opacity -= 0.01;
        }

        scanline.opacity = Math.min(Math.max(scanline.opacity, 0), 0.2);

        crt_ctx.fillStyle = `rgba(0, 190, 0, ${scanline.opacity})`;
        crt_ctx.fillRect(0, scanline.y, crt_canvas.width, scanlineHeight);
    }

    requestAnimationFrame(animateScanlines);
}


function initCanvas(){    
    const crt_canvas = document.getElementById('crt');
    const crt_ctx = canvas_cube.getContext('2d');
    crt_canvas.width = window.innerWidth;
    crt_canvas.height = window.innerHeight;
    numberOfScanlines = Math.ceil(crt_canvas.height / scanlineHeight);
    crt_ctx.clearRect(0, 0, crt_canvas.width, crt_canvas.height);
    scanlines.length = 0;
    for (let i = 0; i < numberOfScanlines; i++) {
        scanlines.push({
            y: i * scanlineHeight,
            opacity: 0
        });
    }
    
  }

animateScanlines();
window.addEventListener('resize', initCanvas);
