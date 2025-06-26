const fs = require('fs');
const path = require('path');

const BASE_FOLDER = '.maestro';

// Recursive function to find matching files
function getFlowPath(dir) {
  let flowPath = [];

  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat && stat.isDirectory()) {
      // Recurse into subdirectory
      flowPath = flowPath.concat(getFlowPath(fullPath));
    } else if (file.endsWith(`-${process.env.PLATFORM}.yml`)) {
      // Match found
      flowPath.push(fullPath);
    }
  });

  return flowPath;
}

console.log(JSON.stringify(getFlowPath(BASE_FOLDER)));
