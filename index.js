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
  var senha = document.getElementById("senha").value;
  var file = new XMLHttpRequest();
  file.open("GET", "documento.pdf", true);
  file.responseType = "arraybuffer";
  file.onload = function (event) {
    var arrayBuffer = file.response;
    if (arrayBuffer) {
      var byteArray = new Uint8Array(arrayBuffer);
      var content = "";
      var chunkSize = 1024;
      for (var offset = 0; offset < byteArray.byteLength; offset += chunkSize) {
        var chunk = byteArray.subarray(offset, offset + chunkSize);
        for (var i = 0; i < chunk.length; i++) {
          content += String.fromCharCode(chunk[i]);
        }
      }
      var password = new TextEncoder().encode(senha);
      var data = new TextEncoder().encode(content);
      crypto.subtle
        .digest("SHA-256", concatenateByteArrays(data, password))
        .then(function (hash) {
          var hashArray = Array.from(new Uint8Array(hash));
          var hashHex = hashArray
            .map((b) => ("00" + b.toString(16)).slice(-2))
            .join("");
          document.getElementById("resultado").innerHTML =
            "Hash SHA256 do arquivo PDF com a senha informada: " + hashHex;
        });
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
