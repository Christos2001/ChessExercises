
let exerToSolve //index of exer to solve
let sourceP, targetP //need them for piece promotion
let turn;//mporei na feugei
let currentPage = null

let exersSolved = new Array(18).fill(false)
let checkIfStartPos = new Array(6).fill(true)
let move1Fen = new Array()
let move2Fen = new Array()
let boards = new Array(6) //stores board object from chessboard.js
let games = new Array(6) //stores chess object from chess.js

let status1 = document.querySelectorAll(".status")
const allBoardsDiv = document.querySelectorAll('.board')
let startBtns = document.querySelectorAll(".startBtn")
let move1Btns = document.querySelectorAll(".Move1 p")
let move2Btns = document.querySelectorAll(".Move2 p")

let lockCheckBox = document.querySelector("#lockCheck")
let h_Lock = document.querySelector("#hRemoveLock")
let locks = document.querySelectorAll(".Lock")

let pages = document.querySelectorAll(".page")





function findPage() {
  //If page reloads start on currentPage
  if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    let pageBefore = window.localStorage.getItem("page")
    if (pageBefore != null){
      currentPage = pageBefore
    }
  }

  if (currentPage == null) {
    currentPage = 1
  }

 
  pages[currentPage - 1].style.backgroundColor = "grey"
}


let level1OriP1 = ['black', 'black', 'white', 'black', 'white', 'black']
let level1StartFenP1 = [ //chess FEN generator   https://www.dailychess.com/chess/chess-fen-viewer.php -- http://www.netreal.de/Forsyth-Edwards-Notation/index.php
  '1k2r3/ppp5/q3b3/8/8/2B1Q3/PPP5/1KR5 b - - 0 1', 
  '3r4/3r4/8/8/8/k7/p1PB4/2KR4 b - - 0 1',
'6k1/r4ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1', 
'5k2/r4ppp/1p3b2/1np5/8/1P4P1/P1P2PBP/1KR5 b - - 0 1',
'k7/8/KP6/7p/6p1/8/7B/8 w - - 0 1',
 '8/8/1b6/5kpp/4np2/7P/6PN/5R1K b - - 0 1'];

let level1OriP2 = ['white', 'white', 'white', 'white', 'black', 'white']
let level1StartFenP2 = [
  "kr6/2R5/1P6/1K6/8/8/8/8 w - - 0 1",
  "kr6/1p6/p7/8/4B3/1K4n1/5p2/R7 w - - 0 1",
  "3rr2k/7p/5R2/8/8/1P6/1B6/1K6 w - - 0 1",
  "kb1r4/1p6/N7/8/R7/8/3P4/K7 w - - 0 1",
  "r2k3r/ppp2ppp/3bp3/8/1n1PP1bN/P7/1P1B1Q1P/R3KB1R b KQ - 0 1",
  "4bk2/ppp3p1/2np3p/2b5/2B2Bnq/2N5/PP4PP/4RR1K w - - 0 1"
]  
let level1OriP3 = ['black', 'white', 'white', 'white', 'white', 'white']
let level1StartFenP3 = [
"1r3r1k/6pp/6b1/pBp3B1/Pn1N2P1/4p2P/1P6/2KR3R b - - 0 1",
"r4rk1/ppp3p1/2bp4/4PN1Q/4q3/8/P5PP/b1B2R1K w - - 0 1",
"r2q1nr1/pb5k/6p1/2pP1BPp/7Q/1P3N2/PB5P/4R1K1 w - - 0 1",
"rn3q1b/pb2pPkp/1p6/2ppN2p/3P4/2NB4/PPPQ1PP1/2KR4 w - - 0 1",
"k7/p1p1p3/8/1B6/8/8/8/KR6 w - - 0 1",
"2kr3r/p2n2pp/1p1Bnp2/4p3/8/8/PPP2PPP/3RKB1R w K - 0 1"
]



function checkIfPage1Solved() {
  for (i = 0; i <= 5; i++) {
    if (!exersSolved[i]) {
      return false
    }
  }
  return true
}

