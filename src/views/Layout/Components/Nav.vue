<template>
  <div id="nav-wrap">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
      router
    >
      <template v-for="(item, index) in routes">
        <el-submenu v-if="!item.hidden" :index="index + ''" :key="item.id">
          <!-- 一级菜单 -->
          <template slot="title">
            <i class="el-icon-location"></i>
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
import { reactive } from '@vue/composition-api'
export default {
  name: 'navMenu',
  setup (props, { root }) {
    /** data数据 */
    const routes = reactive(root.$router.options.routes)
    /** 函数 */
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }
    return { routes, handleOpen, handleClose }
  }
}
</script>
<style lang="scss" scope>
@import "../../../styles/config.scss";
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #344a5f;
}

.open {
  #nav-wrap { width: $navMenu; }
}
.close {
  #nav-wrap { width: $navMenuMin; }
  .logo img { width: 60%; }
}
</style>
