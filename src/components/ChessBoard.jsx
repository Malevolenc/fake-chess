import Row from "./Row"

import "./ChessBoard.css"
import { useContext } from "react"
import { GameInformationContext } from "../contexts/GameInformationContext"

export default function Chessboard(){
    const { 
        playerColour,
        chessBoardArray
    } = useContext(GameInformationContext)
    
    function printBoard(){
        let boardArr = []
        let currentSquareColour = "white"
        for (let i = 0; i < chessBoardArray.length; i++){
            boardArr.push(
                <Row
                key={`${i+1} row`}
                startingColour={currentSquareColour}

                currentRowIndex={i}
                currentRowArray={chessBoardArray[i]}
                />
            )
            currentSquareColour = currentSquareColour === "white" ? "black" : "white"
        }
        return boardArr // The 0th element represents the 8th Rank, whereas the 7th array corresponds to the 1st Rank
    }
    return (
        <div className={`Chessboard ${playerColour}`}>
            {printBoard()}
          </div>
    )
}