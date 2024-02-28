// Define variables to store panel elements
const topLeft = document.querySelector('.top-left');
const topRight = document.querySelector('.top-right');
const bottomLeft = document.querySelector('.bottom-left');
const bottomRight = document.querySelector('.bottom-right');

// Store panel elements in an array
const panels = [topLeft, topRight, bottomLeft, bottomRight];

// Initialize computer sequence with a random panel
const computerSequence = [getRandomPanel()];

// Function to get a random panel from the array
function getRandomPanel() {
    return panels[Math.floor(Math.random() * panels.length)];
}

// Function to flash a panel in the sequence
function flash(panel) {
    return new Promise(function(resolve, reject) {
        panel.className += 'active'; // Add 'active' class to panel
        setTimeout(function() {
            panel.className = panel.className.replace('active', ''); // Remove 'active' class
            setTimeout(function() {
                resolve(); // Resolve promise after short delay
            }, 300);
        }, 1000); // Flash panel for 1 second
    });
}

let canClick = false;
function clicked (panelClicked){
    if (!canClick) return;
    const truePanel = guessedSequence.shift();
    if (truePanel === panelClicked){
        if (guessedSequence.length === 0){
            //start new round
        }
    } else {
        //end game
        alert('Game Over')
    }
}

// Main function to iterate through computer sequence and flash panels
async function main() {
    for (const panel of computerSequence) {
        await flash(panel); // Flash each panel in sequence
    }
    canClick = true;
}
main();

// Allow users to click on the panels to mimic the computer's sequence.
// Verify Player Input: Compare the player's input sequence with the computer's sequence to determine if it matches.
// Score Tracking: Keep track of the player's score based on the number of successful rounds completed.
// Increment Difficulty: Increase the difficulty as the player progresses by adding more panels to the sequence or decreasing the time between flashes.
// Game Over Handling: Implement logic to handle game over scenarios, such as when the player makes a mistake.
// Restart Game: Provide an option for the player to restart the game after it ends.
// Visual Feedback: Add visual feedback to indicate when the player's input is correct or incorrect.
// Sound Effects: Include sound effects for each panel flash and for game events such as correct or incorrect inputs.
// Game Instructions: Display instructions or a tutorial to guide players on how to play the game.
// Responsive Design: Ensure the game interface is responsive and works well on different devices and screen sizes.
