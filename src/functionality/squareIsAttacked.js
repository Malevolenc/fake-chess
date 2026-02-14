import { Coordinate } from "./CoordinateClass"
import { PieceDetection } from "./PieceDetectionClass"

export default function squareIsAttacked(currentSquare, chessBoardArray){
    const [iRow, iColumn] = Coordinate.coordsToIndices(currentSquare)
    const pieceColour = PieceDetection.checkPieceColour(chessBoardArray[iRow][iColumn])

    let diagonals = [
            [-1,-1], // Top Left
            [-1, 1], // Top Right
            [1, -1], // Bottom Left
            [1, 1], // Bottom Right
        ]

    let knightDirections = [
                [-2, -1],       [-2, 1],
        [-1, -2],                       [-1, 2],
        [1, -2],                        [1, 2],
                [2, -1],        [2, 1]
        ]

    let kingDirections = [
            [-1,-1], [-1,0], [-1,1],
            [0,-1],          [0,1],
            [1,-1],  [1,0],  [1,1]
        ]

    // Checks all squares left of the original square
    for (let i = iColumn-1; i >= 0; i--){
        // If the square being checked has a piece on it
        if (chessBoardArray[iRow][i]){
            if (pieceColour == "white"){
                if (chessBoardArray[iRow][i] == "q" || chessBoardArray[iRow][i] == "r"){
                    return true
                } else{
                    break
                }
            }
            else if (pieceColour == "black"){
                if (chessBoardArray[iRow][i] == "Q" || chessBoardArray[iRow][i] == "R"){
                    return true
                } else{
                    break
                }
            }
        }
    }

    // Checks all squares right of the original square
    for (let i = iColumn+1; i < 8; i++){
        // If the square being checked has a piece on it
        if (chessBoardArray[iRow][i]){
            if (pieceColour == "white"){
                if (chessBoardArray[iRow][i] == "q" || chessBoardArray[iRow][i] == "r"){
                    return true
                } else{
                    break
                }
            }
            else if (pieceColour == "black"){
                if (chessBoardArray[iRow][i] == "Q" || chessBoardArray[iRow][i] == "R"){
                    return true
                } else{
                    break
                }
            }
        }
    }

    // Checks all squares above the original square
    for (let i = iRow-1; i >= 0; i--){
        // If the square being checked has a piece on it
        if (chessBoardArray[i][iColumn]){
            if (pieceColour == "white"){
                if (chessBoardArray[i][iColumn] == "q" || chessBoardArray[i][iColumn] == "r"){
                    return true
                } else{
                    break
                }
            }
            else if (pieceColour == "black"){
                if (chessBoardArray[i][iColumn] == "Q" || chessBoardArray[i][iColumn] == "R"){
                    return true
                } else{
                    break
                }
            }
        }
    }

    // Checks all squares below the original square
    for (let i = iRow+1; i < 8; i++){
        // If the square being checked has a piece on it
        if (chessBoardArray[i][iColumn]){
            if (pieceColour == "white"){
                if (chessBoardArray[i][iColumn] == "q" || chessBoardArray[i][iColumn] == "r"){
                    return true
                } else{
                    break
                }
            }
            else if (pieceColour == "black"){
                if (chessBoardArray[i][iColumn] == "Q" || chessBoardArray[i][iColumn] == "R"){
                    return true
                } else{
                    break
                }
            }
        }
    }

    // Checks diagonally from the original square
    for (const [dR, dC] of diagonals){
        let row = iRow+dR
        let column = iColumn+dC

        while (row >= 0 && row < 8 && column >=0 && column < 8){
            if (chessBoardArray[row][column]){
                if (pieceColour == "white"){
                    if (chessBoardArray[row][column] == "q" || chessBoardArray[row][column] == "b"){
                        return true
                    } else{
                    break
                }
                } else if (pieceColour == "black"){
                    if (chessBoardArray[row][column] == "Q" || chessBoardArray[row][column] == "B"){
                        return true
                    } else{
                    break
                }
                }
            }
            row+= dR
            column+=dC
        } 
    }

    // Checks for knight movement
    for (const [dR, dC] of knightDirections){
        let row = iRow + dR
        let column = iColumn +dC

        if (row >= 0 && row < 8 && column >= 0 && column < 8){
            if (pieceColour == "white"){
                if (chessBoardArray[row][column] == "n"){
                    return true
                }
            } else{
                if (chessBoardArray[row][column] == "N"){
                    return true
                }
            }
        }
    }

    // Checks for pawns (enemy pawns attack from the opposite direction)
    let pawnDirection = pieceColour == "white" ? -1 : 1
    let pawnRow = iRow + pawnDirection
    let pawnColumns = [iColumn-1, iColumn+1]

    for (const column of pawnColumns){
        if (pawnRow >= 0 && pawnRow < 8 && column >= 0 && column < 8){
            if (pieceColour == "white"){
                if (chessBoardArray[pawnRow][column] == "p"){
                    return true
                }
            } else{
                if (chessBoardArray[pawnRow][column] == "P"){
                    return true
                }
            }
        }
    }

    // Checks for king 
    for (const [dR, dC] of kingDirections){
        let row = iRow + dR
        let column = iColumn + dC

        if (row >= 0 && row < 8 && column >= 0 && column < 8){
            if (pieceColour == "white"){
                if (chessBoardArray[row][column] == "k"){
                    return true
                }
            } else if (pieceColour == "black"){
                if (chessBoardArray[row][column] == "K"){
                    return true
                }
            }
        }
    }


    return false


}