export const formatDate = (date: string | Date) => {
  const newDate = new Date(date)
  const day = newDate.getDate()
  const month = newDate.getMonth() + 1
  const year = newDate.getFullYear()
  return `${getVisualNumber(day)}/${getVisualNumber(month)}/${year}`
}

const getVisualNumber = (number: number) => {
  return number < 10 ? `0${number}` : number
}
