// TODO: Set up Player
const Player = (sym) => {
  this.sym = sym;

  const getSym = () => {
    return sym;
  }

  return { getSym };
};

const gameBoard = (() => {
  let board = new Array(9);

  // getField
  const getField = (num) => {
    return board[num]
  };

  // setField
  const setField = (num, sym) => {
    board[num] = sym
  }

  // resetBoard
  const reset = () => {
    for(let i =0; i<board.length; i++){
      board[i] = '';
    }
  };

  return { getField, setField, reset };

})();

const displayController = (() => {
  const squares = document.querySelectorAll('.square');
  const display = document.querySelector('.display');
  const restart = document.querySelector('.restart');

  // TODO: Set up listeners for squares and reset
  squares.forEach(square => square.addEventListener('click', (e) => {
    if (gameController.getIsOver() || e.target.textContent!=='') return;
    gameController.playRound(parseInt(e.target.dataset.index));
    updateBoard();
  }));

  // TODO: Update display
  const setDisplay = message => {
    display.textContent = message;
  }

  const setResult = winner => {
    if (winner == 'Draw') {
      setDisplay(`It's a draw!`);
    } else {
      setDisplay(`Player ${winner} has won!`)
    }
  }

  // TODO: Restart button
  restart.addEventListener('click', (e) => {
    gameBoard.reset();
    gameController.reset();
    updateBoard();
    setDisplay(`Player X's turn`)
  });

  const updateBoard = () => {
    for(let i=0; i<squares.length; i++){
      squares[i].textContent = gameBoard.getField(i);
    }
  };

  return { setDisplay, setResult }
})();

// TODO: Make gomeController
const gameController = (() => {
  const playerX = Player('X');
  const playerO = Player('O');
  let isOver = false;
  let round = 1;

  // TODO: Play Round
  const playRound = (index) => {
    gameBoard.setField(index, getCurrentSym());
    if(checkWinner(index)) {
      displayController.setResult(getCurrentSym());
      isOver = true;
      return;
    }
    if(round == 9) {
      displayController.setResult('Draw');
      isOver = true;
      return;
    }

    round++;
    displayController.setDisplay(`Player ${getCurrentSym()}'s turn`);
  }

  // TODO: Change Turn

  // TODO: Check Winner
  const checkWinner = (index) => {
    const winnerTable = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winnerTable
      .filter((combo) => combo.includes(index))
      .some((combo) => combo.every(ind => gameBoard.getField(ind) == getCurrentSym()));
  }

  const getCurrentSym = () => {
    return round % 2 === 1 ? playerX.getSym() : playerO.getSym();
  }

  const getIsOver = () => {
    return isOver;
  }

  // TODO: 
  const reset = () => {
    round = 1;
    isOver = false;
  }

  return { playRound, getIsOver, reset}

})();