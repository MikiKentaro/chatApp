﻿$(function() {
firstView();

	
socket.emit('startadd', 'abc');

$("#cameraSpace").hide();



});




var myAvatar;
var myName;
var chatRoom;
var myID;




var socket = io();

socket.on("rewriteMember", function (allMemberName) {
$("#chatAvatarOther_m").html(allMemberName);
});


socket.on('delMemName', function(delMemName) {



//getList();
avatarOther();
getList();

});



socket.on('abc', function(abc) {

});
// chatというイベントを受信したらHTML要素に追加する
socket.on('chat', function(chat) {

  if(chat.message==""||chat.message.length>=101){
 return;
}
  
  
  var abbb;
  abbb=chat.name;
var avatarOffset=$('#'+abbb).offset();


var leftpos=avatarOffset.left;

var EStext =escapeHTML(chat.message);

  
  var hukidasi = document.getElementById('hukidasiList_m');
  var newChat = '<div class="hukiMesse_m" style="position:relative; left: '+leftpos+'px;">' + EStext + '</div>';



  var oldChat = hukidasi.innerHTML;
  hukidasi.innerHTML = oldChat +newChat;
  
 
  getList();
});




$('#send_m').click(function() {
    sendMessage();
	postList();
	
});



// メッセージを送信する
function sendMessage() {

var name =myName;

var message = $('#text_m').val();

var id =myID;


  // chatイベントを送信する
  socket.emit('chat', {
    name:name,
    message:message,
	id:id
  });

}


function getList() {
        
        num = 0;
		
		
        // すでに表示されている一覧を非表示にして削除する
        var $list = $('.list_m');
		//var $hukidasi=$('.hukidasi');
        $list.fadeOut(function() {
		
            $list.children().remove();
            // /todoにGETアクセスする
            $.get('data/chat', function(chats) {
                // 取得したToDoを追加していく
                $.each(chats, function(index, Chat) {
                    //タイトルにすTodoを表示
					
					
					if(Chat.chatname==chatRoom){
				var time = new Date(Chat.createdDate);
            var hour = time.getHours(); // 時
            var min = time.getMinutes(); // 分
				
				if (min < 10) min = "0" + min;
				
				　var EStext =escapeHTML(Chat.chatText);

					 var htmltext='<table id="chatTable"><td><div class="chattext_m">' + EStext + '</div></td>'+
					 '<td><div>'+hour+':'+min+'</div><div> ' + Chat.sender + '</div></td></table>';
			
                        num += 1;
						
						$list.append(unescape(htmltext));
		
                    }
                });
                // 一覧を表示する
			    
                $list.fadeIn();
				
            });
        });
		
			var pos = $(".hukidasi");
var position = pos.position();


    }
	
	function escapeHTML(val) {
        return $('<div>').text(val).html();
    };
	
	function unescapeHTML(val) {
        return $('<div>').html(val).text();
    };
	
	
	
function postList() {
    // フォームに入力された値を取得
    var chattext = $('#text_m').val();
    var sendername =myName;
	var chatroom=chatRoom;

	
	    $('#text_m').val('');
	
	if(chattext==""||chattext.length>=101){
 
alert("1文字以上100文字以内で入力してください");
return;
}

	
    //入力項目を空にする
    // /todoにPOSTアクセスする
    $.post('/data/chat', {chatText: chattext,senderName:sendername,chatroom:chatroom}, function(res) {
       
    });
	
}

function firstView(){


myAvatar=sessionStorage.getItem('myAvatar');
myName=sessionStorage.getItem('myName');

chatRoom=sessionStorage.getItem('toChat');

var $avatarMe = $('#chatAvatarMe_m');


document.getElementById("chatAvatarMe_m").innerHTML = '<div id="'+myName+'"><div>'+myName+'</div><img src="images/avatar'+myAvatar+'.png" alt="サンプル"></div>';	


var ESchatRoom =escapeHTML(chatRoom);
					 
 var $chatName = $('#chatName_m');


$chatName.append(unescape('<div style="font-size:15px;">チャット名'+'</div>'+ESchatRoom));
$chatName.fadeIn();


 socket.emit('visitChat', {
    name:myName,
    chatname:chatRoom,
	avatar:myAvatar
  });



avatarOther();

}


//接続が切れた時
  socket.on('fin', function(fin) {


   $.post('/data/chat', {delRoomName: fin.chat,delMemName: fin.name}, function(res) {


});	

   
 
});


 socket.on('start', function(start) {
 
});

function avatarOther(){

var hukidasi = document.getElementById('hukidasiList_m');

hukidasi.innerHTML ='';


socket.emit('abc', {
    name:myName,
    chatname:chatRoom,
	avatar:myAvatar
  });
	
		
}
















//カメラキャプチャ部分

socket.on('connect',    function(){
console.log('connect');

$.post('/data/chat', {newMemRoomName: chatRoom,newMemName: myName}, function(res) {


});	
});


//デフォルトカラー
var pickerColor="#ffffff";

var canvasOn=false;


var offset=5;
var cEle = document.getElementById('c');
var context = cEle.getContext('2d');


