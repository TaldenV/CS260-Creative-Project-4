var express = require('express');

const bodyParser = require("body-parser");
var router = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
var mongoose = require('mongoose');
var ObjectSchema = new mongoose.Schema({
  title: String,
  text: String,
  imageName: String,
  page: {type: Number, default: 0}
});

ObjectSchema.methods.imageChange = function(newName, cb) {
  this.imageName = newName;
  this.save(cb);
};

ObjectSchema.methods.titleChange = function(newTitle, cb) {
  this.title = newTitle;
  this.save(cb);
};

ObjectSchema.methods.textChange = function(newText, cb) {
  this.text = newText;
  this.save(cb);
};
mongoose.connect('mongodb://localhost:27017/objects', {
  useNewUrlParser: true
});

mongoose.model('Object', ObjectSchema);

var mongoose = require('mongoose');
var Object = mongoose.model('Object');
router.get('/objects', function(req, res, next) {
  Object.find(function(err, objects){
    if(err){ return next(err); }
    res.json(objects);
  });
});

const multer = require('multer')
  var storage = multer.diskStorage({
    destination: '../vue/public/images/',
    filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
    limits: {
      fileSize: 10000000
    }
  });
var upload =  multer({ storage: storage });

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: false
}));
router.listen(3000, () => console.log('Server listening on port 3000!'));

router.post('/image',upload.single('photo'), (req, res) => {
     res.send({
    path: "public/images/" + req.file.filename
  });
}, (error, req, res, next) => {
     res.status(400).send({ error: error.message }) //code from bacancytechnology
})

router.post('/objects', function(req, res, next) {
  console.log(req.body);
console.log("great");
  var object = new Object(req.body);
  object.save(function(err, object){
    if(err){ return next(err); }
    res.json(object);
  });
});
router.param('object', function(req, res, next, id) {
  var query = Object.findById(id);
  query.exec(function (err, object){
    if (err) { return next(err); }
    if (!object) { return next(new Error("can't find comment")); }
    req.object = object;
    return next();
  });
});
router.put('/objects/image/:object', function(req, res, next) {
  req.object.imageChange(req.body.imageName, function(err, object){
    if (err) { return next(err); }
    res.json(object);
  });
});
router.put('/objects/title/:object', function(req, res, next) {
  req.object.titleChange(req.body.title, function(err, object){
    if (err) { return next(err); }
    res.json(object);
  });
});
router.put('/objects/text/:object', function(req, res, next) {
  req.object.textChange(req.body.text, function(err, object){
    if (err) { return next(err); }
    res.json(object);
  });
});
router.delete('/objects/:id', function(req, res, next) {
  try {
    var query = Object.deleteOne({
      _id: req.params.id
    });
    query.exec(function(err, objects){
    if(err){ return next(err); }
    console.log(objects);
    res.json(objects);
  });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
router.get('/objects/:object', function(req, res) {
  res.json(req.object);
});


router.get('/api/items', async(req, res) => {
    try {
        let items = await Item.find();
        res.send(items);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});