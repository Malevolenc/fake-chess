export class Coordinate{
    static coordsToIndices(coordinates){
        let row = 8-(parseInt(coordinates[1]))
        let column = (coordinates[0].charCodeAt(0)-97)

        return [row,column]
    }

    static indicesToCoords(row, column){
        let rank = 8-row
        let file = String.fromCharCode(97+column)

        return `${file}${rank}`
    }
}
