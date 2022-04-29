const Gameboard = (() => {
    let gameboard = ['-', '-', '-', '-', '-', '-', '-', '-', '-']
    const setValue = (index, value) => {
        gameboard[index] = value;
    };

    // if gameboard has '-', it means that there are still spaces left in the board and therefore, not full
    const isFull = () => {
        return !gameboard.includes('-')
    };
    const getGameboard = () => gameboard;
    return {getGameboard, setValue, isFull};
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
                cell.addEventListener('click', playRound)
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
    };

    const userPlay = (index) => {
        addMark(player, index);
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
        if (Boolean(winner)) {
            console.log(`the winner is ${winner}`);
            return true;
        }

        if (isDraw()) {
            console.log('the game is a draw');
            return true;
        }
    };

    const isDraw = () => {
        // return true if there are no spaces left in the board.
        return Gameboard.isFull();
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

    const playRound = () => {
        // if the game isn't over (tie or no winner), make the user play
        if (!isGameover()) {
            let spaceIndex = event.currentTarget.getAttribute('data-cell');
            userPlay(spaceIndex);
        }

        // if the game still isn't over , make the computer play
        if (!isGameover()) {
            computerPlay();
            isGameover();
        }
    };
    
    return {renderGameboard};
})();



displayController.renderGameboard();