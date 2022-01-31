var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();
const mongoDbschema = require('../models/Main')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const base = await mongoDbschema.find()
  console.log(base);
  res.render('index', { 
    title: 'Express' ,
    base
});
});


router.post('/', async function(req,res) {
  const {title, price, img} = req.body

  const main = new mongoDbschema({
    title,
    price,
    img
  })

  await main.save()

  res.redirect('/')
})


router.get('/admin/edit/:id', async function(req, res, next) {
  const base = await mongoDbschema.findById(req.params.id)
  console.log(base);
  res.render('admin/edit', { 
    title: 'Express' ,
    base
});
});


router.post('/admin/edit/:id', async function(req, res, next) {
  const {title, price, img} = await mongoDbschema.findById(req.params.id)
  const bases = req.body

  await mongoDbschema.findByIdAndUpdate(req.params.id, bases)
  res.redirect('/')


});
router.get('/admin/delete/:id', async function(req, res, next) {
  await mongoDbschema.findByIdAndDelete(req.params.id)
  res.redirect('/')
});


module.exports = router;
