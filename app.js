// variables  
let rgbText = document.querySelector('#colordisplay');
let body = document.querySelector('body');
let newColors = document.querySelector('#reset');
let squares = document.querySelectorAll('.square');
let mode = document.querySelectorAll('.mode');
let easy = document.querySelector('.easy');
let hard = document.querySelector('.hard');
let container = document.querySelector('#container');
let winningText = document.querySelector('#message');
let numOfSquares = 6;
let pointsText = document.querySelector('#points');
let pickedColor;
let points = 0;

// before game begins 

document.querySelector('h1').style.background = "purple";

// helper functions

function ranColors() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return `RGB(${r}, ${g}, ${b})`;
}

function removeSquares() {
    for (let sq of squares) {
        sq.classList.add("hidden");
    }
}

function removeHidden() {
    for (let sqr of squares) {
        sqr.classList.remove("hidden")
    }
}

// small functions

function btnHard(el) {

    el.target.classList.add('selected');
    easy.classList.remove('selected');
    removeHidden();
    changeRgbText();
}

// big functions

function changeRgbText() {

    // variables
    let trueColor = ranColors();
    rgbText.innerText = trueColor;
    let ranNum = Math.floor(Math.random() * numOfSquares);

    newColors.innerHTML = "New Colors";
    winningText.innerHTML = "";
    // document.querySelector('h1').style.background = trueColor; (IGNORE THIS)

    // styles
    for (let square = 0; square < squares.length; square++) {
        squares[square].style.background = ranColors();
        squares[ranNum].style.background = trueColor;
        squares[square].style.opacity = "1";
    }
};

function picked(el) {
    let pickedBox = `${el.target.style.background}`.slice(3);
    let originalText = rgbText.innerText.slice(3)
    if (pickedBox == originalText) {
        for (let square = 0; square < squares.length; square++) {
            if (square === 1) {
                if (squares[square - 1].style.background != squares[square].style.background) {
                    points++;
                    pointsText.innerHTML = points;
                }
            }
        }
        winningText.innerText = "Congratulations!";
        newColors.innerHTML = "Play Again?";
        for (let sqr of squares) {
            sqr.style.background = `rgb${originalText}`;
            sqr.style.opacity = "1";
            document.querySelector('h1').style.background = `rgb${originalText}`;
        }

    } if (pickedBox != originalText) {
        if (points > 0) {
            points--;
            pointsText.innerHTML = points;
        }
        el.target.style.opacity = "0";
        winningText.innerText = "Try Again!";
    }
}

function btnEasy(el) {

    el.target.classList.add('selected');
    hard.classList.remove('selected');
    let trueColor = ranColors();
    rgbText.innerText = trueColor;
    // document.querySelector('h1').style.background = ranColors(); (IGNORE THIS)

    newColors.innerHTML = "New Colors";
    winningText.innerHTML = "";
    numOfSquares = 3;
    let ranNum = Math.floor(Math.random() * numOfSquares);

    for (let square = 0; square < numOfSquares; square++) {
        squares[square].style.background = ranColors();
        squares[ranNum].style.background = trueColor;
        squares[square].style.opacity = "1";
    }

    removeSquares();
    changeRgbText();
}


// Event Listeners

newColors.addEventListener("click", changeRgbText);
container.addEventListener("click", picked);
easy.addEventListener("click", btnEasy);
hard.addEventListener("click", btnHard);