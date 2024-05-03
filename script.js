// Selecione todas as boxes com a classe 'box'
const boxes = document.querySelectorAll('.box');

let currentPlayer = 'X';
let gameIsOver = false;

// Adicione um ouvinte de evento de clique a cada box
boxes.forEach(box => {
  box.addEventListener('click', handleBoxClick);
});

function handleBoxClick(event) {
  const box = event.target;

  // Permita um clique apenas se a box estiver vazia e o jogo ainda não tiver terminado
  if (!gameIsOver && box.textContent === '') {
    box.textContent = currentPlayer;
    checkWin();
    checkDraw();
    changePlayer();
  }
}

function changePlayer() {
  currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';

  // Atualize a posição de fundo com base no player atual
  const bgElement = document.querySelector('.bg');
  bgElement.style.left = (currentPlayer === 'X') ? '85px' : '0';
}

function checkWin() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const condition of winConditions) {
    const [a, b, c] = condition;
    const boxA = boxes[a];
    const boxB = boxes[b];
    const boxC = boxes[c];

    if (boxA.textContent !== '' && boxA.textContent === boxB.textContent && boxB.textContent === boxC.textContent) {
      gameIsOver = true;
      document.querySelector('#results').textContent = `${currentPlayer} wins`;
      document.querySelector('#reset').style.display = 'inline';

      // Destaque as boxes vencedoras
      boxA.style.backgroundColor = '#08D9D6';
      boxA.style.color = '#000';
      boxB.style.backgroundColor = '#08D9D6';
      boxB.style.color = '#000';
      boxC.style.backgroundColor = '#08D9D6';
      boxC.style.color = '#000';
    }
  }
}

function checkDraw() {
  if (!gameIsOver) {
    let isDraw = true;

    for (const box of boxes) {
      if (box.textContent === '') {
        isDraw = false;
        break;
      }
    }

    if (isDraw) {
      gameIsOver = true;
      document.querySelector('#results').textContent = 'Velha';
      document.querySelector('#reset').style.display = 'inline';
    }
  }
}

document.querySelector('#reset').addEventListener('click', resetGame);

function resetGame() {
  gameIsOver = false;
  currentPlayer = 'X';
  document.querySelector('.bg').style.left = '0';
  document.querySelector('#results').textContent = '';
  document.querySelector('#reset').style.display = 'none';

  for (const box of boxes) {
    box.textContent = '';
    box.style.removeProperty('background-color');
    box.style.color = '#fff';
  }
}