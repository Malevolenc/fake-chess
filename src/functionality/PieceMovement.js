import checkSquare from "./checkSquare";
import { Coordinate } from "./CoordinateClass";
import { PieceDetection } from "./PieceDetectionClass";

export class PieceMovement{
    static queenMovement(chessBoardArray, iRow,iColumn, currentTurn){
        let possibleMoves = [
            ...PieceDetection.checkHorizontal(chessBoardArray,iRow,iColumn, currentTurn),
            ...PieceDetection.checkVertical(chessBoardArray,iRow,iColumn, currentTurn),
            ...PieceDetection.checkDiagonal(chessBoardArray,iRow,iColumn, currentTurn)
        ]

        return possibleMoves
    }

    static rookMovement(chessBoardArray, iRow,iColumn, currentTurn){
        let possibleMoves = [
            ...PieceDetection.checkVertical(chessBoardArray, iRow, iColumn, currentTurn),
            ...PieceDetection.checkHorizontal(chessBoardArray,iRow,iColumn, currentTurn),
        ]

        return possibleMoves
    }

    static bishopMovement(chessBoardArray, iRow,iColumn, currentTurn){
        let possibleMoves = [...PieceDetection.checkDiagonal(chessBoardArray,iRow,iColumn, currentTurn)]

        return possibleMoves
    }

    static pawnMovement(chessBoardArray, iRow, iColumn, currentTurn){
        let dir = currentTurn === "white" ? -1 : 1
        let possibleMoves = []

        let newRow = iRow + dir;

        // Making sure that the newRow is in the bounds of the board
        if (newRow >= 0 && newRow <= 7){
             // One Move Forward
            if (!chessBoardArray[newRow][iColumn]){
                possibleMoves.push(Coordinate.indicesToCoords(iRow+dir,iColumn))


                // Two Moves Forward
                const startingRow = currentTurn === "white" ? 6 : 1

                if (iRow === startingRow){
                    let twoForwardRows = iRow + (dir*2)
                    if (!chessBoardArray[twoForwardRows][iColumn]){
                        possibleMoves.push(Coordinate.indicesToCoords(twoForwardRows,iColumn))
                    }
                }
            }

            // Left Diagonal Captures for pieces not in A-File
            if (iColumn > 0){
                if (chessBoardArray[newRow][iColumn-1] && PieceDetection.checkPieceColour(chessBoardArray[newRow][iColumn-1]) !== currentTurn){
                    possibleMoves.push(Coordinate.indicesToCoords(newRow,iColumn-1))
                }
            }

            // Right Diagonal Captures for pieces not in H-File
            if (iColumn < 7){
                if (chessBoardArray[newRow][iColumn+1] && PieceDetection.checkPieceColour(chessBoardArray[newRow][iColumn+1]) !== currentTurn){
                    possibleMoves.push(Coordinate.indicesToCoords(newRow,iColumn+1))
                }
            }
        }
        
        return possibleMoves
    }

    static knightMovement(chessBoardArray, iRow, iColumn, currentTurn){
        let possibleMoves = []
        let directions = [
                [-2, -1],       [-2, 1],
        [-1, -2],                       [-1, 2],
        [1, -2],                        [1, 2],
                [2, -1],        [2, 1]
        ]

        for (const [dR, dC] of directions){
            let row = iRow+dR
            let column = iColumn+dC

            if (row >= 0 && row < 8 && column >= 0 && column < 8){
                if (chessBoardArray[row][column]){
                    if (PieceDetection.checkPieceColour(chessBoardArray[row][column]) === currentTurn){
                        continue
                    }
                }
                possibleMoves.push(Coordinate.indicesToCoords(row,column))
                
            }
        }

        return possibleMoves
    }

    static kingMovement(chessBoardArray, iRow, iColumn, currentTurn){
        let possibleMoves = []
        let directions = [
            [-1,-1],[-1,0],[-1,1],
            [0,-1],        [0,1],
            [1,-1],[1,0],[1,1]
        ]

        for (const [dR, dC] of directions){
            let row = iRow+dR
            let column = iColumn+dC

            if (row >= 0 && row < 8 && column >= 0 && column < 8){
                if (chessBoardArray[row][column]){
                    if (PieceDetection.checkPieceColour(chessBoardArray[row][column]) === currentTurn){
                        continue
                    }
                }
                possibleMoves.push(Coordinate.indicesToCoords(row,column))
                
            }
        }

        return possibleMoves
    }
}