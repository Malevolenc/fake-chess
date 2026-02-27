/* A move object contains information about the move such as:
    - initial coordinates of the moved piece
    - final coordinantes of the moved piece
    - the current piece being moved
    - a piece that is captured
    - whose turn it is (black/white)
    - the current number of turns
    - if the move is a castling move
    - if the move is en passant
    - if the move is a check
    - if the piece is a pawn, what will it promote to
*/
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

/* Im planning to change initial coords and final coords as indices instead of coordinates to
    decrease the number of conversions needed to hopefully reduce function calls, I will only
    do this if performance is bad.
 */