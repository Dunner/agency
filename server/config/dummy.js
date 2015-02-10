'use strict';

var mongoose = require('mongoose'),
   Sound = mongoose.model('Sound'),
   Person = mongoose.model('Person');


// Remove all sounds and add dummy
Sound.find({}).remove(function() {
   
   var name = 'Jonathan\'s sound',
       slug = 'Jonathan\'s-sound',
       newSound  = new Sound();
   
   newSound.name = name;
   newSound.slug = slug;
   
   newSound.save(function(err) {
      if (err)
         console.log(err);
      console.log('dummy sound with name: '+ newSound.name);
   });

});
