<template>
  <div>
    <div class="grid-layout">
      <template v-for="i in [0,1,2,3]">
        <grid-box :key="i" :val="data[i]" />
      </template>
    </div>
  </div>
</template>

<script>
import GridBox from '@c/grid-box'

export default {
  name: 'GridLayout',
  components: { GridBox },
  props: {
    data: {
      type: Array,
      default: null
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
