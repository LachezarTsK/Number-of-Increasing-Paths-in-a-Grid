
using System;

public class Solution
{
    private static readonly int[][] MOVES = new int[4][]
    {
       new int[]{ -1, 0 }, new int[]{ 1, 0 }, new int[]{ 0, -1 }, new int[] { 0, 1 }
    };

    private static readonly int MODULO = (int)Math.Pow(10, 9) + 7;

    private int rows;
    private int columns;
    private int[,] memoizationGrid;

    public int CountPaths(int[][] grid)
    {
        rows = grid.Length;
        columns = grid[0].Length;
        memoizationGrid = new int[rows, columns];

        int totalStrictlyIncreasingPaths = 0;
        for (int r = 0; r < rows; ++r)
        {
            for (int c = 0; c < columns; ++c)
            {
                totalStrictlyIncreasingPaths = (totalStrictlyIncreasingPaths + depthFirstSearch(grid, r, c)) % MODULO;
            }
        }

        return totalStrictlyIncreasingPaths;
    }

    private int depthFirstSearch(int[][] grid, int row, int column)
    {
        if (memoizationGrid[row, column] > 0)
        {
            return memoizationGrid[row, column];
        }

        int lengthPath = 1;
        foreach (int[] move in MOVES)
        {
            int nextRow = row + move[0];
            int nextColumn = column + move[1];
            if (pointIsInGrid(nextRow, nextColumn) && grid[row][column] > grid[nextRow][nextColumn])
            {
                lengthPath = (lengthPath + depthFirstSearch(grid, nextRow, nextColumn)) % MODULO;
            }
        }
        memoizationGrid[row, column] = lengthPath;
        return lengthPath;
    }

    private bool pointIsInGrid(int row, int column)
    {
        return row >= 0 && row < rows && column >= 0 && column < columns;
    }
}
