const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Ola Mundo Express!')
})

app.get('/teste/:id', (req, res) => {
    console.log(req.params)
    res.send(`Hello World! ID=${req.params['id']}`)
  })

app.get('/verso/:endereco', (req, res) => {
    console.log(req.params)
    res.send(`Verso! IDs=${req.params}`)
})  

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })