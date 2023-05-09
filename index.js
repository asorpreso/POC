const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
function validarCodigo() {
  var codigo = document.getElementById("codigo").value;
  if (codigo === "12345") {
    window.location.href = "assinatura.html";
  } else {
    document.getElementById("mensagem").innerHTML = "Código inválido.";
  }
}
function gerarHash() {
  var file = new XMLHttpRequest();
  file.open("GET", "documento.pdf", true);
  file.responseType = "arraybuffer";
  file.onload = function (event) {
    var arrayBuffer = file.response;
    if (arrayBuffer) {
      var wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
      var hash = CryptoJS.SHA256(wordArray).toString();
      document.getElementById("resultado").innerHTML =
        "Hash SHA256 do arquivo PDF: " + hash;
    }
  };
  file.send();
}

function concatenateByteArrays(a, b) {
  var c = new Uint8Array(a.length + b.length);
  c.set(a, 0);
  c.set(b, a.length);
  return c;
}
