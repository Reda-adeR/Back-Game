
// console.log(window.location.host)

// let matchingSocket;
// let fplayer = "x"
// let splayer = "o"
// let pSign = ""
// let cells = []
// let  elements = [] ;  
// let board = [
//     ["0", "0", "0"],
//     ["0", "0", "0"],
//     ["0", "0", "0"]
// ];

// let save_ev

// // class t3 {
// //     constructor() {
// //         this.matchingSocket = NULL;
// //         this.fplayer = "x";
// //         this.splayer = "o";
// //         this.pSign = "";
// //         this.cells = [];
// //         this.elements = [];
// //         this.board = [
// //             ["0", "0", "0"],
// //             ["0", "0", "0"],
// //             ["0", "0", "0"]
// //         ]
// //     }
// // }



// async function replaceBodyContent() {
//     try {
//         // Fetch the content of index.html
//         const response = await fetch('http://localhost:8000/index/');
//         const htmlText = await response.text();

//         // Create a temporary DOM element to parse the fetched HTML text
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(htmlText, 'text/html');

//         // Extract the body content from the fetched HTML
//         const newBodyContent = doc.getElementById("contIdx").outerHTML;

//         // Replace the current body content with the new content
//         document.getElementById("cont").outerHTML = newBodyContent;
//         cells = ['cell-0','cell-1','cell-2','cell-3','cell-4','cell-5','cell-6','cell-7','cell-8']  
//         // cells.forEach(id => {
//         //     const element = document.getElementById(id)
//         //     if (element) {
//         //         elements.push(element);
//         //     }
//         // });
//         elements = cells.map(id => document.getElementById(id));  // Update elements with the new content

//     } catch (error) {
//         console.error('Error replacing body content:', error);
//     }
// }


// const cont = document.getElementById("cont")

// function startGame(matchingSocket) {
//     const msg_start = {
//         type: "setting_gup"
//     }
//     if ( matchingSocket.readyState === WebSocket.OPEN)
//     {
//         matchingSocket.send(JSON.stringify(msg_start))
//         console.log("i've sent this msg : ", msg_start)
//     }
// }

// function playgame() {

//     matchingSocket = new WebSocket(
//         'ws://' + 'localhost:8001' + '/ws/game/'
//     )
    
//     matchingSocket.onmessage = async function(event){
//         const msg = JSON.parse(event.data)
//         console.log("what i got : ", msg.type)
//         if (msg.type === "waiting")
//         {
//             let counter = 1
//             const intervalId = setInterval(() => {
//                 cont.innerHTML = `
//                     <h1 class="wait"> WAITING FOR YOUR OPPONNENT TO JOIN in ${counter}</h1>
//                 `
//                 counter++; // Increment the counter
              
//                 if (counter > 2) { // Check if the counter has reached 20
//                   clearInterval(intervalId); // Stop the timer && must re
//                 }
//               }, 1000);
//         }
//         else if (msg.type === "setup")
//         {
//             await replaceBodyContent()
//             console.log("after Replace size : ", elements.length)
//             // -- READY ?? 3 2 1 START
//             startGame(matchingSocket)
//             // cont.innerHTML = `
//             //     <h1> YESSS </h1>
//             // `
//         }
//         else if (msg.type === "setting_gup")
//         {
//             console.log("Ha LI GLNA: ", msg["player"])
//             if ( msg["player"] === fplayer )
//             {
//                 // set the board to onclick to listen

//                 console.log("gg you are X")
//                 pSign = msg["player"]
//                 await setBoardToClick()
//                 // create the array* board to comm with backend
//                 // here must give onclick to the first player
//             }
//             else
//             {
//                 console.log("gg you are O")
//                 pSign = msg["player"]
//                 await removeClick()
//             }

//         }
//         else if (msg.type === "in_game")
//         {
//             if (msg["board"])
//                 console.log("I got here buddy", msg)

//             board = msg["board"]
//             updateBoard()
//             if ( msg["turn"] === "on")
//             {
//                 await setBoardToClick()
//             }
//             else
//             {
//                 save_ev.target.removeEventListener('click', lmClick)
//                 save_ev.target.classList.add("disabled")
//                 // save_ev.target.innerHTML += '<p>' + pSign + '</p>'
//                 await removeClick()
//             }
//         }
//     }
// }

// // function that add and remove onclick event 

