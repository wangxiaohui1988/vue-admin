<template>
    <div id="layout" :class="[menuStatus ? 'close' : 'open']">
      <LayoutNav></LayoutNav>
      <LayoutHeader></LayoutHeader>
      <layoutMain></layoutMain>
    </div>
</template>
<script>
import LayoutNav from './Components/Nav.vue'
import LayoutHeader from './Components/Header'
import layoutMain from './Components/Main'
import { computed } from '@vue/composition-api'
export default {
  name: 'LayoutIndex',
  components: { LayoutNav, LayoutHeader, layoutMain },
  setup (props, { refs, root }) {
    const menuStatus = computed(() => {
      return root.$store.state.app.isCollapse
    })

    return { menuStatus }
  }
}
</script>
<style lang="sass" scope>
</style>
