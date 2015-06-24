//読み込み時
$(function() {
firstView();
	
socket.emit('startadd', 'abc');

});




var myAvatar;
var myName;
var chatRoom;
var myID;


var offset = 0;
var fromX;
var fromY;
var drawFlag = false;
var context = $("canvas").get(0).getContext('2d');



var socket = io();

//チャット内の人数が変わった時　アバターの表示部分
socket.on("rewriteMember", function (allMemberName) {
                $("#chatAvatarOther").html(allMemberName);
            });
			
//スマホから新しい色が送られてきたとき		
socket.on("sendPicker", function (picker) {
			 
　$("#popupColor").show();
  　document.getElementById('popupColorText').innerHTML=picker.name+"さんから"+"<br>新しい色が送られてきました";
  　document.getElementById('popupColorBox').style.backgroundColor = picker.color;
  　document.getElementById('popupColorBox').innerHTML = picker.color;


  //ポップアップのOKを押したとき
　$('#popupOKbutton').click(function() {
  　var myPicker = new jscolor.color(document.getElementById('jscolor'), {})
    myPicker.fromString(picker.color);  // now you can access API via 'myPicker' variable
	$("#popupColor").hide();
});
//NOを押したとき
$('#popupNObutton').click(function() {
  　$("#popupColor").hide();
});
  
});

//人数が変わった時　
socket.on('delMemName', function(delMemName) {


avatarOther();
getList();

});



socket.on('abc', function(abc) {

});
// chatというイベントを受信したらHTML要素に追加する
//吹き出し部分の表示
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
				
				　//ミニッツも部分が一ケタの時、０を加える
				　if (min < 10) min = "0" + min;
				
