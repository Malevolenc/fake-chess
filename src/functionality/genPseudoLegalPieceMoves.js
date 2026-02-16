import { PieceMovement } from "./PieceMovement";

export default function genPseudoLegalPieceMoves(currentPieceSelected, chessBoardArray,iRow,iColumn, currentTurn, moveNumber, enPassantTarget, castlingRights){
    let possibleMoves = []
    switch (currentPieceSelected.toLowerCase()){
            case "q":
                possibleMoves = PieceMovement.queenMovement(chessBoardArray,iRow,iColumn, currentTurn, moveNumber)
                break;
    
            case "r":
                possibleMoves = PieceMovement.rookMovement(chessBoardArray,iRow,iColumn, currentTurn, moveNumber)
                break; 
    
            case "b":
                possibleMoves = PieceMovement.bishopMovement(chessBoardArray,iRow,iColumn, currentTurn, moveNumber)
                break;
    
            case "p":
                possibleMoves = PieceMovement.pawnMovement(chessBoardArray,iRow,iColumn, currentTurn, moveNumber, enPassantTarget)
                break;
    
            case "n":
                possibleMoves = PieceMovement.knightMovement(chessBoardArray,iRow,iColumn, currentTurn, moveNumber)
                break;
    
            case "k":
                possibleMoves = PieceMovement.kingMovement(chessBoardArray,iRow,iColumn, currentTurn, moveNumber, castlingRights)
                break;
        }

    return possibleMoves
}