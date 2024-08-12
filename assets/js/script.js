let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let currentPlayer = 'X';
let player1 = '';
let player2 = '';
let gameActive = false;

function startGame() {
    player1 = document.getElementById('player1').value || 'Jogador 1';
    player2 = document.getElementById('player2').value || 'Jogador 2';
    document.getElementById('gameBoard').style.display = 'grid';
    document.getElementById('message').innerText = `${player1} (X) começa o jogo!`;
    gameActive = true;
}

function makeMove(row, col) {
    if (!gameActive || board[row][col]) return;

    board[row][col] = currentPlayer;
    document.querySelectorAll('.row')[row].children[col].innerText = currentPlayer;

    if (checkWinner()) {
        document.getElementById('message').innerText = currentPlayer === 'X'
            ? `${player1} (X) venceu! 🎉`
            : `${player2} (O) venceu! 🎉`;
        gameActive = false;
        return;
    }

    if (board.flat().every(cell => cell)) {
        document.getElementById('message').innerText = `Empate!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('message').innerText = `Agora é a vez de ${currentPlayer === 'X' ? player1 : player2} (${currentPlayer})`;
}

function checkWinner() {
    const winPatterns = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a[0]][a[1]] && board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]];
    });
}
