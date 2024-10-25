
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

class t3 {
    constructor() {
        this.htmlBoard = `
        <div id="contIdx" class="container">
        <div class="board_holder">
        <h1>Tic-Tac-Toe</h1>
        <div class="board_head">
        <div class="fp"></div>
        <div class="turnShow"></div>
        <div class="sp"></div>
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
        <div class="winloss" id="losswin">
        <h1 id="msg"></h1>
        <h1>Wins: <span id="winScore">0</span></h1>
        <button id="playAgainBtn">Play again</button>
        <button id="quitBtn">quit</button>
        </div>
        <button id="restart-button" onclick="reset()">Quit</button>
        </div>
        </div>`
        // this.matchingSocket = null;
        this.currMsg = null;
        this.fplayer = "x";
        this.splayer = "o";
        this.pSign = "";
        this.save_ev = null;
        this.cells = [];
        this.elements = [];
        this.cont = document.getElementById("contIdx")
        this.winloss = document.getElementById("losswin")
        this.first_to = document.querySelector('input[name="game-choice"]:checked').value;
        this.wins = 0;
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
        this.functionMap.set("inform", this.inform.bind(this))
        // this.functionMap.set("loose", this.loose.bind(this))
        // this.functionMap.set("draw", this.loose.bind(this))
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

    waiting(){
        let counter = 1
        console.log("counter : " , counter)
        const intervalId = setInterval(() => {
            this.cont.innerHTML = `
                <h1 class="wait"> WAITING FOR YOUR OPPONNENT TO JOIN in ${counter}</h1>
            `
            counter++; // Increment the counter
            
            if (counter > 10) { // Check if the counter has reached 20
                clearInterval(intervalId); // Stop the timer && must re
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
        document.querySelector('.winloss').firstChild.textContent = this.currMsg["msg"]
        document.querySelector('.winloss').style.display = 'flex';
        
        let playAgainBtn = document.getElementById('playAgainBtn')
        let quitGameBtn = document.getElementById('quitBtn')
        let winScore = document.getElementById('winScore')
        // console.log("Ha ch9amto : ",this.currMsg["wins"])
        winScore.textContent = this.currMsg["wins"]
        playAgainBtn.addEventListener('click', this.playAgain.bind(this))
        quitGameBtn.addEventListener('click', this.quit.bind(this))
        // document.querySelector('.winloss').style.marginTop = '20vh';
        // alert(this.currMsg["msg"])
    }

    
    // async draw(){
    //     this.board = this.currMsg["board"]
    //     console.log("in draw : ",this.board)
    //     this.updateBoard()
    //     await this.removeClick()
    //     document.querySelector('.winloss').firstChild.textContent = this.currMsg["msg"]
    //     document.querySelector('.winloss').style.display = 'flex';
    //     // document.querySelector('.winloss').style.marginTop = '20vh';
    //     // alert(this.currMsg["msg"])
    // }
    // async loose(){
    //     this.board = this.currMsg["board"]
    //     console.log("in loose : ",this.board)
    //     this.updateBoard()
    //     await this.removeClick()
    //     document.querySelector('.winloss').firstChild.textContent = this.currMsg["msg"]
    //     document.querySelector('.winloss').style.display = 'flex';
    //     // document.querySelector('.winloss').style.marginTop = '20vh';
    //     // alert(this.currMsg["msg"])
    // }

    async setup_game_field(){
        this.cont = document.getElementById("contIdx")
        this.cont.outerHTML = this.htmlBoard;
        // console.log(this.currMsg)
        this.board = this.currMsg["board"]
        // this.updateBoard()
        this.cells =  Array.from(document.getElementsByClassName("cell"))
        // console.log("ZZZzzzZZZzzZzzzZ:  ", this.currMsg)
        this.pSign = this.currMsg["player"]
        let c = (this.pSign === this.fplayer) ? this.splayer : this.fplayer
        const injct_him = `<img src="../../static/tic_tac_toe/assets/test.png" alt="">
                    <h5>` + this.currMsg["him"]["fname"] + `</h5>
                    <h3>` + this.currMsg["wins"] + `</h3>
                    <h1> He is ` + c + `</h1>
                <p class="timr">` + this.currMsg["him"]["timer"] + `</p>`
        const injct_me = `<img src="../../static/tic_tac_toe/assets/test.png" alt="">
                    <h5>` + this.currMsg["me"]["fname"] + `</h5>
                    <h3>` + this.currMsg["wins"] + `</h3>
                    <h1> You are ` + this.pSign + `</h1>
                <p class="timr">` + this.currMsg["me"]["timer"] + `</p>`
        const fp = document.querySelector(".fp")
        const sp = document.querySelector(".sp")
        fp.innerHTML = injct_him
        sp.innerHTML = injct_me
        if ( this.cells.length === 9 )
        {
            this.elements = this.cells.map(id => document.getElementById(id));
            // console.log("after Replace size : ", this.elements.length)
            // if ( this.pSign === this.fplayer )
            if ( this.currMsg["turn"] )
                await this.setBoardToClick()
            else
                await this.removeClick()
            // const msg_start = {
            //     type: "start_game"
            // }
            // if ( this.matchingSocket.readyState === WebSocket.OPEN)
            // {
            //     this.matchingSocket.send(JSON.stringify(msg_start))
            //     console.log("i've sent this msg : ", msg_start)
            // }
        }
        else
        {
            console.log("NOT GOOOD TRYING AGAIN")
            setTimeout(this.setup_game_field.bind(this), 10)
        }
    }

    // async start_game(){
    //     console.log("Ha LI GLNA: ", this.currMsg["player"])
    //     console.log("gg you are : " , this.pSign)
    //     // console.log("oppo name  : " , this.currMsg["oppo"]["fname"])
    //     // console.log("oppo lvl  : " , this.currMsg["oppo"]["lvl"])
    //     // console.log("oppo time  : " , this.currMsg["oppo"]["timer"])
        
        
    // }

    async in_game(){
        // if (this.currMsg["board"])
        //     console.log("I got here buddy", this.currMsg)

        this.board = this.currMsg["board"]
        // console.log("Ha lboard a zab : ",this.currMsg)
        this.updateBoard()
        if ( this.currMsg["turn"] )
        {
            await this.setBoardToClick()
        }
        else
        {
            // this.save_ev.target.removeEventListener('click', this.lmClickHandler)
            // this.save_ev.target.classList.add("disabled")
            // save_ev.target.innerHTML += '<p>' + pSign + '</p>'
            await this.removeClick()
        }
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
        // console.log("what i got : ", gg.currMsg.type)
        // console.log("all : ", gg.currMsg)
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