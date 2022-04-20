const Gameboard = (() => {
    let gameboard = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    return {gameboard};
})();


const displayController = (() => {
    return true;
})();

const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return {getName, getMark};
}
