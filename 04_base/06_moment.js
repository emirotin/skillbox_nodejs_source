const moment = require("moment");

const einsteinBirthDate = "March 14, 1879";
const einsteinDeathDate = "April 18, 1955";

const birth = moment(einsteinBirthDate, "LL");
const death = moment(einsteinDeathDate, "LL");

const lifeLength = death.diff(birth, "days");

console.log(
  `Эйнштейн родился ${birth.locale("ru").format("LL")}, умер ${death
    .locale("ru")
    .format("LL")}, прожил ${lifeLength} дней.`
);
