<template>
  <div class="grid-card">
    <div class="title">
      {{ pinyin }}
    </div>
    <div class="grid-border">
      <span>{{ word }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Grid',
  props: {
    word: {
      type: String,
      default: ''
    },
    pinyin: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">

</style>
