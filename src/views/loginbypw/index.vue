<template>
    <div class="login-container">
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" title="登陆">
          <van-icon slot="left" name="cross" class="van" @click="$router.push('/my')"></van-icon>
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
              v-model.trim="user.password"
              name="password"
              placeholder="请输入密码"
              :rules="userFormRules.password"
              type="password"
            >
            <van-icon name="closed-eye" slot="left-icon"/>
            </van-field>
            <div class="submit-sms-btn">
              <van-button  block type="info" native-type="submit" class="login-btn">登陆</van-button>
            </div>
        </van-form>
        <!-- 用户名密码表单 -->
        <!-- 注册 -->
        <div class="regest" >
            <span class="text" @click="$router.push('/regest')">注册</span>
            <span class="textpic">/</span>
            <span class="text" @click="$router.push('/login')">验证码登录</span>
        </div>
        <!-- /注册 -->
    </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
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
            message:'请填写正确的手机号'
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
        message: '登陆中...',
        forbidClick: true,//禁用背景
        duration:0,//持续时间 0持续展示
      });

      try {
        const { data } = await login(user)
        console.log('登陆成功',data);
        this.$toast.success('登陆成功')
        this.$store.commit('setUser',data.data)
        this.$router.push('/home')
      }
      catch (err) {
        if(err.response.status === 400){
            this.$toast.fail('手机号或密码错误')
        }else{
            console.log('登陆失败',err);
            this.$toast.fail('请稍后重试')
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
      margin: 0 130px;
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
