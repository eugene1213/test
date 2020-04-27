/*
 * Write a command-line program that prints out the sum of two non-negative integers as input arguments.
 * Input arguments are UTF-8 encoded Korean characters only listed as '일이삼사오육칠팔구' and '십백천만억조', 
 * and also your program's output should be. 
 * The less you use ifs, the higher you get scored. Google Korean Numbering System if you are not familiar with.
*/

const Map = {
  str2Sumber: {
    '영': 0,
    '일': 1,
    '이': 2,
    '삼': 3,
    '사': 4,
    '오': 5, 
    '육': 6,
    '칠': 7,
    '팔': 8,
    '구': 9,
  },
  str2SmallUnit: {
    '십': 10,
    '백': 100,
    '천': 1000, 
  },
  str2BigUnit: {
    '만': 10000,
    '억': 100000000, 
    '조': 1000000000000,
    '경': 10000000000000000,
  },
  number2Str: {
    0: '영',
    1: '일',
    2: '이',
    3: '삼',
    4: '사',
    5: '오',
    6: '육',
    7: '칠',
    8: '팔',
    9: '구',
  },
  smallUnit2Str: ['', '십', '백', '천'],
  bigUnits2Str: ['', '만', '억', '조', '경'],
}

const str2Int = str => {
  const arr = []
  let number = 1, unit = 0, sum = 0

  for (let i = 0; i < str.length; i++) {
    const char = str[i]

    if (Map.str2Sumber.hasOwnProperty(char)) {
      number = Map.str2Sumber[char]

    } else if (Map.str2SmallUnit.hasOwnProperty(char)) {
      unit = Map.str2SmallUnit[char]
      sum += (number !== 0) ? number * unit : unit
      number = 0

    } else if (Map.str2BigUnit.hasOwnProperty(char)) {
      sum = (number !== 0) 
        ? (sum + number) * Map.str2BigUnit[char] 
        : sum * Map.str2BigUnit[char]
      arr.push(sum)
      sum = 0
      number = 0
    }
  }

  if (sum !== 0) {
    sum = number !== 0 ? sum + number : sum
    arr.push(sum)
  } else {
    if (number !== 0) {
      arr.push(number)
    }
  }

  return arr.reduce((accumulator, curVal) => accumulator + curVal)
} // str2Int

const int2Str = number => {
  const arr = []
  while (number > 0) {
    arr.push(spl(number % 10000))
    number = parseInt(number / 10000)
  }

  return arr.reduce((preVal, curVal, idx) => {
    return curVal 
      ? curVal + Map.bigUnits2Str[idx] + preVal 
      : preVal;
  }, '')
}

const spl = number => {
  const str = number.toString()
  return [...str].reverse().reduce((preVal, curVal, idx) => {
    if (curVal === '0') {
      return preVal

    } else {
      return curVal === '1' && idx !== 0
      ? Map.smallUnit2Str[idx] + preVal
      : Map.number2Str[curVal] + Map.smallUnit2Str[idx] + preVal
    }
  }, '')
}

const calculator = args => {  
  const sum = str2Int(args[0]) + str2Int(args[1])
  const result = int2Str(sum)
  console.log(result)
}


/* * * * * * * * * * * * * * * TEST * * * * * * * * * * * * * * */

const DATA = [
  ['오백삼십조칠천팔백구십만천오백삼십구', '삼조사천이만삼천구'],
  ['육십사억삼천십팔만칠천육백구', '사십삼'],
  ['구백육십조칠천억팔천백삼십이만칠천일', '사십삼조오천이백억육천구백십만일'],
  ['이천구백육십조천오백칠십만삼천구백구십', '삼천사백오십조일억이천만육백사십삼'],
  ['사십오억삼천육십만오백구십', '칠십억천이백삼십오만칠천구십이'],
  ['천백십일', '구천오백구십구'],
  ['오억사천', '백십일'],
  ['만오천사백삼십', '십구만삼천오백'],
  ['일조', '삼'],
  ['일억', '만']
]

DATA.forEach(d => {
  calculator(d)
})