　　　　　　　　　　　var EStext =escapeHTML(Chat.chatText);
　　　　　　　　　　　var htmltext='<table id="chatTable"><td><div class="chattext">' + EStext + '</div></td>'+
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
//HTMLタグのエスケープ
function escapeHTML(val) {
        return $('<div>').text(val).html();
};
//HTMLタグのアンエスケープ	
function unescapeHTML(val) {
        return $('<div>').html(val).text();
};
	
	
//投稿の内容をmongodbに保存する	
function postList() {
    // フォームに入力された値を取得
    var chattext = $('#text').val();
    var sendername =myName;
	var chatroom=chatRoom;

	
	$('#text').val('');
	//入力チェック
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
//読み込み時にアバターや部屋の名前を表示する
function firstView(){

//セッションから読み込む
　myAvatar=sessionStorage.getItem('myAvatar');
　myName=sessionStorage.getItem('myName');
　chatRoom=sessionStorage.getItem('toChat');
//自分のアバター表示
　var $avatarMe = $('#chatAvatarMe');
　document.getElementById("chatAvatarMe").innerHTML = '<div id="'+myName+'"><div>'+myName+'</div><img src="images/avatar'+myAvatar+'.png" alt="サンプル"></div>';	

//チャット名表示
var ESchatRoom =escapeHTML(chatRoom);
var $chatName = $('#chatName');
$chatName.append(unescape('<div style="font-size:15px;">チャット名'+'</div>'+ESchatRoom));
$chatName.fadeIn();

//訪れたことをみんなに報告
 socket.emit('visitChat', {
    name:myName,
    chatname:chatRoom,
	avatar:myAvatar
  });


//他のアバター表示
avatarOther();

}


//接続が切れた時
socket.on('fin', function(fin) {


   $.post('/data/chat', {delRoomName: fin.chat,delMemName: fin.name}, function(res) {


　　});	
  

});


 socket.on('start', function(start) {


 
});
//他のアバター表示
function avatarOther(){

//吹き出し部分リセット
var hukidasi = document.getElementById('hukidasiList');
hukidasi.innerHTML ='';


socket.emit('abc', {
    name:myName,
    chatname:chatRoom,
	avatar:myAvatar
  });

		
}







socket.on('drowStart', function (drowStart) {
       console.log("drowStart");
	   
//socket.emit('drowStart', { fx:fromX, fy:fromY, chatname:chatRoom,sederName:myName,avatar:myAvatar,color:iro });

	   
	   
	    var $DROW = $('#DROW');
		
		
	   $DROW.append('<div id="drowIcon" class="'+drowStart.sederName+'">'+
	   '<div class="drowIconCircle">●</div>'+
'<div class="drowIconTri">▼</div>'+
'<div class="drowIconImg"><img src="images/avaIcon'+drowStart.avatar+'.png" width="132" height="132"  alt=""/></div>'+
'<div class="drowIconName">'+drowStart.sederName+'</div>'+
'</div>');

	$('.'+drowStart.sederName).css({
    
	'color':drowStart.color
});
 $('.drowIconName').css({
    
	'color':"#000000"
}); 
	   
    });


socket.on('drowEnd', function (drowEnd) {
       console.log("drowEnd");
	   
	   var $DROW = $('.'+drowEnd.sederName);
	   $DROW.html('');
	   
	   
	   
    });



//キャンバスのお絵かき部分
// サーバからメッセージ受信
socket.on('send user', function (msg) {
	
	//１人でプレイの時、リターンする
	if($("#onlypaint").prop('checked')) { 
	return;
   }else{
   }
	
	//console.log("asss");
        context.strokeStyle = msg.color;
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(msg.fx, msg.fy);
        context.lineTo(msg.tx, msg.ty);
        context.stroke();
        context.closePath();
		
		
		var canvasTop= msg.ty-5;
		var canvasLeft= $('canvas').offset().left+msg.tx-5;

		
		$('.'+msg.sederName).css({
     'position':'absolute',
	'top':canvasTop+'px',
	'left':canvasLeft+'px'
});
	
	
	//var avatarOffset=$('#'+abbb).offset();
　//var leftpos=avatarOffset.left;	
		 
    });
 
 
 
 
    socket.on('clear user', function () {
        context.clearRect(0, 0, $('canvas').width(), $('canvas').height());
    });
	


//マウスでクリックしたとき
 $('canvas').mousedown(function(e) {
 

        drawFlag = true;
        fromX = e.pageX - $(this).offset().left - offset;
        fromY = e.pageY - $(this).offset().top - offset;
		var iro="#"+$("#jscolor").val();
		socket.emit('drowStart', { fx:fromX, fy:fromY, chatname:chatRoom,sederName:myName,avatar:myAvatar,color:iro });

        return false;  // for chrome
		
    });
	
	
	$('canvas').bind( 'touchstart', function(e){
	
	e.preventDefault();
	 drawFlag = true;
        fromX = e.pageX - $(this).offset().left - offset;
        fromY = e.pageY - $(this).offset().top - offset;
		var iro="#"+$("#jscolor").val();
		socket.emit('drowStart', { fx:fromX, fy:fromY, chatname:chatRoom,sederName:myName,avatar:myAvatar,color:iro });

        return false;  // for chrome
		
	
	
	
	});
	
		$('canvas').bind( 'touchmove', function(e){
	
	var getspuit = $('#spuit').is(':checked');
	//スポイトツールがオンになっているとき
    if(getspuit == true){
	if (drawFlag){
	//キャンバス上での位置取得
	var spoiX = e.pageX - $('canvas').offset().left - offset;
    var spoiY = e.pageY - $('canvas').offset().top - offset;
	//その位置の色取得
    spuitImage = context.getImageData(spoiX, spoiY, 1, 1);
    r = spuitImage.data[0];
    g = spuitImage.data[1];
    b = spuitImage.data[2];
	a = spuitImage.data[3];
	//アルファ値が０の時、リターン
	if(a==0){
	return;
	}
	
    spuit_color = 'rgb(' + r +','+ g + ',' + b +')';
	//(r,g,b)を＃RGBに変換
	var ret = eval(spuit_color.replace(/rgb/,"((").replace(/,/ig,")*256+")).toString(16); 
	ret="#" + (("000000" + ret).substring( 6 + ret.length - 6));
	
	context.strokeStyle=ret;
	

//ｊｓColorの色を変える	
var myPicker = new jscolor.color(document.getElementById('jscolor'), {})
myPicker.fromString(context.strokeStyle)  // now you can access API via 'myPicker' variable

	
	}else{}
	
    }else{
	
        if (drawFlag) {
            draw(e);
        }
		}


});

		$('canvas').bind( 'touchend', function(e){
		
		        drawFlag = false;
		//スポイト解除
		var getspuit = $('#spuit').is(':checked');
    　　　if(getspuit == true){
	　　　$("input[name=brush]").attr("checked",false); 
    　　　}
		  socket.emit('drowEnd', { chatname:chatRoom,sederName:myName });

		
		
		
		});
			$('canvas').bind( 'touchleave', function(e){
		
		        drawFlag = false;
		//スポイト解除
		var getspuit = $('#spuit').is(':checked');
    　　　if(getspuit == true){
	　　　$("input[name=brush]").attr("checked",false); 
    　　　}
		  socket.emit('drowEnd', { chatname:chatRoom,sederName:myName });

		
		
		
		});

 //キャンバス上でマウスでクリックしているとき
 $('canvas').mousemove(function(e) {
	
	
	var getspuit = $('#spuit').is(':checked');
	//スポイトツールがオンになっているとき
    if(getspuit == true){
	if (drawFlag){
	//キャンバス上での位置取得
	var spoiX = e.pageX - $('canvas').offset().left - offset;
    var spoiY = e.pageY - $('canvas').offset().top - offset;
	//その位置の色取得
    spuitImage = context.getImageData(spoiX, spoiY, 1, 1);
    r = spuitImage.data[0];
    g = spuitImage.data[1];
    b = spuitImage.data[2];
	a = spuitImage.data[3];
	//アルファ値が０の時、リターン
	if(a==0){
	return;
	}
	
    spuit_color = 'rgb(' + r +','+ g + ',' + b +')';
	//(r,g,b)を＃RGBに変換
	var ret = eval(spuit_color.replace(/rgb/,"((").replace(/,/ig,")*256+")).toString(16); 
	ret="#" + (("000000" + ret).substring( 6 + ret.length - 6));
	
	context.strokeStyle=ret;
	

//ｊｓColorの色を変える	
var myPicker = new jscolor.color(document.getElementById('jscolor'), {})
myPicker.fromString(context.strokeStyle)  // now you can access API via 'myPicker' variable

	
	}else{}
	
    }else{
	
        if (drawFlag) {
            draw(e);
        }
		}
    });
 //クリックを離したとき
    $('canvas').on('mouseup', function() {
        drawFlag = false;
		//スポイト解除
		var getspuit = $('#spuit').is(':checked');
    　　　if(getspuit == true){
	　　　$("input[name=brush]").attr("checked",false); 
    　　　}
		  socket.emit('drowEnd', { chatname:chatRoom,sederName:myName });
	
    });
 //クリックしている位置がキャンバスから離れた時
 $('canvas').on('mouseleave', function() {
        drawFlag = false;
		
		//スポイト解除
		var getspuit = $('#spuit').is(':checked');
    　　　if(getspuit == true){
 　　　　　$("input[name=brush]").attr("checked",false); 
    　　　　}
			socket.emit('drowEnd', { chatname:chatRoom,sederName:myName });
	
    });
 //色の部分をクリックしたとき
    $('li').click(function() {
        context.strokeStyle = $(this).css('background-color');
		
var myPicker = new jscolor.color(document.getElementById('jscolor'), {})
myPicker.fromString(context.strokeStyle)  // now you can access API via 'myPicker' variable


    });
 //クリアボタンを押したとき
    $('#clear2').click(function(e) {
        e.preventDefault();
        context.clearRect(0, 0, $('canvas').width(), $('canvas').height());
    });
 //実際に描いていく部分
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
		
		if($("#onlypaint").prop('checked')) { 
	
   }else{
   
        // サーバへメッセージ送信
        socket.emit('server send', { fx:fromX, fy:fromY, tx:toX, ty:toY, color:context.strokeStyle, chatname:chatRoom,sederName:myName });
        console.log(iro);
}
		fromX = toX;
        fromY = toY;
    }
