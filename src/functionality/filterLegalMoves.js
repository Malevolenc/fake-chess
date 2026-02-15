import simulateMove from "./simulateMove";
import squareIsAttacked from "./squareIsAttacked"

export default function filterLegalMoves(pseudoLegalMoves, chessBoardArray, kingCoords){
    let legalMoves = []
    for (const pseudoLegalMove of pseudoLegalMoves){
        let {initialCoords, finalCoords} = pseudoLegalMove
        // Create a shallow copy that will be mutated to simulate a potential move
        let simulatedBoard = simulateMove(chessBoardArray, initialCoords, finalCoords)

        // If the moved piece was the king, update the king coordinates for this simulation
        const simulatedKingCoords = initialCoords === kingCoords ? finalCoords : kingCoords

        if (!squareIsAttacked(simulatedKingCoords, simulatedBoard)){
            legalMoves.push(pseudoLegalMove)
        }
    }
    return legalMoves
}