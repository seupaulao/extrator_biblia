const decompress = require("decompress");

decompress("texto.zip", "dist")
  .then((files) => {
    console.log(files);
  })
  .catch((error) => {
    console.log(error);
  });