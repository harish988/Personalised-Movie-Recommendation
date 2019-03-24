var express=require('express');
var path = require('path');
const JSON = require('circular-json');
var router = express.Router();
var root = path.dirname(require.main.filename);
var PyShell = require('python-shell');
var fs = require('fs');

router.get('/writeReview/:review',function(req,res,next){
  console.log(req.params.review);
  var data = req.params.review;

fs.writeFileSync('F:\\ifa\\NaiveBayes\\review.txt', data, function(err, data){
    if (err) console.log(err);
    console.log("Successfully Written to File.");
});

    PyShell.run('F:\\ifa\\NaiveBayes\\test.py', null, function (err) {
        if (err) throw err;
        console.log('finished');
        var result = fs.readFileSync('F:\\ifa\\NaiveBayes\\output.txt')
        res.send(JSON.stringify(result));
    });

});


module.exports = router;