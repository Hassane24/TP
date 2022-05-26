function gameBoard(size) {
  const board = {
    cells: [],
    size,
  };

  const getCells = () => board.cells;

  const createCells = () => {
    for (let i = 1; i <= board.size * board.size; i++) {
      if (i === 9)
        return board.cells.push({ value: "X", position: i, isXCell: true });
      else board.cells.push({ value: i, position: i, isXCell: false });
    }
  };

  const randomizeCellValues = () => {
    for (let i = board.cells.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = board.cells[i].value;
      board.cells[i].value = board.cells[j].value;
      board.cells[j].value = temp;
      let tempTwo = board.cells[i].isXCell;
      board.cells[i].isXCell = board.cells[j].isXCell;
      board.cells[j].isXCell = tempTwo;
    }
  };

  const moveLeft = () => {
    const cellX = getCellX();
    const leftCell = getLeftCell();
    if (leftCell) swapValues(cellX, leftCell);
  };

  const moveRight = () => {
    const cellX = getCellX();
    const rightCell = getRightCell();
    if (rightCell) swapValues(cellX, rightCell);
  };

  const moveUp = () => {
    const cellX = getCellX();
    const aboveCell = getAboveCell();
    if (aboveCell) swapValues(cellX, aboveCell);
  };

  const moveDown = () => {
    const cellX = getCellX();
    const belowCell = getBelowCell();
    if (belowCell) swapValues(cellX, belowCell);
  };

  const getRightCell = () => {
    const cellX = getCellX();
    const rightCol = [3, 6, 9];
    if (checkForCollisions(rightCol, cellX)) return null;
    const rightCell = getCellByPosition(cellX.position + 1);
    return rightCell;
  };

  const getLeftCell = () => {
    const cellX = getCellX();
    const leftCol = [1, 4, 7];
    if (checkForCollisions(leftCol, cellX)) return null;
    const leftCell = getCellByPosition(cellX.position - 1);
    return leftCell;
  };

  const getAboveCell = () => {
    const cellX = getCellX();
    const upperRow = [1, 2, 3];
    if (checkForCollisions(upperRow, cellX)) return null;
    const aboveCell = getCellByPosition(cellX.position - size);
    return aboveCell;
  };

  const getBelowCell = () => {
    const cellX = getCellX();
    const lowerRow = [7, 8, 9];
    if (checkForCollisions(lowerRow, cellX)) return null;
    const belowCell = getCellByPosition(cellX.position + size);
    return belowCell;
  };

  const swapValues = (cellOne, cellTwo) => {
    let temp = cellOne.value;
    cellOne.value = cellTwo.value;
    cellTwo.value = temp;
    let tempTwo = cellOne.isXCell;
    cellOne.isXCell = cellTwo.isXCell;
    cellTwo.isXCell = tempTwo;
  };

  const getCellX = () => board.cells.find((item) => item.isXCell);

  const checkForCollisions = (array, value) => array.includes(value.position);

  const getCellByPosition = (pos) =>
    board.cells.find((cell) => cell.position === pos);

  return {
    getCells,
    createCells,
    randomizeCellValues,
    moveDown,
    moveLeft,
    moveRight,
    moveUp,
    swapValues,
    getAboveCell,
    getBelowCell,
    getRightCell,
    getLeftCell,
  };
}

function displayController() {
  const cells = document.querySelectorAll(".cell");
  let board = gameBoard(3);
  board.createCells();
  board.randomizeCellValues();

  const init = () => {
    renderCellValues();
    bindEvents();
  };

  const renderCellValues = () => {
    for (let i = 0; i < board.getCells().length; i++) {
      cells[i].textContent = board.getCells()[i].value;
    }
  };

  const handleKeyEvent = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        board.moveLeft();
        break;
      case "ArrowRight":
        board.moveRight();
        break;
      case "ArrowUp":
        board.moveUp();
        break;
      case "ArrowDown":
        board.moveDown();
        break;
    }
    renderCellValues();
  };

  const bindEvents = () => {
    document.addEventListener("keydown", handleKeyEvent);
  };

  return { init };
}

displayController().init();
