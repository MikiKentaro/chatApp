
$(function() {
firstView();
    getList();
	//avatarOther();

//	abc=50;
	
socket.emit('startadd', 'abc');


	
});



//var abc;



var myAvatar;
var myName;
var chatRoom;
var myID;






	var offset = 5;
    var fromX;
    var fromY;
    var drawFlag = false;
    var context = $("canvas").get(0).getContext('2d');

var socket = io();


socket.on("rewriteMember", function (allMemberName) {
                $("#chatAvatarOther").html(allMemberName);
            });

socket.on('event_name', function(socket_id) {

//alert(socket_id);

});

socket.on('delMemName', function(delMemName) {

//alert(delMemName.name);

$.post('/data/chat', {delRoomName: delMemName.chat,delMemName:delMemName.name}, function(res) {


});	

$.post('/data/prof', {delRoomName: delMemName.chat,delMemName:delMemName.name}, function(res) {


});	



getList();
avatarOther();
});



socket.on('abc', function(abc) {

});
// chatというイベントを受信したらHTML要素に追加する
socket.on('chat', function(chat) {
/*
  var messages = document.getElementById('messages');
  // 新しいメッセージは既にある要素より上に表示させる
  
  //if(chat.name=='ken'){
  var newChat = '<div>' + chat.name + '「' + chat.message + '」</div>';
  //}else{
  //var newChat = '<li>' + 'other' + '「' + chat.message + '」</li>';

  //}
  
  var oldChat = messages.innerHTML;
  messages.innerHTML = newChat + oldChat;
  */
  
  
  
  
  var abbb;
  abbb=chat.name;
var avatarOffset=$('#'+abbb).offset();


var leftpos=avatarOffset.left;
  
    var hukidasi = document.getElementById('hukidasiList');
  var newChat = '<div class="hukiMesse" style="position:relative; left: '+leftpos+'px;">' + chat.message + '</div>';



  var oldChat = hukidasi.innerHTML;
  hukidasi.innerHTML = oldChat +newChat;
  
  

  avatarOther();

  getList();
});




$('#send').click(function() {
    sendMessage();
	postList();
	
});



// メッセージを送信する
function sendMessage() {

var name =myName;

var message = $('#text').val();

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
        var $list = $('.list');
		//var $hukidasi=$('.hukidasi');
        $list.fadeOut(function() {
		
            $list.children().remove();
            // /todoにGETアクセスする
            $.get('data/chat', function(chats) {
                // 取得したToDoを追加していく
                $.each(chats, function(index, Chat) {
                    //タイトルにすTodoを表示
				var time = new Date(Chat.createdDate);
            var hour = time.getHours(); // 時
            var min = time.getMinutes(); // 分
				
				if (min < 10) min = "0" + min;
				
				var EStext=escape(Chat.chatText);
				console.log(EStext);
				//EStext=text(EStext);
			         //$list.append('<table id=chatTable><td><div class="chattext">' + Chat.chatText + '</div></td>'+
					 //'<td><div>'+hour+':'+min+'</div><div> ' + Chat.sender + '</div></td></table>');

					 var htmltext='<table id=chatTable><td><div class="chattext">' + EStext + '</div></td>'+
					 '<td><div>'+hour+':'+min+'</div><div> ' + Chat.sender + '</div></td></table>';
			
                        num += 1;
						console.log(htmltext);
						htmltext=unescape(htmltext);
						console.log(htmltext);
						$list.append(htmltext);
		
                    
                });
                // 一覧を表示する
			    
                $list.fadeIn();
				
            });
        });
		
			var pos = $(".hukidasi");
var position = pos.position();

	/*
	var $kome = $('.kome');
	$kome.append('<div class="sen'+abc+'">aaa</div>');
	$(".sen"+abc).css({
  
  'position':'relative',
  'left' : abc

});
*/
    }
	
	
function postList() {
    // フォームに入力された値を取得
    var chattext = $('#text').val();
    var sendername =myName;
	var chatroom=chatRoom;

	
	    $('#text').val('');
	

	
    //入力項目を空にする
    // /todoにPOSTアクセスする
    $.post('/data/chat', {chatText: chattext,senderName:sendername,chatroom:chatroom}, function(res) {
	
        console.log(res);
        //再度表示する
       
    });
}

