let playerText = document.getElementById("playerText");
let restartBtn = document.getElementById("Restartbtn");
let boxes = Array.from(document.getElementsByClassName("box"));

const winning_indicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);

const winPatterns = [
  [0, 1, 2], // Row 1
  [3, 4, 5], // Row 2
  [6, 7, 8], // Row 3
  [0, 3, 6], // Column 1
  [1, 4, 7], // Column 2
  [2, 5, 8], // Column 3
  [0, 4, 8], // Diagonal 1
  [2, 4, 6], // Diagonal 2
];

const O_TEXT = "O";
const X_TEXT = "X";

let current_player = X_TEXT;
let spaces = Array(9).fill(null);

const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

function boxClicked(e) {
  const id = e.target.id;

  if (!spaces[id]) {
    spaces[id] = current_player;
    e.target.innerText = current_player;

    if (playerWon() !== false) {
      playerText.innerText = `${current_player} has Won !!`;
      let winning_blocks = playerWon();

      winning_blocks.map(
        (box) => (boxes[box].style.backgroundColor = winning_indicator)
      );
      boxes.forEach((box) => box.removeEventListener("click", boxClicked));
    } else if (isDraw()) {
      playerText.innerText = `It's a Draw!`;
    } else {
      current_player = current_player == X_TEXT ? O_TEXT : X_TEXT;
    }
  }
}

function playerWon() {
  for (const condition of winPatterns) {
    let [a, b, c] = condition;
    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }

  return false;
}
function isDraw() {
  return spaces.every(space => space !== null)
}
restartBtn.addEventListener("click", () => {
  spaces.fill(null);

  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
  });
  playerText.innerText = "Tic Tac Toe";
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
  current_player = X_TEXT;
});

startGame();
