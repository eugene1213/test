// Test #1
// Write a command-line program that prints out the sum of two non-negative integers as input arguments.
// You must not use any built-in BigInteger library or convert the inputs to integer directly.

const NUMS = {
 "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5,
 "6": 6, "7": 7, "8": 8, "9": 9
}

const regExp = /^[0-9]*$/

const isValidInput = args => {
  const isNNI = regExp.test(args[0]) && regExp.test(args[1])

  if (args.length !== 2 || !isNNI) {
    return false
  }
  return true
}

const str2Int = str => {
  let res = 0
  let tmp = 0
  for (let i = 0; i < str.length; i++) {
    let loopCount = str.length
    const char = str.charAt(i)
    tmp = NUMS[char]

    for(let j = 1; j < str.length - i; j++) {
      tmp *= 10
      if(j === loopCount - 2){
        loopCount--
      }
    }
    res += tmp
  }
  return res
}

const calculator = args => {
  console.log(`result: ${args[0] + args[1]}`)
}

const args = process.argv.slice(2)

if(isValidInput(args)){
  calculator([str2Int(args[0]), str2Int(args[1])])

} else {
  console.error('invalid arguments')
}
