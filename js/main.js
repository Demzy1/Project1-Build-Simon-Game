// Define variables to store panel elements
const topLeft = document.querySelector('.top-left');
const topRight = document.querySelector('.top-right');
const bottomLeft = document.querySelector('.bottom-left');
const bottomRight = document.querySelector('.bottom-right');

// Store panel elements in an array
const panels = [topLeft, topRight, bottomLeft, bottomRight];

// Initialize computer sequence with a random panel
const computerSequence = [getRandomPanel()];
let guessedSequence = [...computerSequence];
let canClick = false;
let score = 0;

// Define sounds for each panel
const panelSounds = {
    'top-left': new Audio('audioFile/mj.wav'),
    'top-right': new Audio('audioFile/pr.wav'),
    'bottom-left': new Audio('audioFile/wunna.wav'),
    'bottom-right': new Audio('audioFile/burna.wav')
};

// Function to get a random panel from the array
function getRandomPanel() {
    return panels[Math.floor(Math.random() * panels.length)];
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Promises in JavaScript are used to handle asynchronous operations, providing a cleaner and 
// more organized way to work with asynchronous code. In my game, promises are 
// employed to manage the asynchronous flashing of panels. Instead of flashing them all at once
// and causing confusion, promises ensure they flash one after the other. 

// Function to flash a panel in the sequence
function flash(panel) {
    return new Promise(function(resolve, reject) {
        const originalColor = panel.style.backgroundColor; // Store the original color
        panel.style.backgroundColor = 'aquamarine'; // Change to the flashing color
        setTimeout(function() {
            panel.style.backgroundColor = originalColor; // Restore the original color
            setTimeout(function() {
                resolve(); // Resolve promise after short delay
            }, 500); // Delay before restoring the original color
        }, 700); // Flash panel for 0.7 seconds
    });
}
// Refrence:MozDevNet. (n.d.). Promise - javascript: MDN. MDN Web Docs.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise 
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Function to handle panel clicks by the user
function clicked(clicked) {
    if (!canClick) return;
    
    // Play the associated sound when a panel is clicked
    const panelId = clicked.classList[1]; // Assuming the class name is the panel ID
    panelSounds[panelId].play();

    // Add visual feedback to signify the button has been clicked
    clicked.classList.add('clicked');

    // Remove visual feedback after a delay
    setTimeout(() => {
        clicked.classList.remove('clicked');
    }, 500); // Adjust the delay time as needed

    const truePanel = guessedSequence.shift();
    if (truePanel === clicked) {
        if (guessedSequence.length === 0) {
            // Start new round after a delay
            score++; // Increase the score after each successful round
            const scoreText = document.querySelector('#score-text');
            scoreText.textContent = `Score: ${score}`;

            // Clear visual feedback after a delay
            setTimeout(() => {
                panels.forEach(panel => panel.classList.remove('clicked'));
                computerSequence.push(getRandomPanel());
                guessedSequence = [...computerSequence];
                flashing();
            }, 1000); // Adjust the delay time as needed
        }
    } else {
        // End game
        const gameBrand = document.querySelector('.game-brand');
        gameBrand.innerHTML = '<p id="end-game-text">Game Over</p>';
        score = 0; // Reset the score when the game ends
        const scoreText = document.querySelector('#score-text');
        scoreText.textContent = `Score: ${score}`;
        startButton.textContent = 'Restart Game'; // Change start button text to "Restart Game"
        startButton.removeEventListener('click', startGame); // Remove previous event listener
        startButton.addEventListener('click', startGame); // Add event listener to restart the game
    }
}



// Main function to iterate through computer sequence and flash panels
async function flashing() {
    canClick = false; // Prevent user clicks during computer sequence flashing
    for (const panel of computerSequence) {
        await flash(panel); // Flash each panel in sequence
    }
    canClick = true; // Allow user clicks after computer sequence flashing
}

// Function to start the game
function startGame() {
    flashing(); // Start the initial sequence flashing
}

// Get the start button element
const startButton = document.getElementById('start-btn');

// Add event listener to the start button
startButton.addEventListener('click', startGame);

// Get the reset button element
const resetButton = document.getElementById('reset-btn');

// Add event listener to the reset button
resetButton.addEventListener('click', function() {
    location.reload(); // Reload the page to restart the game
});


