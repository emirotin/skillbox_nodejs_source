const makeRangeIterator = (start = 0, end = Infinity, step = 1) => {
  let nextIndex = start;
  let iterationCount = 0;

  const next = () => {
    if (nextIndex < end) {
      const result = { value: nextIndex, done: false };
      nextIndex += step;
      iterationCount++;
      return result;
    }
    return { value: iterationCount, done: true };
  };

  return { next };
};

const it = makeRangeIterator(1, 10, 2);

let result = it.next();
while (!result.done) {
  console.log(result.value);
  result = it.next();
}

console.log("Iterated over sequence of size: ", result.value);
