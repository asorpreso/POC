const crypto = require("crypto");
const fs = require("fs");
const filePath = "documento.pdf";
const fileBuffer = fs.readFileSync(filePath);
const fsHash = crypto.createHash("sha256");
fsHash.update(fileBuffer);
const hash = fsHash.digest("hex");
console.log(hash);
