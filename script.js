const Gameboard = (() => {
    let gameboard = ['-', 'X', 'X', '-', '-', 'O', 'O', 'X', '-']
    const setValue = (index, value) => {
        gameboard[index] = value;
    };
    const getGameboard = () => gameboard;
    return {getGameboard, setValue};
})();

const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return {getName, getMark};
}


const displayController = (() => {
    let player = Player('human', 'X')
    let computer = Player('cpu', 'O')

    let gameboardDiv = document.querySelector('#gameboard');
    const renderGameboard = () => {
        clearCells();
        drawCells();
    }

    const drawCells = () => {
        let gameboardArray = Gameboard.getGameboard();
        for (let i = 0; i < gameboardArray.length; i++) {
            let cell = document.createElement('div');
            cell.setAttribute('data-cell', i);
            cell.classList.add('cell');

            if (gameboardArray[i] === '-') {
                cell.addEventListener('click', addMark)
            }

            cell.textContent = gameboardArray[i];
            
            gameboardDiv.appendChild(cell);
        }
    };

    const clearCells = () => {
        while (gameboardDiv.firstChild) {
            gameboardDiv.removeChild(gameboardDiv.lastChild);
          }
    };

    const addMark = () => {
        let cellIndex = event.currentTarget.getAttribute('data-cell');
        Gameboard.setValue(cellIndex, player.getMark());
        console.log(player.getMark());
        renderGameboard()
    };

    return {renderGameboard};
})();



displayController.renderGameboard();