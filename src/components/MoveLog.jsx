import { useContext } from "react"
import { GameInformationContext } from "../contexts/GameInformationContext"
import './MoveLog.css'
import moveObjectToNotation from "../functionality/moveObjectToNotation"

export default function MoveLog() {
    const {
        moveLogs
    } = useContext(GameInformationContext)

    let whiteMoves = []
    let blackMoves = []

    function displayMoveLogs(){
        for (const moveLog of moveLogs){
            if (moveLog.currentTurn == "white"){
                whiteMoves.push(
                    <h3 className="moveLog" key={`${moveLog.moveNumber}${moveLog.currentTurn}`}>{moveObjectToNotation(moveLog)}</h3>
                )
            } else if (moveLog.currentTurn == "black"){
                blackMoves.push(
                    <h3 className="moveLog" key={`${moveLog.moveNumber}${moveLog.currentTurn}`}>{moveObjectToNotation(moveLog)}</h3>
                )
            }
        }
    }
  return (
    <article id={"moveLogsElement"} className="moveLogsElement">
        <div key="whiteMoves" id="whiteMoves">
            <h2>White</h2>
            {whiteMoves}
        </div>

        <div key="blackeMoves" id="blackMoves">
            <h2>Black</h2>
            {blackMoves}
        </div>
    
    
    {displayMoveLogs()}
    </article>
  )
}