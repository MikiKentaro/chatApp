var express = require('express');
var router = express.Router();




router.get('/', function(req, res, next) {


//exports.index = function(req, res){

userAgent = req.headers['user-agent'].toLowerCase();



    // 表示するページ出し分け
    if(userAgent.indexOf("android") != -1
             || userAgent.indexOf("iphone") != -1
             || userAgent.indexOf("ipod") != -1){
        res.render('top_m', {title: 'ライドロチャット-モバイル トップページ'});
    }
    else{
        res.render('top', {title:'ライドロチャット トップページ'});
    }

//}


});








/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('top', { title: 'top' });
});
*/
module.exports = router;
