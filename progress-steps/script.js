/*
 * Firstly we need to initiate some variables that will
 * hold the elements that we will be working with
 *
 */

const next = document.getElementById('next');
const prev = document.getElementById('prev');
const progress = document.getElementById('progress');
const circles = document.querySelectorAll('.circle');

// initialize currentActive var that will keep track of the current circle that is active

let currentActive = 1;

// now we add the event listeners for both the next and prev buttons and with
// each we add a function that will do the magic

next.addEventListener('click', () => {
    if (currentActive < circles.length) {
        currentActive += 1;
    }
    doMagic();
})

prev.addEventListener('click', () => {
    if (currentActive > 1) {
        currentActive -= 1;
    }
    doMagic();
})


// This is the function now that will be repsonsible for updating the visual state
function doMagic() {
    circles.forEach((circle, index) => {
        if (index < currentActive) {
            circle.classList.add('active');
            const progressWidth = ((currentActive - 1) / (circles.length - 1)) * 100 + '%';
            progress.style.width = progressWidth;
        }
        else {
            circle.classList.remove('active');
        }
    })
}

const progressWidth = ((currentActive - 1) / (circles.length - 1)) * 100 + '%';
progress.style.width = progressWidth;
