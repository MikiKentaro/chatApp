var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {


//exports.index = function(req, res){

userAgent = req.headers['user-agent'].toLowerCase();



    // 表示するページ出し分け
    if(userAgent.indexOf("android") != -1
             || userAgent.indexOf("iphone") != -1
             || userAgent.indexOf("ipod") != -1){
        res.render('index_m', {title: 'chat mobile'});
    }
    else{
        res.render('index', {title:'chat pc'});
    }

//}


});






/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'chatpage' });
});
*/
module.exports = router;