//カメラスイッチを押したとき
$('#camaraSwitch').click(function() {
	   
　
　　if ($('#cameraSpace').css('display') != 'none') {
	   
    // 表示されている場合の処理
	$("#cameraSpace").hide();
	return;

} else {
    // 非表示の場合の処理
		$("#cameraSpace").show();
	
}


	  
      //カメラの情報を取得
      var cameraData = [];
      MediaStreamTrack.getSources(function(data){
      //カメラ情報を取得して、出力する
      var len = data.length;
      for( var i = 0 ; i < len ; i ++ ){
      //strCamera += "<p>種類："+ data[i].kind+"<br/>ID："+ data[i].id+"</p>";
      if( data[i].kind == "video" ){
      cameraData.push(data[i]);
      }
      }
      if( cameraData.length == 0 ){
      alert("カメラが見つかりません");
      return;
      }
      //カメラを取得・切り替える
      setCamera();
	  
	  
      });
	  
	  
	  
      //カメラを取得・切り替える
      var cnt = 0;
      var localStream = null;
	  
	  
	  
      function setCamera(){
      //カメラを順番に切り替える
      cnt++;
      if( cnt == cameraData.length ){
      cnt = 0;
      }
      //カメラ取得
      var video = document.getElementById('myVideo');
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia;
      window.URL = window.URL || window.webkitURL;
      //カメラ再生中の場合は切り替えのため、一旦停止する
      if( localStream ){
      localStream.stop();
      }
	  //alert(canvasOn);
	  if(canvasOn==true){
	  if( localStream ){
      localStream.stop();
	  $("#myVideo").hide();
	  $("#c").show();
	  return;
      }else{};
      
	  
      }else{
	  if( localStream ){
      localStream.stop();
		  $("#c").hide();
		  $("#myVideo").show();

      }
	  
	  
	  }
	  
      //カメラをIDを使用して取得する
      navigator.getUserMedia(
      {
      video: {
      optional: [{sourceId: cameraData[cnt].id }] //カメラIDを直接指定する
      },
      audio: false
      },
      function(stream) {
      //切り替え時にカメラを停止するため、情報を保存しておく
      localStream = stream;
      $("#result_use").html( cameraData[cnt].id );
      //カメラをvideoに結びつける
      video.src = window.URL.createObjectURL(stream);
      },
      function(err) {
      //エラー処理
      }
      );
      }
      //カメラ切り替えボタンクリックイベント
      $("#changeButton").bind("click",function(){
	  document.getElementById('changeButton').innerHTML="カメラ切り替え"

	  canvasOn=false;
      setCamera();
      });
	  
	  $("#chaptya").bind("click", function() {
	  document.getElementById('changeButton').innerHTML="カメラON"
	          copyFrame();
              setCamera();
          });
	  
	   $("#sendColor").bind("click", function() {
	         //canvasOn=false;
             sendcolor();
			 alert("送信しました。");

              //setCamera();
			 
			  
          });
	  
	  
	  
	
});
//
function sendcolor(){
			 
socket.emit('realPicker', { name:myName, color:pickerColor, chatname:chatRoom });

}



	  //ビデオの内容をキャンバスに移す
	  function copyFrame() {
    var vEle = document.getElementById('myVideo');
    var cEle = document.getElementById('c');


var aspect=vEle.videoWidth/vEle.videoHeight;
	var tate=300/aspect;

    //cEle.width  = vEle.videoWidth;  // canvasの幅と高さを、動画の幅と高さに合わせる
    //cEle.height = vEle.videoHeight;
	
    var cCtx = cEle.getContext('2d');
	
	
   cCtx.drawImage(vEle, 0, 0,vEle.videoWidth,vEle.videoHeight,0,0,300,150);  // canvasに関数実行時の動画のフレームを描画

	cCtx.save();
	
	
	canvasOn=true;
	
	
	
}

//キャンバス部分のスポイトツール
	$('canvas').bind( 'touchmove', function(e){
	
	
	
	e.preventDefault();
	
	var spoiX = e.originalEvent.changedTouches[0].pageX - $('canvas').offset().left - offset;
    var spoiY = e.originalEvent.changedTouches[0].pageY - $('canvas').offset().top - offset;
	console.log(spoiY);
    spuitImage = $("canvas").get(0).getContext('2d').getImageData(spoiX, spoiY, 1, 1);
    r = spuitImage.data[0];
    g = spuitImage.data[1];
    b = spuitImage.data[2];
	console.log(spuitImage);
    spuit_color = 'rgb(' + r +','+ g + ',' + b +')';
	var ret = eval(spuit_color.replace(/rgb/,"((").replace(/,/ig,")*256+")).toString(16); 
	ret="#" + (("000000" + ret).substring( 6 + ret.length - 6));
	context.strokeStyle=ret;
	console.log(ret)


	document.getElementById('nowcolor').style.backgroundColor = ret;
	

    document.getElementById('nowcolor').innerHTML=ret;
	//document.getElementById('debug').innerHTML="spoiX"+spoiX+"spoiY"+spoiY+"ret"+ret+"spuit_color"+spuit_color;
	
	
    pickerColor=ret;
	
        
	
    })