<template>
  <div id="preview">
    <van-nav-bar title="电子签证预览" left-arrow @click-left="onClickLeft" />
    <div class="wrap">
      <div class="tip">
        <div class="tip_icon"></div>
        <div class="tip_txt">
          您的电子签证已上传完成，选择打印机场并支付完
          成后可在所选机场的出国宝智能终端扫码完成打印！
        </div>
      </div>
      <!-- <div class="pdf_box"> -->
        <!-- <img src="../assets/img/pdf.png" alt="" class="pdf_img" /> -->
        <!-- <p class="pdf_name">泰国电子签证.pdf</p> -->
        <van-uploader class="pdf_box" :after-read="afterRead" accept="*.pdf">
          <img src="../assets/img/pdf.png" alt="" class="pdf_img" />
          <p class="pdf_name">{{fileName}}</p>
          <!-- <van-button icon="plus" type="primary">上传文件</van-button> -->
        </van-uploader>
      <!-- </div> -->

      <!-- <van-uploader v-model="fileList">
  <template #preview-cover="{ file }">
    <div class="preview-cover van-ellipsis">{{ file.name }}</div>
  </template>
</van-uploader> -->

    </div>
    <div class="airport">
      <h3 class="airport_text"><span>选择打印的机场</span></h3>

      <van-field
        readonly
        clickable
        name="picker"
        :value="value"
        label="请选择"
        placeholder="点击选择机场"
        right-icon="arrow-down"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          value-key = "cityName" 
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
    </div>
    <van-button type="primary" size="large" class="pay_btn" @click="confirmBtn"
      >确认并支付</van-button
    >
    <!-- 判断是否有已完成支付且未打印的订单 -->
    <van-popup
      v-model="showUnprint"
      :close-on-click-overlay="false"
      class="noprint_pop"
    >
      <img src="../assets/img/wxts.png" alt="" class="wxts_img" />
      <p class="noprint_txt">
        您有已完成支付且待打印的订单，请直接使用订单二维码进行打印！
      </p>
      <van-button type="primary" class="order_btn" url="/payfor" 
       
        >确认并支付</van-button
      >
    </van-popup>
    <!--文件打印提示 -->
    <van-popup v-model="showPrint" class="print_pop">
      <img src="../assets/img/icon_logo.png" alt="" class="icon_img" />
      <p class="noprint_txt">
        您的文件将传输给“出国宝”第三方平台为您打印使用。
      </p>
      <p class="pop_bttom">
        <span class="pop_confirm" @click="closePrintPop">确定</span>
      </p>
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "Preview",
  data() {
    return {
      orderNumber: "",
      value: "",
      cityId:"",
      columns: [],
      showPicker: false,
      showUnprint: false,
      showPrint: false,
      overlayFlag: false,
      file:[],
      fileName:'请点击上传',
      pdfList:[]

    };
  },
  created(){
    // this.getCode ()
    this.getAirport()
  },
  methods: {
    onClickLeft() {},
    onConfirm(value) {
      this.value = value.cityName;
      this.cityId = value.cityId;
      this.showPicker = false;
    },
    closePrintPop() {
      this.showPrint = false;
      
    },
    getCode () { // 非静默授权，第一次有弹框
		  var _this = this;
		  const local = encodeURIComponent('https://www.travbao.com');
      // const local = encodeURIComponent('');
      console.log(local)
		  const appid = 'wx05441d84fc1cabb0';
		  window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx05441d84fc1cabb0&redirect_uri='+ local +'&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
	  },
    getOpenId(){
      this.$ajax.post("http://qa.travbao.com/goabraod/visaServe/getOpenId_H5.do", {
          code
        })
        .then((res) => {
          console.log(res)
          if (res.data.code == 0) {
          }
         
        });
    },
    getAirport(){
      var _this = this
      _this.$axios({
		  	url:'visaServe/getDepartureCity.do',
		  	method:'post',
		  }).then(function(res){
      console.log(res)
      if(res.data.code == 0){
      _this.columns = res.data.data.departureCity
      }
      })
    },
    afterRead(file) {
      this.file = file.file
      this.fileName = file.file.name
    },
    uploadPdf(){
      var _this = this
      var formdata = new FormData();
       formdata.append("files",this.file);
       formdata.append("cityId",this.cityId);
       _this.$axios({
		  	url:'visaServe/upLoadPdfFile.do',
        method:'post',
        data:formdata
		  }).then(function(res){
        if(res.data.code == 0){
          _this.pdfList = res.data.data.pdfList
        }
      })
    },
    submitPdf(){
      var _this = this
      _this.$axios({
		  	url:'visaServe/submitPdfFileOrder.do',
        method:'post',
        data:{
        "userPdfList": _this.pdfList,
        "userSelectPackage": {
            "package01": "",
            "package01_guIds": "",
            "package02": "",
            "package02_guIds": "",
            "package03": "",
            "package03_guIds": "",
            "package04": "gsp15940132750881",//彩色A4 
            "package04_guIds": _this.pdfList[0].gfId,
            "package05": "",
            "package05_guIds": ""
        },
        "other": {
            "userId": "",
            "cityId": _this.cityId,
            "countryId": "PDF",
            "goOrderSource": "003"
        }
    }
		  }).then(function(res){
        if(res.data.code == 0){
        
        }
      })
    },
    confirmBtn(){
      // this.getCode ()
      this.uploadPdf()
      // this.submitPdf()
      this.$router.push({
        path: "/order"
      });
      // to="payfor"
    }
  },
};
</script>
<style>
@import url("../assets/css/reset.css");
#preview .van-nav-bar {
  background: #3583e5;
}
#preview .van-nav-bar .van-icon {
  color: #fff;
}
#preview .van-nav-bar__title {
  color: #fff;
  font-size: 0.18rem;
}
#preview .van-hairline--bottom::after {
  border-bottom-width: 0px;
}
#preview .wrap {
  width: 94%;
  height: 3rem;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 0.1rem;
}
#preview .tip {
  height: 0.55rem;
  border-radius: 0.1rem 0.1rem 0 0;
  background: #fff8ee;
  padding-top: 0.1rem;
}
#preview .tip_icon {
  float: left;
  width: 0.3rem;
  height: 0.3rem;
  background: url(../assets/img/dui.png) no-repeat 0.1rem center;
  background-size: 0.17rem 0.17rem;
}
#preview .tip_txt {
  height: 0.55rem;
  line-height: 0.2rem;
  color: #ffa419;
  font-size: 0.14rem;
}
#preview .pdf_box {
  height: 2.35rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#preview .pdf_img {
  width: 0.78rem;
  height: 1rem;
}
#preview .pdf_name {
  color: #0086f8;
  font-size: 0.16rem;
  padding-top: 0.2rem;
}
#preview .airport {
  width: 94%;
  height: 0.8rem;
  margin: 0.1rem auto;
  background: #ffffff;
  border-radius: 0.1rem;
  padding: 0.15rem 0.1rem;
  box-sizing: border-box;
}
#preview .airport .airport_text {
  font-size: 0.16rem;
  border-left: 0.02rem solid #3484e2;
}
#preview .airport .airport_text span {
  padding-left: 0.05rem;
}
#preview .pay_btn {
  width: 94%;
  margin-left: 3%;
  margin-top: 0.7rem;
  background: linear-gradient(90deg, #1aa0f1, #1a6cfa);
  opacity: 0.95;
  border-radius: 0.1rem;
  border: none;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
#preview .van-cell::after {
  border-bottom: 0;
}
#preview .van-overlay {
  background-color: rgba(0, 0, 0, 0.5);
}
#preview .noprint_pop,
#preview .print_pop {
  width: 80%;
  height: 1.8rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#preview .wxts_img {
  width: 0.32rem;
  height: 0.32rem;
}
#preview .icon_img {
  width: 0.4rem;
  height: 0.4rem;
}
#preview .noprint_txt {
  width: 90%;

  font-size: 0.16rem;
  color: #000;
  line-height: 0.2rem;
  margin: 0.15rem 0;
}
#preview .order_btn {
  border: none;
  width: 1.4rem;
  height: 0.3rem;
  background: linear-gradient(90deg, #ffa40c, #ff7a00);
  opacity: 0.95;
  border-radius: 0.1rem;
}
#preview .pop_bttom {
  width: 90%;
}
#preview .pop_confirm {
  font-size: 0.18rem;
  color: #26b6ed;
  float: right;
}
#preview .van-uploader__wrapper{
      width: 100%;
    height: 100%;
}
#preview .van-uploader__input-wrapper{
      width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>

