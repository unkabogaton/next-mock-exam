const generateIndexes = (
  number: number,
  exclusionArray: number[]
): number[][] => {
  const uniqueNumbers = new Set<number>();

  const excludedNumberCount = exclusionArray.filter(
    (num) => num >= 1 && num <= number
  ).length;

  const generateRandom = () => {
    let randomNum: number;
    do {
      randomNum = Math.floor(Math.random() * number) + 1;
    } while (exclusionArray.includes(randomNum));
    uniqueNumbers.add(randomNum);
  };

  const numberLength = Math.min(number - excludedNumberCount, 100);

  for (let i = 0; i < numberLength; i++) {
    generateRandom();
  }

  const arraysOfTen: number[][] = [];
  let tempArray: number[] = [];

  uniqueNumbers.forEach((num) => {
    tempArray.push(num);

    if (tempArray.length === 10) {
      arraysOfTen.push([...tempArray]);
      tempArray = [];
    }
  });

  return arraysOfTen;
};

export default generateIndexes;
