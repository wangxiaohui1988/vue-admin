<template>
  <div id="nav-wrap">
    <h1 class="logo"><img src="../../../assets/logo.png" alt=""></h1>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
      :collapse="isCollapse"
    >
      <template v-for="(item, index) in routes">
        <el-submenu v-if="!item.hidden" :index="index + ''" :key="item.id">
          <!-- 一级菜单 -->
          <template slot="title">
            <svg-icon  :iconClass="item.meta.icon" :className="item.meta.icon"></svg-icon>
            <!-- <i class="el-icon-menu"></i> -->
            <span>{{ item.meta.name }}</span>
          </template>
          <!-- 二级菜单 -->
          <template v-for="subItem in item.children">
            <el-menu-item :key="subItem.id" :index="subItem.path">{{ subItem.meta.name }}</el-menu-item>
          </template>
      </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { reactive, computed } from '@vue/composition-api'
export default {
  name: 'navMenu',
  setup (props, { root }) {
    /** data数据 */
    const routes = reactive(root.$router.options.routes)

    /** 属性计算 */
    // 导航栏水平伸缩
    const isCollapse = computed(() => {
      // 获取store中数据
      return root.$store.state.app.isCollapse
    })

    return { routes, isCollapse }
  }
}
</script>
<style lang="scss" scope>
@import "../../../styles/config.scss";
.logo {
  text-align: center;
  img {
    margin: 28px auto 25px;
    width: 92px;
  }
}
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #344a5f;
  -webkit-transition: all .3s ease 0s;
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
}

.open {
  #nav-wrap { width: $navMenu; }
}
.close {
  #nav-wrap { width: $navMenuMin; }
  .logo img { width: 60%; }
}
</style>
