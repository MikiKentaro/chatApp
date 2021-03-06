﻿var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/top');
var users = require('./routes/users');
var mypage = require('./routes/mypage');
var chat = require('./routes/index');



var app = express();

// mongooseを用いてMongoDBに接続する
var mongoose = require('mongoose');


var MONGO_URL = process.env.MONGOLAB_URI || 'mongodb://localhost/chatapp';

var db = mongoose.connect(MONGO_URL);

/* （略） */

// ToDoスキーマを定義する
var Schema = mongoose.Schema;
var chatSchema = new Schema({
  sender      : {type: String, default: "no text"},
  text        : String,
  createdDate : {type: Date, default: Date.now},
  chatText    : {type: String, default: "no text"},
  iconNum     : {type: String, default: "1"},
  chatname    : {type: String, default: "1"},

  
});
mongoose.model('Chat', chatSchema);

//トップに表示されるチャットのデータ
var chatProfSchema = new Schema({
  createdDate : {type: Date, default: Date.now},
  updatedDate : {type: Date, default: Date.now},
  chatname    : {type: String, default: "no name"},
  chatCount   : {type: String, default: "0"},

});
mongoose.model('ChatProf', chatProfSchema);


//誰かがチャットに入っている時　デフォルトではゼロにする
var ProfSchema = new Schema({
  createdDate : {type: Date, default: Date.now},
  updatedDate : {type: Date, default: Date.now},
  name        : {type: String, default: "no name"},
  chatroom    : {type: String, default: "no chat"},
  iconNum     : {type: String, default: "1"},
  beChat      : {type: Boolean, default: true},
  socketID    : {type: String, default: "no chat"},



});
mongoose.model('prof', ProfSchema);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/mypage', mypage);
app.use('/chat', chat);



// /todoにGETアクセスしたとき、ToDo一覧を取得するAPI
app.get('/data/chat', function(req, res) {
  var Chat = mongoose.model('Chat');
  

 var today=new Date();
  today.setDate(today.getDate() - 1);
  
  
  
   Chat.remove({ createdDate : { $lt :today }} , function(err, prof) {
  });




  Chat.find(null,{},{sort:{createdDate: 1}}, function(err, chats){

    res.send(chats);

	
  });
  
 
  
  
});
app.get('/data/chatprof', function(req, res) {
  var Chatprof = mongoose.model('ChatProf');
  // すべてのToDoを取得して送る
    Chatprof.find(null,{},{sort:{updatedDate: -1},limit:12}, function(err, chatprof){

    res.send(chatprof);

	
  });
  
   //Chatprof.remove({} , function(err, prof) {
  //});
});

app.get('/data/prof', function(req, res) {
  var Prof = mongoose.model('prof');
  // すべてのToDoを取得して送る
  
     
  
  Prof.find({}, function(err, prof) {
    res.send(prof);
	console.log("nuj")
  });
  
  
});

// /todoにPOSTアクセスしたとき、ToDoを追加するAPI
app.post('/data/chat', function(req, res) {
  var chatText = req.body.chatText;
  var sender = req.body.senderName;
  var Chatroom=req.body.chatroom;
  
  var NewMemRoomName=req.body.newMemRoomName;
  var NewMemName=req.body.newMemName;
  
  var DelRoomName=req.body.delRoomName;
  var DelMemName=req.body.delMemName;

if(DelRoomName && DelMemName) {


    var Chat = mongoose.model('Chat');
    var chat = new Chat();
    chat.chatText = DelMemName+"さんが退室しました。";
    chat.sender = "運営";
    chat.chatname = DelRoomName;
	
    chat.save();


};


 
 if(NewMemRoomName && NewMemName) {
    var Chat = mongoose.model('Chat');
    var chat = new Chat();
    chat.chatText = NewMemName+"さんが入室しました。";
    chat.sender = "運営";
    chat.chatname = NewMemRoomName;
	
    chat.save();


};

  // ToDoの名前と期限のパラーメタがあればMongoDBに保存
  if(chatText && sender) {
    var Chat = mongoose.model('Chat');
    var chat = new Chat();
    chat.chatText = chatText;
    chat.sender = sender;
    chat.chatname = Chatroom;
	
    chat.save();
	//console.log("AB"+Chatroom);
    res.send(true);
  } else {
    res.send(false);
  }
});


 var Hitokazu;

//トップページで新しく始める時
app.post('/data/prof', function(req, res) {
  var toChatAvatar = req.body.ToChatAvatar;
  var toChatRoomName = req.body.ToChatRoomName;
  var toChatProfName =req.body.ToChatProfName;
  
  var BeChatRoom=req.body.BeChatroom;
  var BeMyName=req.body.BeMyname;


var DelRoomName=req.body.delRoomName;
  var DelMemName=req.body.delMemName;

if(DelRoomName && DelMemName) {
var Prof = mongoose.model('prof');

Prof.remove({ chatroom : { $eq :DelRoomName }, name : { $eq :DelMemName }} , function(err, profDel) {


	});


}


  
  // ToDoの名前と期限のパラーメタがあればMongoDBに保存
  if(toChatRoomName&& toChatAvatar && toChatProfName) {
    var Prof = mongoose.model('prof');
    var prof = new Prof();
    prof.chatroom = toChatRoomName;
    prof.name = toChatProfName;
    prof.iconNum = toChatAvatar;
	prof.beChat=true;

//	prof.updatedDate=Date.now;
    prof.save();


 Prof.count({ chatroom : { $eq :toChatRoomName }} , function(err, chatCountss) {
  //console.log(todoss);
Hitokazu=chatCountss;
 console.log(Hitokazu);


  });

    res.send(true);
	console.log("bbh")
  } else {
    res.send(false);
  }
});

app.post('/data/chatprof', function(req, res) {
  var newchatname = req.body.NewChatName;
    var toChatname = req.body.ToChatRoomName;
  // ToDoの名前と期限のパラーメタがあればMongoDBに保存
  if(newchatname) {
    var ChatProf = mongoose.model('ChatProf');
    var chatprof = new ChatProf();
    chatprof.chatname = newchatname;
    chatprof.save();

    res.send(true);
	console.log("bbh")
  } else if(toChatname){
  var ChatProf = mongoose.model('ChatProf');

 
  
  ChatProf.findOne({ chatname : { $eq :toChatname }} , function(err, chatName) {
chatName.chatCount=Hitokazu+1;
chatName.updatedDate=Date.now();
chatName.save();
  
  
  });
  
  }else{
    res.send(false);
  }
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
