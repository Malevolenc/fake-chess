import { Coordinate } from "./CoordinateClass";
import findKing from "./findKing";
import squareIsAttacked from "./squareIsAttacked";

export default function movePiece(initialCoords, finalCoords, chessBoardArray, currentTurn, moveNumber, currentLegalPieceMoves, castlingRights){
    let [iRow,iColumn] = Coordinate.coordsToIndices(initialCoords)
    let [fRow, fColumn] = Coordinate.coordsToIndices(finalCoords)

    let startingPawnRow =  currentTurn == "white" ? 6 : 1
    let pawnDir = currentTurn == "white" ? -1 : 1
    let doublePawnMove = currentTurn == "white" ? iRow-2 : iRow+2

    const defaultPromotionPiece = "q"
    let selectedLegalMove;

    const matchingMoves = currentLegalPieceMoves.filter(move=> move.finalCoords ===finalCoords)

    let tempBoard = chessBoardArray.map(row => row.slice());
    let updatedEnPassantTarget;
    let updatedMoveNumber = moveNumber
    let updatedCastlingRights = {...castlingRights}

    if (matchingMoves.length === 1){
        selectedLegalMove = matchingMoves[0]
    } else{
        selectedLegalMove = matchingMoves.filter(move=>move.promotionPiece.toLowerCase()===defaultPromotionPiece)[0]
    }

    let currentPiece = selectedLegalMove.currentPiece;
    let capturedPiece = selectedLegalMove.capturedPiece;

    // Work with a copy so we don't mutate move objects that may be stored elsewhere
    let moveToLog = selectedLegalMove ? {...selectedLegalMove} : null

    // If the piece being moved is a rook or the piece being captured is the rook
    if (currentPiece.toLowerCase() === "r" || (capturedPiece && capturedPiece.toLowerCase() == "r")){
        if (currentTurn === "black") {
            if (iRow === 0 && iColumn === 0) updatedCastlingRights.blackQueenSide = false;
            if (iRow === 0 && iColumn === 7) updatedCastlingRights.blackKingSide = false;
        }

        if (currentTurn === "white") {
            if (iRow === 7 && iColumn === 0) updatedCastlingRights.whiteQueenSide = false;
            if (iRow === 7 && iColumn === 7) updatedCastlingRights.whiteKingSide = false;
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

    // Updating the array for captures and general movement
    // Moves the piece from the original square to the new square
        tempBoard[iRow][iColumn] = ""
        tempBoard[fRow][fColumn] = currentPiece


        // If the  move is a castle move, move both the king and rook
        if (selectedLegalMove.isCastle){
            // Kingside Castle
            if ((iColumn < fColumn) && (iRow == 0 || iRow == 7)){
                if (currentTurn == "white"){
                    tempBoard[7][7] = ""
                    tempBoard[7][5] = "R"
                } else if (currentTurn == "black"){
                    tempBoard[0][7] = ""
                    tempBoard[0][5] = "r"
                }
            }

            // Queenside Castle
            else if((iColumn > fColumn) && (iRow == 0 || iRow == 7)){
                if (currentTurn == "white"){
                    tempBoard[7][0] = ""
                    tempBoard[7][3] = "R"
                } else if (currentTurn == "black"){
                    tempBoard[0][0] = ""
                    tempBoard[0][3] = "r"
                    }
                }
            }
        // Pawn Movement
        if (currentPiece.toLowerCase() == "p"){
            // If en passant move, do the thingy
            if (moveToLog && moveToLog.isEnPassant){
                let [enPassantRow, enPassantColumn] = Coordinate.coordsToIndices(moveToLog.finalCoords)
                enPassantRow -= pawnDir
                tempBoard[enPassantRow][enPassantColumn] = ""
            }
            // If a pawn moves two squares from its initial square, it becomes an en passant target
            if (iRow == startingPawnRow && fRow == doublePawnMove){
                updatedEnPassantTarget = Coordinate.indicesToCoords(fRow-pawnDir, fColumn)
            }

            // If promotion, replace the piece on the new square with the promotion piece
            if (moveToLog && moveToLog.promotionPiece){
                tempBoard[fRow][fColumn] = moveToLog.promotionPiece
            }

        } else{
            updatedEnPassantTarget = ""
        }
        // After all move effects (en-passant, promotion, castling rook moves), check for check
        let enemyKingCoords = currentTurn == "white" ? findKing("black", tempBoard) : findKing("white", tempBoard)
        if (squareIsAttacked(enemyKingCoords, tempBoard, currentTurn)){
            if (moveToLog) moveToLog.isCheck = true
        }
    
    if (currentTurn == "black"){
        updatedMoveNumber = moveNumber+1
    }

    return {"updatedBoard": tempBoard,
            "updatedEnPassantTarget": updatedEnPassantTarget,
            "updatedMoveNumber": updatedMoveNumber,
            "moveToLog": moveToLog,
            "updatedCastlingRights": updatedCastlingRights
        }
    }