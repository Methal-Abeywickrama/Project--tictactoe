const gameFlow = ( function() {
  function createSquare() {
    let marker = ''
    const setMarker = function (input) {
      marker = input
    };
    const getMarker = () => marker;
    return { setMarker, getMarker}
  
  }
  
  function getUserSquareChoice(boardSquares) {
    let choice = Number(prompt('Enter a number between 0 and 8'))
    if (!isNaN(choice) && choice >= 0 && choice <= 8 && boardSquares[choice].getMarker() == '') {
      return choice
    } else {
      console.log(choice)
      console.log('Invalid entry')
      return getUserSquareChoice(boardSquares)
    }
  }

  function checkForDraw(board) {
    if (!board.some(square => square.getMarker() == '')) {
      return true 
    }
  }
  
  function Player(name, marker) {
    this.name = name;
    this.marker = marker;
    this.won = false;
  }
  function checkWin(board) {
    const combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    return combinations.some(comb => {
      const [a, b, c] = comb;
      return board[a].getMarker() === board[b].getMarker() && 
             board[b].getMarker() === board[c].getMarker() && 
             board[a].getMarker() !== '';
    });
   
  }

  function makeMove(marker, board, move) {
    board[move].setMarker(marker)
  }
  function printBoard(board) {
    console.log(board)
    console.log( `${board[0].getMarker()}, ${board[1].getMarker()}, ${board[2].getMarker()}`)
    console.log( `${board[3].getMarker()}, ${board[4].getMarker()}, ${board[5].getMarker()}`)
    console.log( `${board[6].getMarker()}, ${board[7].getMarker()},${ board[8].getMarker()}`)
  }

  const Player1 = new  Player(prompt('Enter your name'), 'O')
  const Player2 = new  Player(prompt('Enter your name'), 'X')
  const gameBoard = {
    squares: Array.from( {length: 9}, () => createSquare())
    
  }
  function playerTurn(player) {
    console.log(`${player.name}, it's your turn`);
    printBoard(gameBoard.squares);
    let move = getUserSquareChoice(gameBoard.squares);
    makeMove(player.marker, gameBoard.squares, move);
    if (checkWin(gameBoard.squares)) {
      debugger
      console.log('win')
      player.won = true;
      return true;
    } else if (checkForDraw(gameBoard.squares)) {
      draw = true
      return true;
    } else {
      console.log('no win')

    }
    return false;
  }
  let draw = false
  do {
    if (playerTurn(Player1) ) break;
    if (playerTurn(Player2)) break;
  } while (!checkWin(gameBoard.squares));
  if (!draw) {
    console.log(`Player has won`)
  } else {
    console.log('its a draw')

  }
})

gameFlow()