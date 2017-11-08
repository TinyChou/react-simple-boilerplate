const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const jsonfile = require('jsonfile')
const fs = require('fs')

app.use(express.static('.'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.listen(80, function () {
  console.log('app listening on port 80...')
})

app.post('/submit', function(req, res) {
  console.log(req.body.name, req.body.tel, req.body.score, req.body.company);

  const name = req.body.name;
  const tel = req.body.tel;
  const score = req.body.score;
  const company = req.body.company;
  write(name, tel, score, company, function () {
    res.setHeader('Content-Type', 'text/json; charset=utf-8');
    res.write(JSON.stringify({ status: 'success', code: 100 }));
    res.end();
  }, function () {
    res.setHeader('Content-Type', 'text/json; charset=utf-8');
    res.write(JSON.stringify({ status: 'failed', code: -1 }));
    res.end();
  });
})

function write(name, tel, score, company, ok, fail) {
  const jsonFile = './data/' + today() + '.json';
  // jsonfile.read
  read(function (arr) {
    arr.push({
      name: name,
      tel: tel,
      score: score,
      company: company
    }); // insert it

    jsonfile.writeFile(jsonFile, arr, function (err) {
      if (!err) ok();
      else fail(err)
    });
  });
}

function read(cb) {
  const jsonFile = './data/' + today() + '.json';
  // fs.closeSync(fs.openSync(jsonFile, 'r'));
  jsonfile.readFile(jsonFile, function (err, obj) {
    if (err) cb([]);
    else {
      obj = obj || [];
      cb(obj);
    }
  });
}

function today() {
  var dateObj = new Date();
  var month = dateObj.getMonth() + 1; //months from 1-12
  var day = dateObj.getDate();
  var year = dateObj.getFullYear();

  return year + "_" + month + "_" + day;
}
