//---------- STATE ----------//
let boardWidth = 16;
let boardHeight = 16;
let numMines = 40;
// let boardWidth = parseInt(prompt('Width'));
// let boardHeight = parseInt(prompt('Height'));
// let numMines = parseInt(prompt('Mines'));
let boardArea = boardWidth * boardHeight;
let board = [];
let numAdjacent;
let timerCount = 0;
let timerVar;

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
let flagCountEl = document.querySelector('#flag-count');
let timerEl = document.querySelector('#timer');
let containerEl = document.querySelector('#container');
let boardHeaderEl = document.querySelector('#board-header');
let buttonEl = document.querySelector('#restart');

//---------- EVENT LISTENERS ----------//
boardEl.addEventListener('click', handleClick);
buttonEl.addEventListener('click', restart);
//---------- FUNCTIONS ----------//
init();

function restart() {
    stopTimer();
    boardEl.innerHTML = '';
    board = [];
    timerCount = 0;
    timerEl.textContent = 0;
    init();
    boardEl.addEventListener('click', handleClick);
}

function init() {
    createBoard();
    placeMines();
    placeNumbers();
    numFlags = numMines;
    flagCountEl.textContent = `${numFlags}`;
    console.log(board);
    messageEl.textContent = 'MINESWEEPER';
}

function createBoard() {
    boardEl.style.height = `${25 * boardHeight}px`;
    boardEl.style.width = `${25 * boardWidth}px`;
    for (let i = 0; i < boardArea; i++) {
        board.push(0);
    };
    for (let i = 0; i < boardArea; i++) {
        let newCell = document.createElement('div');
        newCell.setAttribute('class', 'cell');
        newCell.setAttribute('id', `${i}`);
        boardEl.appendChild(newCell);
    };
    containerEl.style.height = `${(25 * boardHeight) + 55}px`;
    containerEl.style.width = `${(25 * boardWidth)}px`;
    boardHeaderEl.style.width = `${25 * boardWidth}px`;
}

function placeMines() {
    let randoms = [];
    let random;
    while (randoms.length < numMines) {
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
        if (clicked.classList.contains('clicked')) return;
        if (!clicked.classList.contains('flagged')) {
            clicked.classList.add('flagged');
            numFlags--;
            if (numFlags === 0) {
                let flagCheck = []
                let flaggedArray = document.querySelectorAll('.flagged');
                for (let i = 0; i < flaggedArray.length; i++) {
                    flagCheck.push(parseInt(flaggedArray[i].getAttribute('id')));
                };
                for (let i = 0; i < flagCheck.length; i++) {
                    if (board[flagCheck[i]] !== 'M') {
                        return;
                    } else {
                        winner();
                    };
                };
            };
        } else if (clicked.classList.contains('flagged')) {
            clicked.classList.remove('flagged');
            numFlags++;
        };
    } else {
        let clicked = e.target;
        if (clicked.classList.contains('flagged')) return;
        let cellIndex = parseInt(clicked.getAttribute('id'));
        if (board[cellIndex] === 'M') {
            handleMine(clicked);
        } else {
            if (document.querySelectorAll('.clicked').length === 0) {
                timerVar = setInterval(startTimer, 1000);
            };
            revealCell(cellIndex);
        };
    };
    if (document.querySelectorAll('.clicked').length === boardArea - numMines) {
        winner();
    };
    flagCountEl.textContent = `${numFlags}`;
}

function handleMine(clicked) {
    console.log('Boom bitch');
    clicked.classList.add('mine');
    revealMines();
    messageEl.textContent = 'LOSER!';
    stopTimer();
    boardEl.removeEventListener('click', handleClick);
}

function revealMines() {
    let mineIdx = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === 'M') {
            mineIdx.push(i);
        };
    };
    for (let i = 0; i < mineIdx.length; i++) {
        document.getElementById(mineIdx[i].toString()).classList.add('mine');
        
    };
}

function revealCell(cellIdx) {
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

function startTimer() {
        timerCount++;
        timerEl.textContent = timerCount;
}

function stopTimer() {
    clearInterval(timerVar);
}

function winner() {
    messageEl.textContent = 'WINNER!';
    stopTimer();
    boardEl.removeEventListener('click', handleClick);
}