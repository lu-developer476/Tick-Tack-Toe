const boardElement = document.getElementById("board")
const statusElement = document.getElementById("status")
const restartButton = document.getElementById("restartBtn")
const undoButton = document.getElementById("undoBtn")
const resetScoreButton = document.getElementById("resetScoreBtn")
const modeSelect = document.getElementById("modeSelect")
const difficultySelect = document.getElementById("difficultySelect")
const starterSelect = document.getElementById("starterSelect")
const themeSelect = document.getElementById("themeSelect")
const scoreXElement = document.getElementById("scoreX")
const scoreOElement = document.getElementById("scoreO")
const scoreDrawElement = document.getElementById("scoreDraw")

const humanPlayer = "X"
const aiPlayer = "O"
const settingsKey = "tickTackToeSettings"
const scoreKey = "tickTackToeScores"
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
let moveHistory = []
let scores = loadScores()

function createBoard() {
  boardElement.innerHTML = ""
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("button")
    cell.classList.add("cell")
    cell.dataset.index = i
    cell.type = "button"
    cell.setAttribute("role", "gridcell")
    cell.setAttribute("aria-label", `Casilla ${i + 1}`)
    cell.addEventListener("click", onCellClick)
    boardElement.appendChild(cell)
  }
  renderBoard()
}

function isAiTurn() {
  return modeSelect.value === "ai" && currentPlayer === aiPlayer
}

function onCellClick(event) {
  const index = Number(event.currentTarget.dataset.index)
  if (gameOver || boardState[index] !== "" || isAiTurn()) return

  makeMove(index, currentPlayer)

  if (!gameOver && isAiTurn()) {
    setStatus("Turno de la IA...")
    setTimeout(playAiTurn, 280)
  }
}

function makeMove(index, player) {
  boardState[index] = player
  moveHistory.push({ index, player })
  renderBoard()

  const winningCombo = getWinningCombo(boardState, player)
  if (winningCombo) {
    gameOver = true
    scores[player] += 1
    saveScores()
    renderScores()
    highlightWinningCombo(winningCombo)
    setStatus(player === aiPlayer && modeSelect.value === "ai" ? "La IA ganó la partida." : `Jugador ${player} ganó la partida.`)
    updateBoardAvailability()
    return
  }

  if (isDraw(boardState)) {
    gameOver = true
    scores.draw += 1
    saveScores()
    renderScores()
    setStatus("Empate. Buena partida.")
    updateBoardAvailability()
    return
  }

  currentPlayer = player === "X" ? "O" : "X"
  updateTurnStatus()
  updateBoardAvailability()
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

  if (difficulty === 1) return randomMove(available)

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

function getWinningCombo(state, player) {
  return winningCombos.find(combo => combo.every(index => state[index] === player))
}

function checkWinner(state, player) {
  return Boolean(getWinningCombo(state, player))
}

function isDraw(state) {
  return state.every(cell => cell !== "")
}

function renderBoard() {
  const cells = boardElement.querySelectorAll(".cell")
  cells.forEach((cell, index) => {
    const value = boardState[index]
    cell.textContent = value
    cell.classList.toggle("x-mark", value === "X")
    cell.classList.toggle("o-mark", value === "O")
    cell.classList.remove("winner")
    cell.setAttribute("aria-label", value ? `Casilla ${index + 1}: ${value}` : `Casilla ${index + 1}: vacía`)
  })
}

function updateBoardAvailability() {
  const cells = boardElement.querySelectorAll(".cell")
  cells.forEach((cell, index) => {
    const unavailable = gameOver || boardState[index] !== "" || isAiTurn()
    cell.disabled = unavailable
    cell.classList.toggle("disabled", unavailable)
  })
  undoButton.disabled = moveHistory.length === 0 || isAiTurn()
}

function highlightWinningCombo(combo) {
  const cells = boardElement.querySelectorAll(".cell")
  combo.forEach(index => cells[index].classList.add("winner"))
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

function undoMove() {
  if (moveHistory.length === 0 || isAiTurn()) return
  const movesToUndo = modeSelect.value === "ai" && moveHistory.at(-1).player === aiPlayer ? 2 : 1

  for (let i = 0; i < movesToUndo; i++) {
    const lastMove = moveHistory.pop()
    if (!lastMove) break
    boardState[lastMove.index] = ""
    currentPlayer = lastMove.player
  }

  gameOver = false
  renderBoard()
  updateTurnStatus()
  updateBoardAvailability()
}

function resetGame() {
  boardState = Array(9).fill("")
  currentPlayer = starterSelect.value
  gameOver = false
  moveHistory = []
  createBoard()
  difficultySelect.disabled = modeSelect.value !== "ai"
  saveSettings()
  updateTurnStatus()
  updateBoardAvailability()

  if (isAiTurn()) setTimeout(playAiTurn, 280)
}

function renderScores() {
  scoreXElement.textContent = scores.X
  scoreOElement.textContent = scores.O
  scoreDrawElement.textContent = scores.draw
}

function resetScores() {
  scores = { X: 0, O: 0, draw: 0 }
  saveScores()
  renderScores()
}

function loadScores() {
  const fallback = { X: 0, O: 0, draw: 0 }
  const saved = JSON.parse(localStorage.getItem(scoreKey) || "null")
  return saved ? { ...fallback, ...saved } : fallback
}

function saveScores() {
  localStorage.setItem(scoreKey, JSON.stringify(scores))
}

function loadSettings() {
  const saved = JSON.parse(localStorage.getItem(settingsKey) || "null")
  if (!saved) return
  modeSelect.value = saved.mode || modeSelect.value
  difficultySelect.value = saved.difficulty || difficultySelect.value
  starterSelect.value = saved.starter || starterSelect.value
  themeSelect.value = saved.theme || themeSelect.value
}

function saveSettings() {
  const settings = {
    mode: modeSelect.value,
    difficulty: difficultySelect.value,
    starter: starterSelect.value,
    theme: themeSelect.value,
  }
  localStorage.setItem(settingsKey, JSON.stringify(settings))
}

function applyTheme() {
  document.body.dataset.theme = themeSelect.value
  saveSettings()
}

restartButton.addEventListener("click", resetGame)
undoButton.addEventListener("click", undoMove)
resetScoreButton.addEventListener("click", resetScores)
modeSelect.addEventListener("change", resetGame)
difficultySelect.addEventListener("change", saveSettings)
starterSelect.addEventListener("change", resetGame)
themeSelect.addEventListener("change", applyTheme)

loadSettings()
applyTheme()
renderScores()
createBoard()
resetGame()
