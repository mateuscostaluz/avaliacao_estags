services = {
  conversion: async ctx => {

    let letters = [
      [" "],
      [],
      ["A", "B", "C"],
      ["D", "E", "F"],
      ["G", "H", "I"],
      ["J", "K", "L"],
      ["M", "N", "O"],
      ["P", "Q", "R", "S"],
      ["T", "U", "V"],
      ["W", "X", "Y", "Z"]
    ]

    if(ctx.letterMessage) {

      let letter = ctx.letterMessage
      letter = Array.from(letter)

      let letterCount = 0
      let letterArray = []

      for(let h = 0; h < letter.length; h++) {
        for(let i = 0; i < letters.length; i++) {
          for(let j = 0; j < letters[i].length; j++) {
            if(letters[i][j] === letter[h]) {
              repeat = j
              position = i
              if(letterCount !== 0)
              {
                if(letterArray[letterCount - 1] === i) {
                  letterArray[letterCount] = "_"
                  letterCount++
                }
              }
              for(let k = -1; k < repeat; k++) {
                letterArray[letterCount] = i
                letterCount++
              }
            }
          }
        }
      }
      ctx.numberMessage = letterArray.join('').toString()

    } else {

      let number = ctx.numberMessage
      number = Array.from(number)

      numberCount = 0
      numberArray = []

      for(let a = 0; a < number.length; a++) {
        if(number[a] !== "_") {
          let aux = []
          let auxCount = 0
          aux[auxCount] = number[a]
          auxCount++
          let b = a + 1
          while(number[b] === number[a]) {
            aux[auxCount] = number[b]
            auxCount++
            a++
            b++
          }
          numberArray[numberCount] = aux
          numberCount++
        }
      }
      
      numberSemiFinalArray = []
      
      for(let k = 0; k < numberArray.length; k++) {
        aux = []
        aux[0] = numberArray[k][0]
        aux[1] = numberArray[k].length - 1
        numberSemiFinalArray[k] = aux
      }
      
      let numberFinalArray = []
      
      for(let l = 0; l < numberSemiFinalArray.length; l++) {
        positionOne = numberSemiFinalArray[l][0]
        positionTwo = numberSemiFinalArray[l][1]
        numberFinalArray[l] = letters[positionOne][positionTwo]
      }
      ctx.letterMessage = numberFinalArray.join('').toString()

    }
    return ctx
  }
}

module.exports = services
