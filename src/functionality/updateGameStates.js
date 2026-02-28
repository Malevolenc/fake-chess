export default function updateGameStates(setCurrentSquareSelected, setCurrentPieceSelected, setCurrentLegalPieceMoves, setHighlightedPieceMoves, setCurrentTurn, setChessBoardArray, updatedChessBoard, setEnPassantTarget, updatedEnPassantTarget, setMoveNumber, updatedMoveNumber, setCastlingRights, updatedCastlingRights){
    setCurrentSquareSelected(()=>"")
    setCurrentPieceSelected(()=>"")
    setCurrentLegalPieceMoves(()=>[])
    setHighlightedPieceMoves(()=>[])
    setCurrentTurn((prevCurrentTurn)=>prevCurrentTurn === "white"?"black":"white")
    setChessBoardArray(()=>updatedChessBoard)
    setEnPassantTarget(()=>updatedEnPassantTarget)
    setMoveNumber(()=>updatedMoveNumber)
    setCastlingRights(()=>updatedCastlingRights)

}