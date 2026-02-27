import Row from "./Row"

import "./ChessBoard.css"
import { useContext } from "react"
import { GameInformationContext } from "../contexts/GameInformationContext"

// A Chessboard element contains 8 rows
export default function Chessboard(){
    // Retrieves the playerColour to orient the board in the correct way.
    const { 
        playerColour,
        chessBoardArray
    } = useContext(GameInformationContext)
    
    function printBoard(){
        let boardArr = []
        let currentSquareColour = "white"
        for (let i = 0; i < chessBoardArray.length; i++){
            boardArr.push(
                // Each Row Element contains 8 Square elements
                // Props such as row index are passed to give them the proper ids for the file
                <Row
                key={`${i+1} row`}
                startingColour={currentSquareColour}

                currentRowIndex={i}
                currentRowArray={chessBoardArray[i]}
                />
            )
            // Changes the square colour of the first square in a row
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