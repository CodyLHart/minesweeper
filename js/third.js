//---------- CONSTANTS ----------//
const surround = [-11, -10, -9, -1, 1, 9, 10, 11];
const surroundLSide = [-10, -9, 1, 10, 11];
const surroundRSide = [-11, -10, -1, 9, 10];
const surroundTSide = [-1, 1, 9, 10, 11];
const surroundBSide = [-11, -10, -9, -1, 1];
const surroundTL = [1, 10, 11];
const surroundTR = [-1, 9, 10];
const surroundBL = [-10, -9, 1];
const surroundBR = [-11, -10, -1];

//---------- STATE ----------//
let board = [];
let numOfMines = 10;
let numAdjacent;

//---------- DOM ELEMENTS ----------//
let boardEl = document.querySelector('#board');

for (let i = 0; i < 100; i++) {
    let newCell = document.createElement('div');
    newCell.setAttribute('class', 'cell');
    newCell.setAttribute('id', `${i}`);
    boardEl.appendChild(newCell);
};

//---------- EVENT LISTENERS ----------//
document.querySelector('#board').addEventListener('click', handleClick);
// document.querySelector('#board').addEventListener('click', function (e){
//     if (e.altKey) {
//         console.log('TEST');
//     };
// });


//---------- FUNCTIONS ----------//
init();

function init() {
    createBoard();
    placeMines();
    placeNumbers();
    console.log(board);
}

function createBoard() {
    for (let i = 0; i < 100; i++) {
        board.push(0);
    };
}

function placeMines() {
    let randoms = [];
    let random;
    while (randoms.length < numOfMines) {
        random = (Math.floor(Math.random() * 100))
        if (randoms.includes(random) === false) {
            randoms.push(random)
        };
    };
    for (let i = 0; i < randoms.length; i++) {
        board[randoms[i]] = 'M';
    };
}

function placeNumbers() {
    for (let i = 0; i < board.length; i++) {
        if (board[i] !== 'M') {
            if (i % 10 === 0) {
                checkSurroundingLSide(i);
            } else if (i % 10 === 9) {
                checkSurroundingRSide(i);
            } else {
                checkSurrounding(i);
            };
        };
    };
}

function checkSurrounding(index) {
    numAdjacent = 0
    for (let j = 0; j < surround.length; j++) {
        if (board[index + surround[j]] === 'M') {
            numAdjacent++;
        };
    };
    board[index] = numAdjacent;
}

function checkSurroundingLSide(index) {
    numAdjacent = 0
    for (let j = 0; j < surroundLSide.length; j++) {
        if (board[index + surroundLSide[j]] === 'M') {
            numAdjacent++;
        };
    };
    board[index] = numAdjacent;
}

function checkSurroundingRSide(index) {
    numAdjacent = 0
    for (let j = 0; j < surroundRSide.length; j++) {
        if (board[index + surroundRSide[j]] === 'M') {
            numAdjacent++;
        };
    };
    board[index] = numAdjacent;
}


function handleClick(e) {
    let clicked = e.target;
    let cellIndex = parseInt(clicked.getAttribute('id'));
    if (board[cellIndex] === 'M') {
        handleMine(clicked);
    } else {
        revealCell(cellIndex);
    }
}

function handleMine(clicked) {
    console.log('Boom bitch');
    clicked.style.background = 'red';
}


function revealCell(cellIdx) {
    console.log(cellIdx);
    if (document.getElementById(`${cellIdx}`).classList.contains('clicked')) return;
    if (board[cellIdx] === 0) {
        document.getElementById(`${cellIdx}`).classList.add('clicked');
        flood(cellIdx);
    } else if (board[cellIdx] > 0) {
        document.getElementById(`${cellIdx}`).classList.add('clicked', `touch${board[cellIdx]}`);
        document.getElementById(`${cellIdx}`).textContent = `${board[cellIdx]}`;
    };
}

function flood(cellIdx) {
    if (cellIdx === 0) {
        for (let i = 0; i < surroundTL.length; i++) {
            revealCell(cellIdx + surroundTL[i]);
        };
    } else if (cellIdx === 9) {
        for (let i = 0; i < surroundTR.length; i++) {
            revealCell(cellIdx + surroundTR[i]);
        };
    } else if (cellIdx === 90) {
        for (let i = 0; i < surroundBL.length; i++) {
            revealCell(cellIdx + surroundBL[i]);
        };
    } else if (cellIdx === 99) {
        for (let i = 0; i < surroundBR.length; i++) {
            revealCell(cellIdx + surroundBR[i]);
        };
    } else if (cellIdx < 10 && cellIdx >= 0) {
        for (let i = 0; i < surroundTSide.length; i++) {
            revealCell(cellIdx + surroundTSide[i]);
        };
    } else if (cellIdx > 89 && cellIdx < 100) {
        for (let i = 0; i < surroundBSide.length; i++) {
            revealCell(cellIdx + surroundBSide[i]);
        };
    } else if (cellIdx % 10 === 0) {
        for (let i = 0; i < surroundLSide.length; i++) {
            revealCell(cellIdx + surroundLSide[i]);
        };
    } else if (cellIdx % 10 === 9) {
        for (let i = 0; i < surroundRSide.length; i++) {
            revealCell(cellIdx + surroundRSide[i]);
        };
    } else {
        for (let i = 0; i < surround.length; i++) {
            revealCell(cellIdx + surround[i]);
        };
    };
}



//THIS IS HOW I KNOW THIS WAS A TeST!!! \\\



//TESTING TESTING 123 IF YOU FUCK UP GO BACK TO HERE!!!!!!!




/////YREEEEEEEW