function checkIfPage2Solved() {
  for (i = 6; i <= 11; i++) {
    if (!exersSolved[i]) {
      return false
    }
  }
  return true
}

function checkIfAllexerSolved(){
  for (let i = 0; i < exersSolved.length; i++){
    if(!exersSolved[i] ){
      return false
    }
  }

  return true
}





window.onload = function () { findPage(); initAllChessboards();}
  
  


function initAllChessboards() {
  checkIfStartPos.fill(true)
  let draggable = null
  let id = 0
  if (currentPage == 1) {
    //pass
  } else if (currentPage == 2) {
    id += 6
  } else if (currentPage == 3) {
    id += 12
  }


    //for solved exercises
    if (window.localStorage.getItem('exersSolvedL1') != null) {
      exersSolved = window.localStorage.getItem('exersSolvedL1').split(",")
      for (let i = 0; i < exersSolved.length; i++){
        exersSolved[i] = JSON.parse(exersSolved[i]) === true
      }
      for (let i = 0; i < 6; i++) {
        if (exersSolved[id + i]) {
            if (currentPage == 1) {
              move1Fen[i] = window.localStorage.getItem("move1L1P1" + i + "FEN")
              move1Btns[i].innerHTML = window.localStorage.getItem("move1L1P1" + i)
              move1Btns[i].addEventListener("click", function () {
                boardInit(allBoardsDiv[i].id, false, move1Fen[i], level1OriP1[i])
                startBtns[i].style.backgroundColor = "white"
                move1Btns[i].style.backgroundColor = "grey"
              })
            } else if (currentPage == 2) {
              move1Fen[i] = window.localStorage.getItem("move1L1P2" + i + "FEN")
              move1Btns[i].innerHTML = window.localStorage.getItem("move1L1P2" + i)

              move1Btns[i].addEventListener("click", function () {
                boardInit(allBoardsDiv[i].id, false, move1Fen[i], level1OriP2[i])
                startBtns[i].style.backgroundColor = "white"
                move1Btns[i].style.backgroundColor = "grey"
              })
            } else if (currentPage == 3) {
              move1Fen[i] = window.localStorage.getItem("move1L1P3" + i + "FEN")
              move1Btns[i].innerHTML = window.localStorage.getItem("move1L1P3" + i)

              move1Btns[i].addEventListener("click", function () {
                boardInit(allBoardsDiv[i].id, false, move1Fen[i], level1OriP3[i])
                startBtns[i].style.backgroundColor = "white"
                move1Btns[i].style.backgroundColor = "grey"
              })
            }

            move1Btns[i].style.visibility = "visible"
            move1Btns[i].style.backgroundColor = "white"
        } else {
          move1Btns[i].style.visibility = "hidden" //mporei na min xreiazete
        }

      }
    }
    let exerToSolve = nextExerToSolve()
    let checkExer = null
    for (let i = 0; i < 6; i++) {
      if (currentPage == 1) {
        checkExer = i
      } else if (currentPage == 2) {
        checkExer = i + 6
      } else if (currentPage == 3) {
        checkExer = i + 12
      }
      checkIfStartPos[i] = true
      if (lockCheckBox.checked) {
          if (!exersSolved[checkExer]) {
            status1[i].innerHTML = "PLAY"
            locks[i].style.visibility = "hidden"
          } else {
            status1[i].innerHTML = "CHECKMATE"
          }
          //locks[exer].style.visibility = "hidden"
      } else {
        if (exersSolved[checkExer]) {
          status1[i].innerHTML = "CHECKMATE"
          locks[i].style.visibility = "hidden"
        } else if ((currentPage == 1 && exerToSolve == i) || (currentPage == 2 && exerToSolve == i && checkIfPage1Solved()) || (currentPage == 3 && exerToSolve == i && checkIfPage2Solved() && checkIfPage2Solved)) {
          status1[i].innerHTML = "PLAY"
          locks[i].style.visibility = "hidden"
        } else {
          status1[i].innerHTML = "LOCKED"
          locks[i].style.visibility = "visible"
        }
      }
      move2Btns[i].style.visibility = "hidden"
      startBtns[i].style.backgroundColor = "grey"
      if (currentPage == 1) {
        draggable = (exersSolved[i]) ? false : true //page1
        boardInit(allBoardsDiv[i].id, draggable, level1StartFenP1[i], level1OriP1[i])
      } else if (currentPage == 2) {
        draggable = (exersSolved[i + 6]) ? false : true//page2
        boardInit(allBoardsDiv[i].id, draggable, level1StartFenP2[i], level1OriP2[i])
      } else if (currentPage == 3) {
        draggable = (exersSolved[i + 12]) ? false : true//page3
        boardInit(allBoardsDiv[i].id, draggable, level1StartFenP3[i], level1OriP3[i])
      }
    }

    

  }






