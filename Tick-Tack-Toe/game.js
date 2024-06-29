let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('Restartbtn')
let boxes = Array.from(document.getElementsByClassName('box'))
let count = 0 

const draw_indicator =getComputedStyle(document.body).getPropertyValue('--draw')
const winning_indicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const winPatterns = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal 1
    [2, 4, 6]  // Diagonal 2
  ];

const O_TEXT = "O";
const X_TEXT = "X";

let current_player = X_TEXT;
let spaces = Array(9).fill(null)

const startGame = ()=>{
    boxes.forEach(box => box.addEventListener('click',boxClicked))
}

function boxClicked(e) {
    const id = e.target.id

    if(!spaces[id] && count < 9){
        spaces[id] = current_player
        e.target.innerText =current_player
        playing_player = current_player == X_TEXT ? O_TEXT : X_TEXT
        playerText.innerHTML=`${playing_player} turns`

        if(playerWon() !== false){
            playerText.innerHTML = `${current_player} has Won !!`
            let winning_blocks  =playerWon()
            count =10
            winning_blocks.map(box =>boxes[box].style.backgroundColor = winning_indicator)
            
        }
        count++
        current_player = current_player == X_TEXT ? O_TEXT : X_TEXT
    }
    if(count === 9){
        playerText.innerHTML =`Draw Game`
        boxes.forEach(box =>box.style.color = draw_indicator)
    }
}

function playerWon(){
    for (const condition of winPatterns) {
        let [a, b, c] =condition
        if(spaces[a] && (spaces[a] ==  spaces[b] && spaces[a]== spaces[c])){
            return[a,b,c]
        }
       
    }
    return false
}

restartBtn.addEventListener('click',()=>{
    spaces.fill(null)

    boxes.forEach(box =>{
        box.innerText=''
        box.style.backgroundColor=''
    })
    playerText.innerText = 'Tic Tac Toe'
    current_player = X_TEXT
    count =0
})

startGame()
