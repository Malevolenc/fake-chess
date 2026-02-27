export class Coordinate{

    // Converts rank-file coordinates to [row][column] indices
    static coordsToIndices(coordinates){
        let row = 8-(parseInt(coordinates[1]))
        let column = (coordinates[0].charCodeAt(0)-97)

        return [row,column]
    }

    // Converts[row][column] indices to rank-file coordinates
    static indicesToCoords(row, column){
        let rank = 8-row
        let file = String.fromCharCode(97+column)

        return `${file}${rank}`
    }
}
