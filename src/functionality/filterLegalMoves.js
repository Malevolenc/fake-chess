import { Coordinate } from "./CoordinateClass";
import simulateMove from "./simulateMove";
import squareIsAttacked from "./squareIsAttacked"

export default function filterLegalMoves(pseudoLegalMoves, chessBoardArray, kingCoords){
    let legalMoves = []
    for (const pseudoLegalMove of pseudoLegalMoves){
        let {initialCoords, finalCoords, currentTurn, promotionPiece} = pseudoLegalMove

        let attackingColour = currentTurn == "white" ? "black" : "white"

        // Create a shallow copy that will be mutated to simulate a potential move.
        // Pass `promotionPiece` so simulated board reflects promoted piece (if any).
        let simulatedBoard = simulateMove(chessBoardArray, initialCoords, finalCoords, promotionPiece)

        // If the moved piece was the king, update the king coordinates for this simulation
        const simulatedKingCoords = initialCoords === kingCoords ? finalCoords : kingCoords

        if (!squareIsAttacked(simulatedKingCoords, simulatedBoard, attackingColour)){
            legalMoves.push(pseudoLegalMove)
        }
    }
    return legalMoves
}