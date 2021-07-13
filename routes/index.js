const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const Deal = require('../models/deals');
const util = require('util')


// helpers
const getListing = require('../helpers/getListing');
const getByPrice = require('../helpers/getByPrice.js')
const getByPostal = require('../helpers/getByPostal.js')


router.get('/test', (req, res) => {
    res.status(200).send( "route works")
  });

// post new deal
router.post('/deals', (req, res) => {
    let deal_fields = req.body;
    // ValidateNewDeal();
    deal_fields.postal_code = deal_fields.postal_code.toLowerCase();
    let new_deal = new Deal(newDeal);
    new_deal.save()
    res.status(202).json(deal)
  });
  

//get details of a property deal
router.get('/deals/:id', (req, res) => {
    const query = {};
    const id = req.params.id;
    Deal.findById(id)
    .then(deals=>{
        res.status(200).json({success: true, data: deals});
    })
    .catch(err=>{
        return res.status(500).json({succes: false, error: err})
    })
   
  });
  


//request to duna API for house listing
router.get('/city-listings/:city/:category/:type/:postal_code', async(req, res) => {
    const {city, category,type, postal_code } = req.params

    const listing = getListing(city, category, type, postal_code)
    console.log(util.inspect(promise))
  
    listing.then(data =>{
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).send(err);
    })
  })



//elastic search with prices returned
router.get('/city-data/:city/:type/:postal_code', (req, res) => {
    const city = req.params.city;
    const type = req.params.type
    const postcode = decodeURIComponent(req.params.postal_code);
    console.log("postcode decoded: " + postcode)
    getByPrice(city, type, postal_code)
    .then(data =>{
      res.status(200).json({ data });
    })
    .catch(err => {
      res.status(500).send(err);
    })
  })
  

//elastic search based on postal code
router.get('/property-types/:city/:postal_code', (req, res) => {
    const city = req.params.city;
    const postal_code = decodeURIComponent(req.params.postal_code);
    const size = req.body.size
    getByPostal(city, postal_code, size)
    .then(data =>{
      res.status(200).json({ data });
    })
    .catch(err => {
      res.status(500).send(err);
    })
  })
  




  module.exports  = router