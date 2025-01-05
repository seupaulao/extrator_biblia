const t1 = require('./para_comparar/heb.json');
const t2 = require('./para_comparar/blv_velho.json');
const t3 = require('./para_comparar/translit_velho.json');
const t4 = require('./para_comparar/grc.json');
const t5 = require('./para_comparar/blv_novo.json');
const t6 = require('./para_comparar/translit_novo.json');

function comparador(texto1, texto2, nome1, nome2) {
    console.log('---tem no '+nome1+' mas nao tem no '+nome2+'---\n');
    let contador = 0;
     for(var indice in texto1) {
        if (texto2[indice] == undefined) {
            console.log(indice, texto1[indice], texto2[indice]);
            contador += 1;
        }
     }
     console.log("Ocorrencias "+nome1+" e !"+nome2+": ", contador);
}

//colocar em translit NEH_7_68: SEM TRANSLIT
function compararTranslitEBLV_Velho() {
    comparador(t2,t3,'translit_velho','blv_velho');
    comparador(t3,t2,'blv_velho','translit_velho');
}

function compararHebBLVVelho() {
    comparador(t1,t2,'heb','blv_velho');
    comparador(t2,t1,'blv_velho','heb');
}

function compararTranslitEBLVNovo() {
    comparador(t6,t5,'translit_novo','blv_novo');
    comparador(t5,t6,'blv_novo','translit_novo');
}

function compararGRCBLVNovo() {
    comparador(t4,t5,'grc','blv_novo');
    comparador(t5,t4,'blv_novo','grc');
}

// compararTranslitEBLV_Velho(); //apenas 1 registro NEH_7_68 para colocar em translit_velho

 compararHebBLVVelho();   //201 versos tem em heb, mas nao tem em blv
                          //133 versos tem em blv, mas nao tem em heb
                          //verificar os falsos positivos
                          //a diferenca de versos das 2 versoes eh de : 23213(heb) - 23145(blv_velho) = 68 versos

// compararTranslitEBLVNovo(); //16 registros para colocar em translit_novo, sem transliteracao

// Os versos abaixo nao existem na versao BLV e nem na King James 1601
// 3JO_1_15 Εἰρήνη σοι. ἀσπάζονταί σε οἱ φίλοι. ἀσπάζου τοὺς φίλους κατʼ ὄνομα. ‘p /’ ‘/book’ undefined
// REV_12_18 καὶ ⸀ἐστάθηἐπὶ τὴν ἄμμον τῆς θαλάσσης. undefined

// Ademais outros 20 versos estão sem transliteração do novo - verificar

// compararGRCBLVNovo();
