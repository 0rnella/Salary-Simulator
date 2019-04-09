const express = require('express')
const app = express()
const path = require('path')

const morgan = require('morgan')
app.use(morgan('dev'))

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')))
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.use('/api', require('./api'));

app.use(function (err, req, res, next) {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.')
})

const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log(`Now listening on port ${port}!`)
});