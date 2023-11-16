const createPlayer = (name, marker) => {
    return {
        name,
        marker
    };
};

const displayController = (() => {
    const renderMessage = (message) => {
        document.querySelector('.text-display').textContent = message;
    };
    return {
        renderMessage,
    };
})();

const Gameboard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    const render = () => {
        let boardHTML = '';
        board.forEach((box, index) => {
            boardHTML += `<div class="box" id="square-${index}"><span>${box}</span></div>`;
        });
        document.querySelector('.gameboard').innerHTML = boardHTML;

        const boxes = document.querySelectorAll('.box');
        boxes.forEach(box => {
            box.addEventListener('click', Game.handleClick);
        });
    };

    const update = (index, value) => {
        board[index] = value;
        render();
    };

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        render();
    };

    let header = document.querySelector('.header');

    let textDisplay = document.createElement('h1');
    textDisplay.classList.add('text-display');
    textDisplay.textContent = 'Tic Tac Toe';
    header.appendChild(textDisplay);

    const restartButton = document.createElement('button');
    restartButton.classList.add('restart-button');
    restartButton.textContent = 'Restart';
    header.appendChild(restartButton);
    restartButton.addEventListener('click', () => {
        Game.restart();
    });

    const getGameboard = () => board;

    return {
        render,
        update,
        resetBoard,
        getGameboard
    };
})();

const Game = (() => {
    let currentPlayer;
    let gameOver;
    let player1;
    let player2;
    
    const start = () => {
        player1 = createPlayer('Player 1', 'X');
        player2 = createPlayer('Player 2', 'O');

        currentPlayer = player1;
        gameOver = false;
        Gameboard.render();

        const boxes = document.querySelectorAll('.box');
        boxes.forEach(box => {
            box.addEventListener('click', handleClick);
        })
    };

    const handleClick = (event) => {
        if (gameOver) {
            return;
        }
        let index = parseInt(event.target.id.split('-')[1]);
        if (Gameboard.getGameboard()[index] !== '')
            return;

        Gameboard.update(index, currentPlayer.marker);

        if (checkForWin(Gameboard.getGameboard(), currentPlayer.marker)) {
            gameOver = true;
            displayController.renderMessage(`${currentPlayer.marker} wins!`);
        } else if (checkForTie(Gameboard.getGameboard())) {
            displayController.renderMessage("It's a tie!");
        }
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkForWin = board => {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (let i = 0; i < winningCombos.length; i++) {
            const [a, b, c] = winningCombos[i];
            if (board[a] && (board[a] === board[b]) && (board[b] === board[c])) {
                return true;
            }
        }
        return false;
    }

    const checkForTie = board => {
        return board.every(box => box !== '');
    }

    const restart = () => {
        for (let i = 0; i < 9; i++) {
            Gameboard.update(i, '');
        }
        Gameboard.resetBoard();
        Game.start();
        gameOver = false;
        displayController.renderMessage('Tic Tac Toe');
    };

    return {
        start,
        handleClick,
        checkForWin,
        checkForTie,
        restart
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    Game.start();
});