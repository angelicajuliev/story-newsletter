export const formatDate = (date: string | Date) => {
  return Intl.DateTimeFormat("en-CO", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(date));
}
