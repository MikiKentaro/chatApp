
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


var offset = 5;
var fromX;
var fromY;
var drawFlag = false;
var context = $("canvas").get(0).getContext('2d');



var socket = io();


socket.on("rewriteMember", function (allMemberName) {
                $("#chatAvatarOther").html(allMemberName);
            });
			
			
socket.on("sendPicker", function (picker) {
  //$("#chatAvatarOther").html(allMemberName);
  //alert(picker.name+picker.chatname+picker.color);
  	         //socket.emit('realPicker', { name:myName, color:pickerColor, chatname:chatRoom });
			 
        $("#popupColor").show();
		//document.getElementById('popupColor').style.backgroundColor = picker.color;
		document.getElementById('popupColorText').innerHTML=picker.name+"さんから"+"<br>新しい色が送られてきました";
  		document.getElementById('popupColorBox').style.backgroundColor = picker.color;
		document.getElementById('popupColorBox').innerHTML = picker.color;


  
  $('#popupOKbutton').click(function() {
  var myPicker = new jscolor.color(document.getElementById('jscolor'), {})
          myPicker.fromString(picker.color);  // now you can access API via 'myPicker' variable
		  $("#popupColor").hide();
});
$('#popupNObutton').click(function() {
  $("#popupColor").hide();
});
  /*
  var res = confirm(picker.name+"さんから"+picker.color+"が送られてきました");
      // 選択結果で分岐
      if( res == true ) {
         // OKなら移動
		  var myPicker = new jscolor.color(document.getElementById('jscolor'), {})
          myPicker.fromString(picker.color);  // now you can access API via 'myPicker' variable
         //$("#popupColor").hide();
      }
      else {
         // キャンセルならダイアログ表示
         //$("#popupColor").hide();
      }
	 */ 
  
 


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

  
  var hukidasi = document.getElementById('hukidasiList');
  var newChat = '<div class="hukiMesse" style="position:relative; left: '+leftpos+'px;">' + EStext + '</div>';



  var oldChat = hukidasi.innerHTML;
  hukidasi.innerHTML = oldChat +newChat;
  
  

  //avatarOther();

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

					 var htmltext='<table id="chatTable"><td><div class="chattext">' + EStext + '</div></td>'+
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
    var chattext = $('#text').val();
    var sendername =myName;
	var chatroom=chatRoom;

	
	    $('#text').val('');
	
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
	
}

function firstView(){


myAvatar=sessionStorage.getItem('myAvatar');
myName=sessionStorage.getItem('myName');

chatRoom=sessionStorage.getItem('toChat');

var $avatarMe = $('#chatAvatarMe');


	  document.getElementById("chatAvatarMe").innerHTML = '<div id="'+myName+'"><div>'+myName+'</div><img src="images/avatar'+myAvatar+'.png" alt="サンプル"></div>';	


var ESchatRoom =escapeHTML(chatRoom);
					 
					 

   					 //var htmltext='<div class="roomname" name="'+EStext+'">' + EStext+'</div>';

                     //$roomlist.append(unescape(htmltext));


 var $chatName = $('#chatName');


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

   

 
 //avatarOther();
 //getList();

 
 
});




 socket.on('start', function(start) {


   //avatarOther();
//getList();

 
});

function avatarOther(){

var hukidasi = document.getElementById('hukidasiList');

hukidasi.innerHTML ='';


socket.emit('abc', {
    name:myName,
    chatname:chatRoom,
	avatar:myAvatar
  });
	
//getList();
		
}


























// サーバからメッセージ受信
    socket.on('send user', function (msg) {
	
	if($("#onlypaint").prop('checked')) { 
	return;
   }else{
   }
	
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
	a = spuitImage.data[3];
	if(a==0){
	return;
	}
    spuit_color = 'rgb(' + r +','+ g + ',' + b +')';
	var ret = eval(spuit_color.replace(/rgb/,"((").replace(/,/ig,")*256+")).toString(16); 
	ret="#" + (("000000" + ret).substring( 6 + ret.length - 6));
	context.strokeStyle=ret;
	console.log(ret);
	console.log(a)

	//$('#nowcolor').css({
	//	"background-color": ret
	//	});
var myPicker = new jscolor.color(document.getElementById('jscolor'), {})
myPicker.fromString(context.strokeStyle)  // now you can access API via 'myPicker' variable

	
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
		//$('#nowcolor').css({
		//"background-color": context.strokeStyle
		//});
		//$("#jscolor").val(context.strokeStyle);
var myPicker = new jscolor.color(document.getElementById('jscolor'), {})
myPicker.fromString(context.strokeStyle)  // now you can access API via 'myPicker' variable
//	context.strokeStyle=$("#jscolor").val();


    });
 
    $('#clear2').click(function(e) {
        //socket.emit('clear send',{ chatname:chatRoom });
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
		var iro="#"+$("#jscolor").val();
		context.strokeStyle =iro;
		
        // サーバへメッセージ送信
        socket.emit('server send', { fx:fromX, fy:fromY, tx:toX, ty:toY, color:context.strokeStyle, chatname:chatRoom });
        console.log(iro);

		fromX = toX;
        fromY = toY;
    }
 
    $('#save2').click(function() {
        //var d = $("canvas")[0].toDataURL("image/png");
        //d = d.replace("image/png", "image/octet-stream");
        //window.open(d,"save");
		//CanvasElement canvas = document.getElementById('#canvasPC');
        //String dataUrl = canvas.toDataUrl();
		var can = document.getElementById("#canvasPC");
Canvas2Image.saveAsPNG(can);    // PNG形式で保存
    });


socket.on('connect',    function(){


console.log('connect');

$.post('/data/chat', {newMemRoomName: chatRoom,newMemName: myName}, function(res) {


});	
//getList();
//avatarOther();
});


$('canvas').mousemove(function(e) {
    
});

$('canvas').mouseup(function(e) {
   
});


$("#spuit").click(function(){
 $('body').css({
		//"cursor": "url('spoit.cur'), text"
		});
		});
		
		//$('#send').click(function() 
		
	