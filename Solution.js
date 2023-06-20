
/**
 * @param {number[][]} grid
 * @return {number}
 */
var countPaths = function (grid) {
    this.MOVES = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    this.MODULO = Math.pow(10, 9) + 7;
    this.rows = grid.length;
    this.columns = grid[0].length;
    this.memoizationGrid = Array.from(new Array(this.rows), () => new Array(this.columns).fill(0));

    let totalStrictlyIncreasingPaths = 0;
    for (let r = 0; r < this.rows; ++r) {
        for (let c = 0; c < this.columns; ++c) {
            totalStrictlyIncreasingPaths = (totalStrictlyIncreasingPaths + depthFirstSearch(grid, r, c)) % this.MODULO;
        }
    }

    return totalStrictlyIncreasingPaths;
};

/**
 * @param {number[][]} grid
 * @param {number} row
 * @param {number} column  
 * @return {number}
 */
function depthFirstSearch(grid, row, column) {
    if (this.memoizationGrid[row][column] > 0) {
        return this.memoizationGrid[row][column];
    }

    let lengthPath = 1;
    for (let move of this.MOVES) {
        let nextRow = row + move[0];
        let nextColumn = column + move[1];
        if (pointIsInGrid(nextRow, nextColumn) && grid[row][column] > grid[nextRow][nextColumn]) {
            lengthPath = (lengthPath + depthFirstSearch(grid, nextRow, nextColumn)) % this.MODULO;
        }
    }
    this.memoizationGrid[row][column] = lengthPath;
    return lengthPath;
}

/**
 * @param {number} row
 * @param {number} column  
 * @return {boolean}
 */
function pointIsInGrid(row, column) {
    return row >= 0 && row < this.rows && column >= 0 && column < this.columns;
}
