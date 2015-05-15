



$(function() {
    getList();
	
var avatar = document.getElementsByName("avatar"); 
for(var i=0;i<avatar.length;i++) {   
	
           avatar[0].checked=true;
    }  
	
	
	
	
myName=sessionStorage.getItem('myName');
chatRoom=sessionStorage.getItem('toChat');	
	
if(myName!=""&&chatRoom!=""){
$.post('/data/prof', {BeChatroom:chatRoom,BeMyname:myName}, function(res) {
	
      //  console.log(res);
	 
       
   });


}else{
alert("aa")
}	
	
	
	
});


$('#send').click(function() {
	//postList();
	//saveStrage();
	
});

$('#plusChatButton').click(function() {

	  document.getElementById("plusChat").innerHTML = '<input type="text" size="25" id="newchat" placeholder="新しいチャット名を入力してください">'+
	  '<button id="NewChatButton" type="button">作成</button>';
	  //document.getElementById("plusChat").innerHTML = ''
	  
$('#NewChatButton').click(function() {

postList2();

});
	
});

$('#serch').click(function() {

	  document.getElementById("topMesse").innerHTML = '<input type="text" size="25" id="serchForm" placeholder="検索ワードを入力してください">'+
	  '<button id="serchButton" type="button">検索</button>';
	  //document.getElementById("plusChat").innerHTML = ''
	  
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
                    
					
					
				//	alert('aa');
					 $roomlist.append('<div class="roomname" name="'+Chatprof.chatname+'"><a href=/chat>' + Chatprof.chatname +'   ' +Chatprof.chatCount+'人</a></div>');
                        
                        //num += 1;
                    
                });
                // 一覧を表示する
                $roomlist.fadeIn();
				
				$(".roomname").click(function() {
　              roomname = $(this).attr("name");　// idの取得
				
				postChatIn(roomname);
				
                //alert(roomname);
                });
				
				
            });
        });
	
    }

	
function postList() {
    // フォームに入力された値を取得
   
    var profname = $('#name').val();

　　//var profprof = $('#text').val();
//	    $('#text').val('');
var profprof="chat1";
var avatarNum="1";

var newChatName=$('#newchat').val();

//if(checkAcount()){
		alert("dd");
    //入力項目を空にする
    // /todoにPOSTアクセスする
    $.post('/data/prof', {profProf: profprof,profName: profname,avatarnum:avatarNum}, function(res) {

        console.log(res);
        //再度表示する
        //getList();
    });
//	}
}

function saveStrage(){

 




}

/*
function checkAcount(profname){

var beword;
beword=false;
//alert(profname);
 $.get('data/prof', function(prof) {
                
                $.each(prof, function(index, Prof) {
  
					if(profname===Prof.name){
					alert("ss");
					beword=true;
					return;
					}
                    
                });
                
				//alert("同じのなかった");

//return true;
				if(beword==false){
				alert("同じのなかった");
return true;

}else{
alert("同じのあった");
return false;

}
				// 一覧を表示する
            });

			
			

}
*/
function postList2() {
    // フォームに入力された値を取得
   
   

var newChatName=$('#newchat').val();
	    $('#newchat').val('');


    //入力項目を空にする
    // /todoにPOSTアクセスする
    $.post('/data/chatprof', {NewChatName: newChatName}, function(res) {

        console.log(res);
        //再度表示する
        getList();
    });
//	}
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
alert(avatarNum);
//アバター番号　ここまで
   
    var profname = $('#name').val();

　　//var profprof = $('#text').val();
	    $('#name').val('');

   
   
   
   
alert(roomname);

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




}


function serchList(){


var serchWord= $('#serchForm').val();

$('#serchForm').val='';

var $roomlist = $('.roomlist');
        $roomlist.fadeOut(function() {
		
            $roomlist.children().remove();
            $.get('data/chatprof', function(chatprof) {
                $.each(chatprof, function(index, Chatprof) {
				
				
					if(Chatprof.chatname.indexOf(serchWord) != -1){

   					 $roomlist.append('<div class="roomname" name="'+Chatprof.chatname+'"><a href=/chat>' + Chatprof.chatname +'   ' +Chatprof.chatCount+'人</a></div>');

					 //$roomlist.append('<div class="roomname" name="'+Chatprof.chatname+'"><a href=/chat>' + Chatprof.chatname +'   ' +Chatprof.chatCount+'人</a></div>');



}

                });
                // 一覧を表示する
                $roomlist.fadeIn();
				
				$(".roomname").click(function() {
　              roomname = $(this).attr("name");　// idの取得
				
				postChatIn(roomname);
				
                //alert(roomname);
                });
				
				
            });
        });
	
    }