//on window start
window.onload = findPage(), initAllChessboards()



function pageOne() {
  currentPage = 1
  window.localStorage.setItem("page",currentPage)
  pages[0].style.backgroundColor = "grey"
  pages[1].style.backgroundColor = "white"
  pages[2].style.backgroundColor = "white"
  initAllChessboards()
  window.scrollTo(0, 0)
}

function pageTwo() {
  currentPage = 2
  window.localStorage.setItem("page",currentPage)
  pages[0].style.backgroundColor = "white"
  pages[1].style.backgroundColor = "grey"
  pages[2].style.backgroundColor = "white"
  initAllChessboards()
  window.scrollTo(0, 0)
}


function pageThree() {
  currentPage = 3
  window.localStorage.setItem("page",currentPage)
  pages[0].style.backgroundColor = "white"
  pages[1].style.backgroundColor = "white"
  pages[2].style.backgroundColor = "grey"
  initAllChessboards()
  window.scrollTo(0, 0)
}


function previousPage() {
  if (currentPage > 1) {
    currentPage--
    window.localStorage.setItem("page",currentPage)
    pages.forEach((page, i) => {
      if (currentPage - 1 == i) {
        page.style.backgroundColor = "grey"
      } else (
        page.style.backgroundColor = "white"
      )
    })
    initAllChessboards()
    window.scrollTo(0, 0)
  } else {
    alert("Warning! You are on the first page.")
  }
}

function nextPage() {
  if (currentPage < 3) {
    currentPage++
    window.localStorage.setItem("page",currentPage)
    pages.forEach((page, i) => {
      if (currentPage - 1 == i) {
        page.style.backgroundColor = "grey"
      } else (
        page.style.backgroundColor = "white"
      )
    })
    initAllChessboards()
    window.scrollTo(0, 0)
  } else {
    alert("Warning! You are on the last page.")
  }
}


function getNumFromString(Str) {//often used for making boardId for example(board1) to 1
  if (Str == "offboard") {
    return null
  }
  return Str.match(/\d+/)[0]
}

function nextExerToSolve() {
  let i = 0

  for (const exer of exersSolved) {
    if (!exer) {
      break;
    }
    i++
  }
  if (currentPage == 1 &&i < 6 ) {
    return i
  } else if (currentPage == 2 && i >= 6 && i < 12) {
    return i % 6
  }
  else if (currentPage == 3 && i >= 12) {
    return i % 12
  }

}

