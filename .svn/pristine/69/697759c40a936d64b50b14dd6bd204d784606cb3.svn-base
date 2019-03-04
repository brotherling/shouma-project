
function compress(res,fileSize,fn) { //res代表上传的图片，fileSize大小图片的大小
    var img = new Image(),
        maxW = 240,dataUrl; //设置最大宽度
        img.src = res;
     img.onload = function () {
        var cvs = document.createElement( 'canvas'),
            ctx = cvs.getContext( '2d');

        if(img.width > maxW) {
            img.height *= maxW / img.width;
            img.width = maxW;
        }

        cvs.width = img.width;
        cvs.height = img.height;

        ctx.clearRect(0, 0, cvs.width, cvs.height);
        ctx.drawImage(img, 0, 0, img.width, img.height);

        var compressRate = getCompressRate(1,fileSize);

         dataUrl = cvs.toDataURL( 'image/jpeg', compressRate);
         fn(dataUrl)
    }
}

function getCompressRate(allowMaxSize,fileSize){ //计算压缩比率，size单位为MB
      var compressRate = 1;
      if(fileSize/allowMaxSize > 4){
           compressRate = 0.5;
      } else if(fileSize/allowMaxSize >3){
           compressRate = 0.6;
      } else if(fileSize/allowMaxSize >2){
           compressRate = 0.7;
      } else if(fileSize > allowMaxSize){
           compressRate = 0.8;
      } else{
           compressRate = 0.9;
      }

      return compressRate;
}
document.addEventListener('plusready', function() {
    var webview = plus.webview.currentWebview();
    plus.key.addEventListener('backbutton', function() {
        webview.canBack(function(e) {
            if(e.canBack) {
                webview.back();             
            } else {
                //webview.close(); //hide,quit
                //plus.runtime.quit();
                //首页返回键处理
                //处理逻辑：1秒内，连续两次按返回键，则退出应用；
                var first = null;
                plus.key.addEventListener('backbutton', function() {
                    //首次按键，提示‘再按一次退出应用’
                    if (!first) {
                        first = new Date().getTime();
                        console.log('再按一次退出应用');
                        setTimeout(function() {
                            first = null;
                        }, 1200);
                    } else {
                        if (new Date().getTime() - first < 1200) {
                            plus.runtime.quit();
                        }
                    }
                }, false);
            }
        })
    });
});


(function (doc, win) {
    var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var recalc = function () {
        var width = docEl.clientWidth;
        if (width > 640) {
            width = 640 ;
        }
        if (width < 320) {
            width = 320 ;
        }
        docEl.style.fontSize = 100 * (width / 640) + 'px';
    };
    recalc();
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
 })(document, window);