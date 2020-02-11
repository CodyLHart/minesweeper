//---------- CONSTANTS ----------//
// const surround = [-11, -10, -9, -1, 1, 9, 10, 11];
// const surroundLSide = [-10, -9, 1, 10, 11];
// const surroundRSide = [-11, -10, -1, 9, 10];
// const surroundTSide = [-1, 1, 9, 10, 11];
// const surroundBSide = [-11, -10, -9, -1, 1];
// const surroundTL = [1, 10, 11];
// const surroundTR = [-1, 9, 10];
// const surroundBL = [-10, -9, 1];
// const surroundBR = [-11, -10, -1];

//---------- STATE ----------//
let boardWidth = 20;
let boardHeight = 20;
let boardArea = boardWidth * boardHeight;
let board = [];
let numOfMines = 10;
let numAdjacent;

let surround = [(-1 - boardWidth), (0 - boardWidth), (1 - boardWidth), -1, 1, (boardWidth - 1), (boardWidth), (boardWidth + 1)];
let surroundLSide = [(0 - boardWidth), (1 - boardWidth), 1, (boardWidth), (boardWidth + 1)];
let surroundRSide = [(-1 - boardWidth), (0 - boardWidth), -1, (boardWidth - 1), (boardWidth)];
let surroundTSide = [-1, 1, (boardWidth - 1), (boardWidth), (boardWidth + 1)];
let surroundBSide = [(-1 - boardWidth), (0 - boardWidth), (1 - boardWidth), -1, 1];
let surroundTL = [1, (boardWidth), (boardWidth + 1)];
let surroundTR = [-1, (boardWidth - 1), (boardWidth)];
let surroundBL = [(0 - boardWidth), (1 - boardWidth), 1];
let surroundBR = [(-1 - boardWidth), (0 - boardWidth), -1];

//---------- DOM ELEMENTS ----------//
let boardEl = document.querySelector('#board');
let messageEl = document.querySelector('h1');

//---------- EVENT LISTENERS ----------//
boardEl.addEventListener('click', handleClick);
//---------- FUNCTIONS ----------//
init();

function init() {
    createBoard();
    placeMines();
    placeNumbers();
    console.log(board);
}

function createBoard() {
    boardEl.style.height = `${50 * boardHeight}px`;
    boardEl.style.width = `${50 * boardWidth}px`;
    for (let i = 0; i < boardArea; i++) {
        board.push(0);
    };
    for (let i = 0; i < boardArea; i++) {
        let newCell = document.createElement('div');
        newCell.setAttribute('class', 'cell');
        newCell.setAttribute('id', `${i}`);
        boardEl.appendChild(newCell);
    };
}

function placeMines() {
    let randoms = [];
    let random;
    while (randoms.length < numOfMines) {
        random = (Math.floor(Math.random() * boardArea))
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
            if (i % boardWidth === 0) {
                checkSurroundingLSide(i);
            } else if (i % boardWidth === (boardWidth - 1)) {
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
    if (e.altKey) {
        let clicked = e.target;
        if (!clicked.classList.contains('flagged')) {
            clicked.classList.add('flagged');
        } else if (clicked.classList.contains('flagged')) {
            clicked.classList.remove('flagged');
        };
    } else {
        let clicked = e.target;
        if (clicked.classList.contains('flagged')) return;
        let cellIndex = parseInt(clicked.getAttribute('id'));
        if (board[cellIndex] === 'M') {
            handleMine(clicked);
        } else {
            revealCell(cellIndex);
        };
    };
    if (document.querySelectorAll('.clicked').length === boardArea - numOfMines) {
        messageEl.textContent = 'WINNER!';
    };
}

function handleMine(clicked) {
    console.log('Boom bitch');
    clicked.style.background = 'red';
    revealMines();
    messageEl.textContent = 'LOSER!';
    boardEl.removeEventListener('click', handleClick);
}

function revealMines() {
    let mineIdx = []
    for (let i = 0; i < board.length; i++) {
        if (board[i] === 'M') {
            mineIdx.push(i);
        };
    };
    for (let i = 0; i < mineIdx.length; i++) {
        document.getElementById(mineIdx[i].toString()).style.background = 'red';
    }
    console.log(mineIdx);
}


function revealCell(cellIdx) {
    // console.log(cellIdx);
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
    } else if (cellIdx === boardWidth - 1) {
        for (let i = 0; i < surroundTR.length; i++) {
            revealCell(cellIdx + surroundTR[i]);
        };
    } else if (cellIdx === boardArea - boardWidth) {
        for (let i = 0; i < surroundBL.length; i++) {
            revealCell(cellIdx + surroundBL[i]);
        };
    } else if (cellIdx === boardArea - 1) {
        for (let i = 0; i < surroundBR.length; i++) {
            revealCell(cellIdx + surroundBR[i]);
        };
    } else if (cellIdx < boardWidth && cellIdx >= 0) {
        for (let i = 0; i < surroundTSide.length; i++) {
            revealCell(cellIdx + surroundTSide[i]);
        };
    } else if (cellIdx >= boardArea - boardWidth && cellIdx < boardArea) {
        for (let i = 0; i < surroundBSide.length; i++) {
            revealCell(cellIdx + surroundBSide[i]);
        };
    } else if (cellIdx % boardWidth === 0) {
        for (let i = 0; i < surroundLSide.length; i++) {
            revealCell(cellIdx + surroundLSide[i]);
        };
    } else if (cellIdx % boardWidth === boardWidth - 1) {
        for (let i = 0; i < surroundRSide.length; i++) {
            revealCell(cellIdx + surroundRSide[i]);
        };
    } else {
        for (let i = 0; i < surround.length; i++) {
            revealCell(cellIdx + surround[i]);
        };
    };
}

