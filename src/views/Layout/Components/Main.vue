<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
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
  //   position: fixed;
  //   left: $navMenu;
  //   top: 75px;
  //   right: 0;
  //   bottom: 0;
  //   border: 30px solid #f7f7f7;
  //   border-bottom: none;
  //  -webkit-box-sizing: border;
}

.main-content {
  width: 100%;
  height: 100%;
  padding-top: $layoutHeader + 30;
  padding-left: $navMenu + 30px;
  padding-right: 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.content {
  width: 100%;
  height: 100%;
  padding: 30px 30px 0 30px;
  background-color: #fff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.open {
  .main-content {
    padding-left: $navMenu + 30;
  }
}
.close {
  .main-content {
    padding-left: $navMenuMin + 30;
  }
}

</style>
