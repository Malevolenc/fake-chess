import { Coordinate } from "./CoordinateClass";

export default function moveObjectToNotation({initialCoords, finalCoords, currentPiece, capturedPiece, currentTurn, moveNumber, isCastle, isEnPassant, isPromotion, isCheck}){
    let moveNotation;
    // General Movement

    if (isCastle){
        let [iRow, iColumn] = Coordinate.coordsToIndices(initialCoords)
        let [fRow, fColumn] = Coordinate.coordsToIndices(finalCoords)

        if (iColumn < fColumn){
            moveNotation = "O-O"
        } else{
            moveNotation = "O-O-O"
        }
    }
    if (!capturedPiece){
        // Pawn Pushes
        if (currentPiece.toLowerCase() == "p"){
            moveNotation = `${finalCoords}`
        // Moves by major pieces
        } else{
            moveNotation = `${currentPiece.toUpperCase()}${finalCoords}`
        }
        
    // Capture moves
    } 
    else if (capturedPiece){
        if (capturedPiece.toLowerCase() == "p"){
            if (currentPiece.toLowerCase() == "p"){
                moveNotation = `${initialCoords[0]}x${finalCoords}`
            } else{
                moveNotation = `${currentPiece.toUpperCase()}x${finalCoords}`
            }
            
        } else{
            if (currentPiece.toLowerCase() == "p"){
                moveNotation = `${initialCoords[0]}x${finalCoords}`
            } else{
                moveNotation = `${currentPiece.toUpperCase()}x${finalCoords}`
            }
        }
    }

    if (isCheck){
        moveNotation+="+"
    }

    return moveNotation
}