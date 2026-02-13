import { useContext } from "react"
import { GameInformationContext } from "../contexts/GameInformationContext"
import './MoveLog.css'

export default function MoveLog() {
    const {
        moveLogs
    } = useContext(GameInformationContext)

    let whiteMoves = []
    let blackMoves = []

    function displayMoveLogs(){
        for (let i = 0; i < moveLogs.length; i++){
            let currentRow = moveLogs[i]
            for (let j = 0; j < currentRow.length; j++){
                if (j%2==0){
                    whiteMoves.push(<h4 key={`${i+1}white`} className="moveLog">{currentRow[j]}</h4>)
                } else{
                    blackMoves.push(<h4 key={`${i+1}black`} className="moveLog">{currentRow[j]}</h4>)
                }
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