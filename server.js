 var express = require('express');
var path = require('path');
var upload = require('express-fileupload');
var multer  = require('multer');
var cors = require('cors');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage, dest: 'api/fileanalyse' }).single('myFile');
var app = new express();
app.use(cors());

app.use(express.static('public'));
app.use(express.static('views'));
app.get('/' ,(req,res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
  res.sendFile(path.join(__dirname, 'public', 'style.css'));
})
app.post('/api/fileanalyse',upload, (req,res,next) => {
  res.send({
    'name' : req.file.originalname,
    'type' : req.file.mimetype,
    'size' : req.file.size
  });
  if (!req.file) {
    res.send('No files were uploaded.');
    return;
  }
})
app.listen(8080, ()=>{
  console.log('listening on port 8080');
})
