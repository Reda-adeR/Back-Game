class TicTacToeGame {
    constructor() {
        // Get the necessary elements from the DOM
        this.boardSlots = document.querySelectorAll('.bSlot');
        this.statsXWins = document.querySelector('.stats:nth-child(1) h1');
        this.statsDraws = document.querySelector('.stats:nth-child(2) h1');
        this.statsOWins = document.querySelector('.stats:nth-child(3) h1');
        this.resetButton = document.querySelector('.reset');
        this.startButton = document.querySelector('.animWinLose h1');
        this.animWinLose = document.querySelector('.animWinLose h1');
        this.playerMode = document.querySelector('input[name="playerMode"]:checked').value; // Get the initial mode
        this.playerTurn = 'X'; // X always starts
        this.movesCount = 0;
        this.boardState = Array(9).fill(null); // Empty board
        this.xWins = 0;
        this.oWins = 0;
        this.draws = 0;
        this.isGameActive = false; // Track if the game is active

        // Initialize game event listeners
        this.initListeners();
    }

    // Initialize click listeners on board slots, reset, start button, and radio buttons
    initListeners() {
        // Listen for the "Start" button click
        this.startButton.addEventListener('click', () => this.startGame());

        // Listen for the reset button click
        this.resetButton.addEventListener('click', () => this.resetScores());

        // Add event listeners to the radio buttons to reset the game mode
        document.querySelectorAll('input[name="playerMode"]').forEach(radio => {
            radio.addEventListener('change', (event) => this.changeMode(event.target.value));
        });

        // Add click event listeners to the board slots
        this.boardSlots.forEach((slot, index) => {
            slot.addEventListener('click', () => this.handleSlotClick(slot, index));
        });
    }

    // Handle game mode changes (1 Player or 2 Players)
    changeMode(mode) {
        this.playerMode = mode;
        this.resetGame(); // Reset the board whenever mode changes
        this.animWinLose.textContent = 'START'; // Update the text back to "START"
        this.startButton.textContent = 'START'; // Reset start button text
    }

    // Start the game by enabling the board
    startGame() {
        if (this.isGameActive) return; // Prevent starting if already active

        this.animWinLose.textContent = `${this.playerTurn}'s Turn`; // Show who's turn it is
        this.isGameActive = true; // Mark the game as active
        this.movesCount = 0;
        this.boardState.fill(null); // Clear the board state

        // Clear the board display and reset classes
        this.boardSlots.forEach(slot => {
            slot.textContent = '';
            slot.classList.remove('xSlot', 'oSlot');
        });

        // Enable the slots for interaction
        this.enableBoard();
    }

    // Handle the slot click (player makes a move)
    handleSlotClick(slot, index) {
        if (!this.isGameActive || this.boardState[index] !== null) return; // Ignore if game not active or slot filled

        // Set the clicked slot with the current player's symbol (X or O)
        this.boardState[index] = this.playerTurn;
        slot.textContent = this.playerTurn;
        slot.classList.add(this.playerTurn === 'X' ? 'xSlot' : 'oSlot');
        this.movesCount++;

        // Check if the current player has won or if the game is a draw
        if (this.checkWin()) {
            this.announceWinner(this.playerTurn);
        } else if (this.movesCount === 9) {
            this.announceDraw();
        } else {
            if (this.playerMode === '1' && this.playerTurn === 'X') {
                // If it's 1-player mode and X just played, disable board and make the bot (O) play
                this.disableBoard();  // Disable clicks while bot is playing
                setTimeout(() => {
                    this.switchTurn();
                    this.botPlay();  // Bot plays after short delay
                }, 500);
            } else {
                this.switchTurn(); // Switch turns in 2-player mode or after bot's turn
            }
        }
    }

    // Switch between X and O turns
    switchTurn() {
        this.playerTurn = this.playerTurn === 'X' ? 'O' : 'X';
        this.animWinLose.textContent = `${this.playerTurn}'s Turn`;
        this.animWinLose.classList.add('turn-animation');
        setTimeout(() => {
            this.animWinLose.classList.remove('turn-animation');
        }, 500);
    }

    // Check if the current player has won
    checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winPatterns.some(pattern => {
            return pattern.every(index => this.boardState[index] === this.playerTurn);
        });
    }

    // Announce the winner and update the score
    announceWinner(player) {
        this.animWinLose.textContent = `${player} Wins!`;
        this.animWinLose.classList.add('win-animation');
        this.isGameActive = false;

        if (player === 'X') {
            this.xWins++;
            this.statsXWins.textContent = this.xWins;
        } else {
            this.oWins++;
            this.statsOWins.textContent = this.oWins;
        }

        // Disable further moves
        this.disableBoard();
    }

    // Announce a draw
    announceDraw() {
        this.animWinLose.textContent = "It's a Draw!";
        this.animWinLose.classList.add('draw-animation');
        this.isGameActive = false;

        this.draws++;
        this.statsDraws.textContent = this.draws;

        this.disableBoard();
    }

    // Disable the board after a game ends or during bot's turn
    disableBoard() {
        this.boardSlots.forEach(slot => {
            slot.style.pointerEvents = 'none'; // Disable interaction
        });

        this.startButton.textContent = 'START AGAIN'; // Update Start button for a new game
    }

    // Enable the board (after clicking start or after bot's turn)
    enableBoard() {
        this.boardSlots.forEach(slot => {
            slot.style.pointerEvents = 'auto'; // Enable interaction
        });
        this.startButton.textContent = 'Playing'; // Update Start button
    }

    // Reset the scores (only resets the score counters)
    resetScores() {
        this.xWins = 0;
        this.oWins = 0;
        this.draws = 0;

        this.statsXWins.textContent = this.xWins;
        this.statsOWins.textContent = this.oWins;
        this.statsDraws.textContent = this.draws;
    }

    // Reset the board (clear the current game)
    resetGame() {
        this.boardState.fill(null); // Clear the board state
        this.movesCount = 0;
        this.isGameActive = false;

        // Clear the board display and reset classes
        this.boardSlots.forEach(slot => {
            slot.textContent = '';
            slot.classList.remove('xSlot', 'oSlot');
        });

        this.animWinLose.textContent = 'START'; // Reset display text
        this.startButton.textContent = 'Start'; // Reset Start button
    }

    // Bot (O) plays randomly on an empty cell
    botPlay() {
        let emptySlots = [];
        this.boardSlots.forEach((slot, index) => {
            if (this.boardState[index] === null) {
                emptySlots.push(index);
            }
        });

        if (emptySlots.length > 0) {
            const randomIndex = emptySlots[Math.floor(Math.random() * emptySlots.length)];
            const randomSlot = this.boardSlots[randomIndex];

            this.handleSlotClick(randomSlot, randomIndex); // Simulate bot's move
        }

        this.enableBoard(); // Re-enable the board after bot finishes playing
    }
}

// Start the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new TicTacToeGame();
});




// ----------------------

