//this file contains the endpoint to CRUD protocolentries in the database
const CategorySchema = require('../models/Category.js');
const passport = require('passport');

module.exports.controller = (app) => {
// fetch all devices
app.get('/categories', passport.authenticate('jwt', { session: false }), (req, res) => {
    CategorySchema.find({}, 'name options', (error,
    categories) => {
    if (error) { console.log(error); }
    res.send({
    categories,
    });
    }).sort( { name: 1 } );
    });

//delete device from the database

app.delete('/categories/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  DeviceSchema.remove({
      _id: req.params.id 
  }, function(error, device){
      if (error){console.error(error);}
      res.send({success:true})
  })
  });
    




// add or update a  entry
app.put('/categories/', passport.authenticate('jwt', { session: false }), (req, res) => {
    CategorySchema.findOneAndUpdate({name: req.body.name}, { $push: { options: req.body.options }, }, { upsert : true },
    function(err){
    if(err){
    console.log(err);
    }
    res.send({success:true})
    });
    });
};





    

