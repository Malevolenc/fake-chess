import { Coordinate } from "./CoordinateClass"
import filterLegalMoves from "./filterLegalMoves"
import genPseudoLegalPieceMoves from "./genPseudoLegalPieceMoves"

export default function genAllLegalMoves(pieceCoords, chessBoardArray, currentTurn, kingCoords, moveNumber, enPassantTarget, castlingRights){
    let allLegalMoves = []
    
    for (const pieceCoord of pieceCoords){

        let [iRow, iColumn] = Coordinate.coordsToIndices(pieceCoord)
        let pseudoLegalPieceMoves = genPseudoLegalPieceMoves(chessBoardArray[iRow][iColumn], chessBoardArray, iRow, iColumn, currentTurn, moveNumber, enPassantTarget, castlingRights)
        let legalPieceMoves = filterLegalMoves(pseudoLegalPieceMoves, chessBoardArray, kingCoords)
        allLegalMoves.push(...legalPieceMoves)
    }

    return allLegalMoves
}