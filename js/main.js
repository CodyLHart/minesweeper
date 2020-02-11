//Define required constants
    // Types of cells
        // Mine cell
        // Empty cell
        // Number cell
        // Flag cell
        // Hidden cell
        
//---------- CONSTANTS ----------//
const surroundingCells = [-11, -10, -9, -1, 1, 9, 10, 11];
const surroundingLeftSide = [-10, -9, 1, 10, 11];
const surroundingRightSide = [-11, -10, -1, 9, 10]


//Define required variables used to track the state of the game
    // Difficulty Level
        // numOfMines - number
        // board (locations of mines) - array
            // - array of arrays of numbers to represent each cell's value
    // gameOver - boolean
    // isWinner - boolean
    // numOfFlags - number
    // timer
    // message - string
    // fastTimes - array of numbers

//---------- STATE ----------//
let board = [];
let gameOver = false;
let isWinner = false;
let numOfMines;
let numOfFlags;
let message;

// Cached DOM elements
    // All of the cells on the board 
    // Replay button
    // Message
let boardEl = document.querySelector('#board');

for (let i = 0; i < 100; i++) {
    let newCell = document.createElement('div');
    newCell.setAttribute('class', 'cell');
    newCell.setAttribute('data-id', `${i}`);
    boardEl.appendChild(newCell);
}


//---------- EVENT LISTENERS ----------//
document.querySelector('#board').addEventListener('click', handleClick);

// Upon loading the app should:
    // Receive player input for difficulty level
    // Create the board accordinly
        // Initialize the board as an array of arrays of nums
            // Maybe a 1 dimensional array... I haven't decided yet
            // These nums represent the value at each cell
            // Initialize these to null
        // Randomize the mine locations (mines have a value or -1)
        // gameOver = false;
        // isWinner = false;
        // message  = 'Good Luck!' or something
    // Render those values to the page
    // Wait for the user to click a cell

// Handle if player clicks a cell
    // If this is the first cell they have clicked
        // Start the timer
    // If cell contains a mine
        // gameOver
    // Otherwise - If cell is touching at least one mine
        // Reveal the number of mines that cell is touching
    // Otherwise - If cell is touching no mines
        // Reveal all connected cells that are touching no mines
        // Reveal a border of numbers surrounding the blank cells
        // This part sounds hard. We shall see.
    // Make sure all revealed cells are unclickable

// Handle if player right clicks 
    // If cell is unflagged
        // Give cell a flag
        // Make that cell un-left-clickable
            // If cell has class of flagged, remove event listener? Probably...
        // Decrease remaining flags available by 1
    // If cell is flagged
        // Remove flag from cell
        // Make that cell left-clickable again 
        // Increase remaining flags available by 1

// If gameOver 
    // Stop timer
    // Reveal replay button
    // If winner
        // Winner message
        // If time is in top scores, save it to the top scores
    // If loser
        // Reveal remaning mines
        // Loser message
        
    // I think I want the overall opacity of the board to fade down to maybe 
    // 30-50% while the gameOver div shows up full opacity over top of it.
    // Along with the gameOver message, will be the replay button
    // When user presses the replay button, the div will ask the user 
    // for game difficulty. Upon selection, the board will render and 
    // fade back in to full opacity.


//---------- FUNCTIONS ----------//
init();

function init() {
    for (let i = 0; i < 100; i++) {
        board.push(0);
    };
    numOfMines = 10;
    numOfFlags = numOfMines;
    placeMines();
    console.log(board);
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
    let clicked = e.target;
    let cellIndex = parseInt(clicked.getAttribute('data-id'));
    if (board[cellIndex] === -1) {
        handleMine(clicked);
    } else {
        let adjacentIndex = [];
        if (cellIndex % 10 === 9) {
            for (let i = 0; i < surroundingRightSide.length; i++) {
                if (cellIndex + surroundingRightSide[i] >= 0 && cellIndex + surroundingRightSide[i] < 100) {
                    adjacentIndex.push(cellIndex + surroundingRightSide[i]);
                };
            };
        } else if (cellIndex % 10 === 0) {
            for (let i = 0; i < surroundingLeftSide.length; i++) {
                if (cellIndex + surroundingLeftSide[i] >= 0 && cellIndex + surroundingLeftSide[i] < 100) {
                    adjacentIndex.push(cellIndex + surroundingLeftSide[i]);
                };
            };
        } else {
            for (let i = 0; i < surroundingCells.length; i++) {
                if (cellIndex + surroundingCells[i] >= 0 && cellIndex + surroundingCells[i] < 100) {
                    adjacentIndex.push(cellIndex + surroundingCells[i]);
                };
            };
        };
        // console.log(adjacentIndex);
        function reveal() {
            let numAdjacent = 0;
            for (let i = 0; i < adjacentIndex.length; i++) {
                numAdjacent += Math.abs(board[adjacentIndex[i]]);
            };
            // console.log(numAdjacent);
            if (numAdjacent === 0) {
                clicked.classList.add('clicked');
                // Iterate through the surrounding cells and reveal
                // console.log(adjacentIndex);
                // for (let i = 0; i < adjacentIndex; i++) {
                    
                // };
            };
            if (numAdjacent > 0) {
                clicked.classList.add('clicked', `touch${numAdjacent}`);
                clicked.textContent = `${numAdjacent}`;
            };
        };
        reveal();
    };
}

function handleMine(clicked) {
    console.log('Boom bitch');
    clicked.style.background = 'red';
}

// function checkAdjacent() {
//     let numAdjacent = 0;
//     for (let i = 0; i < surroundingCells.length; i++) {
//         numAdjacent += Math.abs((board[cellIndex + i]));
//     };
//     console.log(numAdjacent);
// }






// function countAdjacent (index) {
//     let adjacentIndex = [];
//     if (index % 10 === 9) {
//         for (let i = 0; i < surroundingRightSide.length; i++) {
//             if (index + surroundingRightSide[i] >= 0 && index + surroundingRightSide[i] < 100) {
//                 adjacentIndex.push(index + surroundingRightSide[i]);
//             };
//         };
//     } else if (index % 10 === 0) {
//         for (let i = 0; i < surroundingLeftSide.length; i++) {
//             if (index + surroundingLeftSide[i] >= 0 && index + surroundingLeftSide[i] < 100) {
//                 adjacentIndex.push(index + surroundingLeftSide[i]);
//             };
//         };
//     } else {
//         for (let i = 0; i < surroundingCells.length; i++) {
//             if (index + surroundingCells[i] >= 0 && index + surroundingCells[i] < 100) {
//                 adjacentIndex.push(index + surroundingCells[i]);
//             };
//         };
//     };
// }