import { Coordinate } from "./CoordinateClass";

export default function findKing(colour, chessBoardArray){
    for (let i = 0; i < chessBoardArray.length; i++){
        for (let j = 0; j < chessBoardArray[i].length; j++){
            if (colour == "white"){
                if (chessBoardArray[i][j] == "K"){
                    return Coordinate.indicesToCoords(i,j)
                }
            } else{
                if (chessBoardArray[i][j] == "k"){
                    return Coordinate.indicesToCoords(i,j)
                }
            }
        }
    }
    return ""
}