// async function setBoardToClick()
// {
//     let i = 0
//     console.log("rah dkhel hna...")
//     elements.forEach( lm => {
//         if( lm )
//         {
//             if (board[Math.floor(i / 3)][i%3] === "0")
//             {
//                 lm.addEventListener('click', lmClick)
//                 lm.classList.remove("disabled")
//             }
//         }
//         i++
//     })
// }

// async function removeClick()
// {
//     elements.forEach( lm => {
//         if( lm )
//         {
//             lm.removeEventListener('click', lmClick)
//             lm.classList.add("disabled")
//         }
//     })
// }

// function lmClick (ev)
// {
//     const idx = elements.indexOf(ev.target)
//     // idx must be protected to from 0 to 8
//     board[Math.floor(idx / 3)][idx%3] = pSign
//     console.log("board[Math.floor(idx / 3)][idx%3]    ::: " ,pSign)

//     // ill send you the board 
//     // with ingame msg
//     // who played now
//     save_ev = ev
//     const msg = {
//         type : "in_game",
//         player : pSign,
//         theBoard : board
//     }
//     matchingSocket.send(JSON.stringify(msg))
//     console.log(idx)
//     // ev.target.removeEventListener('click', lmClick)
//     // ev.target.classList.add("disabled")
//     // ev.target.innerHTML += '<p>' + pSign + '</p>'
// }

// function updateBoard()
// {
//     let i = 0;
//     elements.forEach( lm => {
//         if( lm && board[Math.floor(i / 3)][i%3] != "0" && lm.innerHTML.trim() === "")
//             lm.innerHTML += '<p>' + board[Math.floor(i / 3)][i%3] + '</p>'
//         i++
//     })
// }

// // window.location.host


// // console.log(window.location.host)

// // let matchingSocket;
// // let fplayer = "x"
// // let splayer = "o"
// // let pSign = ""
// // let cells = []
// // let  elements = [] ;  
// // let board = [
// //     ["0", "0", "0"],
// //     ["0", "0", "0"],
// //     ["0", "0", "0"]
// // ];

let btn_play = `<button class="play_btn" onclick="playgame()">PLAY</button>`
let matchingSocket = null

class Player {
    constructor(scoreElementId, armElementId, charElementId, turnElementId) {
        this.scoreElement = document.getElementById(scoreElementId);
        this.armElement = document.getElementById(armElementId);
        this.charElement = document.getElementById(charElementId);
        this.turnElement = document.getElementById(turnElementId);
    }
    updatePlayerTurn(t) {
        
        // Set to "Not Your Turn"
        this.turn = t;
        if (this.turn) {
            this.turnElement.innerHTML = "✔";
            this.turnElement.classList.add('your-turn');
            this.turnElement.classList.remove('not-your-turn');
        }
        else
        {
            this.turnElement.innerHTML = "✘";
            this.turnElement.classList.add('not-your-turn');
            this.turnElement.classList.remove('your-turn');
        }
        // this.turnElement.style.backgroundColor = this.turn ? "green" : "red";
    }
    updatePlayerArmChar(s) {
        this.sign = s;
        this.charElement.innerHTML = this.sign;
        this.armElement.innerHTML = this.sign === "x" ? "KATANA" : "SHURIKEN";
    }
    updatePlayerScore(sc) {
        console.log("score-------------------- : ", sc)

        this.score = sc;
        this.scoreElement.innerHTML = this.score;
    }
}


