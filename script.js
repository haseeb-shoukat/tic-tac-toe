const gameLogic = (function() {

    let currentState = 1;
    const mainContainer = document.querySelector(".main-container")

    const gameBoard = (function() {
        const boardContents = ["","","","","","","","",""];
        const addToBoard = function(index, avatar) {
            boardContents.splice(index, 1, avatar);
        };

        return {boardContents, addToBoard}
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
        const boxes = document.querySelectorAll(".box"); 
        const boardContents = gameBoard.boardContents
        let currentTurn = playerOne;

        boxes.forEach(box => {
            box.addEventListener("click", () => {
                if (boardContents[box.id] === "") {
                    
                    gameBoard.addToBoard(box.id, currentTurn.avatar);
                    console.log(boardContents)

                    if (currentTurn === playerOne) {
                        currentTurn = playerTwo;
                    }
                    else {
                        currentTurn = playerOne;
                    }
                }
            })
        })
        
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

            }
        };

        return {render}
    })();

    return {displayController}
        
})();

gameLogic.displayController.render()