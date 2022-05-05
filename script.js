const Gameboard = (() => {
    let gameboard = ['-', '-', '-', '-', '-', '-', '-', '-', '-']

    const setValue = (index, value) => {
        gameboard[index] = value;
    };

    const isFull = () => {
        // if gameboard has '-', it means that there are still spaces left in the board and therefore, not full
        return !gameboard.includes('-')
    };

    const getGameboard = () => gameboard;

    const resetBoard = () => {
        gameboard = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];
    };


    return {getGameboard, setValue, isFull, resetBoard};
})();

const Player = (name, mark) => {
    let score = 0;
    const getName = () => name;
    const getMark = () => mark;
    const getScore = () => score;
    const increamentScore = () => {
        score += 1;
    };
    const resetScore = () => {
        score = 0;
    };
    return {getName, getMark, getScore, increamentScore, resetScore};
}


const displayController = (() => {
    let player = Player('human', 'X')
    let computer = Player('cpu', 'O')
    let roundWinner = null;
    let gameWinner = null;

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
    
    const resetRound = () => {
        Gameboard.resetBoard();
        roundWinner = null;
        renderGameboard();
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
        checkRoundWinner(player);
        checkRoundWinner(computer);
        if (Boolean(roundWinner)) {
            console.log(`the winner is ${roundWinner}`);
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

    const checkGameWinner = (player) => {
        if (player.getScore === 3) {
            gameWinner = player.getName();
            console.log(`game winner is ${gameWinner}`);
        }
    };

    const checkRoundWinner = (player) => {
        // checks if the given player won
        if (checkVertical(player) || checkHorizontal(player) || checkDiagonal (player)) {
            player.increamentScore();
            roundWinner = player.getName();
            checkGameWinner(player);
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
        if (gameWinner) {
            console.log("game won by " + gameWinner);
        }

        if (!isGameover()) {
             // if the game isn't over (no tie or no winner), make the user play
            let spaceIndex = event.currentTarget.getAttribute('data-cell');
            userPlay(spaceIndex);
        }
        else {
            // to stop the second condition from executing
            return;
        }

        if (!isGameover()) {
            // if the game still isn't over , make the computer play
            computerPlay();
            isGameover();
        }
        resetRound();
    };

    
    return {renderGameboard};
})();



displayController.renderGameboard();