class t3 {
    constructor() {
        this.htmlBoard = `
        <div id="contIdx" class="container df_fdc_jcc_aic">
      <div class="board_holder df_fdc_jcsa_aic">
      <!-- <h1 id="gameTitle">Tic-Tac-Toe</h1> -->
      <div class="turnShowDiv df_fdc_jcc_aic">
          <h1 class="turnShow df_jcc_aic" id="turnShow">
            Game Set-Up
          </h1>
      </div>
      <div class="" id="gameTimer">
        <h1 class="df_jcc_aic">30s</h1>
        <div class="loaderTimer"></div>
      </div>
      <div class="board_head">
      <div class="fp df_fdc_jcsa_aic">
        <div class="pl_profil df_fdc_jcc_aic" id="fp_profil">
          <img src="assets/test.png" alt="" id="thisPlayer_img">
          <h5 id="thisPlayer_name">abbass</h5>
        </div>
        <div class="turnToggle df_jcc_aic" id="turnToggleZis">
        </div>  
        <div class="score_win df_fdc_jcc_aic">
          <h1>LOT</h1>
          <h3 id="thisPlayer_score">0</h3>
        </div>
        <div class="sla7 df_fdc_jcc_aic" id="fpArm">
          <h1 id="thisPlayer_arm"></h1>
          <h2 id="thisPlayer_char"></h2>
        </div>
      </div>
      <div class="board">
      <div class="cell disabled" id="cell-0"></div>
      <div class="cell disabled" id="cell-1"></div>
      <div class="cell disabled" id="cell-2"></div>
      <div class="cell disabled" id="cell-3"></div>
      <div class="cell disabled" id="cell-4"></div>
      <div class="cell disabled" id="cell-5"></div>
      <div class="cell disabled" id="cell-6"></div>
      <div class="cell disabled" id="cell-7"></div>
      <div class="cell disabled" id="cell-8"></div>
      </div>
      <div class="sp df_fdc_jcsa_aic">
        <div class="pl_profil df_fdc_jcc_aic" id="sp_profil">
          <img src="assets/test.png" alt="" id="opponent_img">
          <h5 id="opponent_name">hmida</h5>
        </div>
        <div class="turnToggle df_jcc_aic" id="turnToggleThat">
        </div>    
        <div class="score_win df_fdc_jcc_aic">
          <h1>LOT</h1>
          <h3 id="opponent_score">0</h3>
        </div>
          <div class="sla7 df_fdc_jcc_aic" id="spArm">
            <h1 id="opponent_arm"></h1>
            <h2 id="opponent_char"></h2>
          </div>
        </div>
      </div>
      
      <button id="restart-button" onclick="reset()">Quit</button>
      </div>
      </div>`
      this.gameOver = `
      <div id="contIdx" class="container df_fdc_jcc_aic">
        <div class="winloss" id="losswin">
            <h1 id="msg"></h1>
            <h2>Number of Games Played: <span id="nbofgames"></span></h1>
            <h3>You Scored : <span id="winScore"></span></h1>
            <h3>He Scored : <span id="hescore"></span></h1>
            <button class="button" id="playAgainBtn">Play again</button>
            <button class="button" id="quitBtn">quit</button>
        </div>
        </div>
      `
        // this.matchingSocket = null;
        this.currMsg = null;
        this.zhisP = null
        this.thatP = null
        // this.pSign = "";
        this.save_ev = null;
        this.cells = [];
        this.elements = [];
        this.cont = document.getElementById("contIdx")
        this.winloss = document.getElementById("losswin")
        this.turnShow = document.getElementById("turnShow")
        this.first_to = document.querySelector('input[name="game-choice"]:checked').value;
        // this.wins = 0;
        this.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]
        this.functionMap = new Map()

