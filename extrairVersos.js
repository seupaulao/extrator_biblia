const versos = require('./versos.json');
const util = require('./util')

 const livros = new Set();
 versos.forEach(item =>livros.add(item.verso.split(' ')[0]));
 console.log(livros);

console.log(util.isAT('GEN'))
console.log(util.isAT('MAL'))
console.log(util.isAT('MAT'))
console.log(util.isNT('MAT'))