// const fs = require('fs/promises');
const texto = require('./texto.json');
const versos = require('./versos.json');

//console.log(versos[0].verso, versos.length);
//console.log(texto[0].original, texto[0].transliteracao);

const INICIO_NT = 305498;

function getBSBS(chave) {
   for (let i=0;i<=versos.length-1;i++) {
      if (versos[i].verso == chave) {
         return versos[i].bsbs;
      }
   }
}

function sequencial(arr, chave, nt) {
   inicio = nt ? INICIO_NT : 0;
   for(i = inicio; i < arr.length ; i++) {
      if (arr[i].BSB == chave) return i;
   }
   return -1;
}

// pega o vetor em hebraico que será ordenado e usado para mostrar os termos do verso
function getHebFromBSB(bsb) {
   let novo = [];
   for (let i=0; i <= bsb.length-1; i++) {
      const j = sequencial(texto, bsb[i], false);
      novo.push(parseInt(texto[j].HEB));
   }
   return novo.sort();   
}

function getGrkFromBSB(bsb) {
   let novo = [];
   for (let i=0; i <= bsb.length-1; i++) {
      const j = sequencial(texto, bsb[i], true);
      novo.push(parseInt(texto[j].GRK));
   }
   return novo.sort();   
}

// function buscabinariaheb(chave, arr, low, high) {
//    if (high >= low) {
//       let mid = low + Math.floor((high - low) / 2);
//       // console.log(mid, chave, arr[mid].HEB);
//       if (arr[mid].HEB == chave ) { return mid; }
//       if (arr[mid].HEB > chave) { return buscabinariaheb(chave, arr, low, mid -1); }
//       return buscabinariaheb(chave, arr, mid + 1, high);
//    }
//    return -1;
// }

function sequencialheb(arr, chave) {
   for(i = 0; i < arr.length ; i++) {
      if (arr[i].HEB == chave) return i;
   }
   return -1;
}
function sequencialgrk(arr, chave) {
   for(i = INICIO_NT; i < arr.length ; i++) {
      if (arr[i].GRK == chave) return i;
   }
   return -1;
}

function buscaRapidaBsbFromHeb(chave) {
      return sequencialheb(texto, chave);
}

function buscaRapidaBsbFromGrk(chave) {
   return sequencialgrk(texto, chave);
}


function getBSBFromHeb(ve) {
   let novo = [];
   let contador = 0;
   while (contador < ve.length) {
      const ch = ve[contador];
      novo.push(buscaRapidaBsbFromHeb(ch, ve));
      contador += 1;
   }
   return novo;
}

function getBSBFromGrk(ve) {
   let novo = [];
   let contador = 0;
   while (contador < ve.length) {
      const ch = ve[contador];
      novo.push(buscaRapidaBsbFromGrk(ch, ve));
      contador += 1;
   }
   return novo;
}

function printVetor(ve) {
   for (let i=0; i<=ve.length-1; i++) {
      const j =  ve[i];
      let original = '';
      posicao = j; 
         if (posicao<INICIO_NT) {
               original = texto[j].original.split('').reverse().join('');
         } else {
               original = texto[j].original;
         }
         console.log(original, " == ", texto[posicao].transliteracao, " :: ", texto[posicao].traducao);
   }   
}


function print(chave, nt) {
   const ve = getBSBS(chave);
   if (!nt) {
      const he = getHebFromBSB(ve);
      const nve = getBSBFromHeb(he);
      // console.log(nve);
      printVetor(nve);
   } else {
      // console.log(ve);
      const gr = getGrkFromBSB(ve);
      // console.log(gr);
      const nve = getBSBFromGrk(gr,nt);
      // console.log(nve);
      printVetor(nve);
   }
}

print('Genesis 1:1', false);
console.log('');
print('Exodus 20:2', false);
console.log('');
print('Exodus 20:8', false);
console.log('');
print('John 1:1', true);
console.log('');
print('Revelation 1:1', true);

 