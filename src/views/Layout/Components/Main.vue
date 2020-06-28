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
    #main-wrap {
      width: 100%;
      height: 100%;
      padding-top: $layoutHeader + 30;
      padding-right: 30px;
    }
</style>
