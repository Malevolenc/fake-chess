export default function createMoveObject(initialCoords, finalCoords, currentPiece, capturedPiece, currentTurn, moveNumber, isCastle = false, isEnPassant= false, isPromotion=false, isCheck=false){
    return {
        initialCoords: initialCoords,
        finalCoords: finalCoords,
        currentPiece: currentPiece,
        capturedPiece: capturedPiece,
        currentTurn: currentTurn,
        moveNumber: moveNumber,
        isCastle: isCastle,
        isEnPassant: isEnPassant,
        isPromotion: isPromotion,
        isCheck: isCheck
    }
}