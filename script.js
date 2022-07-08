const gameBoard = (function() {
    const boardContents = [];
    const addToBoard = function(index) {

    };

})();

const displayController = (function() {
    let currentState = 1;
    const mainContainer = document.querySelector(".main-container")

    const stateOne = `
    <div class="game-info">
        <select class="gamer-one">
            <option value="p1">Player 1</option>
        </select>
        <div class="versus">Vs.</div>
        <select class="gamer-two">
            <option value="p2">Player 2</option>
        </select>
    </div>
    <button class="play-btn">Play!</button>`

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
        mainContainer.innerHTML = "";
        if (currentState === 1) {
            mainContainer.innerHTML = stateOne;
                let playBtn = document.querySelector(".play-btn");
                playBtn.addEventListener("click", changeState);
        }
        else if (currentState === 2) {
            mainContainer.innerHTML = stateTwo;
        }
        else {

        }
    };

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

        render();

    };

    return {render};

})();

const Player = function() {

};

displayController.render()