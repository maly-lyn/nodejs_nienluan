const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 2002

//morgan
app.use(morgan('combined'))
app.get('/trang-chu', (req, res) => {
  res.send(`
      <h1>Xin chào các bạn</h1>
  `);
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})