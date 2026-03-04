
const board=document.getElementById("board")
let cells=[]
let current="X"

function createBoard(){
board.innerHTML=""
cells=[]
for(let i=0;i<9;i++){
let cell=document.createElement("div")
cell.classList.add("cell")
cell.dataset.index=i
cell.onclick=play
board.appendChild(cell)
cells.push(cell)
}
}

function play(){
if(this.textContent!="") return
this.textContent=current
if(checkWin()){setTimeout(()=>alert(current+" wins"),50);return}
current=current==="X"?"O":"X"
}

function checkWin(){
const combos=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
return combos.some(c=>
cells[c[0]].textContent===current &&
cells[c[1]].textContent===current &&
cells[c[2]].textContent===current)
}

function resetGame(){current="X";createBoard()}
createBoard()