/* 
    $('#save2').click(function() {
		var can = document.getElementById("#canvasPC");
　　　　Canvas2Image.saveAsPNG(can);    // PNG形式で保存
    });
*/

socket.on('connect',    function(){


console.log('connect');

$.post('/data/chat', {newMemRoomName: chatRoom,newMemName: myName}, function(res) {


});	

});


if(window.TouchEvent){

	
	$('canvas').bind( 'touchstart', function(e){
	
	e.preventDefault();
	 drawFlag = true;
        fromX = e.pageX - $(this).offset().left - offset;
        fromY = e.pageY - $(this).offset().top - offset;
		var iro="#"+$("#jscolor").val();
		socket.emit('drowStart', { fx:fromX, fy:fromY, chatname:chatRoom,sederName:myName,avatar:myAvatar,color:iro });

        return false;  // for chrome
		
	
	
	
	});
	
		$('canvas').bind( 'touchmove', function(e){
	
	var getspuit = $('#spuit').is(':checked');
	//スポイトツールがオンになっているとき
    if(getspuit == true){
	if (drawFlag){
	//キャンバス上での位置取得
	var spoiX = e.pageX - $('canvas').offset().left - offset;
    var spoiY = e.pageY - $('canvas').offset().top - offset;
	//その位置の色取得
    spuitImage = context.getImageData(spoiX, spoiY, 1, 1);
    r = spuitImage.data[0];
    g = spuitImage.data[1];
    b = spuitImage.data[2];
	a = spuitImage.data[3];
	//アルファ値が０の時、リターン
	if(a==0){
	return;
	}
	
    spuit_color = 'rgb(' + r +','+ g + ',' + b +')';
	//(r,g,b)を＃RGBに変換
	var ret = eval(spuit_color.replace(/rgb/,"((").replace(/,/ig,")*256+")).toString(16); 
	ret="#" + (("000000" + ret).substring( 6 + ret.length - 6));
	
	context.strokeStyle=ret;
	

//ｊｓColorの色を変える	
var myPicker = new jscolor.color(document.getElementById('jscolor'), {})
myPicker.fromString(context.strokeStyle)  // now you can access API via 'myPicker' variable

	
	}else{}
	
    }else{
	
        if (drawFlag) {
            draw(e);
        }
		}


});

		$('canvas').bind( 'touchend', function(e){
		
		        drawFlag = false;
		//スポイト解除
		var getspuit = $('#spuit').is(':checked');
    　　　if(getspuit == true){
	　　　$("input[name=brush]").attr("checked",false); 
    　　　}
		  socket.emit('drowEnd', { chatname:chatRoom,sederName:myName });

		
		
		
		});
			$('canvas').bind( 'touchleave', function(e){
		
		        drawFlag = false;
		//スポイト解除
		var getspuit = $('#spuit').is(':checked');
    　　　if(getspuit == true){
	　　　$("input[name=brush]").attr("checked",false); 
    　　　}
		  socket.emit('drowEnd', { chatname:chatRoom,sederName:myName });

		
		
		
		});






}