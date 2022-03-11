const canvas = document.getElementById('canvas');
canvas.height = document.body.clientHeight;
canvas.width = document.body.clientWidth;

window.addEventListener('resize', (e) => {
    console.log('resizing');
    canvas.height = document.body.clientHeight;
    canvas.width = document.body.clientWidth;
});

const ctx = canvas.getContext('2d');
ctx.lineWidth = 2;

let prevX = null;
let prevY = null;

let draw = false;

let clrs = document.querySelectorAll('.clr');
clrs = Array.from(clrs);

clrs.forEach(clr => {
    clr.addEventListener('click', () => {
        clrs.forEach(otherclr => {
            otherclr.classList.remove('active');
        });
        clr.classList.add('active');
        ctx.strokeStyle = clr.dataset.clr;
    })
    
});

let strokeSelect = document.querySelector('#stroke-size');
strokeSelect.addEventListener('change', () => {
    ctx.lineWidth = strokeSelect.value;
})

let clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

window.addEventListener('mousedown', (e) => {
    draw = true;
});

window.addEventListener('mouseup', (e) => {
    draw = false;
});

window.addEventListener('mousemove', (e) => {
    if(!draw) {
        prevX = e.clientX;
        prevY = e.clientY;
        return
    }

    let currentX = e.clientX;
    let currentY = e.clientY;

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    prevX = currentX;
    prevY = currentY;

    let saveBtn = document.querySelector('.save');
    saveBtn.href = canvas.toDataURL();
});