<template>
  <div class="login-box">
    <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="rules" class="loginForm" >
      <h1>全球核武器管理系统</h1>
      <el-form-item prop="userName">
        <el-input v-model="loginForm.userName" autocomplete="off" placeholder="请输入账号" />
      </el-form-item>

      <el-form-item prop="passWord">
        <el-input v-model="loginForm.passWord" type="password" autocomplete="off" placeholder="请输入密码" />
      </el-form-item>

      <el-form-item prop="verificationCode" class="inputCheckCode">
          <el-input v-model="loginForm.verificationCode" type="text" autocomplete="off" placeholder="请输入验证码" />
          <el-image :src="imgSrc" class="checkImg" @click="checkImg" />
      </el-form-item>

      <el-form-item>
        <el-button class="sub-btn" type="primary" @click="submitForm(loginFormRef)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {FormInstance, FormRules} from "element-plus";
import {login, getCheckCode} from "../http/modules/loginApi";
import {router} from "../router";
import config from "../http/config";

//登录表单
const loginFormRef = ref<FormInstance>()
const loginForm = reactive({
    userName: '',
    passWord: '',
    verificationCode: ''
})
//登录表单校验
const rules = reactive<FormRules>({
  userName: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 10, message: '账号长度3-10', trigger: 'blur' }
  ],
  passWord: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 50, message: '密码长度3-50', trigger: 'blur' }
  ],
  verificationCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 4, max: 4, message: '密码长度4', trigger: 'blur' }
  ]
})
//登录提交
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      //登录操作
      login({name: loginForm.userName, password: loginForm.passWord, verificationCode: loginForm.verificationCode}).then((res:any) => {
        if (res.data){
          localStorage.setItem('token', res.data)
          router.push('/')
        } else {
          alert(res.msg)
          router.push('/login')
          loginForm.passWord = ''
          loginForm.userName = ''
        }
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

//图片验证码
let imgSrc: any = ref(config.checkImageUrl)
const checkImg = ()=> {
  getCheckCode().then((res:any) => {
    const blob = new Blob([res], { type: 'image/png' })
    imgSrc.value = window.URL.createObjectURL(blob)
  })
}
</script>

<style lang="scss" scoped>
  .login-box {
    background-image: url("../src/assets/hewuqibg.png");
    background-size: cover;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 200px;
  }
  .loginForm {
    width: 300px;
    padding: 20px;
    border-radius: 10px;
    margin: 0 auto;
    background-color: white;
    box-shadow:black 0px 0px 20px;
  }
  .sub-btn {
    width: 100%;
  }
  h1 {
    text-align: center;
    margin: 20px 0;
  }
  .inputCheckCode {
    .el-input {
      width: 217.5px;
    }
    .checkImg {
      height: 30px;
      display: inline;
    }
  }
</style>