        this.functionMap.set("waiting", this.waiting.bind(this))
        this.functionMap.set("setup", this.setup_game_field.bind(this))
        // this.functionMap.set("start_game", this.start_game.bind(this))
        this.functionMap.set("in_game", this.in_game.bind(this))
        this.functionMap.set("windrawloose", this.windrawloose.bind(this))
        this.functionMap.set("partyResult", this.partyRes.bind(this))
        this.functionMap.set("inform", this.inform.bind(this))
        // this.functionMap.set("loose", this.loose.bind(this))
        // this.functionMap.set("draw", this.loose.bind(this))
        // this.setupDataBoard.bind(this)
        // this.updateDataBoard.bind(this)
        this.playAgain.bind(this)
        this.quit.bind(this)
        this.lmClickHandler = this.lmClick.bind(this);
    }
  
    inform(){
        // this.winloss = document.getElementById("losswin")
        let announce = document.getElementById("msg")
        announce.innerHTML = ""
        announce.innerHTML = this.currMsg["msg"]
        console.log("inform : ", announce)
    }

    partyRes(){
        if ( this.currMsg["msg"] )
            this.turnShow.innerHTML = "You Won !"
        else
            this.turnShow.innerHTML = "You Lost !"
        // this.zhisP.updatePlayerScore(this.currMsg["myscore"])
        // this.thatP.updatePlayerScore(this.currMsg["hiscore"])
        // let score = this.currMsg["score"]
        // this.wins+= score
        // update score players
        // switch to display Who won 
        // 
    }
    waiting(){
        let counter = 1
        console.log("counter : " , counter)
        const intervalId = setInterval(() => {
            this.cont.innerHTML = `
                <h1 class="wait df_fdc_jcsa_aic"> <p>Normally it takes less than 30 seconds</p>
                    <div class="loader-ring">${counter}</div>
                    <p>You can retry later in case you don't find a match !</p>
                </h1>
            `
            counter++; // Increment the counter
            
            if (counter > 30) { // Check if the counter has reached 20
                clearInterval(intervalId); // Stop the timer && must re
                // location.reload()
                // matchingSocket = null
                // gg = null
            }
            }, 1000);
    }

    playAgain()
    {
        console.log("gg you click on play again")
        playAgainBtn.style.backgroundColor = 'green'
        const msg = {
            type : "playAgain",
            // player : this.pSign,
            // theBoard : this.board
        }
        matchingSocket.send(JSON.stringify(msg))
    }
    
    quit()
    {
        // console.log(this)
        // quitGameBtn.style.backgroundColor = 'red'
        const msg = {
            type : "quitGame",
            // player : this.pSign,
            // theBoard : this.board
        }
        matchingSocket.send(JSON.stringify(msg))


        // console.log("hello world")
    }
    
    async windrawloose(){
        console.log("In windrawLoose func")
        this.board = this.currMsg["board"]
        // console.log("in win : ",this.board)
        this.updateBoard()
        await this.removeClick()
        if ( this.currMsg["msg"] === "Match Draw !")
            return
        // this.zhisP.updatePlayerScore(this.currMsg["wins"])
        this.cont = document.getElementById("contIdx")
        this.cont.outerHTML = this.gameOver;

        // document.querySelector('.winloss').firstChild.textContent = this.currMsg["msg"]
        document.querySelector('.winloss').style.display = 'flex';
        // document.getElementById("turnShow").innerText = this.currMsg["msg"]
        let playAgainBtn = document.getElementById('playAgainBtn')
        let quitGameBtn = document.getElementById('quitBtn')
        let msgRes = document.getElementById("msg")
        let winScore = document.getElementById('winScore')
        let nb_games = document.getElementById('nbofgames')
        let hescore = document.getElementById('hescore')
        // console.log("Ha ch9amto : ",this.currMsg["wins"])
        msgRes.textContent = this.currMsg["msg"]
        if ( this.currMsg["msg"] === "You won the game !")
            msgRes.style.color = "green"
        else
            msgRes.style.color = "red"
        winScore.textContent = this.currMsg["wins"]
        nb_games.textContent = this.currMsg["nbGames"]
        hescore.textContent = this.currMsg["opwins"]
        playAgainBtn.addEventListener('click', this.playAgain.bind(this))
        quitGameBtn.addEventListener('click', this.quit.bind(this))

        // document.querySelector('.winloss').style.marginTop = '20vh';
        // alert(this.currMsg["msg"])
    }

    setupDataBoard(){
        console.log(this.zhisP, this.thatP)

        this.zhisP.updatePlayerScore(this.currMsg["wins"])
        this.zhisP.updatePlayerArmChar(this.currMsg["player"])
        this.zhisP.updatePlayerTurn(this.currMsg["turn"])


        let hisChar = this.currMsg["player"] === "x" ? "o" : "x"
        this.thatP.updatePlayerScore(this.currMsg["opwins"])
        this.thatP.updatePlayerArmChar(hisChar)
        this.thatP.updatePlayerTurn(!this.currMsg["turn"])
    }
    async setup_game_field(){
        // here must fill the data
        this.cont = document.getElementById("contIdx")
        this.cont.outerHTML = this.htmlBoard;
        // console.log(this.currMsg)
        this.board = this.currMsg["board"]
        // this.updateBoard()
        this.cells =  Array.from(document.getElementsByClassName("cell"))
        // this.pSign = this.currMsg["player"]  // not needed ??
        this.turnShow = document.getElementById("turnShow")
        // this.turnShow.style.marginTop = "0%"
  
        this.zhisP = new Player("thisPlayer_score", "thisPlayer_arm", "thisPlayer_char", "turnToggleZis");
        this.thatP = new Player("opponent_score", "opponent_arm", "opponent_char", "turnToggleThat");
        
        this.setupDataBoard()
        // this.turnShow.style.marginTop = "100%"
        this.turnShow.innerHTML = this.zhisP.turn ? "Your Turn" : "Opponent's Turn"
        // this.turnShow.style.marginTop = "0%"

        if ( this.cells.length === 9 )
        {
            this.elements = this.cells.map(id => document.getElementById(id));
            // console.log("after Replace size : ", this.elements.length)
            // if ( this.pSign === this.fplayer )
            if ( this.currMsg["turn"] )
                await this.setBoardToClick()
            else
                await this.removeClick()

        }
        else
        {
            console.log("NOT GOOOD TRYING AGAIN")
            setTimeout(this.setup_game_field.bind(this), 10)
        }
    }

    updateDataBoard(){
        
        // let thisPlayerTurn = document.getElementById("turnToggleZis")

        
        // let opponentTurn = document.getElementById("turnToggleThat")


        // thisPlayerTurn.style.backgroundColor = this.currMsg["turn"] ? "green" : "red"
        // opponentTurn.style.backgroundColor = this.currMsg["turn"] ? "red" : "green"
        this.zhisP.updatePlayerTurn(this.currMsg["turn"])
        this.thatP.updatePlayerTurn(!this.currMsg["turn"])
        // this.turnShow.classList.toggle("tshowanim")
        // this.turnShow.style.marginTop = "100%"
        this.turnShow.textContent = this.currMsg["turn"] ? "Your Turn" : "Opponent's Turn"
        // this.turnShow.classList.toggle("tshowanim")
        // this.turnShow.style.marginTop = "0%"
    }

    async in_game(){
        // if (this.currMsg["board"])
            console.log("I got here buddy", this.currMsg)
        this.board = this.currMsg["board"]
        this.updateBoard()
        this.updateDataBoard()
        if ( this.currMsg["turn"] )
            await this.setBoardToClick()
        else
            await this.removeClick()
    }
}

