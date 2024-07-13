const fs = require('fs');
const decompress = require("decompress");

exports.descomprimir = (arquivo) => {
    decompress(arquivo, "dist")
    .then((files) => {
      console.log(files);
      console.log('\n arquivos descomprimidos com sucesso')
    })
    .catch((error) => {
      console.log(error);
    });   
}

exports.apagarArquivo = (arquivo) => {
    fs.unlink('./dist/' + arquivo, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Arquivo foi deletado.');
        }
      }); 
}
