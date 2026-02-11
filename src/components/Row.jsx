import Square from "./Square"

import "./Row.css"

export default function Row({startingColour, currentRowIndex, currentRowArray}){
    function createRow(){
        let currentSquareColour =startingColour
        let rowArr = []
            for (let i = 0; i < currentRowArray.length; i++){
                rowArr.push(
                    <Square
                    key={`${String.fromCharCode(96+i)}${currentRowIndex}`}
                    squareColour={`${currentSquareColour}`}

                    currentRowIndex={currentRowIndex}
                    currentColumnIndex={i}
                    currentColumnElement={currentRowArray[i]}/>
                )
                currentSquareColour = currentSquareColour == "white" ? "black" : "white"
            }
            return rowArr
        }
        
    return (
        <div key={`${8-currentRowIndex} rank`} id={`${8-currentRowIndex} rank`}className="row">
            {createRow()}
        </div>
    )
}