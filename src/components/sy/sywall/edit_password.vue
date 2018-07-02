<template>
  <div class="wrapper">
    <div v-title="'修改支付密码'"></div>
    <div class="link"></div>
    <div class="eidt">
      <div class="tips">请设置6位数字支付密码</div>
      <div class="list">
        <ul class="clearfix">
          <li class="fl">
            <input type="password" maxlength="1" v-model="pasd1" @focus="getFocus('ref1')" @blur="getBlur('ref1')"
                   ref="ref1">
          </li>
          <li class="fl">
            <input type="password" maxlength="1" v-model="pasd2" @focus="getFocus('ref2')" @blur="getBlur('ref2')"
                   ref="ref2">
          </li>
          <li class="fl">
            <input type="password" maxlength="1" v-model="pasd3" @focus="getFocus('ref3')" @blur="getBlur('ref3')"
                   ref="ref3">
          </li>
          <li class="fl">
            <input type="password" maxlength="1" v-model="pasd4" @focus="getFocus('ref4')" @blur="getBlur('ref4')"
                   ref="ref4">
          </li>
          <li class="fl">
            <input type="password" maxlength="1" v-model="pasd5" @focus="getFocus('ref5')" @blur="getBlur('ref5')"
                   ref="ref5">
          </li>
          <li class="fl">
            <input type="password" maxlength="1" v-model="pasd6" @focus="getFocus('ref6')" @blur="getBlur('ref6')"
                   ref="ref6">
          </li>
        </ul>
      </div>
      <div class="btn">
        <p>确认</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        pasd1: '',
        pasd2: '',
        pasd3: '',
        pasd4: '',
        pasd5: '',
        pasd6: '',
        pasd: ''
      }
    },
    methods: {
      getFocus (ref) {
        this.$refs[ref].style.borderColor = '#4A90E2'
      },
      getBlur (ref) {
        this.$refs[ref].style.borderColor = '#B1B8C4'
      }
    }
  }
</script>
<style scoped>
  .wrapper {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }

  .link {
    width: 100%;
    height: 0.2rem;
    background-color: #f4f6f5;
  }

  .tips {
    padding: 0.8rem 0 0.6rem;
    font-size: 0.32rem;
    font-weight: 300;
    color: #4B4F63;
  }

  .list {
    box-sizing: border-box;
    padding: 0 0.3rem;
  }

  li {
    width: 16.6%;
  }

  li input {
    width: 0.8rem;
    height: 1.2rem;
    border: 1px solid #B1B8C4;
    border-radius: 8px;
    text-align: center;
    font-size: 0.8rem;
    color: #4A90E2;
  }

  .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
  }

  .btn p {
    background: #4A90E2;
    color: #fff;
    font-size: 0.32rem;
  }
</style>