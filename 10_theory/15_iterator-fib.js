const makeFibonacciIterator = () => {
  let a = 1;
  let b = 1;

  const next = () => {
    const value = a;
    const c = a + b;
    a = b;
    b = c;
    return { value, done: false };
  };

  return { next };
};

const fib = makeFibonacciIterator();

let result = fib.next();
let count = 1;
while (count <= 10) {
  console.log(result.value);
  result = fib.next();
  count++;
}
