
$(function() {
firstView();
    //getList();
	
socket.emit('startadd', 'abc');

//alert($("#jscolor").val());

//$("#jscolor").val("#00ff00");	
//$("#jscolor").color.fromString('F2C80A')
//var myPicker = new jscolor.color(document.getElementById('jscolor'), {})
//myPicker.fromString('#99FF33')  // now you can access API via 'myPicker' variable
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
 
//alert("1文字以上100文字以内で入力してください");
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
  
  

  //avatarOther();

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
				
				
				//var EStext=escape(Chat.chatText);
				var EStext =escapeHTML(Chat.chatText);
				//console.log("escape:"+EStext);
				
				
				//console.log(EStext);
				//EStext=text(EStext);
			         //$list.append('<table id=chatTable><td><div class="chattext">' + Chat.chatText + '</div></td>'+
					 //'<td><div>'+hour+':'+min+'</div><div> ' + Chat.sender + '</div></td></table>');

					 var htmltext='<table id="chatTable"><td><div class="chattext_m">' + EStext + '</div></td>'+
					 '<td><div>'+hour+':'+min+'</div><div> ' + Chat.sender + '</div></td></table>';
			
                        num += 1;
						
						
						//console.log(htmltext);
						//htmltext=unescape(htmltext);
						//console.log(htmltext);
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
	
        //console.log(res);
        //再度表示する
       
    });
 //getList();
	
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


// var $chatName = $('#chatName_m');
//$chatName.append('<div style="font-size:15px;">チャット名'+'</div>'+chatRoom);
//$chatName.fadeIn();


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

   

 
 //avatarOther();
 //getList();

 
 
});




 socket.on('start', function(start) {


   //avatarOther();
//getList();

 
});

function avatarOther(){

var hukidasi = document.getElementById('hukidasiList_m');

hukidasi.innerHTML ='';


socket.emit('abc', {
    name:myName,
    chatname:chatRoom,
	avatar:myAvatar
  });
	
//getList();
		
}


























	



socket.on('connect',    function(){


console.log('connect');

$.post('/data/chat', {newMemRoomName: chatRoom,newMemName: myName}, function(res) {


});	
//getList();
//avatarOther();
});

