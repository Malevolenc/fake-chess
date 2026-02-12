export default function FENtoArray(FENString){
      let partitionedFEN = [] // Each element corresponds to a row
      let rowFEN = []
      for (const character of FENString){

        if (character === "/"){
            partitionedFEN.push(rowFEN)
            rowFEN = []
            continue
        } else{
            if (!isNaN(Number(character))){
                for (let i = Number(character); i > 0; i--){
                    rowFEN.push("")
                }
            }
            else{
                rowFEN.push(character)
            }
        }
      }
      partitionedFEN.push(rowFEN)
      return partitionedFEN
  }