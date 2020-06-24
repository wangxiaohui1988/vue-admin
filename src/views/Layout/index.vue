<template>
    <div>
      <LayoutNav></LayoutNav>
      <LayoutHeader></LayoutHeader>
      <LayoutMain></LayoutMain>
    </div>
</template>
<script>
import LayoutHeader from './Components/Header'
import LayoutMain from './Components/Main'
import LayoutNav from './Components/Nav'
export default {
  name: 'layout',
  comments: { LayoutHeader, LayoutNav, LayoutMain },
  setup (props, { refs, root }) {}
}
</script>
<style lang="sass" scope>
</style>
