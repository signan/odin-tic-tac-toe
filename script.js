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
    let winner = null;

    let gameboardDiv = document.querySelector('#gameboard');
    const renderGameboard = () => {
        clearCells();
        drawCells();
    };

    const drawCells = () => {
        let gameboardArray = Gameboard.getGameboard();
        for (let i = 0; i < gameboardArray.length; i++) {
            let cell = document.createElement('div');
            cell.setAttribute('data-cell', i);
            cell.classList.add('cell');

            if (gameboardArray[i] === '-') {
                cell.addEventListener('click', userPlay)
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

    const addMark = (player, space) => {
        Gameboard.setValue(space, player.getMark());
        renderGameboard();
        console.log(`is the game over? ${isGameover()}. winner is ${winner}`);
    };

    const userPlay = () => {
        let spaceIndex = event.currentTarget.getAttribute('data-cell');
        addMark(player, spaceIndex);
        computerPlay();
    };

    const computerPlay = () => {
        let spaceIndex = pickRandomSpace()
        addMark(computer, spaceIndex);
    };

    const pickRandomSpace = () => {
        let gb = Gameboard.getGameboard();
        let availableSpaces = [];
        for (let i = 0; i < gb.length; i++) {
            if (gb[i] === '-') availableSpaces.push(i);
        }
        
        return randomChoice = availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
    };

    const isGameover = () => {
        checkWinner(player);
        checkWinner(computer);
        return Boolean(winner) || isDraw();
    };

    const isDraw = () => {
        // check if the game doesn't include a '-'. if it does, it means that there are still spaces left in the board
        return !Gameboard.getGameboard().includes('-');
    };

    const checkWinner = (player) => {
        // checks if the given player won
        if (checkVertical(player) || checkHorizontal(player) || checkDiagonal (player)) {
            winner = player.getName();
        }
    };

    const checkVertical = (player) => {
        // return true if the player won on vertical placement
        let gb = Gameboard.getGameboard();
        let mark = player.getMark();
        return (gb[0] === mark && gb[3] === mark && gb[6] === mark) ||
                (gb[1] === mark && gb[4] === mark && gb[7] === mark) ||
                (gb[2] === mark && gb[5] === mark && gb[8] === mark)
    };

    const checkHorizontal = (player) => {
        // return true if the player won on horizontal placement
        let gb = Gameboard.getGameboard();
        let mark = player.getMark();
        return (gb[0] === mark && gb[1] === mark && gb[2] === mark) ||
                (gb[3] === mark && gb[4] === mark && gb[5] === mark) ||
                (gb[6] === mark && gb[7] === mark && gb[8] === mark)
    };

    const checkDiagonal = (player) => {
        // return true if the player won on diagonal placement
        let gb = Gameboard.getGameboard();
        let mark = player.getMark();
        return (gb[0] === mark && gb[4] === mark && gb[8] === mark) ||
                (gb[2] === mark && gb[4] === mark && gb[6] === mark)
    };

    
    
    return {renderGameboard};
})();



displayController.renderGameboard();