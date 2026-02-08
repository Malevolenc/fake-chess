import "./Piece.css";

export default function Piece({pieceType}){
    const assetPath = `../../src/assets/`

    const pieces = {
        "p": "Pawn",
        "n": "Knight",
        "b": "Bishop",
        "r": "Rook",
        "q": "Queen",
        "k": "King"
    };

    function checkPiece(pieceType){
        try{
            if (pieces[pieceType.toLowerCase()]){
                return true
            }
        } catch(err){
            console.error("Piece does not exist")
            return false
        }
    };

    function displayPiece(pieceType){
        if (checkPiece(pieceType)){
            let pieceName =  pieces[pieceType.toLowerCase()];
            return assetPath+`${blackOrWhite(pieceType)}${pieceName}.png`;
        };
    };

    function blackOrWhite(pieceType){
        if (pieceType.toLowerCase() == pieceType){
            return "black"
        }

        else{
            return "white"
        }
    }
    return(
        checkPiece(pieceType) && <img className={`piece ${blackOrWhite(pieceType)}`} draggable="false" src={displayPiece(pieceType)}></img>
    );
};