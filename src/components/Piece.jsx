import "./Piece.css";

import blackBishop from "../assets/blackBishop.png";
import blackKing from "../assets/blackKing.png";
import blackKnight from "../assets/blackKnight.png";
import blackPawn from "../assets/blackPawn.png";
import blackQueen from "../assets/blackQueen.png";
import blackRook from "../assets/blackRook.png";

import whiteBishop from "../assets/whiteBishop.png";
import whiteKing from "../assets/whiteKing.png";
import whiteKnight from "../assets/whiteKnight.png";
import whitePawn from "../assets/whitePawn.png";
import whiteQueen from "../assets/whiteQueen.png";
import whiteRook from "../assets/whiteRook.png";

export default function Piece({pieceType}){
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
            switch(pieceType.toLowerCase()){
                case "b":
                    if (blackOrWhite(pieceType) === "black"){
                        return blackBishop
                    } else{
                        return whiteBishop
                    }

                case "k":
                    if (blackOrWhite(pieceType) === "black"){
                        return blackKing
                    } else{
                        return whiteKing
                    }

                case "n":
                    if (blackOrWhite(pieceType) === "black"){
                        return blackKnight
                    } else{
                        return whiteKnight
                    }

                case "p":
                    if (blackOrWhite(pieceType) === "black"){
                        return blackPawn
                    } else{
                        return whitePawn
                    }

                case "q":
                    if (blackOrWhite(pieceType) === "black"){
                        return blackQueen
                    } else{
                        return whiteQueen
                    }

                case "r":
                    if (blackOrWhite(pieceType) === "black"){
                        return blackRook
                    } else{
                        return whiteRook
                    }
            }
        };
    };

    function blackOrWhite(pieceType){
        if (pieceType.toLowerCase() === pieceType){
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