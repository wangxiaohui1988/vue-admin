<template>
    <div id="main-wrap">
      <router-view></router-view>
    </div>
</template>
<script>
export default {
  name: 'layoutMain'
}
</script>
<style lang="scss" scope>
@import "../../../styles/config.scss";
    #main-wrap {
      height: 100vh;
      position: fixed;
      left: $navMenu;
      top: 75px;
      right: 0;
      bottom: 0;
      border: 30px solid #f7f7f7;
      border-bottom: none;
     -webkit-box-sizing: border;
    }
</style>
