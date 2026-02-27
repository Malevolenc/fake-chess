import checkSquare from "./checkSquare";
import { Coordinate } from "./CoordinateClass";
import { PieceDetection } from "./PieceDetectionClass";
import createMoveObject from "./createMoveObject";
import squareIsAttacked from "./squareIsAttacked";

export class PieceMovement{
    static queenMovement(chessBoardArray, iRow,iColumn, currentTurn, moveNumber){
        let possibleMoves = [
            ...PieceDetection.checkHorizontal(chessBoardArray,iRow,iColumn, currentTurn, moveNumber),
            ...PieceDetection.checkVertical(chessBoardArray,iRow,iColumn, currentTurn, moveNumber),
            ...PieceDetection.checkDiagonal(chessBoardArray,iRow,iColumn, currentTurn, moveNumber)
        ]

        return possibleMoves
    }

    static rookMovement(chessBoardArray, iRow,iColumn, currentTurn, moveNumber){
        let possibleMoves = [
            ...PieceDetection.checkVertical(chessBoardArray, iRow, iColumn, currentTurn, moveNumber),
            ...PieceDetection.checkHorizontal(chessBoardArray,iRow,iColumn, currentTurn, moveNumber),
        ]

        return possibleMoves
    }

    static bishopMovement(chessBoardArray, iRow,iColumn, currentTurn, moveNumber){
        let possibleMoves = [...PieceDetection.checkDiagonal(chessBoardArray,iRow,iColumn, currentTurn, moveNumber)]

        return possibleMoves
    }

    static pawnMovement(chessBoardArray, iRow, iColumn, currentTurn, moveNumber, enPassantTarget){
        let dir = currentTurn === "white" ? -1 : 1
        let enPassantRows = currentTurn === "white" ? 3 : 4
        let promotionRow = currentTurn === "white" ? 0 : 7
        let moveObjects = []

        let newRow = iRow + dir;

        // Making sure that the newRow is in the bounds of the board
        if (newRow >= 0 && newRow <= 7){
             // One Move Forward
            if (!chessBoardArray[newRow][iColumn]){
                if (newRow != promotionRow){
                    moveObjects.push(createMoveObject(
                    Coordinate.indicesToCoords(iRow,iColumn),
                    Coordinate.indicesToCoords(newRow, iColumn),
                    chessBoardArray[iRow][iColumn],
                    chessBoardArray[newRow][iColumn],
                    currentTurn,
                    moveNumber,
                    false,
                    false,
                    false,
                    ""))
                } else{
                    for (const piece of ["Q", "R", "B", "N"]){
                        moveObjects.push(createMoveObject(
                        Coordinate.indicesToCoords(iRow,iColumn),
                        Coordinate.indicesToCoords(newRow, iColumn),
                        chessBoardArray[iRow][iColumn],
                        chessBoardArray[newRow][iColumn],
                        currentTurn,
                        moveNumber,
                        false,
                        false,
                        false,
                        currentTurn == "white" ? piece : piece.toLowerCase()
                        ))
                    }
                }
                
                // Two Moves Forward
                const startingRow = currentTurn === "white" ? 6 : 1

                if (iRow === startingRow){
                    let twoForwardRows = iRow + (dir*2)
                    if (!chessBoardArray[twoForwardRows][iColumn]){
                        moveObjects.push(createMoveObject(
                            Coordinate.indicesToCoords(iRow,iColumn),
                            Coordinate.indicesToCoords(twoForwardRows, iColumn),
                            chessBoardArray[iRow][iColumn],
                            chessBoardArray[twoForwardRows][iColumn],
                            currentTurn,
                            moveNumber
                        ))
                    }
                }
            }
            // Left Diagonal Captures for pieces not in A-File
            if (iColumn > 0){
                if (chessBoardArray[newRow][iColumn-1] && PieceDetection.checkPieceColour(chessBoardArray[newRow][iColumn-1]) !== currentTurn){
                    if (newRow != promotionRow){
                        moveObjects.push(createMoveObject(
                        Coordinate.indicesToCoords(iRow,iColumn),
                        Coordinate.indicesToCoords(newRow, iColumn-1),
                        chessBoardArray[iRow][iColumn],
                        chessBoardArray[newRow][iColumn-1],
                        currentTurn,
                        moveNumber,
                        false,
                        false,
                        false,
                        ""
                    ))
                    } else{
                        for (const piece of ["Q", "R", "B", "N"]){
                            moveObjects.push(createMoveObject(
                            Coordinate.indicesToCoords(iRow,iColumn),
                            Coordinate.indicesToCoords(newRow, iColumn-1),
                            chessBoardArray[iRow][iColumn],
                            chessBoardArray[newRow][iColumn-1],
                            currentTurn,
                            moveNumber,
                            false,
                            false,
                            false,
                            currentTurn == "white" ? piece : piece.toLowerCase()
                            ))
                        }
                    }
                }

                if (iRow == enPassantRows && Coordinate.indicesToCoords(newRow, iColumn-1) === enPassantTarget){
                    moveObjects.push(createMoveObject(
                        Coordinate.indicesToCoords(iRow,iColumn),
                        Coordinate.indicesToCoords(newRow, iColumn-1),
                        chessBoardArray[iRow][iColumn],
                        chessBoardArray[iRow][iColumn-1],
                        currentTurn,
                        moveNumber,
                        false,
                        true,
                        false
                    ))
                }
                
            }

            // Right Diagonal Captures for pieces not in H-File
            if (iColumn < 7){
                if (chessBoardArray[newRow][iColumn+1] && PieceDetection.checkPieceColour(chessBoardArray[newRow][iColumn+1]) !== currentTurn){
                    if (newRow != promotionRow){
                        moveObjects.push(createMoveObject(
                        Coordinate.indicesToCoords(iRow,iColumn),
                        Coordinate.indicesToCoords(newRow, iColumn+1),
                        chessBoardArray[iRow][iColumn],
                        chessBoardArray[newRow][iColumn+1],
                        currentTurn,
                        moveNumber,
                        false,
                        false,
                        false,
                        ""))
                    } else{
                        for (const piece of ["Q", "R", "B", "N"]){
                            moveObjects.push(createMoveObject(
                            Coordinate.indicesToCoords(iRow,iColumn),
                            Coordinate.indicesToCoords(newRow, iColumn+1),
                            chessBoardArray[iRow][iColumn],
                            chessBoardArray[newRow][iColumn+1],
                            currentTurn,
                            moveNumber,
                            false,
                            false,
                            false,
                            currentTurn == "white" ? piece : piece.toLowerCase()
                            ))
                        }
                    }
                }

                if (iRow == enPassantRows && Coordinate.indicesToCoords(newRow, iColumn+1) === enPassantTarget){
                    moveObjects.push(createMoveObject(
                        Coordinate.indicesToCoords(iRow,iColumn),
                        Coordinate.indicesToCoords(newRow, iColumn+1),
                        chessBoardArray[iRow][iColumn],
                        chessBoardArray[iRow][iColumn+1],
                        currentTurn,
                        moveNumber,
                        false,
                        true,
                        false
                    ))
                }
            }
        }
        return moveObjects
    }

    static knightMovement(chessBoardArray, iRow, iColumn, currentTurn, moveNumber){
        let moveObjects = []
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
                moveObjects.push(createMoveObject(
                    Coordinate.indicesToCoords(iRow,iColumn),
                    Coordinate.indicesToCoords(row, column),
                    chessBoardArray[iRow][iColumn],
                    chessBoardArray[row][column],
                    currentTurn,
                    moveNumber,
                    false,
                    false,
                    false
                ))
                
            }
        }

        return moveObjects
    }

    static kingMovement(chessBoardArray, iRow, iColumn, currentTurn, moveNumber, castlingRights){
        let moveObjects = []
        let directions = [
            [-1,-1],[-1,0],[-1,1],
            [0,-1],        [0,1],
            [1,-1],[1,0],[1,1]
        ]
        let {
            whiteKingSide, whiteQueenSide,
            blackKingSide, blackQueenSide
        } = castlingRights

        for (const [dR, dC] of directions){
            let row = iRow+dR
            let column = iColumn+dC

            if (row >= 0 && row < 8 && column >= 0 && column < 8){
                if (chessBoardArray[row][column]){
                    if (PieceDetection.checkPieceColour(chessBoardArray[row][column]) === currentTurn){
                        continue
                    }
                }
                moveObjects.push(createMoveObject(
                    Coordinate.indicesToCoords(iRow,iColumn),
                    Coordinate.indicesToCoords(row, column),
                    chessBoardArray[iRow][iColumn],
                    chessBoardArray[row][column],
                    currentTurn,
                    moveNumber,
                    false,
                    false,
                    false
                ))
            }
        }

        if (currentTurn == "white"){
            if (whiteKingSide) {
                if (chessBoardArray[7][7] === "R" && // rook exists
                    !chessBoardArray[7][5] &&
                    !chessBoardArray[7][6] && // If f1 and g1 are not occupied
                    !squareIsAttacked("e1", chessBoardArray, "black") &&
                    !squareIsAttacked("f1", chessBoardArray, "black") &&
                    !squareIsAttacked("g1", chessBoardArray, "black")){

                        moveObjects.push(createMoveObject(
                            Coordinate.indicesToCoords(iRow,iColumn),
                            Coordinate.indicesToCoords(iRow,iColumn+2),
                            chessBoardArray[iRow][iColumn],
                            chessBoardArray[iRow][iColumn+2],
                            currentTurn,
                            moveNumber,
                            true,
                            false,
                            false
                        ))
                }
            }
            if (whiteQueenSide) {
                if (chessBoardArray[7][0] === "R" && // rook exists
                    !chessBoardArray[7][3] &&
                    !chessBoardArray[7][2] && // If d1 and c1 are not occupied 
                    !squareIsAttacked("e1", chessBoardArray, "black") &&
                    !squareIsAttacked("d1", chessBoardArray, "black") &&
                    !squareIsAttacked("c1", chessBoardArray, "black") &&
                    !squareIsAttacked("c1", chessBoardArray, "black")){

                        moveObjects.push(createMoveObject(
                            Coordinate.indicesToCoords(iRow,iColumn),
                            Coordinate.indicesToCoords(iRow,iColumn-2),
                            chessBoardArray[iRow][iColumn],
                            chessBoardArray[iRow][iColumn-2],
                            currentTurn,
                            moveNumber,
                            true,
                            false,
                            false
                        ))
                }
            }
        } else if (currentTurn == "black"){
            if (blackKingSide) {
                if (chessBoardArray[0][7] === "r" && // rook exists
                    !chessBoardArray[0][5] &&
                    !chessBoardArray[0][6] && // If f8 and g8 are not occupied
                    !squareIsAttacked("e8", chessBoardArray, "white") &&
                    !squareIsAttacked("f8", chessBoardArray, "white") &&
                    !squareIsAttacked("g8", chessBoardArray, "white")){

                        moveObjects.push(createMoveObject(
                            Coordinate.indicesToCoords(iRow,iColumn),
                            Coordinate.indicesToCoords(iRow,iColumn+2),
                            chessBoardArray[iRow][iColumn],
                            chessBoardArray[iRow][iColumn+2],
                            currentTurn,
                            moveNumber,
                            true,
                            false,
                            false
                        ))
                }
            }
            if (blackQueenSide) {
                if (chessBoardArray[0][0] === "r" && // rook exists
                    !chessBoardArray[0][3] &&
                    !chessBoardArray[0][2] && // If d8 and c8 are not occupied 
                    !squareIsAttacked("e8", chessBoardArray, "white") &&
                    !squareIsAttacked("d8", chessBoardArray, "white") &&
                    !squareIsAttacked("c8", chessBoardArray, "white") &&
                    !squareIsAttacked("c8", chessBoardArray, "white")){

                        moveObjects.push(createMoveObject(
                            Coordinate.indicesToCoords(iRow,iColumn),
                            Coordinate.indicesToCoords(iRow,iColumn-2),
                            chessBoardArray[iRow][iColumn],
                            chessBoardArray[iRow][iColumn-2],
                            currentTurn,
                            moveNumber,
                            true,
                            false,
                            false
                        ))
                }
            }
        }
        return moveObjects
    }
}