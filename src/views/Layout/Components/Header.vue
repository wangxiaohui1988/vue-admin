<template>
  <div id="header-wrap">头部</div>
</template>
<script>
export default {
  name: 'LayoutHeader'
}
</script>
<style lang="scss" scope>
@import "../../../styles/config.scss";
  #header-wrap{
    position: fixed;
    top: 0;
    right: 0;
    left: $navMenu;
    height: 75px;
    background-color: #fff;
    line-height: 75px;
  }
</style>
