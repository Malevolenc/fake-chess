import { Coordinate } from "./CoordinateClass";

export default function moveObjectToNotation({initialCoords, finalCoords, currentPiece, capturedPiece, currentTurn, moveNumber, isCastle, isEnPassant, isPromotion, isCheck, promotionPiece}){
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
        // If pawn captures
        if (capturedPiece.toLowerCase() == "p"){
            // If the attacking piece is a pawn, don't include the piece, only the originating rank
            if (currentPiece.toLowerCase() == "p"){
                moveNotation = `${initialCoords[0]}x${finalCoords}`
            
            // else, add the name of the piece
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

    if (promotionPiece){
        moveNotation+=` = ${promotionPiece.toUpperCase()}`
    }
    if (isCheck){
        moveNotation+="+"
    }
    
    return moveNotation
}