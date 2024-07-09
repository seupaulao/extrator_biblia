const arr1 = [{'id':1,'nome':'paulo'}, {'id':2,'nome':'saulo'}, {'id':3,'nome':'cesar'}];

console.log(arr1);

const result = arr1.map( item => ({'id': item['id'], 'nome': item['nome'].toUpperCase()}));

console.log(result);
// Expected output: Array [1, 2, 2, 1]
