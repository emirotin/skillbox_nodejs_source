const { parse, differenceInCalendarDays, format } = require("date-fns");
const { en, ru } = require("date-fns/locale");

const einsteinBirthDate = "March 14, 1879";
const einsteinDeathDate = "April 18, 1955";

const birth = parse(einsteinBirthDate, "MMMM dd',' yyyy", new Date(), {
  locale: en,
});
const death = parse(einsteinDeathDate, "MMMM dd',' yyyy", new Date(), {
  locale: en,
});

const lifeLength = differenceInCalendarDays(death, birth);

console.log(
  `Эйнштейн родился ${format(birth, "dd MMMM yyyy 'г.'", {
    locale: ru,
  })}, умер ${format(death, "dd MMMM yyyy 'г.'", {
    locale: ru,
  })}, прожил ${lifeLength} дней.`
);
