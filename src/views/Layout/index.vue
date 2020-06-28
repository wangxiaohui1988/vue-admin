<template>
    <div>
      <LayoutNav></LayoutNav>
      <LayoutHeader></LayoutHeader>
      <layoutMain></layoutMain>
    </div>
</template>
<script>
// import LayoutMain from './Components/Main'
import LayoutNav from './Components/Nav.vue'
import LayoutHeader from './Components/Header'
import layoutMain from './Components/Main'
export default {
  name: 'LayoutIndex',
  components: { LayoutNav, LayoutHeader, layoutMain },
  setup (props, { refs, root }) {}
}
</script>
<style lang="sass" scope>
</style>
