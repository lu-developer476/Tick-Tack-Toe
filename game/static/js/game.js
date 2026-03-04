const boardElement = document.getElementById("board")
const statusElement = document.getElementById("status")
const restartButton = document.getElementById("restartBtn")
const modeSelect = document.getElementById("modeSelect")
const difficultySelect = document.getElementById("difficultySelect")

const humanPlayer = "X"
const aiPlayer = "O"
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

let boardState = Array(9).fill("")
let currentPlayer = humanPlayer
let gameOver = false

function createBoard() {
  boardElement.innerHTML = ""
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div")
    cell.classList.add("cell")
    cell.dataset.index = i
    cell.textContent = boardState[i]
    cell.onclick = onCellClick
    boardElement.appendChild(cell)
  }
}

function isAiTurn() {
  return modeSelect.value === "ai" && currentPlayer === aiPlayer
}

function onCellClick(event) {
  const index = Number(event.currentTarget.dataset.index)
  if (gameOver || boardState[index] !== "") return
  if (isAiTurn()) return

  makeMove(index, currentPlayer)

  if (!gameOver && isAiTurn()) {
    setStatus("Turno de la IA...")
    setTimeout(playAiTurn, 280)
  }
}

function makeMove(index, player) {
  boardState[index] = player
  renderBoard()

  if (checkWinner(boardState, player)) {
    gameOver = true
    setStatus(player === aiPlayer ? "La IA ganó la partida." : `Jugador ${player} ganó la partida.`)
    disableBoard()
    return
  }

  if (isDraw(boardState)) {
    gameOver = true
    setStatus("Empate. Buena partida.")
    disableBoard()
    return
  }

  currentPlayer = player === "X" ? "O" : "X"
  updateTurnStatus()
}

function playAiTurn() {
  if (gameOver || !isAiTurn()) return

  const difficulty = Number(difficultySelect.value)
  const move = getAiMove(boardState, difficulty)
  if (move !== undefined) {
    makeMove(move, aiPlayer)
  }
}

function getAiMove(state, difficulty) {
  const available = getAvailableMoves(state)
  if (available.length === 0) return undefined

  if (difficulty === 1) {
    return randomMove(available)
  }

  const winMove = findWinningMove(state, aiPlayer)
  const blockMove = findWinningMove(state, humanPlayer)

  if (difficulty === 2) {
    if (Math.random() < 0.5 && winMove !== undefined) return winMove
    if (Math.random() < 0.6 && blockMove !== undefined) return blockMove
    return randomMove(available)
  }

  if (difficulty === 3) {
    if (winMove !== undefined) return winMove
    if (blockMove !== undefined) return blockMove
    if (state[4] === "") return 4
    return randomMove(preferredMoves(state, available))
  }

  if (difficulty === 4) {
    if (winMove !== undefined) return winMove
    if (blockMove !== undefined) return blockMove
    return minimaxMove(state, 3)
  }

  return minimaxMove(state, 9)
}

function minimaxMove(state, maxDepth) {
  let bestScore = -Infinity
  let bestMove = getAvailableMoves(state)[0]

  for (const move of getAvailableMoves(state)) {
    const next = [...state]
    next[move] = aiPlayer
    const score = minimax(next, false, 1, maxDepth)
    if (score > bestScore) {
      bestScore = score
      bestMove = move
    }
  }

  return bestMove
}

function minimax(state, isMaximizing, depth, maxDepth) {
  if (checkWinner(state, aiPlayer)) return 10 - depth
  if (checkWinner(state, humanPlayer)) return depth - 10
  if (isDraw(state) || depth >= maxDepth) return evaluateBoard(state)

  const moves = getAvailableMoves(state)

  if (isMaximizing) {
    let best = -Infinity
    for (const move of moves) {
      const next = [...state]
      next[move] = aiPlayer
      best = Math.max(best, minimax(next, false, depth + 1, maxDepth))
    }
    return best
  }

  let best = Infinity
  for (const move of moves) {
    const next = [...state]
    next[move] = humanPlayer
    best = Math.min(best, minimax(next, true, depth + 1, maxDepth))
  }
  return best
}

function evaluateBoard(state) {
  let score = 0
  for (const combo of winningCombos) {
    const line = combo.map(index => state[index])
    const aiCount = line.filter(cell => cell === aiPlayer).length
    const humanCount = line.filter(cell => cell === humanPlayer).length

    if (aiCount > 0 && humanCount === 0) score += aiCount
    if (humanCount > 0 && aiCount === 0) score -= humanCount
  }
  return score
}

function preferredMoves(state, available) {
  const priority = [4, 0, 2, 6, 8, 1, 3, 5, 7]
  return priority.filter(move => available.includes(move) && state[move] === "")
}

function randomMove(moves) {
  return moves[Math.floor(Math.random() * moves.length)]
}

function findWinningMove(state, player) {
  for (const move of getAvailableMoves(state)) {
    const next = [...state]
    next[move] = player
    if (checkWinner(next, player)) return move
  }
  return undefined
}

function getAvailableMoves(state) {
  return state.map((cell, idx) => (cell === "" ? idx : null)).filter(v => v !== null)
}

function checkWinner(state, player) {
  return winningCombos.some(combo => combo.every(index => state[index] === player))
}

function isDraw(state) {
  return state.every(cell => cell !== "")
}

function renderBoard() {
  const cells = boardElement.querySelectorAll(".cell")
  cells.forEach((cell, index) => {
    cell.textContent = boardState[index]
  })
}

function disableBoard() {
  const cells = boardElement.querySelectorAll(".cell")
  cells.forEach(cell => cell.classList.add("disabled"))
}

function updateTurnStatus() {
  if (gameOver) return

  if (modeSelect.value === "ai" && currentPlayer === aiPlayer) {
    setStatus("Turno de la IA...")
    return
  }

  setStatus(`Turno del jugador ${currentPlayer}`)
}

function setStatus(text) {
  statusElement.textContent = text
}

function resetGame() {
  boardState = Array(9).fill("")
  currentPlayer = humanPlayer
  gameOver = false
  createBoard()
  updateTurnStatus()

  difficultySelect.disabled = modeSelect.value !== "ai"
}

restartButton.addEventListener("click", resetGame)
modeSelect.addEventListener("change", resetGame)
difficultySelect.addEventListener("change", () => {
  if (modeSelect.value === "ai") updateTurnStatus()
})

createBoard()
resetGame()
