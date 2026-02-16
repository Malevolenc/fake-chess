export default function createMoveObject(initialCoords, finalCoords, currentPiece, capturedPiece, currentTurn, moveNumber, isCastle = false, isEnPassant= false, isCheck=false, promotionPiece=""){
    return {
        initialCoords: initialCoords,
        finalCoords: finalCoords,
        currentPiece: currentPiece,
        capturedPiece: capturedPiece,
        currentTurn: currentTurn,
        moveNumber: moveNumber,
        isCastle: isCastle,
        isEnPassant: isEnPassant,
        isCheck: isCheck,
        promotionPiece: promotionPiece
    }
}