lockCheckBox.addEventListener("click", function () {
  if (lockCheckBox.checked) {
    locks.forEach((lock) => {
      lock.style.visibility = "hidden"
    })
    status1.forEach((stat, i) => {
    
    if (!exersSolved[i] && currentPage == 1) {
      stat.innerHTML = "PLAY"
    } else if (!exersSolved[i + 6] && currentPage == 2) {
      stat.innerHTML = "PLAY"
    } else if (!exersSolved[i + 12] && currentPage == 3) {
      stat.innerHTML = "PLAY"
    } else {
      stat.innerHTML = "CHECKMATE"
    }
    })
    h_Lock.innerHTML = "Enable Locks"
  } else {
    window.localStorage.removeItem("lock")
    let noLockExer = null
    noLockExer = nextExerToSolve()
      locks.forEach((lock, i) => {//na to kanw me for
        if (currentPage == 1) {
          if (exersSolved[i]) {
            status1[i].innerHTML = "CHECKMATE"
          } else if (i != nextExerToSolve()) {
            status1[i].innerHTML = "LOCKED"
            lock.style.visibility = "visible"
          }
        } else if (currentPage == 2) {
          if (exersSolved[i + 6]) {
            status1[i].innerHTML = "CHECKMATE"
          } else if ((i != nextExerToSolve() && checkIfPage1Solved()) || !checkIfPage1Solved()) {//na katalabw ti ekena
            status1[i].innerHTML = "LOCKED"
            lock.style.visibility = "visible"
          }
        } else if (currentPage == 3) {
          if (exersSolved[i + 12]) {
            status1[i].innerHTML = "CHECKMATE"
          } else if ((i != nextExerToSolve() && checkIfPage1Solved() && checkIfPage2Solved()) || (!checkIfPage1Solved() && !checkIfPage2Solved())) {
            status1[i].innerHTML = "LOCKED"
            lock.style.visibility = "visible"
          }
        }
      })
    }
    h_Lock.innerHTML = "Disable Locks"
  }
)


let pieceMade = null
function nPro() {
  pieceMade = "n"
  closeDiv()
}

function bPro() {
  pieceMade = "b"
  closeDiv()
}

function rPro() {
  pieceMade = "r"
  closeDiv()
}

function qPro() {
  pieceMade = "q"
  closeDiv()
}


function closeDiv() {

  let divs = document.querySelectorAll(".pawnPromotion")
  let orientation
  let pColor

  if(currentPage == 1){
    orientation = level1OriP1[exerToSolve]
  }else if(currentPage == 2){
    orientation = level1OriP2[exerToSolve]
  }else if(currentPage == 3){ 
    orientation = level1OriP3[exerToSolve]
  }
  
  if (orientation == "white") {
    pColor = "wP"
    divs[1].style.visibility = "hidden"//white promotion
  } else {
    pColor = "bP"
    divs[0].style.visibility = "hidden"//black promotion
  }
  onDrop(sourceP, targetP, allBoardsDiv[exerToSolve].id, pColor)
}





startBtns.forEach((b, i) => {
  b.addEventListener("click", function () {
    let draggable



    b.style.backgroundColor = "grey"


    move1Btns[i].style.backgroundColor = "white"
    move2Btns[i].style.backgroundColor = "white"

    if (exersSolved[i]) {
      draggable = false
    } else {
      draggable = true
    }

    if (currentPage == 1) {
      boardInit(allBoardsDiv[i].id, draggable, level1StartFenP1[i], level1OriP1[i])
    } else if (currentPage == 2) {
      boardInit(allBoardsDiv[i].id, draggable, level1StartFenP2[i], level1OriP2[i])
    } else if (currentPage == 3) {
      boardInit(allBoardsDiv[i].id, draggable, level1StartFenP2[i], level1OriP2[i])
    }
  
    checkIfStartPos[i] = true
  })
})





function onSnapEnd(boardID) {
  let id = getNumFromString(boardID) - 1
  boards[id].position(games[id].fen())
}


function boardInit(boardId, draggable, position, orientation) {
  let id = getNumFromString(boardId) - 1

  boards[id] = ChessBoard(boardId, {
    draggable: draggable,
    position: position,
    orientation: orientation,
    onDrop: onDrop,
    onMouseoutSquare: onMouseoutSquare,
    onMouseoverSquare: onMouseoverSquare,
    onSnapEnd: onSnapEnd,
    onDragStart: onDragStart
  })

  games[id] = new Chess(position)
}




  function resetScoreBoard() {
      if (window.localStorage.getItem('exersSolvedL1') != null) {
        window.localStorage.removeItem("exersSolvedL1")
        for (let i = 0; i < 6; i++) {
          if(JSON.parse(exersSolved[i]) === true){ 
          //page1 claer
            window.localStorage.removeItem("move1L1P1" + i)
            window.localStorage.removeItem("move1L1P1" + i + "FEN")
          }
          else if (JSON.parse(exersSolved[i+6]) === true){
            //page2 clear
            window.localStorage.removeItem("move1L1P2" + i)
            window.localStorage.removeItem("move1L1P2" + i + "FEN")
          }
          else if (JSON.parse(exersSolved[i+12]) === true){ 
          //page3 clear
            window.localStorage.removeItem("move1L1P3" + i)
            window.localStorage.removeItem("move1L1P3" + i + "FEN")
          }
        }
      }

         window.location.reload(true)
    
    

      
    

  }





