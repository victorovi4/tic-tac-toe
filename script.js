document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('[data-cell]');
    const status = document.getElementById('status');
    const restartButton = document.getElementById('restartButton');
    let isXTurn = true;
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    function handleCellClick(e) {
        const cell = e.target;
        const currentClass = isXTurn ? 'X' : 'O';

        if (cell.textContent || !gameActive) return;

        placeMark(cell, currentClass);
        if (checkWin(currentClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
            updateStatus();
        }
    }

    function placeMark(cell, mark) {
        cell.textContent = mark;
    }

    function swapTurns() {
        isXTurn = !isXTurn;
    }

    function updateStatus() {
        status.textContent = `Ход игрока: ${isXTurn ? 'X' : 'O'}`;
    }

    function checkWin(currentClass) {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return cells[index].textContent === currentClass;
            });
        });
    }

    function isDraw() {
        return [...cells].every(cell => cell.textContent);
    }

    function endGame(draw) {
        gameActive = false;
        if (draw) {
            status.textContent = 'Ничья!';
        } else {
            status.textContent = `Игрок ${isXTurn ? 'X' : 'O'} победил!`;
        }
    }

    function startGame() {
        isXTurn = true;
        gameActive = true;
        cells.forEach(cell => {
            cell.textContent = '';
        });
        updateStatus();
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    restartButton.addEventListener('click', startGame);

    // Initialize the game
    startGame();
});
