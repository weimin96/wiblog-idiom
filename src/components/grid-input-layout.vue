<template>
  <div>
    <div class="grid-layout">
      <template v-for="i in [0,1,2,3]">
        <Grid :word="words[i]" :pinyin="pinyins[i]" />
      </template>
    </div>
  </div>
</template>

<script>
import Grid from '@c/grid'

export default {
  name: 'GridInputLayout',
  components: { Grid },
  props: {
    words: {
      type: Array,
      default: function() {
        return []
      }
    },
    pinyins: {
      type: Array,
      default: function() {
        return []
      }
    }
  }
}
</script>

<style scoped lang="scss">
.grid-layout {
  justify-content: center;
  text-align: center;
  margin: 10px 0;
  display: flex;
}
</style>
