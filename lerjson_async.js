const fs = require('fs');
var obj;
fs.readFile('./dist/texto.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  console.log(obj)
});