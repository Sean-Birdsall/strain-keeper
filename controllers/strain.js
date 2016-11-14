var Strain = require('../models/strainModel');

module.exports = {

  addStrain: (req, res) => {
    var newStrain = new Strain(req.body);
    // when this function fires it is going to hit the pre save middleware
    newStrain.save((err, strain) => {
      if(err){
        return res.send(err);
      }
      res.send(strain);


    })

  },

  getStrains: (req, res) => {
    Strain.find({}, (err, strains) =>{
      if (err) {
        console.error(err);
      } else {
        res.send(strains);
      }
    })
  },

  deleteStrain: (req, res) => {
    console.log('From the deleteStrain function:', req.query)
    Strain.remove( {name: req.query.strainToDelete, createdBy: req.query.strainCreatedBy}, (err, strain) => {
      if (err) {
        console.log(err);
      } else {
        res.send(`Deleted instance of ${req.query.strainToDelete} from database`);
      }
    })
  }
}