function firstView(){


myAvatar=sessionStorage.getItem('myAvatar');
myName=sessionStorage.getItem('myName');

chatRoom=sessionStorage.getItem('toChat');

var $avatarMe = $('#chatAvatarMe');


	  document.getElementById("chatAvatarMe").innerHTML = '<div id="'+myName+'"><div>'+myName+'</div><img src="images/avatar'+myAvatar+'.png" alt="サンプル"></div>';	


 var $chatName = $('#chatName');
$chatName.append(chatRoom);
$chatName.fadeIn();


 socket.emit('visitChat', {
    name:myName,
    chatname:chatRoom,
	avatar:myAvatar
  });



avatarOther();

}
/*
$('#random').click(function() {
   abc+=100;
   
$('.hukidasi').css({
  'left' : abc,
});
	$(".hukidasi").html("hh");

});
*/


//接続が切れた時
  socket.on('fin', function(fin) {


   $.post('/data/chat', {delRoomName: chatRoom,delMemName: myName}, function(res) {


});	

   

 
 avatarOther();
 getList();

 
 
});




 socket.on('start', function(start) {


   avatarOther();
getList();

 
});

function avatarOther(){

//alert("aww");

socket.emit('abc', {
    name:myName,
    chatname:chatRoom,
	avatar:myAvatar
  });
	
		
}


























// サーバからメッセージ受信
    socket.on('send user', function (msg) {
	console.log("asss");
        context.strokeStyle = msg.color;
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(msg.fx, msg.fy);
        context.lineTo(msg.tx, msg.ty);
        context.stroke();
        context.closePath(); 
    });
 
    socket.on('clear user', function () {
        context.clearRect(0, 0, $('canvas').width(), $('canvas').height());
    });
	



 $('canvas').mousedown(function(e) {
        drawFlag = true;
        fromX = e.pageX - $(this).offset().left - offset;
        fromY = e.pageY - $(this).offset().top - offset;
        return false;  // for chrome
		
    });
 
    $('canvas').mousemove(function(e) {
	
	
	var getspuit = $('#spuit').is(':checked');
    if(getspuit == true){
	 if (drawFlag){
	var spoiX = e.pageX - $('canvas').offset().left - offset;
    var spoiY = e.pageY - $('canvas').offset().top - offset;
    spuitImage = context.getImageData(spoiX, spoiY, 1, 1);
    r = spuitImage.data[0];
    g = spuitImage.data[1];
    b = spuitImage.data[2];
    spuit_color = 'rgb(' + r +','+ g + ',' + b +')';
	var ret = eval(spuit_color.replace(/rgb/,"((").replace(/,/ig,")*256+")).toString(16); 
	ret="#" + (("000000" + ret).substring( 6 + ret.length - 6));
	context.strokeStyle=ret;
	console.log(ret)
	$('#nowcolor').css({
		"background-color": ret
		});

	
	}else{}
	
    }else{
	
        if (drawFlag) {
            draw(e);
        }
		}
    });
 
    $('canvas').on('mouseup', function() {
        drawFlag = false;
		//スポイト解除
		var getspuit = $('#spuit').is(':checked');
    if(getspuit == true){
	$("input[name=brush]").attr("checked",false); 
    }
	
    });
 
    $('canvas').on('mouseleave', function() {
        drawFlag = false;
		
		//スポイト解除
		var getspuit = $('#spuit').is(':checked');
    if(getspuit == true){
	$("input[name=brush]").attr("checked",false); 
    }
	
    });
 
    $('li').click(function() {
        context.strokeStyle = $(this).css('background-color');
		$('#nowcolor').css({
		"background-color": context.strokeStyle
		});
    });
 
    $('#clear2').click(function(e) {
        socket.emit('clear send');
        e.preventDefault();
        context.clearRect(0, 0, $('canvas').width(), $('canvas').height());
    });
 
    function draw(e) {
        var toX = e.pageX - $('canvas').offset().left - offset;
        var toY = e.pageY - $('canvas').offset().top - offset;
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
        context.closePath();
 
        // サーバへメッセージ送信
        socket.emit('server send', { fx:fromX, fy:fromY, tx:toX, ty:toY, color:context.strokeStyle });
        console.log("bsss");

		fromX = toX;
        fromY = toY;
    }
 
    $('#save2').click(function() {
        var d = $("canvas")[0].toDataURL("image/png");
        d = d.replace("image/png", "image/octet-stream");
        window.open(d,"save");
    });


socket.on('connect',    function(){


console.log('connect');

$.post('/data/chat', {newMemRoomName: chatRoom,newMemName: myName}, function(res) {


});	
getList();
avatarOther();
});


$('canvas').mousemove(function(e) {
    
});

$('canvas').mouseup(function(e) {
   
});


$("#spuit").click(function(){
 $('body').css({
		//"cursor": "url('images/green.jpg'), text"
		});
		});
		
		//$('#send').click(function() 