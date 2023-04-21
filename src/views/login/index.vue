<template>
    <div class="login-container">
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" title="登陆">
          <van-icon slot="left" name="cross" class="van" @click="$router.push('/my')"></van-icon>
          <span slot="right" class="text" @click="$router.push('/loginbypw')">密码登录</span>
        </van-nav-bar>

        <!-- 导航栏 -->
        <!-- 用户名密码表单 -->
        <!-- rules表单验证，提交时触发验证，如果验证不通过不会submit -->
        <van-form ref="loginForm" @submit="onSubmit">
            <van-field
              v-model="user.mobile"
              name="mobile"
              placeholder="请输入手机号"
              :rules="userFormRules.mobile"
              type="number"
              maxlength="11"
            >
            <i slot="left-icon" class="iconfont icon-shouji"></i>
            </van-field>
            <van-field
              v-model="user.code"
              name="code"
              placeholder="请输入验证码"
              :rules="userFormRules.code"
              type="number"
              maxlength="6"
            >
            <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
            <template #button>
              <!-- time倒计时时间 -->
              <van-count-down :time="60000" format="ss s" v-if="isCountDownShow" @finish="isCountDownShow=false"/>
              <van-button 
              v-if="!isCountDownShow"
                native-type="button"
                round size="small" 
                type="default" 
                class="send-sms-btn"
                @click="onSendSms">
                获取验证码
              </van-button>
            </template>
            </van-field>
            <div class="submit-sms-btn">
              <van-button  block type="info" native-type="button" @click="$router.push('/regest')" class="regest-btn">注册</van-button>
              <van-button  block type="info" native-type="submit" class="login-btn">登陆</van-button>
            </div>
        </van-form>
        <!-- 用户名密码表单 -->
    </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
        user:{
          mobile: '',//手机号
          code: '',//验证码
        },
        userFormRules:{
          mobile:[{ 
            required: true, 
            // message: '手机号不能为空'
          },{
            pattern:/^1[3|5|7|8|9]\d{9}$/,
            message:'请填写正确的手机号'
          }],
          code:[{ 
            required: true, 
            // message: '验证码不能为空' 
          },{
            pattern:/^\d{4}$/,
            message:'请填写正确的验证码'
          }]
        },
        isCountDownShow: false //是否展示倒计时
    };
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit () {
      const user = this.user

      // 加载动画
      this.$toast.loading({
        overlay: true,
        message: '登陆中...',
        forbidClick: true,//禁用背景
        duration:0,//持续时间 0持续展示
      });

      try {
        const { data } = await login(user)
        if(data.status === 400){
          this.$toast.fail('手机号或验证码错误')
        }else{
        console.log('登陆成功',data);
        this.$toast.success('登陆成功')
        this.$store.commit('setUser',data.data)
        this.$router.push('/home')
        }
      }
      catch (err) {
        if(err.response.status === 400){
            this.$toast.fail('手机号或验证码错误')
        }else{
            console.log('登陆失败',err);
            this.$toast.fail('请稍后重试')
        }
        
      }
    },
    async onSendSms (){
      // 点击验证码手机号验证格式
      try{
        await this.$refs.loginForm.validate('mobile')
      }catch(err){
        console.log('验证失败',err);
        return
      }
      this.isCountDownShow=true
      // 请求验证码
      try{
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      }catch{
        console.log('发送失败',err);
        this.$toast('发送失败')
        this.isCountDownShow=false
      }

    },
  }
}
</script>

<style scoped lang="less">

.login-container {
  position: relative;
  height: 667px;
    .iconfont {
     font-size: 19px;
    }
    .send-sms-btn {
        background-color: #ededed;
        width: 80px;
        height: 23px;
        line-height: 11px;
        font-size: 11px;
        color: #666;
    }
    .submit-sms-btn{
      display: flex;
        padding: 5px;
        padding-top: 10px;
        .login-btn {
            // background-color: #6db4fb;
            border: none;
            margin: 10px;
        }
        .regest-btn{
          margin: 10px;
          color: #6db4fb;
          background-color: white;
          border: 1px solid #6db4fb;
        }
    }
    .text{
        font-size: 12px;
        color: white;

      }
}

</style>
