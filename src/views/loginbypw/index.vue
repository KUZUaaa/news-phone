<template>
    <div class="login-container">
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" :title="this.$t('my.登录')">
          <van-icon slot="left" name="cross" class="van" @click="$router.push('/my')"></van-icon>
          <span slot="right" class="text" @click="$router.push('/login')">{{$t('login.验证码登录')}}</span>
        </van-nav-bar>

        <!-- 导航栏 -->
        <!-- 用户名密码表单 -->
        <!-- rules表单验证，提交时触发验证，如果验证不通过不会submit -->
        <van-form ref="loginForm" @submit="onSubmit">
            <van-field
              v-model="user.mobile"
              name="mobile"
              :placeholder="this.$t('login.请输入手机号')"
              :rules="userFormRules.mobile"
              type="number"
              maxlength="11"
            >
            <i slot="left-icon" class="iconfont icon-shouji"></i>
            </van-field>
            <van-field
              v-model.trim="user.password"
              name="password"
              :placeholder="this.$t('login.请输入密码')"
              :rules="userFormRules.password"
              type="password"
            >
            <van-icon name="closed-eye" slot="left-icon"/>
            </van-field>
            <div class="submit-sms-btn">
              <van-button  block type="info" native-type="button" @click="$router.push('/regest')" class="regest-btn">{{$t('login.注册')}}</van-button>
              <van-button  block type="info" native-type="submit" class="login-btn">{{$t('my.登录')}}</van-button>
            </div>
        </van-form>
        <!-- 用户名密码表单 -->
    </div>
</template>

<script>
import { loginByPw } from '@/api/user'
export default {
  name: 'loginbypw',
  components: {},
  props: {},
  data () {
    return {
        user:{
          mobile: '',//手机号
          password: '',//验证码
        },
        userFormRules:{
          mobile:[{ 
            required: true, 
            // message: '手机号不能为空'
          },{
            pattern:/^1[3|5|7|8|9]\d{9}$/,
            message:this.$t('login.请填写正确的手机号')
          }],
          password:[{ 
            required: true, 
            // message: '密码不能为空'
          }],
        },
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
        message: this.$t('login.登陆中...'),
        forbidClick: true,//禁用背景
        duration:0,//持续时间 0持续展示
      });

      try {
        const { data } = await loginByPw(user)
        if(data.status === 400){
          this.$toast.fail(this.$t('login.手机号或密码错误'))
        }else{
        this.$toast.success(this.$t('login.登陆成功'))
        this.$store.commit('setUser',data.data)
        this.$router.push('/home')
        }
      }
      catch (err) {
        if(err.response.status === 400){
            this.$toast.fail(this.$t('login.手机号或密码错误'))
        }else{
            this.$toast.fail(this.$t('login.请稍后重试'))
        }
        
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
