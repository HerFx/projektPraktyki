<template>
  <div>
      <AppMenu />
    <nuxt />
  </div>
</template>

<script>
import AppMenu from '~/components/AppMenu.vue'

export default {
  name: 'DefaultLayout',
  components: {
    AppMenu,
  }
}
</script>

<style lang="css">

</style>
