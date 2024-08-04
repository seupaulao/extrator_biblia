const util = require('./util')

const texto = require('./texto.json');

function printVetor (ve, nt) {
   let fraseOriginal = [];
   let fraseTransliteracao = [];
   let saida = [];
   for (let i=0; i<=ve.length-1; i++) {
      const j =  ve[i];
      let original = '';
      posicao = j; 
         if (posicao<util.INICIO_NT) {
               original = texto[j].original.split('').reverse().join('');
         } else {
               original = texto[j].original;
         }
         saida.push(original + " == " + texto[posicao].transliteracao + " :: " + texto[posicao].traducao);
         fraseOriginal.push(original);
         fraseTransliteracao.push(texto[posicao].transliteracao);
   }   
   if (!nt) {
      console.log( fraseOriginal.reverse().join(' ') );
   } else {
      console.log( fraseOriginal.join(' ') );
   }
   console.log( fraseTransliteracao.join(' ') );
   console.log(saida);
 }
 
 function print (chave, nt) {
     const ve = util.getBSBS(chave);
     if (ve.length > 1) {
        const he = util.getLangFromBSB(texto, ve, nt);
        const nve = util.getBSBFrom(texto, he, nt);
        printVetor(nve, false);
     }
 }

//print('GEN 1:1', false);
//console.log('');
//print('MAL 4:6', false);
//console.log('');
//print('REV 22:21', true);
//console.log('');
print('MAT 1:1', true);

