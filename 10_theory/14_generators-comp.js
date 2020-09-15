function* one() {
  yield "1.1";
  yield "1.2";
  yield "1.3";
}
function* two() {
  yield "2.1";
  yield "2.2";
  yield "2.3";
}

function* three() {
  yield "3.1";
  yield "3.2";
  yield "3.3";
}

function* compound() {
  yield* one();

  yield "---";

  yield* two();

  yield "---";

  yield* three();
}

for (const value of compound()) {
  console.log(value);
}
