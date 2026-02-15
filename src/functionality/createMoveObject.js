export default function createMoveObject(initialCoords, finalCoords, currentPiece, capturedPiece, currentTurn, moveNumber){
    return {
        initialCoords: initialCoords,
        finalCoords: finalCoords,
        currentPiece: currentPiece,
        capturedPiece: capturedPiece,
        currentTurn: currentTurn,
        moveNumber: moveNumber
    }
}