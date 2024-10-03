let sourceP,targetP
let currentPage 
let move1Fen = new Array()
let move2Fen = new Array()
let move3Fen = new Array()
let move4Fen = new Array()
let checkIfStartPos = new Array(6).fill(true)
let checkIfPosMove2 = new Array(6).fill(false)
let exersSolved = new Array(18).fill(false)
let boards = new Array(6) //stores board object from chessboard.js
let games = new Array(6) //stores chess object from chess.js


let status1 = document.querySelectorAll(".status")
const allBoardsDiv = document.querySelectorAll('.board')
let startBtns = document.querySelectorAll(".startBtn")
let move1Btns = document.querySelectorAll(".Move1 p")
let move2Btns = document.querySelectorAll(".Move2 p")
let move3Btns = document.querySelectorAll(".Move3 p")
let move4Btns = document.querySelectorAll(".Move4 p")
let lockCheckBox = document.querySelector("#lockCheck")
let h_Lock = document.querySelector("#hRemoveLock")
let locks = document.querySelectorAll(".Lock")

let pages = document.querySelectorAll(".page")




let OriP1 = ['black', 'white', 'white', 'white', 'white', 'white']
let StartFenP1 = ['4r1k1/4bppp/2p5/1p2p3/4n2r/4P2P/1PP1NPP1/1KR2B1R b - - 0 1', '6R1/2pk4/8/8/4QK2/8/8/8 w - - 0 1',
    '8/4P1Q1/3k4/8/3K4/8/8/8 w - - 0 1', '8/8/8/8/8/7p/5K1k/R7 w - - 0 1',
    '1B2Q3/1k1B4/8/4K3/8/8/8/8 w - - 0 1', '7k/8/b5Q1/8/8/8/8/R3K3 w Q - 0 1'] 

    
let OriP2 = ['white', 'white', 'white', 'black', 'white', 'white']
let StartFenP2 = [
"6r1/6k1/6P1/7K/5R2/8/8/8 w - - 0 1",
"kr6/1p6/5r2/7R/4B3/8/1K3p2/8 w - - 0 1",
"4B3/6pk/4R2p/8/8/6PP/2rr2PK/8 w - - 0 1",
"8/pk6/1p6/8/KQR5/PP6/8/r3q3 b - - 0 1",
"5r1k/7p/6p1/4N3/8/7P/1B5K/8 w - - 0 1",
"8/2R5/5ppk/8/4P2P/5P2/r2r1N2/6K1 w - - 0 1"
]

let OriP3 = ['black', 'white', 'black', 'black', 'white', 'white']
let StartFenP3 = [
  "8/5pkp/6p1/8/5PK1/2b2BPP/8/8 b - - 0 1",
"r1b4k/pp2Bp1p/8/8/8/8/P4P1P/4R1K1 w - - 0 1",
"8/5k2/8/5n2/8/4bp2/6P1/3R1K2 b - - 0 1",
"7r/P2k4/2pbp3/3p2p1/4PnP1/5PK1/3P1R2/R4B2 b - - 0 1",
"4rk2/5ppp/5b2/4N3/8/7P/6P1/4R2K w - - 0 1",
"1r6/8/7p/6pk/8/1B5P/6PK/8 w - - 0 1",
]




function checkIfPage1SolvedL2() {
for (i = 0; i <= 5; i++) {
    if (!exersSolved[i]) {
    return false
    }
}
return true
}

function checkIfPage2SolvedL2() {
for (i = 6; i <= 11; i++) {
    if (!exersSolved[i]) {
    return false
    }
}
return true
}


function checkIfAllexerSolved(){
  for (let i = 0; i < exersSolved.length; i++){
    if(exersSolved[i]){
      return false
    }
  }

  return true
}

