const fs = require('fs');


fs.unlink('./dist/texto.json', (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('File is deleted.');
    }
  }); 