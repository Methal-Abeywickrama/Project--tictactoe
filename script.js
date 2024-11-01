const gameboard = document.querySelectorAll(".square");
let turn = "O";

const changeTurn = (turn) => {
  if (turn == "O") {
    return "X";
  } else {
    return "O";
  }
};

const checkWin = () => {
  console.log("somethins");
  const winConditions = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
    ["1", "5", "9"],
    ["3", "5", "7"],
  ];
  const OSquares = [];
  const XSquares = [];
  gameboard.forEach((square) => {
    if (square.textContent == "O") {
      OSquares.push(square.id);
    } else if (square.textContent == "X") {
      XSquares.push(square.id);
    }
  });
  const isWinner = (squares) => {
    const win = winConditions.some((condition) =>
      condition.every((id) => squares.includes(id))
    );
    const winCondition = winConditions.find((condition) =>
      condition.every((id) => squares.includes(id))
    );
    return [win, winCondition];
  };

  const deactivateBoard = () => {
    document.getElementById("gameboard").style.pointerEvents = "none";
  };

  const colourWin = (condition) => {
    condition.forEach((id) => {
      const square = document.getElementById(id);
      square.classList.add("greensquare");
    });
  };
  if (isWinner(OSquares)[0]) {
    deactivateBoard();
    colourWin(isWinner(OSquares)[1]);
    console.log("O wins!");
  } else if (isWinner(XSquares)[0]) {
    colourWin(isWinner(XSquares)[1]);
    deactivateBoard();
    console.log("X wins!");
  }
};
const handleClick = (event) => {
  square = event.target;
  if (square.textContent == "X" || square.textContent == "O") {
    return;
  }

  square.textContent = turn;
  turn = changeTurn(turn);
  checkWin();
};

gameboard.forEach((square) => {
  square.addEventListener("click", handleClick);
});