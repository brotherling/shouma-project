<template>
  <div class="scan">
    <div style="height:10%;position:relative" @click="clickfanh()"><span class="el-icon-arrow-left restoring">返回</span></div>
    <div id="bcid">
      <div style="height:200px;"></div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  let scan = null;

  export default {
     name:'v-sao',
    data() {
      return {
        codeUrl: '',
      }
    },
    methods: {
      //创建扫描控件
      startRecognize() {
        let that = this;
        if (!window.plus) return;
        var filter=[plus.barcode.CODE128,plus.barcode.EAN13,plus.barcode.QR]
        scan = new plus.barcode.Barcode('bcid',filter);
        scan.onmarked = onmarked;

        function onmarked(type, result, file) {
          switch (type) {
            case plus.barcode.QR:
              type = 'QR';
              break;
            case plus.barcode.EAN13:
              type = 'EAN13';
              break;
            // case plus.barcode.EAN8:
            //   type = 'EAN8';
            //   break;
            case plus.barcode.CODE128:
                type="CODE128";
                break;
            default:
              type = '其它' + type;
              break;
          }
          result = result.replace(/\n/g, '');
          that.codeUrl = result;
          that.cancelScan()
          that.closeScan();
          bus.$emit('saoshowload',false);
        bus.$emit('global.saodata',result);
                     
        }
      },
      //开始扫描
      startScan() {
        if (!window.plus) return;
        scan.start();
      },
      //关闭扫描
      cancelScan() {
        if (!window.plus) return;
        scan.cancel();
      },
      //关闭条码识别控件
      closeScan() {
        if (!window.plus) return;
        scan.close();
      },
      childFn(){
      	this.startRecognize();
      	this.startScan()
      },
      clickfanh(){
          this.cancelScan()
          this.closeScan();
          bus.$emit('saoshowload',false);
      }
    },
    mounted(){
    this.childFn();
  }
  }
</script>
<style>
.scan {
  height: 100%;
}
.scan #bcid {
  width: 100%;
    height: 80%;
  text-align: center;
  color: #fff;
  background:  rgba(200,200,200,0.5);
  z-index:99999;
}
.restoring{
  position: absolute;
  top:34%;
  left:3%;
      font-size: 26px;
}
</style>  