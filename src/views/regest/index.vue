<template>
    <div class="login-container">
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" title="注册">
          <van-icon slot="left" name="cross" class="van" @click="$router.push('/login')"></van-icon>
        </van-nav-bar>

        <!-- 导航栏 -->
        <!-- 用户名密码表单 -->
        <!-- rules表单验证，提交时触发验证，如果验证不通过不会submit -->
        <van-form ref="loginForm" @submit="onSubmit">
          <van-field
              v-model.trim="user.name"
              name="name"
              placeholder="请输入用户名"
              :rules="userFormRules.name"
              type="text"
            >
            <van-icon name="user-circle-o" slot="left-icon"/>
            </van-field>
          <van-field
              v-model.trim="user.password"
              name="password"
              placeholder="请输入密码"
              :rules="userFormRules.password"
              type="password"
            >
            <van-icon name="closed-eye" slot="left-icon"/>
            </van-field>
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
            <!-- <van-field
              v-model="user.code"
              name="code"
              placeholder="请输入验证码"
              :rules="userFormRules.code"
              type="number"
              maxlength="6"
            >
            <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
            <template #button>
              time倒计时时间
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
            </van-field> -->
            <div class="submit-sms-btn">
              <van-button  block type="info" native-type="submit" class="login-btn">注册</van-button>
            </div>
        </van-form>
        <!-- 用户名密码表单 -->
    </div>
</template>

<script>
import { regest, sendSms } from '@/api/user'
export default {
  name: 'regest',
  components: {},
  props: {},
  data () {
    return {
        user:{
          name: '',//用户名
          password:'',//密码
          mobile: '',//手机号
          // code: '',//验证码
        },
        userFormRules:{
          name:[{ 
            required: true, 
            // message: '用户名不能为空'
          }],
          password:[{ 
            required: true, 
            // message: '密码不能为空'
          }],
          mobile:[{ 
            required: true, 
            // message: '手机号不能为空'
          },{
            pattern:/^1[3|5|7|8|9]\d{9}$/,
            message:'请填写正确的手机号'
          }],
          // code:[{ 
          //   required: true, 
          //   // message: '验证码不能为空' 
          // },{
          //   pattern:/^\d{4}$/,
          //   message:'请填写正确的验证码'
          // }]
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
        const { data } = await regest(user)
        this.$toast.success('注册成功')
        this.$router.push('/login')
      }
      catch (err) {
        if(err.response.status === 400){
            this.$toast.fail('注册失败，手机号重复')
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
        padding: 5px;
        padding-top: 10px;
        .login-btn {
            background-color: #6db4fb;
            border: none;
        }
    }
    .regest{
      position: absolute;
      bottom: 10px;
      margin: 0 137px;
      .text{
        font-size: 15px;
        color: #258af0;
        border-bottom: 1px solid #258af0;
      }
      .textpic{
        font-size: 15px;
        color: #258af0;
      }
    }
}

</style>
