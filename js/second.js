//---------- CONSTANTS ----------//
const surroundingCells = [-11, -10, -9, -1, 1, 9, 10, 11];
const surroundingLeftSide = [-10, -9, 1, 10, 11];
const surroundingRightSide = [-11, -10, -1, 9, 10];


//---------- STATE ----------//
let board = [];
let gameOver = false;
let isWinner = false;
let numOfMines = 10;
let numOfFlags;
let message;
let adjacentIndex = [];



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


//---------- FUNCTIONS ----------//
init();

function init() {
    for (let i = 0; i < 100; i++) {
        board.push(0);
    };
    numOfFlags = numOfMines;
    placeMines();
    // console.log(board);
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
        board[randoms[i]] = -1;
    };
}

function handleClick(e) {
    adjacentIndex = [];
    let clicked = e.target;
    let cellIndex = parseInt(clicked.getAttribute('id'));
    if (board[cellIndex] === -1) {
        handleMine(clicked);
    } else {
       mapSurroundingArray(cellIndex);
       revealCell(cellIndex);
    };
}

function handleMine(clicked) {
    console.log('Boom bitch');
    clicked.style.background = 'red';
}





function mapSurroundingArray(index) {
    // let adjacentIndex = [];
    if (index % 10 === 9) {
        for (let i = 0; i < surroundingRightSide.length; i++) {
            if (index + surroundingRightSide[i] >= 0 && index + surroundingRightSide[i] < 100) {
                adjacentIndex.push(index + surroundingRightSide[i]);
            };
        };
    } else if (index % 10 === 0) {
        for (let i = 0; i < surroundingLeftSide.length; i++) {
            if (index + surroundingLeftSide[i] >= 0 && index + surroundingLeftSide[i] < 100) {
                adjacentIndex.push(index + surroundingLeftSide[i]);
            };
        };
    } else {
        for (let i = 0; i < surroundingCells.length; i++) {
            if (index + surroundingCells[i] >= 0 && index + surroundingCells[i] < 100) {
                adjacentIndex.push(index + surroundingCells[i]);
            };
        };
    };
}


function revealCell(cellIdx) {
    let numAdjacent = 0;
    for (let i = 0; i < adjacentIndex.length; i++) {
        numAdjacent += Math.abs(board[adjacentIndex[i]]);
    };
    // console.log(numAdjacent);
    if (numAdjacent === 0) {
        document.getElementById(`${cellIdx}`).classList.add('clicked');
        console.log(adjacentIndex);
        // revealAdjacent(adjacentIndex);
            
    };
    if (numAdjacent > 0) {
        document.getElementById(`${cellIdx}`).classList.add('clicked', `touch${numAdjacent}`);
        document.getElementById(`${cellIdx}`).textContent = `${numAdjacent}`;
    };
}



// CLICK A CELL
// FIND INDEX OF THAT CELL
// REVEAL CELL AT INDEX
    // BY CHECKING SURROUNDING CELLS FOR MINES
// IF NO MINES, ITERATE THROUGH SURROUNDING CELLS
    // REVEAL CELL AT EACH INDEX
        // IF NONE OF THOSE HAVE MINES
            // ITERATE THROUGH SURROUNDING CELLS
                // REVEAL CELL AT EACH INDEX

// function flood() {
//     for (let j = 0; j < adjacentIndex.length; j++) {
//         let currentCell = document.querySelector(`#${j}`);
//         revealCell(currentCell);
//     };
// }

// function revealAdjacent(adj) {
//     for (let i = 0; i < adj.length; i++) {
        
//     };
// }