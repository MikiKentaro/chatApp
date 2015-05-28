var express = require('express');
var router = express.Router();




router.get('/', function(req, res, next) {



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



});

module.exports = router;
