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

}
}
