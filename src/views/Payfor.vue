<template>
  <div id="payfor">
    <van-nav-bar title="确认支付信息" left-arrow @click-left="onClickLeft" />
    <div class="paywrap">
      <h2 class="pay_h2">
        您共需缴纳服务费 <span class="pay_num">{{ payNumber }}</span> 元
      </h2>
      <p class="pay_tip">
        请您在
        <span class="pay_time">30</span>
        分钟内完成支付，以免给您的出行带来不便， 逾期订单将自动取消！
      </p>
    </div>
    <div class="orderwrap">
      <h3 class="h3_text"><span>订单费用明细</span></h3>
      <div class="cell">
        <p class="cell_left">电子签证打印</p>
        <span class="cell_right">2X30=60元</span>
      </div>
    </div>
    <div class="exitwrap">
      <h3 class="h3_text"><span>出境信息</span></h3>
      <div style="padding: 0.1rem 0">
        <div class="cell">
          <p class="cell_left">订单内容</p>
          <span class="cell_right">电子签证打印</span>
        </div>
        <div class="cell">
          <p class="cell_left">打印份数</p>
          <span class="cell_right">1</span>
        </div>
        <div class="cell">
          <p class="cell_left">总价</p>
          <span class="cell_right"
            ><i class="ori_price">¥6</i
            ><i class="total_price">¥{{ totalPrice }}</i></span
          >
        </div>
      </div>
    </div>
    <div class="zfwrap">
      <h3 class="h3_text"><span>支付方式</span></h3>
      <div class="cell">
        <p class="cell_left">
          <span class="zf_icon"></span><span class="zffs"> {{ payValue }}</span>
        </p>
        <span class="cell_right" @click="showPicker = true"></span>
      </div>
    </div>
    <van-button type="primary" size="large" class="pay_btn" to="order"
      >确认支付</van-button
    >
    <!-- 选择支付方式  -->
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "Payfor",
  data() {
    return {
      orderNumber: "",
      payValue: "微信支付",
      payNumber: 3,
      totalPrice: 3,
      showPicker: false,
      columns: ["微信支付", "支付宝"],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onConfirm(value) {
      this.payValue = value;
      this.showPicker = false;
    },
  },
};
</script>
<style>
@import url("../assets/css/reset.css");
#payfor .van-nav-bar {
  background: #3583e5;
}
#payfor .van-nav-bar .van-icon {
  color: #fff;
}
#payfor .van-nav-bar__title {
  color: #fff;
  font-size: 0.18rem;
}
#payfor .van-hairline--bottom::after {
  border-bottom-width: 0px;
}
#payfor .pay_btn {
  width: 94%;
  margin-left: 3%;
  margin-top: 0.7rem;
  background: linear-gradient(90deg, #1aa0f1, #1a6cfa);
  opacity: 0.95;
  border-radius: 0.1rem;
  border: none;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
#payfor .paywrap {
  height: 1rem;
  padding: 0.1rem 0.2rem;
  background: linear-gradient(180deg, #3583e5, #00a6fa);
  margin-top: -0.01rem;
}
#payfor .paywrap .pay_h2 {
  text-align: center;
  font-size: 0.2rem;
  color: #fff;
  font-weight: normal;
}
#payfor .paywrap .pay_num {
  color: #fff195;
  font-weight: bold;
  font-size: 0.22rem;
  text-decoration: underline;
}
#payfor .paywrap .pay_tip {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.14rem;
  padding-top: 0.1rem;
  line-height: 0.2rem;
}
#payfor .paywrap .pay_time {
  color: #fff296;
  font-size: 0.16rem;
}
#payfor .orderwrap {
  height: 0.7rem;
  background: #ffffff;
  border-radius: 0.2rem 0.2rem 0px 0px;
  margin-top: -0.2rem;
  padding: 0.15rem 0.2rem 0;
}

#payfor .h3_text {
  font-size: 0.16rem;
  border-left: 0.02rem solid #3484e2;
}
#payfor .h3_text span {
  padding-left: 0.05rem;
}
#payfor .cell {
  font-size: 0.14rem;
  height: 0.5rem;
  line-height: 0.5rem;
  padding: 0 0.1rem;
}
#payfor .cell .cell_left {
  color: #9e9e9e;
  float: left;
}
#payfor .cell .cell_right {
  color: #141414;
  float: right;
}
#payfor .exitwrap {
  background: #ffffff;
  margin: 0.05rem 0;
  padding: 0.15rem 0.2rem 0;
}
#payfor .exitwrap .cell {
  height: 0.3rem;
  line-height: 0.3rem;
}

#payfor .exitwrap .cell_left {
  width: 30%;
}
#payfor .exitwrap .cell_right {
  float: left;
}
#payfor .exitwrap .ori_price {
  text-decoration: line-through;
  padding-right: 0.05rem;
}
#payfor .exitwrap .total_price {
  color: #ff9a14;
  font-size: 0.18rem;
}
#payfor .zfwrap {
  background: #ffffff;
  margin: 0.05rem 0;
  padding: 0.15rem 0.2rem;
}
#payfor .zfwrap .zf_icon {
  float: left;
  width: 0.2rem;
  height: 0.2rem;
  background: url(../assets/img/wx.png) no-repeat center;
  background-size: 100% 100%;
  margin-top: 0.15rem;
  margin-right: 0.1rem;
}
#payfor .zfwrap .cell_left {
  color: #141414;
  font-weight: bold;
}
#payfor .zfwrap .cell_right {
  width: 0.3rem;
  height: 0.22rem;
  background: url(../assets/img/select.png) no-repeat center;
  background-size: 100% 100%;
  margin-top: 0.14rem;
}
</style>

