const gameLogic = (function() {

    let currentState = 1;
    let mainContainer = document.querySelector(".main-container");
    let gameStatus = "running";

    const gameBoard = (function() {
        let boardContents = ["","","","","","","","",""];
        const addToBoard = function(index, avatar) {
            this.boardContents.splice(index, 1, avatar);
        };
        const clearBoard = function() {
            this.boardContents = ["","","","","","","","",""];
        };

        return {boardContents, addToBoard, clearBoard}
    })();
    
    const Player = function(name, role) {
        let avatar;
        if (role === "p1") {
            avatar = "X";
        }
        else {
            avatar = "O";
        }

        return {name, avatar}
    };

    const runGame = (p1, p2) => {
        const playerOne = Player(p1, "p1");
        const playerTwo = Player(p2, "p2"); 
        const board = gameBoard.boardContents
        const boxes = document.querySelectorAll(".box");
        currentState = 2;
        mainContainer = document.querySelector(".main-container");
        gameStatus = "running";

        let currentTurn = playerOne;

        boxes.forEach(box => {
            box.addEventListener("click", () => {
                if (board[box.id] === "") {

                    gameBoard.addToBoard(box.id, currentTurn.avatar);
                    console.log(gameBoard.boardContents,board, box.id, currentTurn.avatar);
                    updateDisplayBoard();

                    let status = gameStatusCheck(); 
                    if (status != "") {
                        gameStatus = status
                        changeState();
                    }
                    updateTurn();
                }
            })
        })

        const updateDisplayBoard = function() {
            boxes.forEach(box => {
                box.innerHTML = board[box.id];
            })
        }

        const updateTurn = function() {

            if (currentTurn === playerOne) {
                currentTurn = playerTwo;
            }
            else {
                currentTurn = playerOne;
            }
        }

        const gameStatusCheck = function() {
            if (
                ((((board[0] === board[1]) && (board[1] === board[2])) ||
                    ((board[0] === board[3]) && (board[3] === board[6])) ||
                    ((board[0] === board[4]) && (board[4] === board[8]))) 
                    && board[0] != "")
                
                ||
                
                ((((board[3] === board[4]) && (board[4] === board[5])) ||
                ((board[1] === board[4]) && (board[4] === board[7])) ||
                ((board[2] === board[4]) && (board[4] === board[6])))
                && board[4] != "")
                
                ||

                ((((board[6] === board[7]) && (board[7] === board[8])) ||
                ((board[2] === board[5]) && (board[5] === board[8])))
                && board[8] != "")) {
                
                    return `${currentTurn.name} Wins!`;

            }
            else if (!board.includes("")) {
                return "Draw!";
            }

            else {
                return "";
            };
        };
        
    }

    const changeState = () => {
        if (currentState === 1) {
            currentState = 2;
        }
        else if (currentState === 2) {
            currentState = 3;
        }
        else {
            currentState = 1;
        }

        displayController.render();

    };

    const displayController = (() => {
        const stateOne = `
        <form id="info" class="game-info">
            <input type="text" class="gamer-one" value="Player 1" required>
            <div class="versus">Vs.</div>
            <input type="text" class="gamer-two" value="Player 2" required>
        </form>
        <button type="submit" form="info" class="play-btn">Play!</button>`

        const stateTwo = `
        <div id="0" class="box"></div>
        <div id="1" class="box"></div>
        <div id="2" class="box"></div>
        <div id="3" class="box"></div>
        <div id="4" class="box"></div>
        <div id="5" class="box"></div>
        <div id="6" class="box"></div>
        <div id="7" class="box"></div>
        <div id="8" class="box"></div>`

        const render = function() {
            if (currentState === 1) {
                mainContainer.innerHTML = "";
                mainContainer.innerHTML = stateOne;
                let form = document.querySelector("#info");
                form.addEventListener("submit", event => {
                    event.preventDefault();
                    changeState();
                });
            }
            else if (currentState === 2) {
                let p1 = document.querySelector(".gamer-one");
                let p2 = document.querySelector(".gamer-two");
                mainContainer.innerHTML = "";
                mainContainer.innerHTML = stateTwo;
                runGame(p1.value, p2.value);
            }
            else {
                const stateThree = `
                <div class="game-info versus">
                    ${gameStatus}
                </div>
                <button type="submit" class="play-btn restart">Restart!</button>`

                mainContainer.innerHTML = "";
                mainContainer.innerHTML = stateThree;
                gameBoard.clearBoard();
                let restart = document.querySelector(".restart");
                restart.addEventListener("click", () => {
                    changeState();
                });
            }
        };

        return {render}
    })();

    return {displayController, gameStatus}
        
})();

gameLogic.displayController.render()