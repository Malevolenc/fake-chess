import genAllLegalMoves from "../functionality/genAllLegalMoves.js";
import locatePieces from "../functionality/locatePieces.js";

export class ChessBot{
    constructor(botColour){
        this.botColour = botColour
    }
    decideMove(chessBoardArray, currentTurn, kingCoords, moveNumber, enPassantTarget, castlingRights){
        let pieceCoords = locatePieces(this.botColour, chessBoardArray)
        let allBotLegalMoves = genAllLegalMoves(pieceCoords, chessBoardArray, currentTurn, kingCoords, moveNumber, enPassantTarget, castlingRights)

        // If there are no legal moves, return null so callers can guard accordingly
        if (!allBotLegalMoves || allBotLegalMoves.length === 0) return null

        let randomMove = allBotLegalMoves[Math.floor(Math.random() * (allBotLegalMoves.length))]

        return randomMove
    }
}