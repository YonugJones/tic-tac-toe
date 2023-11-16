function createPlayer(name, marker) {
    return { name, marker };
}

const Gameboard = (function () {
    let board = Array(9).fill('');

    const boxes = document.querySelector('#boxes');

    const renderBoard = () => {
        boxes.innerHTML = ''; 

        board.forEach((value, index) => {
            const box = document.createElement('div');
            box.classList.add('box');
            box.textContent = value;
            box.addEventListener('click', () => handleBoxClick(index));
            boxes.appendChild(box);
        });
    };

    const updateCell = (index, value) => {
        board[index] = value;
    };

    const handleBoxClick = (index) => {

        if (board[index] === '' && !checkforWin()) {
            updateCell(index, currentPlayer.marker);
            renderBoard();
            if (checkforWin()) {
                console.log(`${currentPlayer.name} wins!`)
            } else {
                switchPlayer();
            }
        }
    };

    const resetBoard = () => {
        board = Array(9).fill('');
        renderBoard();
    };

    return {
        board,
        renderBoard,
        updateCell,
        resetBoard
    };
})();

const Game = (function () {
    const player1 = createPlayer('Player 1', 'X');
    const player2 = createPlayer('Player 2', 'O');

    let currentPlayer = player1;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    // Add game logic here

    return {
        currentPlayer,
        switchPlayer
    };
})();

const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', () => {
    Gameboard.resetBoard();
});

document.addEventListener('DOMContentLoaded', () => {
    Gameboard.renderBoard();
});