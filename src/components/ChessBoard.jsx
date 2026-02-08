import Row from "./Row"

import "./ChessBoard.css"

export default function Chessboard({playerColour, currentTurnState, chessBoardArrayState, currentSquareSelectedState, currentPieceSelectedState}){
    function printBoard(){
        let boardArr = []
        let currentSquareColour = "white"
        for (let i = 0; i < chessBoardArrayState[0].length; i++){
            boardArr.push(
                <Row
                key={`${i+1} row`}
                startingColour={currentSquareColour}
                playerColour={playerColour}

                currentTurnState={currentTurnState}
                chessBoardArrayState={chessBoardArrayState}

                currentSquareSelectedState={currentSquareSelectedState}
                currentPieceSelectedState={currentPieceSelectedState}

                currentRowIndex={i}
                currentRowArray={chessBoardArrayState[0][i]}
                />
            )
            currentSquareColour = currentSquareColour == "white" ? "black" : "white"
        }
        return boardArr // The 0th element represents the 8th Rank, whereas the 7th array corresponds to the 1st Rank
    }
    return (
        <div className={`Chessboard ${playerColour}`}>
            {printBoard()}
          </div>
    )
}