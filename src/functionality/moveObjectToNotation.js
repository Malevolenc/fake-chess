export default function moveObjectToNotation({initialCoords, finalCoords, currentPiece, capturedPiece, currentTurn, moveNumber}){
    let moveNotation;
    // General Movement
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
    else{
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

    return moveNotation
}