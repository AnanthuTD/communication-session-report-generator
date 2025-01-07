const names = [
  "Abhilash B R",
  "Ahamed Irfan",
  "Amal Ramakrishnan",
  "Ananthu TD",
  "Aneena Thasneem C A",
  "Anas A M",
  "Arun Thomas",
  "Aswanth P",
  "Aswin K",
  "Devaraj",
  "Diyana Sherin K M",
  "Farhana Sherin O C",
  "Husna K",
  "Jayashree",
  "Joel Thomas",
  "Krishna Priya K",
  "Mariyammath Thabsira G",
  "Masroora K",
  "Muhammed Sinan",
  "Muhammed Uwais",
  "Nasrin Gafoor K P",
  "Pious Edwin BCR57",
  "Preethi Sreejith",
  "Rento Augustine",
  "Sahla M",
  "Shanid V V",
  "Shibla P",
  "Subhana Thasni TP",
  "Swathish",
  "Thanveer",
  "Vishnu",
];

// Prepare CSV content
const csvContent = [
  ["Name", "Role", "OptOutAudio", "OptOutCommunication"],
  ...names.map(name => [name, "member", "false", "false"]),
].map(row => row.join(",")).join("\n");

// Example to save the CSV content to a file
const fs = require('fs');
fs.writeFileSync('members.csv', csvContent, 'utf-8');

console.log("CSV file 'members.csv' generated successfully.");
