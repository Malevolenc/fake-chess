import { Coordinate } from "./CoordinateClass";
import { PieceDetection } from "./PieceDetectionClass";

export class PieceMovement{
    static queenMovement(chessBoardArray, iRow,iColumn, fRow, fColumn, currentTurn){
        let possibleMoves = [
            ...PieceDetection.checkHorizontal(chessBoardArray,iRow,iColumn, currentTurn),
            ...PieceDetection.checkVertical(chessBoardArray,iRow,iColumn, currentTurn),
            ...PieceDetection.checkDiagonal(chessBoardArray,iRow,iColumn, currentTurn)
        ]

        if (!possibleMoves.includes(Coordinate.indicesToCoords(fRow,fColumn))){
            return false
        }

        return true
    }

    static rookMovement(chessBoardArray, iRow,iColumn,fRow,fColumn, currentTurn){
        let possibleMoves = [
            ...PieceDetection.checkVertical(chessBoardArray,iRow,iColumn, currentTurn),
            ...PieceDetection.checkHorizontal(chessBoardArray,iRow,iColumn, currentTurn),
        ]
        
        if (!possibleMoves.includes(Coordinate.indicesToCoords(fRow,fColumn))){
            return false
        }

        return true
    }

    static bishopMovement(chessBoardArray, iRow,iColumn,fRow,fColumn, currentTurn){
        let possibleMoves = [...PieceDetection.checkDiagonal(chessBoardArray,iRow,iColumn, currentTurn)]
        
        if (!possibleMoves.includes(Coordinate.indicesToCoords(fRow,fColumn))){
            return false
        }

        return true
    }

    static pawnMovement(chessBoardArray, iRow, iColumn,fRow,fColumn, currentTurn){
        let dir = currentTurn == "white" ? -1 : 1

        let possibleMoves = []

        if (currentTurn == "white"){
            if (iRow == 6){
                if (!chessBoardArray[iRow+(dir*2)][iColumn]){
                    possibleMoves.push(Coordinate.indicesToCoords(iRow+(dir*2),iColumn))
                }
            }
            if (iColumn == 0 && PieceDetection.checkPieceColour(chessBoardArray[iRow+dir][iColumn-dir]) != currentTurn){
                possibleMoves.push(Coordinate.indicesToCoords(iRow+dir,iColumn-dir))
            }

            else if (iColumn == 7 && PieceDetection.checkPieceColour(chessBoardArray[iRow+dir][iColumn+dir]) != currentTurn){
                possibleMoves.push(Coordinate.indicesToCoords(iRow+dir,iColumn+dir))
            }

            else{
                if (chessBoardArray[iRow+dir][iColumn-dir] && PieceDetection.checkPieceColour(chessBoardArray[iRow+dir][iColumn-dir]) != currentTurn){
                    possibleMoves.push(Coordinate.indicesToCoords(iRow+dir,iColumn-dir))
                }

                if (chessBoardArray[iRow+dir][iColumn+dir] && PieceDetection.checkPieceColour(chessBoardArray[iRow+dir][iColumn+dir]) != currentTurn){
                    possibleMoves.push(Coordinate.indicesToCoords(iRow+dir,iColumn+dir))
                }
            }
        } 

        if (currentTurn == "black"){
            if (iRow == 1){
                if (!chessBoardArray[iRow+(dir*2)][iColumn]){
                    possibleMoves.push(Coordinate.indicesToCoords(iRow+(dir*2),iColumn))
                }
            }

            if (iColumn == 0 && PieceDetection.checkPieceColour(chessBoardArray[iRow+dir][iColumn+dir]) != currentTurn){
                possibleMoves.push(Coordinate.indicesToCoords(iRow+dir,iColumn+dir))
            }

            else if (iColumn == 7 && PieceDetection.checkPieceColour(chessBoardArray[iRow+dir][iColumn-dir]) != currentTurn){
                possibleMoves.push(Coordinate.indicesToCoords(iRow+dir,iColumn-dir))
            }

            else{
                if (chessBoardArray[iRow+dir][iColumn-dir] && PieceDetection.checkPieceColour(chessBoardArray[iRow+dir][iColumn-dir]) != currentTurn){
                    possibleMoves.push(Coordinate.indicesToCoords(iRow+dir,iColumn-dir))
                }

                if (chessBoardArray[iRow+dir][iColumn+dir] && PieceDetection.checkPieceColour(chessBoardArray[iRow+dir][iColumn+dir]) != currentTurn){
                    possibleMoves.push(Coordinate.indicesToCoords(iRow+dir,iColumn+dir))
                }

            }
        }

        if (!chessBoardArray[iRow+dir][iColumn]){
            possibleMoves.push(Coordinate.indicesToCoords(iRow+dir,iColumn))
        }

        if (!possibleMoves.includes(Coordinate.indicesToCoords(fRow,fColumn))){
            return false
        }

        // console.log(possibleMoves)
        return true
    }

    static knightMovement(chessBoardArray, iRow, iColumn,fRow,fColumn, currentTurn){
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
                    if (PieceDetection.checkPieceColour(chessBoardArray[row][column]) == currentTurn){
                        continue
                    }
                }
                possibleMoves.push(Coordinate.indicesToCoords(row,column))
                
            }
        }

        if (!possibleMoves.includes(Coordinate.indicesToCoords(fRow,fColumn))){
            return false
        }

        // console.log(possibleMoves)

        return true
    }

    static kingMovement(chessBoardArray, iRow, iColumn,fRow,fColumn, currentTurn){
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
                    if (PieceDetection.checkPieceColour(chessBoardArray[row][column]) == currentTurn){
                        continue
                    }
                }
                possibleMoves.push(Coordinate.indicesToCoords(row,column))
                
            }
        }

        if (!possibleMoves.includes(Coordinate.indicesToCoords(fRow,fColumn))){
            return false
        }

        console.log(possibleMoves)

        return true
    }
}