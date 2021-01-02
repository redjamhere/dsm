<template>
    <v-icon>
        {{items[0].icon}}
    </v-icon>
</template>

<script>
export default {
    name: 'NavigationDrawer',
     props: {
    items: {
      type: Array,
      required: true
    },
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">

</style>