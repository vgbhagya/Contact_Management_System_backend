const express = require('express');
const mongoose = require('mongoose');
const Contact = require('../models/Contact');


const url="mongodb://localhost:27017/contact"
mongoose.connect(url,{useNewUrlParser:true})
const con=mongoose.connection
const router=express()


con.on('open',()=>{
    console.log("connected...")
})

router.use(express.json())

router.listen(9000,()=>{
    console.log("Server connedcted 9000")
})




// Get all contacts
router.get('/getAll', (req, res, next) => {

  const result = Contact.find({})
  

    .then((resu) => {
      console.log(resu);
      res.status(200).json(resu);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Get a specific contact
router.get('/get/:contactId', (req, res, next) => {
  const id = req.params.contactId;
  Contact.findById(id)
    .exec()
    .then((doc) => {
      console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: 'No valid entry found for provided ID',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Create a new contact
router.post('/create', (req, res, next) => {
  const contact = new Contact({
    _id: new mongoose.Types.ObjectId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
  });
  contact
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: 'Contact created successfully',
        createdContact: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Update an existing contact
router.put('/update/:contactId',async(req,res)=>{
    try{
        await Contact.findByIdAndUpdate(req.params.contactId,{...req.body})
        const result = await Contact.findById(req.params.contactId)
        res.json(result)
    }catch(err){
        console.log(err)
        res.send('Error')
    }
})


// Delete a contact
router.delete('/delete/:contactId', (req, res, next) => {
  const id = req.params.contactId;
  Contact.findByIdAndDelete({ _id: id })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: 'Contact deleted successfully',
        deletedContact: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;