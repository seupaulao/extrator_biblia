const util = require('./util')

const texto = require('./dist/texto.json');

// util.descomprimir('texto.zip');

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
      const he = util.getLangFromBSB(texto, ve, nt);
      const nve = util.getBSBFrom(texto, he, nt);
      printVetor(nve, false);
 }

print('Genesis 1:1', false);
console.log('');
print('Exodus 20:8', false);
console.log('');
print('Revelation 1:1', true);


// criar arquivo - transliteracao.txt
//     formato:   GEN_1_1 texto_ou_translit
// processar as vpl e colocar no mesmo formato acima
// idéia: vetor[chave]=valor
//
//         TRADUCAO[livro_cap_ver] = texto
// ORIGINAL_GRK_HEB[livro_cap_ver] = texto
// TRANSLIT_GRK_HEB[livro_cap_ver] = texto
//
// TABELA TRADUCAO
// palavra original == traducao == classe gramatical


