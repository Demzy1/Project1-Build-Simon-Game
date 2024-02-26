//....................................................................................................................................................................................................................................................
//Pseudo code:
// Define a function to start the game
function startGame() {
    // Initialize empty arrays to store the original sequence for both the original sequence n the player sequence
    let sequence = [];
    let playerSequence = [];

    
    // Initialize a variable to keep track of the player's score
    let score = 0;
    
    // Set the initial round number to 1
    let roundNumber = 1;
    
    //BONUS// Display a welcome message or game instructions //BONUS//
    
    // Generate a random color or sound and add it to the sequence
    sequence.push(generateRandomColorOrSound());
    
    // Display the generated sequence to the player
    
    // Wait for the player to input their sequence
    
    // Compare the player's sequence with the generated sequence
    
    // If the sequences match, increment the player's score based on the round number
    score += roundNumber;
    
    // Increment the round number
    roundNumber++;
    
    // Increase the length of the sequence for the next round
    sequence.push(generateRandomColorOrSound());
    
    // Repeat the process for the next round
    
    // If the sequences don't match, end the game and display a game over message
    
    // Ask the player if they want to play again
    
    // If the player chooses to play again, restart the game
}

// Define a function to generate a random color or sound
function generateRandomColorOrSound() {
    // Define an array of possible colors or sounds
    const colorsOrSounds = ['red', 'blue', 'green', 'yellow'];
    
    // Generate a random index within the range of the array length
    let randomIndex = Math.floor(Math.random() * colorsOrSounds.length);
    
    // Return the color or sound corresponding to the random index
    return colorsOrSounds[randomIndex];
}
