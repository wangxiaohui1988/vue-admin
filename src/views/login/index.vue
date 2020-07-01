<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{'current': item.current}"
          @click="toggleMenu(item)"
        >{{ item.txt }}</li>
      </ul>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="item-from">
          <label for="username">邮箱</label>
          <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-from">
          <label for="password">密码</label>
          <el-input
            id="password"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="checkpass" class="item-from" v-show="model === 'register'">
          <label for="checkpass">重复密码</label>
          <el-input
            id="checkpass"
            type="password"
            v-model="ruleForm.checkpass"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-from">
          <label for="code">验证码</label>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-input id="code" v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="12">
              <el-button type="success" class="block" @click="getSms()" :disabled="codeButStatus.status">{{ codeButStatus.text }}</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" :disabled="loginButStatus" class="login-btn block">{{ model === 'login' ? '登录' : '注册'}}</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import sha1 from 'js-sha1'
import { reactive, ref } from '@vue/composition-api'
// import { Message } from 'element-ui'
import { validateEmail, stripscript, validatePass, validateVCode } from '@/utils/validate'
import { GetSms, Register } from '@/api/login'

export default {
  name: 'login',
  // 这里面放置data数据、生命周期、自定义的函数
  setup (props, { refs, root }) {
    // 用户名验证
    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (validateEmail(value)) {
        callback(new Error('用户格式错误'))
      } else {
        callback()
      }
    }

    // 密码验证
    let validatePassWord = (rule, value, callback) => {
      // 过滤特殊字符
      ruleForm.password = stripscript(value)
      value = ruleForm.password
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (validatePass(value)) {
        callback(new Error('密码为6至20位数字+字母'))
      } else {
        callback()
      }
    }

    // 重复密码验证
    let validateCheckPass = (rule, value, callback) => {
      if (model.value === 'login') {
        callback()
      }
      // 过滤特殊字符
      ruleForm.checkpass = stripscript(value)
      value = ruleForm.checkpass
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (validatePass(value)) {
        callback(new Error('密码为6至20位数字+字母'))
      } else if (value !== ruleForm.password) {
        callback(new Error('密码不一致，请重新输入'))
      } else {
        callback()
      }
    }

    // 验证码校验
    let validateCode = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入验证码'))
      } else if (validateVCode(value)) {
        return callback(new Error('验证码格式有误'))
      } else {
        callback()
      }
    }

    /** 声明数据 */
    // 1.对象数据
    const menuTab = reactive([
      { txt: '登录', current: true, type: 'login' },
      { txt: '注册', current: false, type: 'register' }
    ])

    const ruleForm = reactive({
      username: '',
      password: '',
      checkpass: '',
      code: ''
    })

    const rules = reactive({
      username: [{ validator: validateUsername, trigger: 'blur' }],
      password: [{ validator: validatePassWord, trigger: 'blur' }],
      checkpass: [{ validator: validateCheckPass, trigger: 'blur' }],
      code: [{ validator: validateCode, trigger: 'blur' }]
    })

    const codeButStatus = reactive({
      status: false,
      text: '获取验证码'
    })

    // 2.基本数据
    const model = ref('login')
    // 登录按钮禁用状态
    const loginButStatus = ref(true)
    // 定时器
    const timer = ref(null)

    /** 声明函数 */
    // 模块切换
    const toggleMenu = data => {
      // console.log(data)
      menuTab.forEach((elem, index) => {
        elem.current = false
      })
      data.current = true
      // 修改模块值
      model.value = data.type
      // 重置表单
      resetForm()
      // 重置验证码按钮
      clearCountDown()
    }

    /** 获取验证码 */
    const getSms = () => {
      // 邮箱为空验证
      if (ruleForm.username === '') {
        root.$message.error('邮箱不能为空！！')
        return false
      }

      // 邮箱格式验证
      if (validateEmail(ruleForm.username)) {
        root.$message.error('邮箱格式错误！！')
        return false
      }

      // 修改验证码按钮状态
      codeButStatus.status = true
      codeButStatus.text = '发送中'

      var requestData = {
        username: ruleForm.username,
        model: model.value
      }

      GetSms(requestData).then((response) => {
        var data = response.data
        console.log(data)
        root.$message({
          message: data.message,
          type: 'success'
        })
        // 登录按钮启用
        loginButStatus.value = false
        // 调定时器，倒计时
        countDown(60)
      }).catch(error => {
        console.log(error)
      })
    }

    /** 表单提交 */
    const submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          if (model.value === 'register') {
            register()
          } else {
            login()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

    // 注册
    const register = () => {
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code
      }
      Register(requestData).then(response => {
        let data = response.data
        root.$message({
          data: data.message,
          type: 'success'
        })
        // 切换到登录也
        toggleMenu(menuTab[0])
        clearCountDown()
      }).catch(error => {
        console.log(error)
      })
    }

    // 登录
    function login () {
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code
      }
      root.$store.dispatch('app/login', requestData).then(response => {
        // let data = response.data
        // console.log(data)
        // 跳转到主页面
        root.$router.push({
          name: 'Console'
        })
      }).catch(error => {
        console.log(error)
      })
      // Login(requestData).then(response => {
      //   let data = response.data
      //   root.$message({
      //     message: data.message,
      //     type: 'success'
      //   })
      //   // 跳转到主页面
      //   root.$router.push({
      //     name: 'Console'
      //   })
      // }).catch((err) => {
      //   console.log(err)
      // })
    }

    const countDown = (number) => {
      // setTimeout:clearTimeout(变量)  只执行一次
      // setInterval:clearInterval(变量))  不断的执行，需要条件才会停止
      let time = number
      // 清楚定时器
      if (timer.value) {
        clearInterval(timer.value)
      }

      timer.value = setInterval(() => {
        time--
        if (time === 0) {
          clearCountDown()
          codeButStatus.status = false
          codeButStatus.text = '再次发送'
        } else {
          // es5 '倒计时' + time + '秒'
          codeButStatus.text = `倒计时${time}秒`
        }
      }, 1000)
    }

    const clearCountDown = () => {
      // 还原验证码按钮默认状态
      codeButStatus.status = false
      codeButStatus.text = '获取验证码'
      // 清除倒计时
      clearInterval(timer.value)
    }

    // 重置表单
    const resetForm = () => {
      refs.ruleForm.resetFields()
    }

    return {
      menuTab,
      model,
      loginButStatus,
      codeButStatus,
      toggleMenu,
      ruleForm,
      rules,
      getSms,
      submitForm
    }
  },
  created () {}
}
</script>
<style lang="scss" scope>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-from {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
