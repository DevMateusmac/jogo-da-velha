let gameButton = document.querySelectorAll('.gameButton')
let board = []
let turnPlayer = ''

function updateTitle(){
  let playerInput = document.getElementById(turnPlayer)
  document.getElementById('showPlayerTurn').innerText = playerInput.value
}


function initializeGame(){
  board = [['', '', ''], ['', '', ''], ['', '', '']]
  turnPlayer = 'player1'
  document.getElementById('showPlayerTurn').innerText = `Vez de ${turnPlayer}`
  updateTitle()
  gameButton.forEach(button => {
    button.classList.remove('playerWinner')
    button.textContent = ''
    button.classList.add('cursor-pointer')
    button.addEventListener('click', addValueXorO)
  })
}


function removeEvent(button){
  button.classList.remove('cursor-pointer')
  button.removeEventListener('click', addValueXorO)
}

function getWinCombination(){
  let winCombination = []
  if(board[0][0] && board[0][0] === board[0][1] && board[0][0] === board[0][2])
    winCombination.push('0.0', '0.1', '0.2')

  if(board[1][0] && board[1][0] === board[1][1] && board[1][0] === board[1][2])
    winCombination.push('1.0', '1.1', '1.2')

  if(board[2][0] && board[2][0] === board[2][1] && board[2][0] === board[2][2])
    winCombination.push('2.0', '2.1', '2.2')

  if(board[0][0] && board[0][0] === board[1][0] && board[0][0] === board[2][0])
    winCombination.push('0.0', '1.0', '2.0')

  if(board[0][1] && board[0][1] === board[1][1] && board[0][1] === board[2][1])
    winCombination.push('0.1', '1.1', '2.1')

  if(board[0][2] && board[0][2] === board[1][2] && board[0][2] === board[2][2])
    winCombination.push('0.2', '1.2', '2.2')

  if(board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2])
    winCombination.push('0.0', '1.1', '2.2')

  if(board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0])
    winCombination.push('0.2', '1.1', '2.0')
  return winCombination
}

function showWinCombination(combinations){
  combinations.forEach(combination => {
    document.querySelector('[data-region="' + combination+ '"]').classList.add('playerWinner')
  })
  let playerWinner = document.getElementById(turnPlayer).value
  document.querySelector('#showPlayerTurn').textContent = playerWinner + ' venceu!' 
}


function addValueXorO(ev){
  let button = ev.currentTarget
  let currentButton = button.dataset.region
  let rowColumnPair = currentButton.split('.')
  let row = rowColumnPair[0]
  let column = rowColumnPair[1]

  if(turnPlayer === 'player1'){
    button.textContent = "X"
    board[row][column] = 'X'
  }else{
    button.textContent = "O"
    board[row][column] = 'O'
  }
  console.clear()
  console.table(board)
  removeEvent(button)

  let winCombination = getWinCombination()

  if(winCombination.length > 0){
    showWinCombination(winCombination)
    gameButton.forEach(button => {
      button.removeEventListener('click', addValueXorO)
      button.classList.remove('cursor-pointer')
    })
  }else if(board.flat().includes('')){
    turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
    updateTitle()
  }else{
    document.querySelector('#showPlayerTurn').innerText = "Empate!"
  }
}

document.getElementById('startGameBtn').addEventListener('click', initializeGame)



