import { Coordinate } from "./CoordinateClass";
import findKing from "./findKing";
import squareIsAttacked from "./squareIsAttacked";
import updateMoveLogs from "./updateMoveLogs";

export default function movePiece(initialCoords, finalCoords, chessBoardArray, setChessBoardArray, currentTurn, setMoveLogs, setMoveNumber,currentLegalPieceMoves, setCastlingRights, setEnPassantTarget){
    let [iRow,iColumn] = Coordinate.coordsToIndices(initialCoords)
    let [fRow, fColumn] = Coordinate.coordsToIndices(finalCoords)

    let startingPawnRow =  currentTurn == "white" ? 6 : 1
    let pawnDir = currentTurn == "white" ? -1 : 1
    let doublePawnMove = currentTurn == "white" ? iRow-2 : iRow+2
    
    let currentPiece = chessBoardArray[iRow][iColumn]
    let capturedPiece;
    let selectedLegalMove;

    if (chessBoardArray[fRow][fColumn]){
        capturedPiece = chessBoardArray[fRow][fColumn]
    }

    for (const legalMove of currentLegalPieceMoves){
        if (legalMove.finalCoords == finalCoords){
            selectedLegalMove = legalMove
        }
    }

    setCastlingRights((prevCastlingRights)=>{
        const updatedCastlingRights = {...prevCastlingRights}
        // If the piece being moved is a rook
        if (currentPiece.toLowerCase() === "r"){
            if (currentTurn === "black") {
                if (iRow === 0 && iColumn === 0) updatedCastlingRights.blackQueenSide = false;
                if (iRow === 0 && iColumn === 7) updatedCastlingRights.blackKingSide = false;
            }

            if (currentTurn === "white") {
                if (iRow === 7 && iColumn === 0) updatedCastlingRights.whiteQueenSide = false;
                if (iRow === 7 && iColumn === 7) updatedCastlingRights.whiteKingSide = false;
            }
        } 

        // If the piece being captured is a rook
        if (capturedPiece && capturedPiece.toLowerCase() == "r"){
            if (currentTurn === "white") {
                if (fRow === 0 && fColumn === 0) updatedCastlingRights.blackQueenSide = false;
                if (fRow === 0 && fColumn === 7) updatedCastlingRights.blackKingSide = false;
            }

            if (currentTurn === "black") {
                if (fRow === 7 && fColumn === 0) updatedCastlingRights.whiteQueenSide = false;
                if (fRow === 7 && fColumn === 7) updatedCastlingRights.whiteKingSide = false;
            }
        }

        // If the piece being moved is a king
        if (currentPiece.toLowerCase() == "k"){
            if (currentTurn === "white") {
                updatedCastlingRights.whiteQueenSide = false;
                updatedCastlingRights.whiteKingSide = false;
            }

            if (currentTurn === "black") {
                updatedCastlingRights.blackQueenSide = false;
                updatedCastlingRights.blackKingSide = false;
            }
        }
        return updatedCastlingRights;
    })

    // Updating the array for captures and general movement
    setChessBoardArray((prevChessBoardArray)=>{
        const updatedChessBoardArray = [...prevChessBoardArray]

        updatedChessBoardArray[iRow][iColumn] = ""
        updatedChessBoardArray[fRow][fColumn] = currentPiece

        if (selectedLegalMove.isCastle){
            // Kingside Castle
            if ((iColumn < fColumn) && (iRow == 0 || iRow == 7)){
                if (currentTurn == "white"){
                    updatedChessBoardArray[7][7] = ""
                    updatedChessBoardArray[7][5] = "R"
                } else if (currentTurn == "black"){
                    updatedChessBoardArray[0][7] = ""
                    updatedChessBoardArray[0][5] = "r"
                }
            }

            // Queenside Castle
            else if((iColumn > fColumn) && (iRow == 0 || iRow == 7)){
                if (currentTurn == "white"){
                    updatedChessBoardArray[7][0] = ""
                    updatedChessBoardArray[7][3] = "R"
                } else if (currentTurn == "black"){
                    updatedChessBoardArray[0][0] = ""
                    updatedChessBoardArray[0][3] = "r"
                    }
                }
            }

        let enemyKingCoords = currentTurn == "white" ? findKing("black", updatedChessBoardArray) : findKing("white", updatedChessBoardArray)
        if (squareIsAttacked(enemyKingCoords, updatedChessBoardArray, currentTurn)){
            selectedLegalMove.isCheck = true
        }

        if (currentPiece.toLowerCase() == "p"){
            if (selectedLegalMove.isEnPassant){
                let [enPassantRow, enPassantColumn] = Coordinate.coordsToIndices(selectedLegalMove.finalCoords)
                enPassantRow -= pawnDir
                updatedChessBoardArray[enPassantRow][enPassantColumn] = ""
            }
            if (iRow == startingPawnRow && fRow == doublePawnMove){
                setEnPassantTarget(()=>Coordinate.indicesToCoords(fRow-pawnDir, fColumn))
            }
        } else{
            setEnPassantTarget(()=>"")
        }

        
        

    return updatedChessBoardArray
    })

    updateMoveLogs(selectedLegalMove, setMoveLogs)
    

    if (currentTurn == "black"){
        setMoveNumber((prevMoveNumber) => prevMoveNumber+1)
    }
    }