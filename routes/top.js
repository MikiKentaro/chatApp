var express = require('express');
var router = express.Router();




router.get('/', function(req, res, next) {


//exports.index = function(req, res){

userAgent = req.headers['user-agent'].toLowerCase();



    // �\������y�[�W�o������
    if(userAgent.indexOf("android") != -1
             || userAgent.indexOf("iphone") != -1
             || userAgent.indexOf("ipod") != -1){
        res.render('top_m', {title: 'top mobile'});
    }
    else{
        res.render('top', {title:'top pc'});
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
