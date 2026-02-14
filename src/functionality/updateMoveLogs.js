export default function updateMoveLogs(initialCoords, finalCoords, currentPiece, capturedPiece, setMoveLogs){
    let moveNotation;
    // General Movement
    if (!capturedPiece){
        // Pawn Pushes
        if (currentPiece.toLowerCase() == "p"){
            moveNotation = `${finalCoords}`
        // Moves by major pieces
        } else{
            moveNotation = `${currentPiece.toUpperCase()}${finalCoords}`
        }
        
    // Capture moves
    } 
    else{
        if (capturedPiece.toLowerCase() == "p"){
            if (currentPiece.toLowerCase() == "p"){
                moveNotation = `${initialCoords[0]}x${finalCoords}`
            } else{
                moveNotation = `${currentPiece.toUpperCase()}x${finalCoords}`
            }
            
        } else{
            if (currentPiece.toLowerCase() == "p"){
                moveNotation = `${initialCoords[0]}x${finalCoords}`
            } else{
                moveNotation = `${currentPiece.toUpperCase()}x${finalCoords}`
            }
        }
    }

    setMoveLogs((prevMoveLogs)=>{
        const lastRow = prevMoveLogs[prevMoveLogs.length-1]

        if (!lastRow || lastRow.length >= 2){
            const newRow = [moveNotation]
            return [...prevMoveLogs, newRow]
        } else{
            lastRow.push(moveNotation)
            return [...prevMoveLogs]
        }
        
    })
}