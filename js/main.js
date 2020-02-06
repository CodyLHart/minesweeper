//Define required constants
    // Different types of squares: empty, mine, number of mines touching

//Define required variables used to track the state of the game
    // Number of mines - number
    // Board (locations of mines) - array (probably?)
    // Game over - boolean
    // Winner - boolean
    // Number of remaining flags 
    // Timer
    // Message - string
    // High scores (technically low times) - array of numbers

//Store elements on the page that will be accessed in code
    // Store all of the cells on the board (10x10, eventually will be able to change)

// Upon loading the app should:
    // Initialize the state variables
        // Let the player select how many mines
        // Let the player select board dimensions
        // Randomize the mine locations and place appropriate number locations
        // let gameOver = false;
        // let isWinner = false;
    // Render those values to the page
    // Wait for the user to click a square

// Handle if player clicks a square
    // If player clicks their first square
        // Start the timer
    // If cell contains a mine
        // gameOver
    // Otherwise - If cell is touching at least one mine
        // Reveal the number of mines that cell is touching
    // Otherwise - If cell is touching no mines
        // Reveal all connected cells that are touching no mines
        // Reveal a border of numbers surrounding the blank cells
    // Make all revealed squares unclickable

// Handle if player right clicks 
    // If cell is unmarked
        // Place a flag in that square
        // Make that square un-left-clickable
        // Decrease remaining flags available by 1
    // If cell is marked
        // Remove flag from square
        // Make that square left-clickable again
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
        
// Handle a player clicking the replay button
    // Just reinitiate

