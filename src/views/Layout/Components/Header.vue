<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuState"><svg-icon iconClass="menu" className="menu"></svg-icon></div>
    <div class="pull-right">
      <div class="user-info pull-left">
        {{ username }}
      </div>
      <div class="header-icon pull-left" @click="exit">
        <svg-icon iconClass="exit" className="exit"></svg-icon>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from '@vue/composition-api'
export default {
  name: 'layoutHeader',
  setup (props, { root }) {
    const username = computed(() => root.$store.state.app.username)

    /** 定义函数 */
    const navMenuState = () => {
      // 调用store中函数
      root.$store.commit('app/SET_COLLAPSE')
    }

    // 退出
    const exit = () => {
      root.$store.dispatch('app/exit').then(response => {
        // 跳转到登录页
        root.$router.push({
          name: 'Login'
        })
      })
    }

    return { username, navMenuState, exit }
  }
}
</script>
<style lang="scss" scope>
@import '../../../styles/config.scss';
#header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: $navMenu + 30;
  height: 75px;
  background-color: #fff;
  line-height: 75px;
  -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  line-height: 75px;
}
.open {
  #header-wrap {
    left: $navMenu;
  }
}
.close {
  #header-wrap {
    left: $navMenuMin;
  }
}

.header-icon {
  padding: 0 32px;
  svg {
    margin-bottom: -8px;
    font-size: 25px;
    cursor: pointer;
  }
}
.user-info {
  height: 100%;
  padding: 0 32px;
  border-right: 1px solid #ededed;
  + .header-icon {
    padding: 0 28px;
  }
  img {
    display: inline-block;
    margin-bottom: -12px;
    margin-right: 18px;
    border-radius: 50px;
  }
}
</style>
