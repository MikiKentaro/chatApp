﻿      $(function(){
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

    cEle.width  = vEle.videoWidth;   // canvasの幅と高さを、動画の幅と高さに合わせる
    cEle.height = vEle.videoHeight;

    cCtx.drawImage(vEle, 0, 0);  // canvasに関数実行時の動画のフレームを描画
}