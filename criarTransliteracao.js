const versos = require('./versos.json');
const util = require('./util')
const texto = require('./texto.json');
const fs = require('fs');



let destino = '';
versos.forEach(item => {
      const nt = util.isNT(item.verso.split(' ')[0]);
      if (item.bsbs.length > 1) {
            const he = util.getLangFromBSB(texto, item.bsbs, nt);
            const nve = util.getBSBFrom(texto, he, nt);
            const temp = item.verso + ' ' + util.getTransliteracao(texto, nve);
            console.log(temp);
            destino += temp + '\n';
      }
     
});
fs.writeFile('./transliteracao_vpl.txt', destino, 'utf8', (err) => {
      if (err) throw err;
}); 

console.log("arquivo processado com êxito!");