function playgame () {
    if ( matchingSocket && matchingSocket.readyState === WebSocket.OPEN )
        return
    matchingSocket = new WebSocket(
        'ws://' + 'localhost:8001' + '/ws/game/'
    )
    // gg.matchingSocket.onopen = here i should tell if they are playing 3 5 or 7
    // and the tail size etc ....
    let gg = new t3()
    matchingSocket.onopen = async function () {
        const msg = {
            "type" : "first_to",
            "first_to": gg.first_to
        }
        matchingSocket.send(JSON.stringify(msg));
    }
    // console.log("WHAT ?")
    matchingSocket.onmessage = async function(event)
    {
        // console.log("ON MESSAGE")
        gg.currMsg = JSON.parse(event.data)
        console.log("what i got : ", gg.currMsg.type)
        console.log("all : ", gg.currMsg)
        if (gg.functionMap.has(gg.currMsg.type)){
            // console.log("in IF WINDRaw")
            await gg.functionMap.get(gg.currMsg.type)()
        }
        else
        {
            console.log("wayliiiiii  else ??")
        }
    }
    matchingSocket.onclose = async function(event)
    {
        // let contIDX = document.getElementById("contIdx")
        // contIDX.innerHTML = ""
        // contIDX.innerHTML = `<button class="play_btn" onclick="playgame()">PLAY</button>`
        // console.log("by by : ",gg.cont)
        location.reload()
        matchingSocket = null
        gg = null

        // console.log("by by : ",gg)
    }
}



// function that add and remove onclick event 

t3.prototype.setBoardToClick = async function (){
    this.cells.forEach( (lm, i) => {
        if (lm && this.board[Math.floor(i / 3)][i%3] === "") {
            lm.addEventListener('click', this.lmClickHandler)
            lm.classList.remove("disabled")
        }
    })
}

t3.prototype.removeClick = async function (){
    this.cells.forEach( lm => {
        if( lm ) {
            lm.removeEventListener('click', this.lmClickHandler)
            lm.classList.add("disabled")
        }
    })
}

t3.prototype.lmClick = function (ev) {
    // console.log("hhhhhhhh : ", this.elements.length)
    const idx = this.cells.indexOf(ev.target)
    if( idx > 8 || idx < 0 )
        return

    console.log("EV = ", ev)
    this.save_ev = ev
    const msg = {
        type : "in_game",
        clickIdx : idx
    }
    matchingSocket.send(JSON.stringify(msg))
}

t3.prototype.updateBoard = function () {
    this.cells.forEach( (lm, i) => {
        if( lm && this.board[Math.floor(i / 3)][i%3] != "" && lm.innerHTML.trim() === ""){
            let g = this.board[Math.floor(i / 3)][i%3]
            let p = document.createElement("p")
            p.textContent = g
            p.classList.add(g)
            lm.innerHTML = ""
            lm.appendChild(p)
        }
    })
}

// window.location.host