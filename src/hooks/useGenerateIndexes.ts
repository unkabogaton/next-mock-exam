const generateIndexes = (
  number: number = 0,
  exclusionArray: number[] = []
): number[][] => {
  const uniqueNumbers = new Set<number>();

  const excludedNumberCount = exclusionArray?.filter(
    (num) => num >= 1 && num <= number
  ).length;

  const generateRandom = () => {
    let randomNum = Math.floor(Math.random() * number) + 1;
    if (!exclusionArray.includes(randomNum)) {
      uniqueNumbers.add(randomNum);
    }
  };

  const numberLength = Math.min(number - excludedNumberCount, 100);

  while (uniqueNumbers.size < numberLength) {
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

  if (tempArray.length > 0) {
    arraysOfTen.push([...tempArray]);
  }

  return arraysOfTen;
};

export default generateIndexes;
