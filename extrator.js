const csv = require('csv-parser');
const fs = require('fs');
const util = require('./util')
// const resultado = [];

//Heb$Grk$BSB$Language$Vs$WLCTR$Eq$Translit$Verse$Heading$BSBVTrad

// Verso, BSBs do versos[]
const verso = []
// BSB, HebrewBSB
const hebrew_versos = []
// BSB, GreekBSB
const greek_versos = []
// BSB, texto, transliteracao, traducao_principal
const texto = []
// BSB, gramatica, refX
const gramatica = []
// BSB, traducao_outras
const outras = []

let atual = '1'
let atualverse = 'Genesis 1:1'
let vetbsb = []

// em verso colocar a forma resumida do verso => GEN 1:1, REV 2:1, etc

util.descomprimir('./bsb_tables.zip')

fs.createReadStream('bsb_tables.csv')
.pipe(csv({ separator: '$'}))
.on('data', (data) => {
   
   vetbsb.push(data['BSB']);
   if (atual != data['Vs'].trim()) {
      const temp = vetbsb.pop();
      verso.push({'verso':atualverse, 'bsbs': vetbsb});
      atualverse = data['Verse'];
      vetbsb = [];
      vetbsb.push(temp);
   }
   atual = data['Vs'].trim();

   // resultado.push(data);
   
   texto.push({'BSB':data['BSB'], 'HEB':data['Heb'], 'GRK':data['Grk'], 'original':data['WLCTR'], 'transliteracao':data['Translit'],'traducao':data['BSBVTrad']}) 
   
   //if (data['Heb'] != '999999') {
   //   hebrew_versos.push({'BSB': data['BSB'], 'id': data['Heb']});
   //}
   
   //if (data['Grk'] != '0') {
   //   greek_versos.push({'BSB': data['BSB'], 'id': data['Grk']});
   //}
   
   //gramatica.push({'BSB': data['BSB'], 'funcao': data['Parsing1'], 'refx': data['CrossRef'], 'strong': data['Strongs']});
   
   //outras.push({'BSB': data['BSB'], 'traducao': data['BDBVTrad']});
})
.on('end', () => {
   //console.log(outras);
   //console.log(hebrew_versos);
   //console.log(greek_versos);
   fs.writeFileSync('./versos.json', JSON.stringify(verso, null, '  '));
   fs.writeFileSync('./texto.json', JSON.stringify(texto, null, '  '));
   //fs.writeFileSync('./gramatica.json', JSON.stringify(gramatica, null, '  '));
   //fs.writeFileSync('./outras_traducoes.json', JSON.stringify(outras, null, '  '));
});

util.apagarArquivo('bsb_tables.csv')

