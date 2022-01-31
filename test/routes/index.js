const express = require('express');
const res = require('express/lib/response');
const async = require('hbs/lib/async');
const router = express.Router();
const Baza = require('../models/Baza')


/* GET home page. */
router.get('/', async (req, res, next) => {
  const basa = await Baza.find()
  // console.log(basa);
  res.render('index', {
    title: 'BookStore',
    basa
  });
});

router.post('/', async (req,res) => {
  const { title, price, img } = req.body

  const asd = new Baza({
    title,
    price,
    img
  })

  await asd.save()

  res.redirect('/')
})

module.exports = router;
