<template>
  <div>
    <el-container>
      <el-header>
        <div class="header">
          猜成语 | Wordle
        </div>
      </el-header>
      <el-main>
        <div class="content">
          <div class="sub-title">
            游戏规则
          </div>
          <div>
            <p>你有十次的机会去猜一个<b class="text-ok">四字词语</b>。</p>
            <p>每次猜测后，汉字与拼音的颜色将会标识其与正确答案的区别。</p>
            <p><b class="text-ok">青色</b>代表其出现在答案中且在正确的位置。</p>
            <p><b class="text-mis">橙色</b>代表其出现在答案中，出现的位置并不正确。</p>
            <p><b class="text-err">灰色</b>代表其不会出现在答案中。</p>
            <grid-layout :data="demo1List" />
            <p>
              每个格子的<b>汉字、声母、韵母、声调</b> 都会独立进行颜色的指示。 例如，第一个
              <b op50="">虎</b> 汉字为灰色，而其 声母 、 韵母 、音调均为青色，代表该位置的正确答案为其同音字但非 <b op50="">虎
              </b> 字本身。 同理，第二个字中韵母 <b text-mis="">iao</b> 为橙色，代表其韵母出现在四个字之中，但非位居第二。以此类推。
            </p>
            <grid-layout :data="demo2List" />
            <p>当四个格子的内容都为<b class="text-ok">青色</b>时，你便赢得了游戏！</p>
          </div>
          <div class="button-group">
            <el-button type="primary" class="button" @click="gotoIdiom">
              开始游戏
            </el-button>
          </div>
        </div>
      </el-main>
    </el-container>
    <Footer />
  </div>
</template>

<script>

import Footer from '@c/Footer'
import GridLayout from '@c/grid-layout'
export default {
  name: 'Index',
  components: { GridLayout, Footer },
  data() {
    return {
      demo1List: [{ 'data': { 'value': '虎', 'initials': 'h', 'finals': 'u', 'tone': 3 }, 'check': { 'value': 0, 'initials': 1, 'finals': 1, 'tone': 1 }}, { 'data': { 'value': '啸', 'initials': 'x', 'finals': 'iao', 'tone': 4 }, 'check': { 'value': 0, 'initials': 0, 'finals': 2, 'tone': 0 }}, { 'data': { 'value': '山', 'initials': 'sh', 'finals': 'an', 'tone': 1 }, 'check': { 'value': 0, 'initials': 0, 'finals': 0, 'tone': 2 }}, { 'data': { 'value': '林', 'initials': 'l', 'finals': 'in', 'tone': 2 }, 'check': { 'value': 0, 'initials': 1, 'finals': 2, 'tone': 2 }}],
      demo2List: [{ 'data': { 'value': '龙', 'initials': 'l', 'finals': 'ong', 'tone': 2 }, 'check': { 'value': 1, 'initials': 1, 'finals': 1, 'tone': 1 }}, { 'data': { 'value': '腾', 'initials': 't', 'finals': 'eng', 'tone': 2 }, 'check': { 'value': 1, 'initials': 1, 'finals': 1, 'tone': 1 }}, { 'data': { 'value': '虎', 'initials': 'h', 'finals': 'u', 'tone': 3 }, 'check': { 'value': 1, 'initials': 1, 'finals': 1, 'tone': 1 }}, { 'data': { 'value': '跃', 'initials': 'y', 'finals': 'ue', 'tone': 4 }, 'check': { 'value': 1, 'initials': 1, 'finals': 1, 'tone': 1 }}]
    }
  },
  methods: {
    gotoIdiom() {
      this.$router.push({ path: '/idiom' })
    }
  }
}
</script>

<style lang="scss" scoped>
.content{
  text-align: center;
  font-size: 1.1rem;
  .sub-title{
    font-weight: bold;
    font-size: 1.25rem;
    line-height: 1.75rem;
    margin: 1rem;
  }
  p{
    text-align: left;
  }
  b {
    margin: 0 0.2rem;
  }
  .text-ok{
    color: $okColor;
  }
  .text-mis{
    color: $misColor;
  }
  .text-err{
    color: $errColor;
  }
}
.button-group{
  margin: 4rem;
  .button {
    background: $okColor;
  }
}

</style>
