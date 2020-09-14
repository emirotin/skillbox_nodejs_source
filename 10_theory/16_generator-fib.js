const fibonacci = function* () {
  let a = 1;
  let b = 1;

  while (true) {
    yield a;
    const c = a + b;
    a = b;
    b = c;
  }
};

let count = 1;
for (const value of fibonacci()) {
  console.log(value);
  count++;
  if (count > 10) {
    break;
  }
}
