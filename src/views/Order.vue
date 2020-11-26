<template>
  <div id="order">
    <van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft" />
    <div class="paywrap">
      <h2 class="pay_h2">打印码：{{orderInfo.goOrderPrintCode}}</h2>
        <img :src="orderInfo.goOrderPrintCodeUrl" alt="" class="qrcode">
      <p class="pay_tip">
        请在 <span class="pay_time">广州白云机场</span>入境资料自助打印机
        <span class="pay_time">4</span>号机 打印，共
        <span class="pay_time">1</span>张入境资料
      </p>
    </div>
    <van-notice-bar color="#E74C3C" background="#fff" left-icon="info-o">
      为方便您的使用，建议您将打印二维码提前保存到相册中！
    </van-notice-bar>
    <div class="servicewrap">
      <div class="ser_left"><span class="kefu"></span>联系客服</div>
      <div class="ser_right"><span class="weizhi"></span>查看终端位置</div>
    </div>

    <div class="exitwrap">
      <h3 class="h3_text"><span>出境信息</span></h3>
      <div style="padding: 0.1rem 0">
        <div class="cell">
          <p class="cell_left">订单内容</p>
          <span class="cell_right">{{orderInfo.goName}}</span>
        </div>
        <div class="cell">
          <p class="cell_left">打印份数</p>
          <span class="cell_right">1</span>
        </div>
        <div class="cell">
          <p class="cell_left">总价</p>
          <span class="cell_right"><i class="total_price">¥{{orderInfo.goOrderPayment}}</i></span>
        </div>
      </div>
    </div>
    <div class="exitwrap">
      <h3 class="h3_text"><span>订单信息</span></h3>
      <div style="padding: 0.1rem 0">
        <div class="cell">
          <p class="cell_left">订单编号</p>
          <span class="cell_right">{{orderInfo.goId}}</span>
        </div>
        <div class="cell">
          <p class="cell_left">支付时间</p>
          <span class="cell_right">{{orderInfo.gocreateTime}}</span>
        </div>
        <div class="cell">
          <p class="cell_left">支付方式</p>
          <span class="cell_right">微信支付</span>
        </div>
        <div class="cell">
          <p class="cell_left">订单状态</p>
          <span class="cell_right" style="color: #0086f8">{{orderInfo.goOrderStatus}}</span>
        </div>
      </div>
    </div>
    <van-button type="primary" size="large" class="pay_btn save_btn" icon="down"
      >保存二维码至相册</van-button
    >
    <van-button type="primary" size="large" class="pay_btn"
      >关闭页面</van-button
    >
  </div>
</template>
<script>
export default {
  name: "Order",
  data() {
    return {
      orderNumber: "",
      orderInfo:''
    };
  },
  created(){
    this.getOrderInfo()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getOrderInfo(){
      var _this = this
      _this.$axios({
		  	url:'visaServe/gettOrdersBaseInfo.do',
        method:'post',
        data:{
          goId:'202003171055550201584413755020'
        }
		  }).then(function(res){
      console.log(res)
      if(res.data.code == 0){
_this.orderInfo = res.data.data
      }
      })
    },
  },
};
</script>
<style>
@import url("../assets/css/reset.css");
#order .van-nav-bar {
  background: #3583e5;
}
#order .van-nav-bar .van-icon {
  color: #fff;
}
#order .van-nav-bar__title {
  color: #fff;
  font-size: 0.18rem;
}
#order .van-hairline--bottom::after {
  border-bottom-width: 0px;
}
#order .pay_btn {
  width: 94%;
  margin-left: 3%;
  margin-top: 0.1rem;
  background: linear-gradient(90deg, #1aa0f1, #1a6cfa);
  opacity: 0.95;
  border-radius: 0.1rem;
  border: none;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

#order .save_btn {
  background: linear-gradient(90deg, #ffa40c, #ff7a00);
}

#order .paywrap {
  height: 2.3rem;
  padding: 0.1rem 0.2rem;
  background: linear-gradient(180deg, #3583e5, #00a6fa);
  margin-top: -0.01rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#order .paywrap .pay_h2 {
  text-align: center;
  font-size: 0.16rem;
  color: #030303;
  font-weight: normal;
  padding: 0.08rem 0.1rem;
  background: #fff;
}

#order .paywrap .qrcode {
  width: 1.4rem;
  height: 1.4rem;
  background: #fff;
  margin: 0.1rem 0;
  display: block;
}
#order .paywrap .pay_num {
  color: #fff195;
  font-weight: bold;
  font-size: 0.22rem;
  text-decoration: underline;
}
#order .paywrap .pay_tip {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.14rem;
  line-height: 0.2rem;
}
#order .paywrap .pay_time {
  color: #fff296;
  font-size: 0.16rem;
}
#order .h3_text {
  font-size: 0.16rem;
  border-left: 0.02rem solid #3484e2;
}
#order .h3_text span {
  padding-left: 0.05rem;
}
#order .cell {
  font-size: 0.14rem;
  height: 0.5rem;
  line-height: 0.5rem;
  padding: 0 0.1rem;
}
#order .cell .cell_left {
  color: #9e9e9e;
  float: left;
}
#order .cell .cell_right {
  color: #141414;
  float: right;
}
#order .exitwrap {
  background: #ffffff;
  margin: 0.05rem 0;
  padding: 0.15rem 0.2rem 0;
}
#order .exitwrap .cell {
  height: 0.3rem;
  line-height: 0.3rem;
}

#order .exitwrap .cell_left {
  width: 25%;
}
#order .exitwrap .cell_right {
  float: left;
}
#order .exitwrap .ori_price {
  text-decoration: line-through;
  padding-right: 0.05rem;
}
#order .exitwrap .total_price {
  color: #ff9a14;
  font-size: 0.18rem;
}
#order .van-notice-bar {
  font-size: 0.12rem;
}
#order .servicewrap {
  height: 0.5rem;
  background: #fff;
  margin-top: 0.05rem;
}
#order .ser_left,
#order .ser_right {
  height: 0.5rem;
  float: left;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.14rem;
  color: #141414;
}
#order .kefu {
  width: 0.2rem;
  height: 0.2rem;
  background: url(../assets/img/kf.png) no-repeat center;
  background-size: 100% 100%;
  margin-right: 0.05rem;
}
#order .weizhi {
  width: 0.15rem;
  height: 0.2rem;
  background: url(../assets/img/position.png) no-repeat center;
  background-size: 100% 100%;
  margin-right: 0.05rem;
}
</style>

