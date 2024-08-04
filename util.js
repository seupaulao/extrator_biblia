const fs = require('fs');
const decompress = require("decompress");
const versos = require('./versos.json');

const at = [
  'GEN',
  'EXO',
  'LEV',
  'NUM',
  'DEU',
  'JOS',
  'JDG',
  'RUT',
  '1SA',
  '2SA',
  '1KI',
  '2KI',
  '1CH',
  '2CH',
  'EZR',
  'NEH',
  'EST',
  'JOB',
  'PSA',
  'PRO',
  'ECC',
  'SOL',
  'ISA',
  'JER',
  'LAM',
  'EZE',
  'DAN',
  'HOS',
  'JOE',
  'AMO',
  'OBA',
  'JON',
  'MIC',
  'NAH',
  'HAB',
  'ZEP',
  'HAG',
  'ZEC',
  'MAL',
];

const nt = ['MAT',
  'MAR',
  'LUK',
  'JOH',
  'ACT',
  'ROM',
  '1CO',
  '2CO',
  'GAL',
  'EPH',
  'PHI',
  'COL',
  '1TH',
  '2TH',
  '1TI',
  '2TI',
  'TIT',
  'PHM',
  'HEB',
  'JAM',
  '1PE',
  '2PE',
  '1JO',
  '2JO',
  '3JO',
  'JUD',
  'REV'];

exports.isAT = (f) => {
  return at.indexOf(f) >= 0 ;
}  

exports.isNT = (t) => {
  return nt.indexOf(t) >= 0 ;
}  

exports.getTransliteracao = (texto, ve) => {
   let fraseTransliteracao = [];
   for (let i=0; i<=ve.length-1; i++) {
      const j =  ve[i];
      fraseTransliteracao.push(texto[j].transliteracao);
   }   
   return fraseTransliteracao.join(' ');
}

exports.descomprimir = (arquivo) => {
    decompress(arquivo, "dist")
    .then((files) => {
      console.log(files);
      console.log('\n arquivos descomprimidos com sucesso')
    })
    .catch((error) => {
      console.log(error);
    });   
}

exports.apagarArquivo = (arquivo) => {
    fs.unlink('./dist/' + arquivo, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Arquivo foi deletado.');
        }
      }); 
}

const INICIO_NT = 305497;

exports.getBSBS = (chave) => {
   for (let i=0;i<=versos.length-1;i++) {
      if (versos[i].verso == chave) {
         return versos[i].bsbs;
      }
   }
}

exports.buscabinariaheb = (chave, arr, low, high) => {
   if (high >= low) {
      let mid = low + Math.floor((high - low) / 2);
      // console.log(mid, chave, arr[mid].HEB);
      if (arr[mid].HEB == chave ) { return mid; }
      if (arr[mid].HEB > chave) { return buscabinariaheb(chave, arr, low, mid -1); }
      return buscabinariaheb(chave, arr, mid + 1, high);
   }
   return -1;
}


function sequencialheb(arr, chave) {
  for(i = 0; i <= INICIO_NT ; i++) {
     if (arr[i].HEB == chave) return i;
  }
  return -1;
}

function sequencialgrk(arr, chave) {
  console.log(chave);
  for(i = INICIO_NT-1; i <= arr.length ; i++) {
     if (arr[i].GRK == chave)  {
      //console.log(chave, i);
      return i;
     }
  }
  return -1;
}

function sequencial (arr, chave, nt) {
  inicio = nt ? INICIO_NT : 0;
  for(i = inicio; i < arr.length ; i++) {
     if (arr[i].BSB == chave) return i;
  }
  return -1;
}

exports.getLangFromBSB = (fonte, bsb, nt) => {
  let novo = [];
  for (let i=0; i <= bsb.length-1; i++) {
     const j = sequencial(fonte, bsb[i], false);
     if (!nt) {
       novo.push(parseInt(fonte[j].HEB));
     } else {
       novo.push(parseInt(fonte[j].GRK));
     }
  }
  return novo.sort();   
}

function buscaRapidaBsbFromHeb(chave, fonte) {
  return sequencialheb(fonte, chave);
}

function buscaRapidaBsbFromGrk(chave, fonte) {
  return sequencialgrk(fonte, chave);
}

exports.getBSBFrom = (fonte, ve, nt) => {
  let novo = [];
  let contador = 0;
  while (contador < ve.length) {
    const ch = ve[contador];
    if (!nt) {
      novo.push(buscaRapidaBsbFromHeb(ch, fonte));
    } else {
      novo.push(buscaRapidaBsbFromGrk(ch, fonte));
    }
    contador += 1;
  }
  return novo;
}

exports.transformTxt2Json = (arquivoFonte, arquivoJson) => {
  const dtranslit = fs.readFileSync(arquivoFonte, {encoding: 'utf-8', flag: 'r'});
  let translit = '{';

  dtranslit.split('\n').forEach(item => {
    let posicao1 = item.indexOf(' ');
    let posicao2 = posicao1 + item.substring(posicao1 + 1).indexOf(' ') + 1;
    const chave = item.substring(0,3) + '_' + item.substring(posicao1 + 1, posicao2).replace(':','_');
    let valor = item.substring(posicao2+1);
    translit += '"' + chave + '": "' + valor + '",\n'
      //console.log(item.substring(0,3),'_', item.substring(posicao1 + 1, posicao2),'_',item.substring(posicao2+1).split('').reverse().join(''));
  });
  translit = translit.substring(0, translit.length-2) + '}';
  //console.log(translit);
  fs.writeFile(arquivoJson, translit, 'utf8', (err) => {
       if (err) throw err;
  }); 
}

