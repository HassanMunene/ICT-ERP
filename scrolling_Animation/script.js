const boxes = document.querySelectorAll('.box');
const boxos = document.querySelectorAll('.boxo');
const container = document.querySelector('.container');

let isActivated = false;

window.addEventListener('load', () => {
    if (container.scrollHeight > window.innerHeight) {
        isActivated = true;
        addActiveClassToBoxes();
    }
})

window.addEventListener('scroll', () => {
    if (container.scrollHeight > window.innerHeight) {
        if (!isActivated && container.getBoundingClientRect().top <= 0) {
            isActivated = true;
            addActiveClassToBoxes();
        }
        else if (isActivated && container.getBoundingClientRect().top > 0) {
            isActivated = false;
            removeActiveClassFromBoxes();
        }
    }
})

function addActiveClassToBoxes() {
    boxes.forEach(box => {
        box.classList.add('active');
    });
    boxos.forEach(boxo => {
        boxo.classList.add('active');
    });
}

function removeActiveClassFromBoxes() {
    boxes.forEach(box => {
        box.classList.remove('active');
    });
    boxos.forEach(boxo => {
        boxo.classList.remove('active');
    });
}

