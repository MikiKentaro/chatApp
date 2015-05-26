      $(function(){
	  
	  

	  
	  
	  
	  
	  //$("canvas").bind("touchmove", touchHandler);
	  //$("canvas").bind("touchstart", touchHandlerdown);


	  
      //カメラの情報を取得
      var cameraData = [];
      MediaStreamTrack.getSources(function(data){
      //カメラ情報を取得して、出力する
      var strCamera = "";
      var len = data.length;
      for( var i = 0 ; i < len ; i ++ ){
      strCamera += "<p>種類："+ data[i].kind+"<br/>ID："+ data[i].id+"</p>";
      if( data[i].kind == "video" ){
      cameraData.push(data[i]);
      }
      }
      if( cameraData.length == 0 ){
      alert("カメラが見つかりません");
      return;
      }
      $("#result").html( strCamera );
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
      setCamera();
      });
      });
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  function copyFrame() {
    var cEle = document.getElementById('c');
    var cCtx = cEle.getContext('2d');
    var vEle = document.getElementById('myVideo');


var aspect=vEle.videoWidth/vEle.videoHeight;
	alert(vEle.videoWidth+"aa"+vEle.videoHeight)
	var tate=300/aspect;

    cEle.width  = 300;   // canvasの幅と高さを、動画の幅と高さに合わせる
    cEle.height = tate;
    
	
	
	
	
	

    cCtx.drawImage(vEle, 0, 0,300,tate);  // canvasに関数実行時の動画のフレームを描画
	
	
	
	
	
	
	
}










   //document.body.mousedown(function(e) {

var fromX;
var fromY;
var offset=5;
var cEle = document.getElementById('c');
var context = cEle.getContext('2d');
//var context = $("canvas").get(0).getContext('2d');




	$('canvas').bind( 'touchstart', function(e){
	//event.preventDefault();
//alert("sssss");
//fromX = e.pageX - $(this).offset().left - offset;
//        fromY = e.pageY - $(this).offset().top - offset;
//        return false;  // for chrome
//console.log(e.pageX);

});



//function touchHandlerdown( event ) {

        
        
		
 //   };

//function touchHandler( event ) {
//event.preventDefault();
//    $('canvas').mousemove(function(e) {



	$('canvas').bind( 'touchmove', function(e){
	
	
	
	e.preventDefault();
	
	//var getspuit = $('#spuit').is(':checked');
    //if(getspuit == true){
	// if (drawFlag){
	var spoiX = e.originalEvent.changedTouches[0].pageX; - $('canvas').offset().left - offset;
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

	$('#nowcolor').css({
		"background-color": ret
		});

	//var deb=$('#debug');
	document.getElementById('debug').innerHTML="spoiX"+spoiX+"spoiY"+spoiY+"ret"+ret+"spuit_color"+spuit_color;
	
	
    
	
        
	
    });