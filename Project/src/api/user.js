var express=require('express');
var mongoose=require('mongoose');

var User = require('../Schemas/user.schema');
var Movie = require('../schemas/movie.schema')
var router = express.Router();

mongoose.connect('mongodb://localhost:27017/ifa', { useNewUrlParser: true }).then(()=>{
  console.log('Connected');
}).catch(()=>{
  console.log('Error Connecting to DB');
});

router.post('/signUp',function(req,res,next) {   
    
    var user=new User({
        _id: new mongoose.Types.ObjectId(),
        'name' : req.body.name,
        'password':req.body.password,
        'email':req.body.email
     });
     
     user.save(function(err,classes){
       if(err){
         return res.status(500).json({
           title :'An error occured while Signing Up',
           error:err
         });
        }
      res.status(201).json({
            msg:'User Created',
            obj:classes
      });      
      });

});


router.post('/signIn',function(req,res,next){   
  User.findOne({email:req.body.email},function(err,user) {
    if(err){
      return res.status(500).json({
          title:'An error occured',
          error:err
      });
    }


    if(!user){
      return res.status(500).json({
          title:'Login Failed',
          error:{ messages:'Invalid user'}
      });
    }

       if(user.password != req.body.password) {
        return res.status(401).json({
          title:'Login Failed',
          error:{ message: 'Invalid Password'}
        });
    }
    
   res.status(200).json({
    messages:'successfully logged in',
    obj:user
  //  token:token,
});
   /* if(!bcrypt.compareSync(req.body.password,user.password)){
      return res.status(401).json({
        title:'Login Failed',
        error:{ messages:'Invalid password' }
    });
    */
  });
  });

  
router.get('/getid/:email',function(req,res,next) {
  User.findOne({email:req.params.email},function(err,user) {
    if(err){
      return res.status(500).json({
          title:'An error occured',
          error:err
      });
    }
    if(!user){
      return res.status(500).json({
          title:'Login Failed',
          error:{ messages:'Invalid user'}
      });
    }    
   res.status(200).json({
    obj: user,
    messages:'successfully logged in',
});
});
});


  
router.get('/values/:email',function(req,res,next) {
  User.findOne({email:req.params.email},function(err,user) {
    if(err){
      return res.status(500).json({
          title:'An error occured',
          error:err
      });
    }
    if(!user){
      return res.status(500).json({
          title:'Login Failed',
          error:{ messages:'Invalid user'}
      });
    }    
   res.status(200).json({
    obj: user,
    messages:'successfully logged in',
});
});
});


router.get('/movies',function(req,res,next) {
  User.findOne({email:req.params.email},function(err,user) {
    if(err){
      return res.status(500).json({
          title:'An error occured',
          error:err
      });
    }
    if(!user){
      return res.status(500).json({
          title:'Login Failed',
          error:{ messages:'Invalid user'}
      });
    }    
   res.status(200).json({
    obj: user,
    messages:'successfully logged in',
});
});
});


  
router.get('/getmovies',function(req,res,next) {
  Movie.find({},function(err,movies) {
    if(err){
      return res.status(500).json({
          title:'An error occured',
          error:err
      });
    }
   res.status(200).json({
    obj: movies,
    messages:'Movies Retured',
});
});
});


router.post('/insertMovie',function(req,res,next) {   
    
  var movie=new Movie({
      _id: new mongoose.Types.ObjectId(),
      'movie' : req.body.movie,
      'genre':req.body.genre
    });
   
   movie.save(function(err,movies){
     if(err){
       return res.status(500).json({
         title :'An error occured while Signing Up',
         error:err
       });
      }
    res.status(201).json({
          msg:'movie Created',
          obj:movies
    });      
    });
});


router.get('/inc/:email/:genre',function(req,res,next) {   
    
});



module.exports = router;