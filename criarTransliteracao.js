const versos = require('./versos.json');
const util = require('./util')
const texto = require('./texto.json');
const fs = require('fs');


fs.writeFile('./transliteracao_vpl.txt', ' ', 'utf8', (err) => {
      if (err) throw err;
      console.log("The file was succesfully saved with UTF-8!");
}); 
versos.forEach(item => {
      const nt = util.isNT(item.verso.split(' ')[0]);
      const he = util.getLangFromBSB(texto, item.bsbs, nt);
      const nve = util.getBSBFrom(texto, he, nt);
      const destino = item.verso + ' ' + util.getTransliteracao(texto, nve);
      console.log(destino);
});


