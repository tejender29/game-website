const board = document.getElementById('board');
const status = document.getElementById('status');

let currentPlayer = 'X';
let gameState = Array(9).fill('');

function handleClick(e) {
  const index = e.target.dataset.index;

  if (gameState[index] === '') {
    gameState[index] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (checkWin()) {
      status.innerText = `🎉 Player ${currentPlayer} wins!`;
      board.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', handleClick));
    } else if (!gameState.includes('')) {
      status.innerText = "It's a draw!";
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.innerText = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWin() {
  const winConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function resetGame() {
  gameState = Array(9).fill('');
  board.innerHTML = '';
  status.innerText = "Player X's turn";
  currentPlayer = 'X';
  createBoard();
}

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
  }
}

createBoard();