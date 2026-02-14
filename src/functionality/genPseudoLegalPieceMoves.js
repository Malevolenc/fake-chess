import { PieceMovement } from "./PieceMovement";

export default function genPseudoLegalPieceMoves(currentPieceSelected, chessBoardArray,iRow,iColumn, currentTurn){
    let possibleMoves = []
    switch (currentPieceSelected.toLowerCase()){
            case "q":
                possibleMoves = PieceMovement.queenMovement(chessBoardArray,iRow,iColumn, currentTurn)
                break;
    
            case "r":
                possibleMoves = PieceMovement.rookMovement(chessBoardArray,iRow,iColumn, currentTurn)
                break; 
    
            case "b":
                possibleMoves = PieceMovement.bishopMovement(chessBoardArray,iRow,iColumn, currentTurn)
                break;
    
            case "p":
                possibleMoves = PieceMovement.pawnMovement(chessBoardArray,iRow,iColumn, currentTurn)
                break;
    
            case "n":
                possibleMoves = PieceMovement.knightMovement(chessBoardArray,iRow,iColumn, currentTurn)
                break;
    
            case "k":
                possibleMoves = PieceMovement.kingMovement(chessBoardArray,iRow,iColumn, currentTurn)
                break;
        }

    return possibleMoves
}