function nextExerToSolve() {
  let i = 0

  for (const exer of exersSolved) {
    if (!JSON.parse(exer) === true) {
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


function initAllChessboards(){
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
    if (window.localStorage.getItem('exersSolvedL2') != null) {
        exersSolved = window.localStorage.getItem('exersSolvedL2').split(",")
        for (let i = 0; i < exersSolved.length; i++){
          exersSolved[i] = JSON.parse(exersSolved[i]) === true
        }
        for (let i = 0; i < 6; i++) {
          if (exersSolved[id + i]) {
              if (currentPage == 1) {
                move1Btns[i].innerHTML = window.localStorage.getItem("move1P1" + i)
                move1Fen[i] = window.localStorage.getItem("move1P1" + i + "FEN")
  
                move2Btns[i].innerHTML = window.localStorage.getItem("move2P1"+i)
                move2Fen[i] = window.localStorage.getItem("move2P1"+i+"FEN")
  
                move3Btns[i].innerHTML = window.localStorage.getItem("move3P1"+i)
                move3Fen[i] = window.localStorage.getItem("move3P1"+i+"FEN")
                move1Btns[i].addEventListener("click", function () {
                  boardInit(allBoardsDiv[i].id, false, move1Fen[i], OriP1[i])
                  startBtns[i].style.backgroundColor = "white"
                  move1Btns[i].style.backgroundColor = "grey"
                  move2Btns[i].style.backgroundColor = "white"
                  move3Btns[i].style.backgroundColor = "white"
                })
  
                move2Btns[i].addEventListener("click", function () {
                  boardInit(allBoardsDiv[i].id, false, move2Fen[i], OriP1[i])
                  startBtns[i].style.backgroundColor = "white"
                  move1Btns[i].style.backgroundColor = "white"
                  move2Btns[i].style.backgroundColor = "grey"
                  move3Btns[i].style.backgroundColor = "white"
                })
  
                move3Btns[i].addEventListener("click", function () {
                  boardInit(allBoardsDiv[i].id, false, move3Fen[i], OriP1[i])
                  startBtns[i].style.backgroundColor = "white"
                  move1Btns[i].style.backgroundColor = "white"
                  move2Btns[i].style.backgroundColor = "white"
                  move3Btns[i].style.backgroundColor = "grey"
                })
                
              } else if (currentPage == 2) {
                move1Btns[i].innerHTML = window.localStorage.getItem("move1P2" + i)
                move1Fen[i] = window.localStorage.getItem("move1P2" + i + "FEN")
  
                move2Btns[i].innerHTML = window.localStorage.getItem("move2P1"+i)
                move2Fen[i] = window.localStorage.getItem("move2P2"+i+"FEN")
  
                move3Btns[i].innerHTML = window.localStorage.getItem("move3P1"+i)
                move3Fen[i] = window.localStorage.getItem("move3P2"+i+"FEN")
                
                move1Btns[i].addEventListener("click", function () {
                  boardInit(allBoardsDiv[i].id, false, move1Fen[i], OriP2[i])
                  startBtns[i].style.backgroundColor = "white"
                  move1Btns[i].style.backgroundColor = "grey"
                  move2Btns[i].style.backgroundColor = "white"
                  move3Btns[i].style.backgroundColor = "white"
                })
  
                move2Btns[i].addEventListener("click", function () {
                  boardInit(allBoardsDiv[i].id, false, move2Fen[i], OriP2[i])
                  startBtns[i].style.backgroundColor = "white"
                  move1Btns[i].style.backgroundColor = "white"
                  move2Btns[i].style.backgroundColor = "grey"
                  move3Btns[i].style.backgroundColor = "white"
                })
  
                move3Btns[i].addEventListener("click", function () {
                  boardInit(allBoardsDiv[i].id, false, move3Fen[i], OriP2[i])
                  startBtns[i].style.backgroundColor = "white"
                  move1Btns[i].style.backgroundColor = "white"
                  move2Btns[i].style.backgroundColor = "white"
                  move3Btns[i].style.backgroundColor = "grey"
                })
                
              } else if (currentPage == 3) {
                move1Btns[i].innerHTML = window.localStorage.getItem("move1P3" + i)
                move1Fen[i] = window.localStorage.getItem("move1P3" + i + "FEN")
  
                move2Btns[i].innerHTML = window.localStorage.getItem("move2P1"+i)
                move2Fen[i] = window.localStorage.getItem("move2P3"+i+"FEN")
  
                move3Btns[i].innerHTML = window.localStorage.getItem("move3P1"+i)
                move3Fen[i] = window.localStorage.getItem("move3P3"+i+"FEN")
                
                move1Btns[i].addEventListener("click", function () {
                  boardInit(allBoardsDiv[i].id, false, move1Fen[i], OriP3[i])
                  startBtns[i].style.backgroundColor = "white"
                  move1Btns[i].style.backgroundColor = "grey"
                  move2Btns[i].style.backgroundColor = "white"
                  move3Btns[i].style.backgroundColor = "white"
                })
  
                move2Btns[i].addEventListener("click", function () {
                  boardInit(allBoardsDiv[i].id, false, move2Fen[i], OriP3[i])
                  startBtns[i].style.backgroundColor = "white"
                  move1Btns[i].style.backgroundColor = "white"
                  move2Btns[i].style.backgroundColor = "grey"
                  move3Btns[i].style.backgroundColor = "white"
                })
  
                move3Btns[i].addEventListener("click", function () {
                  boardInit(allBoardsDiv[i].id, false, move3Fen[i], OriP3[i])
                  startBtns[i].style.backgroundColor = "white"
                  move1Btns[i].style.backgroundColor = "white"
                  move2Btns[i].style.backgroundColor = "white"
                  move3Btns[i].style.backgroundColor = "grey"
                })
                
              }
  
              move1Btns[i].style.visibility = "visible"
              move2Btns[i].style.visibility = "visible"
              move3Btns[i].style.visibility = "visible"
  
              move1Btns[i].style.backgroundColor = "white"
              move2Btns[i].style.backgroundColor = "white"
              move3Btns[i].style.nextExerbackgroundColor = "white"
          } else {
            move1Btns[i].style.visibility = "hidden"
            move2Btns[i].style.visibility = "hidden"
            move3Btns[i].style.visibility = "hidden"

          }
  
        }
      }
      let exerToSolve = nextExerToSolve()
      console.log(exersSolved)
        for (let i = 0; i < 6; i++) {
          checkIfStartPos[i] = true
          checkIfPosMove2[i] = false
          let checkExer = null
          if (currentPage == 1) {//na ta bgalw kai na ta blaw kateutheian sto exersSolved
            checkExer = i
          } else if (currentPage == 2) {
            checkExer = i + 6
          } else if (currentPage == 3) {
            checkExer = i + 12
          }
          if (lockCheckBox.checked) {
              if (!exersSolved[checkExer]) {
                status1[i].innerHTML = "PLAY"
                locks[i].style.visibility = "hidden"
              } else {
                status1[i].innerHTML = "CHECKMATE"
              }
        }else {
          if (exersSolved[checkExer]) {
              status1[i].innerHTML = "CHECKMATE"
              locks[i].style.visibility = "hidden"
              } else if ((currentPage == 1 && exerToSolve == i) || (currentPage == 2 && exerToSolve == i && checkIfPage1SolvedL1()) || (currentPage == 3 && exerToSolve == i && checkIfPage1SolvedL1() && checkIfPage2SolvedL2)) {
              status1[i].innerHTML = "PLAY"
              locks[i].style.visibility = "hidden"
            } else {
              status1[i].innerHTML = "LOCKED"
              locks[i].style.visibility = "visible"
            }
        }
        startBtns[i].style.backgroundColor = "grey"
        if (currentPage == 1) {
          draggable = (JSON.parse(exersSolved[i])) ? false : true //page1
          boardInit(allBoardsDiv[i].id, draggable, StartFenP1[i], OriP1[i])
        } else if (currentPage == 2) {
          draggable = (JSON.parse(exersSolved[i + 6])) ? false : true//page2
          boardInit(allBoardsDiv[i].id, draggable, StartFenP2[i], OriP2[i])
        } else if (currentPage == 3) {
          draggable = (JSON.parse(exersSolved[i + 12])) ? false : true//page3
          boardInit(allBoardsDiv[i].id, draggable, StartFenP3[i], OriP3[i])
        }
      }
    
  
}

window.onload = function () { findPage(); initAllChessboards();}


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
      let i = 0
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
          } else if (i != nextExerToSolve() && checkIfPage1SolvedL2()) {
            startBtns[i].style.backgroundColor = "white"
            status1[i].innerHTML = "LOCKED"
            lock.style.visibility = "visible"
          }
        } else if (currentPage == 3) {
          if (exersSolved[i + 12]) {
            status1[i].innerHTML = "CHECKMATE"
          } else if (i != nextExerToSolve() && checkIfPage1SolvedL2() && checkIfPage2SolvedL2()) {
            status1[i].innerHTML = "LOCKED"
            lock.style.visibility = "visible"
          }
        }
      })
    }
    h_Lock.innerHTML = "Disable Locks"
  })


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
    orientation = OriP1[exerToSolve]
  }else if(currentPage == 2){
    orientation = OriP2[exerToSolve]
  }else if(currentPage == 3){ 
    orientation = OriP3[exerToSolve] 
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
        boardInit(allBoardsDiv[i].id, draggable, StartFenP1[i], OriP1[i])
    } else if (currentPage == 2) {
        boardInit(allBoardsDiv[i].id, draggable, StartFenP2[i], OriP2[i])
    } else if (currentPage == 3) {
        boardInit(allBoardsDiv[i].id, draggable, StartFenP3[i], OriP3[i])
    }

    if (move3Btns[i].innerHTML != "") {
        move3Btns[i].style.backgroundColor = "white"
        if (move4Btns[i].innerHTML != "")
        move4Btns[i].style.backgroundColor = "white"
    }
    
    checkIfStartPos[i] = true
    checkIfPosMove2[i] = false
    })
  })
  
  
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
  
  function onSnapEnd(boardID) {
    let id = getNumFromString(boardID) - 1
    boards[id].position(games[id].fen())
  }

 
 function resetScoreBoard(){
    if (window.localStorage.getItem('exersSolvedL2') != null) {
        window.localStorage.removeItem("exersSolvedL2")
        for (let i = 0; i < 6; i++) {
          if(JSON.parse(exersSolved[i]) === true){ 
          //page1 claer
            window.localStorage.removeItem("move1P1" + i)
            window.localStorage.removeItem("move1P1" + i + "FEN")

            window.localStorage.removeItem("move2P1"+i)
            window.localStorage.removeItem("move2P1" + i + "FEN")

            window.localStorage.removeItem("move3P1"+i)
            window.localStorage.removeItem("move3P1"+i+"FEN")
          }
          else if (JSON.parse(exersSolved[i+6]) === true){
            //page2 clear
            window.localStorage.removeItem("move1P2" + i)
            window.localStorage.removeItem("move1P2" + i + "FEN")

            window.localStorage.removeItem("move2P2"+i)
            window.localStorage.removeItem("move2P2" + i + "FEN")

            window.localStorage.removeItem("move3P2"+i)
            window.localStorage.removeItem("move3P2"+i+"FEN")
          }
          else if (JSON.parse(exersSolved[i+12]) === true){ 
          //page3 clear
            window.localStorage.removeItem("move1P3" + i)
            window.localStorage.removeItem("move1P3" + i + "FEN")

            window.localStorage.removeItem("move2P3"+i)
            window.localStorage.removeItem("move2P3" + i + "FEN")

            window.localStorage.removeItem("move3P3"+i)
            window.localStorage.removeItem("move3P3"+i+"FEN")
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
    }else if (( !checkIfStartPos[id] && !checkIfPosMove2[id]) || (checkIfStartPos[id] && checkIfPosMove2[id])){ 
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
      if (currentPage == 1 && exersSolved[id]) {
        return
      } else if (currentPage == 2 && exersSolved[id + 6]) {
        return
      } else if (currentPage == 3 && exersSolved[id + 12]){
        return
      }
  
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


function onMouseoutSquare(square, piece, boardID) {//na to peirajw na mpenei prwta to boardId
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
        if (OriP1[i] == "white") {
            let divProm = document.querySelector("#pawnPromotionForWhite")
            divProm.style.visibility = "visible"
        } else {
            let divProm = document.querySelector("#pawnPromotionForBlack")
            divProm.style.visibility = "visible"
        }
    }else if (currentPage == 2){
        if (OriP2[i] == "white") {
            let divProm = document.querySelector("#pawnPromotionForWhite")
            divProm.style.visibility = "visible"
        } else {
            let divProm = document.querySelector("#pawnPromotionForBlack")
            divProm.style.visibility = "visible"
        }
    }else if (currentPage == 3){
        if (OriP3[i] == "white") {
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
    removeGreySquares(exerToSolve) //na dw ama xrisimeuei
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
      orientation = OriP1[exerToSolve]//kai auto DES KATW
    }else if (currentPage == 2){
      orientation = OriP2[exerToSolve]  
    }else if (currentPage == 3){
      orientation = OriP2[exerToSolve]  
    }
  
  
    if (turn === 'b') {//na dw ama to xrisimopoiw
      moveColor = 'Black'
    } else {
      moveColor = "White"
    }
  
    // checkmate
    if (games[exerToSolve].in_checkmate()) {
        status1[exerToSolve].innerHTML = "CHECKMATE";
        reMakeMove3(exerToSolve, move)
        if (currentPage == 1) {
            window.localStorage.setItem("move1P1" + exerToSolve, move1Btns[exerToSolve].innerHTML)
            window.localStorage.setItem("move1P1" + exerToSolve + "FEN", move1Fen[exerToSolve])

            window.localStorage.setItem("move2P1"+exerToSolve,move2Btns[exerToSolve].innerHTML)
            window.localStorage.setItem("move2P1"+exerToSolve+"FEN", move2Fen[exerToSolve])
            window.localStorage.setItem("move3P1"+exerToSolve,move3Btns[exerToSolve].innerHTML)
            window.localStorage.setItem("move3P1"+exerToSolve+"FEN", move3Fen[exerToSolve])

            exersSolved[exerToSolve] = true
        } else if (currentPage == 2) {
            exersSolved[exerToSolve + 6] = true
        } else if (currentPage == 3) {
            exersSolved[exerToSolve + 12] = true
        }
        window.localStorage.setItem("exersSolvedL2", exersSolved)

        move4Btns[exerToSolve].style.visibility = "hidden" // na ta allajw ola me hidden = true
        if (Is_Promotion(source,target, move.piece)) {
            if (currentPage == 1) {
            move3Btns[exerToSolve].click()
            } else if (currentPage == 2) {
            move3BtnsP2[exerToSolve].click()
            } else if (currentPage == 3) {
            move3BtnsP3[exerToSolve].click()
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
        if (checkIfStartPos[exerToSolve]) {
          reMakeMove1(exerToSolve, move, OriP1[exerToSolve])
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
          reMakeMove3(exerToSolve, move, OriP1[exerToSolve])
          if (Is_Promotion(source,target, move.piece)) {
            if (currentPage == 1) {
              move3Btns[exerToSolve].click()
            } else if (currentPage == 2) {
              move3BtnsP2[exerToSolve].click()
            } else if (currentPage == 3) {
              move3BtnsP3[exerToSolve].click()
            }
          }
        }
    } else { 
        //move1
        if (checkIfStartPos[exerToSolve] == true) {
          reMakeMove1(exerToSolve, move, OriP1[exerToSolve])
          let move2 = null
          setTimeout(function () {
            move2 = makeBestMove(turn, exerToSolve)
            reMakeMove2(exerToSolve, move2, OriP1[exerToSolve])//na dw boardinit ama dn exw balei allboardsDiv
          }, 250)
          if (games[exerToSolve].in_checkmate()) {
            status1[exerToSolve].innerHTML = "CHECKMATE. You Lost"
          }
          if (games[exerToSolve].in_draw()) {
            status1[exerToSolve].innerHTML = "DRAW"
          }
          //move3
        } else {
          reMakeMove3(exerToSolve, move, target)
          let move4 = null
          setTimeout(function () {//setTimeout for waiting before move is made
            move4 = makeBestMove(turn, exerToSolve)
            reMakeMove4(exerToSolve, move4)
          }, 250);
  
        }
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
    checkIfPosMove2[i] = false
  
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
      checkIfPosMove2[i] = false
      if (move3Btns[i].innerHTML != "") {
          move3Btns[i].style.backgroundColor = "white"
      }
      if (move4Btns[i].innerHTML != "") {
          move4Btns[i].style.backgroundColor = "white"
      }
    })
  
  
    move1Btns[i].innerHTML = movePlayed
  
    if (move3Btns[i].innerHTML != "") {
        move3Btns[exerToSolve].hidden = true
    if (move4Btns[i].innerHTLM != "")
        move4Btns[exerToSolve].hidden = true
    }

    if (move3Btns[i].innerHTML != "") {
        move3Btns[i].style.backgroundColor = "white"
    }
    if (move4Btns[i].innerHTML != "") {
        move4Btns[i].style.backgroundColor = "white"
    }

  }


function reMakeMove2(i, move, orientation) {//parameter orientation because function is being used by  also //see why is needed orientation
    let movePlayed
    let oppOrientation
  
  
    if (currentPage == 1) {
        oppOrientation = ((OriP1[i] == "white") ? "black" : "white")
    } else if (currentPage == 2) {
        oppOrientation = ((OriP2[i] == "white") ? "black" : "white")
    } else if (currentPage == 3) {
        oppOrientation = ((OriP3[i] == "white") ? "black" : "white")
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
    checkIfPosMove2[i] = true
  
    startBtns[i].style.backgroundColor = "white"
    move2Btns[i].style.visibility = "visible"
    move1Btns[i].style.backgroundColor = "white"
    move2Btns[i].style.backgroundColor = "grey"
  
    move2Fen[i] = games[i].fen()
  
    if (currentPage == 1) {
        oppOrientation = ((OriP1[i] == "white") ? "black" : "white")
    }
    if (move3Btns[i].innerHTML != "") {
        move3Btns[i].style.backgroundColor = "white"
    if (move4Btns[i].innerHTML != "") {
        move4Btns[i].style.backgroundColor = "white"
    }
    }
    move2Btns[i].addEventListener("click", function () {
      boardInit(allBoardsDiv[i].id, true, move2Fen[i], orientation)
      startBtns[i].style.backgroundColor = "white"
      move1Btns[i].style.backgroundColor = "white"
      move2Btns[i].style.backgroundColor = "grey"
      checkIfStartPos[i] = false
      checkIfPosMove2[i] = true
      if (move3Btns[i].innerHTML != "") {
          move3Btns[i].style.backgroundColor = "white"
      }

    })
    move2Btns[i].innerHTML = movePlayed
  }
  
  
function reMakeMove3(i, move) {
    let movePlayed
  
    if (move.piece == "p" && Is_Promotion(move.from,move.to, (OriP1[i] == "white") ? "wP" : "bP")) {
      movePlayed = "3." + pieceToSymbol("p", OriP1[i]) + move.to + "=" + pieceToSymbol(pieceMade, OriP1[i])
      if (games[i].in_checkmate()) {
        movePlayed += "#"
      } else if (games[i].in_check()) {
        movePlayed += "+"
      }
    } else {
      move.to = (move.piece != "p") ? move.san.substring(1) : move.san
      movePlayed = "3." + pieceToSymbol(move.piece, OriP1[i]) + move.to
    }
  
  
    checkIfStartPos[i] = false
    checkIfPosMove2[i] = false
  
  
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
      boardInit(allBoardsDiv[i].id, false, move3Fen[i], OriP1[i])
      startBtns[i].style.backgroundColor = "white"
      move1Btns[i].style.backgroundColor = "white"
      move2Btns[i].style.backgroundColor = "white"
      move3Btns[i].style.backgroundColor = "grey"
      checkIfStartPos[i] = false
      checkIfPosMove2[i] = false
      if (move4Btns[i].innerHTML != "") {
        move4Btns[i].style.backgroundColor = "white"
      }
    })
  
  
    move3Btns[i].innerHTML = movePlayed
   
  }
  
  function reMakeMove4(i, move) {
    let movePlayed
  
    let oppOrientation = ((OriP1[i] == "white") ? "black" : "white")
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
    checkIfPosMove2[i] = false
  
    move4Btns[i].style.visibility = "visible"
    move4Fen[i] = games[i].fen()
    move4Btns[i].hidden = false
    startBtns[i].style.backgroundColor = "white"
    move1Btns[i].style.backgroundColor = "white"
    move2Btns[i].style.backgroundColor = "white"
    move3Btns[i].style.backgroundColor = "white"
    move4Btns[i].style.backgroundColor = "grey"
  
    move4Btns[i].addEventListener("click", function () {
      boardInit(allBoardsDiv[i].id, false, move4Fen[i], OriP1[i])
      startBtns[i].style.backgroundColor = "white"
      move1Btns[i].style.backgroundColor = "white"
      move2Btns[i].style.backgroundColor = "white"
      move3Btns[i].style.backgroundColor = "white"
      move4Btns[i].style.backgroundColor = "grey"
      checkIfStartPos[i] = false
      checkIfPosMove2[i] = false
    })
  
  
  
    move4Btns[i].innerHTML = movePlayed
  
  
  }
  
  
  
  
