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

// Function to flash a panel in the sequence
function flash(panel) {
    return new Promise(function(resolve, reject) {
        const originalColor = panel.style.backgroundColor; // Store the original color
        panel.style.backgroundColor = 'aquamarine'; // Change to the flashing color
        setTimeout(function() {
            panel.style.backgroundColor = originalColor; // Restore the original color
            setTimeout(function() {
                resolve(); // Resolve promise after short delay
            }, 100); // Delay before restoring the original color
        }, 700); // Flash panel for 0.7 seconds
    });
}

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

//*// Allow users to click on the panels to mimic the computer's sequence.
//*// Verify Player Input: Compare the player's input sequence with the computer's sequence to determine if it matches.
//*// Score Tracking: Keep track of the player's score based on the number of successful rounds completed.
//*// Increment Difficulty: Increase the difficulty as the player progresses by adding more panels to the sequence or decreasing the time between flashes.
//*// Game Over Handling: Implement logic to handle game over scenarios, such as when the player makes a mistake.
//*// Restart Game: Provide an option for the player to restart the game after it ends.
//*// Visual Feedback: Add visual feedback to indicate when the player's input is correct or incorrect.
// Sound Effects: Include sound effects for each panel flash and for game events such as correct or incorrect inputs.
// Game Instructions: Display instructions or a tutorial to guide players on how to play the game.
// Responsive Design: Ensure the game interface is responsive and works well on different devices and screen sizes.