function onDragStart(boardId, piece, position, orientation) {
  id = getNumFromString(boardId) - 1
  if ((orientation === 'white' && piece.search(/^w/) === -1) ||
    (orientation === 'black' && piece.search(/^b/) === -1)) {
    return false
  }
  else if (games[id].in_checkmate()) {//mporei na allazei me exersSolved
    return false
  }
  else if (games[id].in_stalemate()) {
    return false
  }
  else if (locks[id].style.visibility == "visible") {
    return false
  } else if (!checkIfStartPos[id]) {
    return false
  }

  return true
}

let squareToHighlight = null;
let colorToHighlight = null;

let whiteSquareGrey = ' #D78162';
let blackSquareGrey = '#9D4E32';

let squareClass = 'square-55d63';



function onMouseoverSquare(square, piece, boardID) {
  let id = getNumFromString(boardID) - 1

    // if (currentPage == 1 && exersSolved[id] ) {
    //   return
    // } else if (currentPage == 2 && exersSolved[id + 6]) {
    //   return
    // } else if (currentPage == 3 && exersSolved[id + 12]){
    //   return
    // }

  if (locks[id].style.visibility == "hidden") {
    let moves = games[id].moves({
      square: square,
      verbose: true,
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    // highlight the possible squares for this piece
    for (let i = 0; i < moves.length; i++) {
      greySquare(moves[i].to, id);
    }
  }
}




function removeGreySquares(id) {
  $(`#${CSS.escape(allBoardsDiv[id].id)} .square-55d63`).css('background', '');
}

function greySquare(square, id) {
  if (onDragStart(allBoardsDiv[id].id)) {
    let $square = $(`#${CSS.escape(allBoardsDiv[id].id)} .square-` + square);

    let background = whiteSquareGrey;
    if ($square.hasClass('black-3c85d')) {
      background = blackSquareGrey;
    }

    $square.css('background', background);
  }
}


function onMouseoutSquare(square, piece, boardID) {
  let id = getNumFromString(boardID) - 1
  removeGreySquares(id);
}


function Is_Promotion(source,target, piece) {
  if (piece == 'p' && (getNumFromString(source) == 7 && getNumFromString(target) == 8) ||
    ( getNumFromString(source) == 2 && getNumFromString(target) == 1 )) {
    return true
  } else {
    return false
  }
}

function showPieces(i) {
  if(currentPage == 1){ 
    if (level1OriP1[i] == "white") {
      let divProm = document.querySelector("#pawnPromotionForWhite")
      divProm.style.visibility = "visible"
    } else {
      let divProm = document.querySelector("#pawnPromotionForBlack")
      divProm.style.visibility = "visible"
    }
  }else if (currentPage == 2){
    if (level1OriP2[i] == "white") {
      let divProm = document.querySelector("#pawnPromotionForWhite")
      divProm.style.visibility = "visible"
    } else {
      let divProm = document.querySelector("#pawnPromotionForBlack")
      divProm.style.visibility = "visible"
    }
  }else if (currentPage == 3){
    if (level1OriP3[i] == "white") {
      let divProm = document.querySelector("#pawnPromotionForWhite")
      divProm.style.visibility = "visible"
    } else {
      let divProm = document.querySelector("#pawnPromotionForBlack")
      divProm.style.visibility = "visible"
    }
  }
}

async function promote_piece(i, source, target) {
  let move

  let promise = new Promise((resolve) => { resolve(pieceMade) })
  await promise.then((result) => {
    move = games[i].move({
      from: source,
      to: target,
      promotion: result
    })
  })
  return move
}

async function onDrop(source, target, boardID, piece) {
  exerToSolve = getNumFromString(boardID) - 1
  sourceP = source//na dw ama to xrisimopoiw
  targetP = target
  let move = null
  let orientation
  removeGreySquares(exerToSolve)
  if (Is_Promotion(source,target, piece.substring(1).toLowerCase())) {
    if (pieceMade == null) {
      showPieces(exerToSolve)
    }
    move = await promote_piece(exerToSolve, source, target)
    games[exerToSolve].move
  } else {
    move = games[exerToSolve].move({
      from: source,
      to: target
    })
  }

  // illegal move
  if (move === null) {
    return 'snapback';
  }

  moveColor = 'White';
  turn = games[exerToSolve].turn();//kai auto

  if (currentPage == 1) {
    orientation = level1OriP1[exerToSolve]//to orientation mporei na feugei
  }else if (currentPage == 2){
    orientation = level1OriP2[exerToSolve]
  }else if (currentPage == 3){
    orientation = level1OriP3[exerToSolve]
  }


  if (turn === 'b') {//na dw ama to xrisimopoiw
    moveColor = 'Black'
  } else {
    moveColor = "White"
  }

  // checkmate
  if (games[exerToSolve].in_checkmate()) {

    status1[exerToSolve].innerHTML = "CHECKMATE";

    reMakeMove1(exerToSolve, move,orientation)
    move2Btns[exerToSolve].style.visibility = "hidden"

    if (currentPage == 1) {
      window.localStorage.setItem("move1L1P1" + exerToSolve, move1Btns[exerToSolve].innerHTML)
      window.localStorage.setItem("move1L1P1" + exerToSolve + "FEN", move1Fen[exerToSolve])
      exersSolved[exerToSolve] = true
    } else if (currentPage == 2) {
      window.localStorage.setItem("move1L1P2" + exerToSolve, move1Btns[exerToSolve].innerHTML)
      window.localStorage.setItem("move1L1P2" + exerToSolve + "FEN", move1Fen[exerToSolve])
      exersSolved[exerToSolve + 6] = true
    } else if (currentPage == 3) {
      window.localStorage.setItem("move1L1P3" + exerToSolve, move1Btns[exerToSolve].innerHTML)
      window.localStorage.setItem("move1L1P3" + exerToSolve + "FEN", move1Fen[exerToSolve])
      exersSolved[exerToSolve + 12] = true
    }
    window.localStorage.setItem("exersSolvedL1", exersSolved)
    //~~HELP~~
    //when piece promote is checkmate or stalemate for example exercises1 exercise1 or exercises2 exercise2 when queen promotion ,
    //queen does not show up due to a bug,so I clicked move1Btns to make the move.
    //If anyone have a better solution please leave a message.
    if (Is_Promotion(source,target, move.piece)) {
      if (currentPage == 1) {
        move1Btns[exerToSolve].click()
      } else if (currentPage == 2) {
        move1Btns[exerToSolve].click()
      } else if (currentPage == 3) {
        move1Btns[exerToSolve].click()
      }
    }

    exerToSolve = nextExerToSolve()

    if (exerToSolve <6) {
      if (h_Lock.innerHTML == "Disable Locks") { //na to allajw
        status1[exerToSolve].innerHTML = "PLAY"
        locks[exerToSolve].style.visibility = 'hidden';
      }
    }
    //if all exercises solved make button to clear moves
    if(checkIfAllexerSolved()){
          let button = document.createElement("button");
          button.textContent = "Clear all moves";
          button.id= "resetScore"; 
          button.addEventListener("click",resetScoreBoard)
          document.querySelector("#reset").appendChild(button)

    }
  } else if (games[exerToSolve].in_stalemate()) {
    status1[exerToSolve].innerHTML = "DRAW"
      reMakeMove1(exerToSolve, move, orientation)

      if (Is_Promotion(source,target, move.piece)) {
        if (currentPage == 1) {
          move1Btns[exerToSolve].click()
        } else if (currentPage == 2) {
          move1Btns[exerToSolve].click()
        } else if (currentPage == 3) {
          move1Btns[exerToSolve].click()
        }
      }
    
  } else {
      reMakeMove1(exerToSolve, move, orientation)
      setTimeout(function () {
        let move2 = makeBestMove(turn, exerToSolve)
        reMakeMove2(exerToSolve, move2, orientation)
      }, 250)
  }

  if (pieceMade != null) {
    pieceMade = null
  }

}



function pieceToSymbol(piece, orientation) {
  if (orientation == "white") {
    if (piece == "k") {
      return "&#9812;"
    } else if (piece == "q") {
      return "&#9813;"
    } else if (piece == "r") {
      return "&#9814;"
    } else if (piece == "b") {
      return "&#9815;"
    } else if (piece == "n") {
      return "&#9816;"
    } else if (piece = "p") {
      return "&#9817;"
    }
  } else {
    if (piece == "k") {
      return "&#9818;"
    } else if (piece == "q") {
      return "&#9819;"
    } else if (piece == "r") {
      return "&#9820;"
    } else if (piece == "b") {
      return "&#9821;"
    } else if (piece == "n") {
      return "&#9822;"
    } else if (piece = "p") {
      return "&#9823;"
    }
  }
}


function reMakeMove1(i, move, orientation) {
  let movePlayed

  if (Is_Promotion(move.from,move.to, move.piece)) {
    movePlayed = "1." + pieceToSymbol("p", orientation) + move.to + "=" + pieceToSymbol(pieceMade, orientation)
    if (games[i].in_checkmate()) {
      movePlayed += "#"
    } else if (games[i].in_check()) {
      movePlayed += "+"
    }
  } else {
    move.to = (move.piece != "p") ? move.san.substring(1) : move.san //to remove example: "Q" from Qe7 not for pawn need move.san for checkmate "#",capture "x" etc (for symbolism)
    movePlayed = "1." + pieceToSymbol(move.piece, orientation) + move.to
  }

  checkIfStartPos[i] = false

  move1Btns[i].style.visibility = "visible"

  startBtns[i].style.backgroundColor = "white"
  move1Btns[i].style.backgroundColor = "grey"
  move2Btns[i].style.backgroundColor = "white"

  move1Fen[i] = games[i].fen()

  move1Btns[i].addEventListener("click", function () {
    boardInit(allBoardsDiv[i].id, false, move1Fen[i], orientation)
    startBtns[i].style.backgroundColor = "white"
    move1Btns[i].style.backgroundColor = "grey"
    move2Btns[i].style.backgroundColor = "white"
    checkIfStartPos[i] = false
  })


  move1Btns[i].innerHTML = movePlayed
}










function reMakeMove2(i, move, orientation) {//parameter orientation because function is being used by level2 also //see why is needed orientation
  let movePlayed
  let oppOrientation



  if (currentPage == 1) {//na balw kai to kanoniko orientation edw
    oppOrientation = ((level1OriP1[i] == "white") ? "black" : "white")
  } else if (currentPage == 2) {
    oppOrientation = ((level1OriP2[i] == "white") ? "black" : "white")
  } else if (currentPage == 3) {
    oppOrientation = ((level1OriP3[i] == "white") ? "black" : "white")
  }

  if (Is_Promotion(move.from , move.to, move.piece)) {
    movePlayed = "2." + pieceToSymbol("p", oppOrientation) + move.to + "=" + pieceToSymbol(pieceMade, oppOrientation)
    if (games[i].in_checkmate()) {
      movePlayed += "#"
    } else if (games[i].in_check()) {
      movePlayed += "+"
    }
  } else {
    move.to = (move.piece != "p") ? move.san.substring(1) : move.san
    movePlayed = "2." + pieceToSymbol(move.piece, oppOrientation) + move.to
  }

  checkIfStartPos[i] = false


  startBtns[i].style.backgroundColor = "white"
  move2Btns[i].style.visibility = "visible"
  move1Btns[i].style.backgroundColor = "white"
  move2Btns[i].style.backgroundColor = "grey"

  move2Fen[i] = games[i].fen()


  move2Btns[i].addEventListener("click", function () {
    boardInit(allBoardsDiv[i].id, true, move2Fen[i], orientation)
    startBtns[i].style.backgroundColor = "white"
    move1Btns[i].style.backgroundColor = "white"
    move2Btns[i].style.backgroundColor = "grey"
    checkIfStartPos[i] = false
  })
  move2Btns[i].innerHTML = movePlayed
}






function reMakeMove3(i, move) {
  let movePlayed

  if (move.piece == "p" && Is_Promotion(move.from,move.to, (level2OriP1[i] == "white") ? "wP" : "bP")) {
    movePlayed = "3." + pieceToSymbol("p", level2OriP1[i]) + move.to + "=" + pieceToSymbol(pieceMade, level2OriP1[i])
    if (games[i].in_checkmate()) {
      movePlayed += "#"
    } else if (games[i].in_check()) {
      movePlayed += "+"
    }
  } else {
    move.to = (move.piece != "p") ? move.san.substring(1) : move.san
    movePlayed = "3." + pieceToSymbol(move.piece, level2OriP1[i]) + move.to
  }


  checkIfStartPos[i] = false


  move3Btns[i].style.visibility = "visible"

  move3Fen[i] = games[i].fen()
  move3Btns[i].hidden = false
  startBtns[i].style.backgroundColor = "white"
  move1Btns[i].style.backgroundColor = "white"
  move2Btns[i].style.backgroundColor = "white"
  move3Btns[i].style.backgroundColor = "grey"
  if (move4Btns[i].innerHTML != "") {
    move4Btns[i].style.backgroundColor = "white"
  }


  move3Btns[i].addEventListener("click", function () {
    boardInit(allBoardsDiv[i].id, false, move3Fen[i], level2OriP1[i])
    startBtns[i].style.backgroundColor = "white"
    move1Btns[i].style.backgroundColor = "white"
    move2Btns[i].style.backgroundColor = "white"
    move3Btns[i].style.backgroundColor = "grey"
    checkIfStartPos[i] = false
    if (move4Btns[i].innerHTML != "") {
      move4Btns[i].style.backgroundColor = "white"
    }
  })


  move3Btns[i].innerHTML = movePlayed
 
}

function reMakeMove4(i, move) {
  let movePlayed

  let oppOrientation = ((level2OriP1[i] == "white") ? "black" : "white")
  if (Is_Promotion(move.from,move.to, move.piece)) {
    movePlayed = "4." + pieceToSymbol("p", oppOrientation) + move.to+ "=" + pieceToSymbol(pieceMade, oppOrientation)
    if (games[i].in_checkmate()) {
      movePlayed += "#"
    } else if (games[i].in_check()) {
      movePlayed += "+"
    }
  } else {
    move.to = (move.piece != "p") ? move.san.substring(1) : move.san
    movePlayed = "4." + pieceToSymbol(move.piece, oppOrientation) + move.to
  }


  checkIfStartPos[i] = false

  move4Btns[i].style.visibility = "visible"
  move4Fen[i] = games[i].fen()
  move4Btns[i].hidden = false
  startBtns[i].style.backgroundColor = "white"
  move1Btns[i].style.backgroundColor = "white"
  move2Btns[i].style.backgroundColor = "white"
  move3Btns[i].style.backgroundColor = "white"
  move4Btns[i].style.backgroundColor = "grey"

  move4Btns[i].addEventListener("click", function () {
    boardInit(allBoardsDiv[i].id, false, move4Fen[i], level2OriP1[i])
    startBtns[i].style.backgroundColor = "white"
    move1Btns[i].style.backgroundColor = "white"
    move2Btns[i].style.backgroundColor = "white"
    move3Btns[i].style.backgroundColor = "white"
    move4Btns[i].style.backgroundColor = "grey"
    checkIfStartPos[i] = false
  })



  move4Btns[i].innerHTML = movePlayed


}



