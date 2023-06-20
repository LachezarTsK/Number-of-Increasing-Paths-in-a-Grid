
#include <cmath>
#include <array>
#include <vector>
using namespace std;

class Solution {
    
    inline static const array<array<int, 2>, 4> MOVES{ {{-1, 0}, {1, 0}, {0, -1}, {0, 1}} };
    inline static const int MODULO = pow(10, 9) + 7;
    int rows;
    int columns;
    vector<vector<int>> memoizationGrid;

public:
    int countPaths(const vector<vector<int>>& grid) {
        rows = grid.size();
        columns = grid[0].size();
        memoizationGrid.resize(rows, vector<int>(columns));

        int totalStrictlyIncreasingPaths = 0;
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < columns; ++c) {
                totalStrictlyIncreasingPaths = (totalStrictlyIncreasingPaths + depthFirstSearch(grid, r, c)) % MODULO;
            }
        }

        return totalStrictlyIncreasingPaths;
    }

private:
    int depthFirstSearch(const vector<vector<int>>& grid, int row, int column) {
        if (memoizationGrid[row][column] > 0) {
            return memoizationGrid[row][column];
        }

        int lengthPath = 1;
        for (const auto& move : MOVES) {
            int nextRow = row + move[0];
            int nextColumn = column + move[1];
            if (pointIsInGrid(nextRow, nextColumn) && grid[row][column] > grid[nextRow][nextColumn]) {
                lengthPath = (lengthPath + depthFirstSearch(grid, nextRow, nextColumn)) % MODULO;
            }
        }
        memoizationGrid[row][column] = lengthPath;
        return lengthPath;
    }

    bool pointIsInGrid(int row, int column) const {
        return row >= 0 && row < rows && column >= 0 && column < columns;
    }
};
