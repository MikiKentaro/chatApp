$(function() {
    getList();

//最初のラジオボタンを一つ目にする
var avatar = document.getElementsByName("avatar"); 
for(var i=0;i<avatar.length;i++) {   
           avatar[0].checked=true;
    }  



//セッションあったら	
if(sessionStorage.length!=0){

//セッション読み込む
myName=sessionStorage.getItem('myName');
chatRoom=sessionStorage.getItem('toChat');	
myAvatar=sessionStorage.getItem('myAvatar');

$.post('/data/prof', {BeChatroom:chatRoom,BeMyname:myName}, function(res) {
	
       
   });
//フォームに名前を表示
var nameform = $('#name');
nameform.val(myName);
//アバターを元々のものに
for(var i=0;i<avatar.length;i++) {   
           avatar[myAvatar].checked=true;
    }  
//$('#popupTop').show();

}else{
$('#popupTop').show();
}	


});

$('#delPopup').click(function() {
$("#popupTop").hide();



});
$('#send').click(function() {
	
});

$('#plusChatButton').click(function() {

	  document.getElementById("plusChat").innerHTML = '<input type="text" size="25" id="newchat" placeholder="新しいチャット名を入力してください">'+
	  '<button id="NewChatButton" type="button">作成</button>';
	  
$('#NewChatButton').click(function() {

postList2();

});
	
});

$('#serch').click(function() {

	  document.getElementById("topMesse").innerHTML = '<input type="text" size="25" id="serchForm" placeholder="検索ワードを入力してください">'+
	  '<button id="serchButton" type="button">検索</button>';
	  
$('#serchButton').click(function() {

serchList();

});
	
});



$('#ava0').click(function() {
var avatar = document.getElementsByName("avatar"); 
for(var i=0;i<avatar.length;i++) {   
	
           avatar[0].checked=true;
    }  
});
$('#ava1').click(function() {
var avatar = document.getElementsByName("avatar"); 
for(var i=0;i<avatar.length;i++) {   
           avatar[1].checked=true;
    }  
});
$('#ava2').click(function() {
var avatar = document.getElementsByName("avatar"); 
for(var i=0;i<avatar.length;i++) {   
           avatar[2].checked=true;
    }  
});


function getList() {
        
        num = 0;
        // すでに表示されている一覧を非表示にして削除する
        var $roomlist = $('.roomlist');
        $roomlist.fadeOut(function() {
		
            $roomlist.children().remove();
            // /todoにGETアクセスする
            $.get('data/chatprof', function(chatprof) {
                // 取得したToDoを追加していく
                $.each(chatprof, function(index, Chatprof) {
                    //タイトルにすTodoを表示					
					 
                     var EStext =escapeHTML(Chatprof.chatname);
					 
					 

   					 var htmltext='<div class="roomname" name="'+EStext+'">' + EStext+'</div>';

                     $roomlist.append(unescape(htmltext));
					 
					 num+=1;

                    
                });
				
                // 一覧を表示する
                $roomlist.fadeIn();
				
				$(".roomname").click(function() {
　              roomname = $(this).attr("name");　// idの取得
				
				postChatIn(roomname);
				
                });
				
				
            });
        });
	
    }

	
function postList() {
    // フォームに入力された値を取得
   
    var profname = $('#name').val();

var profprof="chat1";
var avatarNum="1";

var newChatName=$('#newchat').val();

		alert("dd");
    //入力項目を空にする
    // /todoにPOSTアクセスする
    $.post('/data/prof', {profProf: profprof,profName: profname,avatarnum:avatarNum}, function(res) {

        console.log(res);
        //再度表示する
    });
}

function saveStrage(){


}


function postList2() {
    // フォームに入力された値を取得
   
   

var newChatName=$('#newchat').val();
	    $('#newchat').val('');
		
		
		
		if(newChatName==""||newChatName.length>=11){
 
alert("1文字以上10文字以内で入力してください");
return;
}

    //入力項目を空にする
    // /todoにPOSTアクセスする
    $.post('/data/chatprof', {NewChatName: newChatName}, function(res) {

        console.log(res);
        //再度表示する
        getList();
    });
}



function postChatIn(roomname) {
    // フォームに入力された値を取得
   //アバターの番号取得
var avatarNum;

var avatar = document.getElementsByName("avatar"); 
for(var i=0;i<avatar.length;i++) {   
	
           if(avatar[i].checked==true){
		   avatarNum=i;
		   }
    }  
//アバター番号　ここまで
   
    var profname = $('#name').val();

	    $('#name').val('');
		
		if(profname==""||profname.length>=11){
 
alert("名前を1文字以上10文字以内で入力してください");
return;
}

if(profname.indexOf(">") != -1||profname.indexOf("<") != -1||profname.indexOf("&") != -1){
alert("名前に<>&の使用は控えてください");
return;


}

    //入力項目を空にする
    // /todoにPOSTアクセスする
	
    $.post('/data/prof', {ToChatRoomName: roomname,ToChatAvatar:avatarNum,ToChatProfName:profname}, function(res) {

        console.log(res);
        //再度表示する
       
 });
 
 　$.post('/data/chatprof', {ToChatRoomName: roomname}, function(res) {
   });
//	}

sessionStorage.setItem('myName',profname);
sessionStorage.setItem('myAvatar',avatarNum);
sessionStorage.setItem('toChat',roomname);

window.location.href = "/chat";



}


function serchList(){


var serchWord= $('#serchForm').val();

$('#serchForm').val='';

if(serchWord.length>=11){
 
alert("10文字以内で入力してください");
return;
}

var num=0;
var $roomlist = $('.roomlist');
        $roomlist.fadeOut(function() {
		
            $roomlist.children().remove();
            $.get('data/chatprof', function(chatprof) {
                $.each(chatprof, function(index, Chatprof) {
				
				
					if(Chatprof.chatname.indexOf(serchWord) != -1){

                     var EStext =escapeHTML(Chatprof.chatname);
					 
					 

   					 var htmltext='<div class="roomname" name="'+EStext+'">' + EStext+'</div>';

                     $roomlist.append(unescape(htmltext));
num+=1;


}

                });
				
				
				if(num==0){
				document.getElementById("serchResult").innerHTML=serchWord+"で検索した結果、見つかりませんでした。"

				
				}else{
　　　　　　　　document.getElementById("serchResult").innerHTML=serchWord+"で検索した結果、"+num+"件見つかりました"
}
                // 一覧を表示する
                $roomlist.fadeIn();
				
				$(".roomname").click(function() {
　              roomname = $(this).attr("name");　// idの取得
				
				postChatIn(roomname);
				
                });
				
				
            });
        });
	
    }
	
	
		function escapeHTML(val) {
        return $('<div>').text(val).html();
    };
	
	
	
