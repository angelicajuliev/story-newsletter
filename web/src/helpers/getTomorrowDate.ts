export const getTomorrowDate = () => {
  const date = new Date();
  const tomorrowDate = date.getDate() + 1;
  date.setDate(tomorrowDate);

  return date;
}
