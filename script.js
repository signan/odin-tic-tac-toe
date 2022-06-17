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
    let logDiv = document.querySelector('#log')

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
                cell.addEventListener('click', playTurn)
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
        renderGameboard();
    };

    const restartGame = () => {
        gameWinner = null;
        resetRound();
    };
    
    const addMark = (player, space) => {
        Gameboard.setValue(space, player.getMark());
        renderGameboard();
    };

    const userPlay = (spaceIndex) => {
        addMark(player, spaceIndex);
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
        if (player.getScore() === 3) {
            gameWinner = player.getName();
            gameWinnerScreen(player);
        }
    };

    const checkRoundWinner = (playerToCheck) => {
        // checks if the given player won
        if (checkVertical(playerToCheck) || checkHorizontal(playerToCheck) || checkDiagonal (playerToCheck)) {
            playerToCheck.increamentScore();
            addToLog(`${playerToCheck.getName()}: ${player.getScore()} - ${computer.getScore()}`)
            checkGameWinner(playerToCheck);
            resetRound()
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

    const addToLog = (massege) => {
        let h3 = document.createElement('h3');
        h3.textContent = massege
        logDiv.appendChild(h3)        
    };

    const gameWinnerScreen = (winner) => {
        let winningScreen = document.createElement('div');
        winningScreen.setAttribute('id', 'overlay')
        let massege = document.createElement('h1');
        massege.textContent = `${winner.getName()} won the game with a score of ${player.getScore()} - ${computer.getScore()}`;
        let restartButton = document.createElement('button');
        restartButton.addEventListener('click', restartGame);
        restartButton.textContent = 'Restart Game?'
        winningScreen.appendChild(massege);
        winningScreen.appendChild(restartButton);
        logDiv.appendChild(winningScreen);

    };

    const playTurn = () => {
        let spaceIndex = event.currentTarget.getAttribute('data-cell');
        userPlay(spaceIndex);
        checkRoundWinner(player)
        computerPlay();
        checkRoundWinner(computer)
        if (Gameboard.isFull()) {
            addToLog('DRAW!! Resetting board...')
            resetRound();
        }
    };

    
    return {renderGameboard};
})();



displayController.renderGameboard();