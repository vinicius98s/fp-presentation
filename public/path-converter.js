const fs = require("fs");
const path = require("path");

// Function to convert absolute paths to relative paths
function convertToRelative(htmlContent) {
  // Replace absolute paths starting with `/` with `./`
  return htmlContent.replace(
    /(src|href)=["']\/(.*?)["']/g,
    (_, attr, filePath) => {
      return `${attr}="./${filePath}"`;
    }
  );
}

// Input and output file paths
const inputFilePath = path.join(__dirname, "index.html");
const outputFilePath = path.join(__dirname, "output.html");

// Read the HTML file
fs.readFile(inputFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the HTML file:", err);
    return;
  }

  // Convert paths
  const updatedContent = convertToRelative(data);

  // Write the updated HTML to a new file
  fs.writeFile(outputFilePath, updatedContent, "utf8", (err) => {
    if (err) {
      console.error("Error writing the updated HTML file:", err);
      return;
    }
    console.log("HTML file updated successfully!");
  });
});
