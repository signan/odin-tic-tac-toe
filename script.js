const Gameboard = (() => {
    let gameboard = [0, 'X', 'X', 3, 4, 'O', 'O', 'X', 8]

    const getGameboard = () => gameboard;
    return {getGameboard};
})();


const displayController = (() => {
    let gameboardDiv = document.querySelector('#gameboard');
    const renderGameboard = () => {
        clearCells();
        drawCells();
    }

    const drawCells = () => {
        let gameboardArray = Gameboard.getGameboard();
        for (let i = 0; i < gameboardArray.length; i++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            if (!isNaN(gameboardArray[i])) {
                cell.textContent = '-';
            }
            else {
                cell.textContent = gameboardArray[i];
            }
            gameboardDiv.appendChild(cell);
        }
    }

    const clearCells = () => {
        while (gameboardDiv.firstChild) {
            gameboardDiv.removeChild(gameboardDiv.lastChild);
          }
    }

    return {renderGameboard};
})();


const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return {getName, getMark};
}

displayController.renderGameboard();