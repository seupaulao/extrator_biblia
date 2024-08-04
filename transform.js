const fs = require('fs')
const util = require('./util')

// const dtranslit = fs.readFileSync('transliteracao_vpl.txt', {encoding: 'utf-8', flag: 'r'});

// let translit = '{';

// dtranslit.split('\n').forEach(item => {
//     const chave = item.substring(0, item.indexOf(' ')).replace(':','_');
//     const valor = item.substring(item.indexOf(' ')+1)
//     translit += '"' + chave + '": "' + valor + '",\n'
// });
// translit = translit.substring(0, translit.length-2) + '}';

// fs.writeFile('./translit.json', translit, 'utf8', (err) => {
//      if (err) throw err;
// }); 

util.transformTxt2Json('./hboWLC_vpl.txt','./heb.json');
util.transformTxt2Json('./grcsbl_vpl.txt','./grc.json');
util.transformTxt2Json('./bliv-tr_vpl.txt','./blv.json');