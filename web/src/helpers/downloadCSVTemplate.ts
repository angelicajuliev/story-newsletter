export default function downloadCSVTemplate() {
  let csv = "Email\nemail@testing.com\n";

  const hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
  hiddenElement.target = "_blank";
  hiddenElement.download = "Template.csv";
  hiddenElement.click();
  hiddenElement.remove();
}
