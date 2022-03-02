<template>
  <div>
    <el-container>
      <el-header>
        <div class="header">
          <div class="help-btn">
            <el-tooltip class="item" effect="dark" content="帮助" placement="bottom">
              <div class="icon-help" @click="gotoHome" />
            </el-tooltip>
          </div>
          猜成语 | Wordle
          <div class="tip-btn">
            <div class="icon-tip" @click="showTip" />
          </div>
        </div>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="24">
            <div v-for="(item,i) in list" :key="i" class="grid-content bg-purple-dark">
              <grid-layout :data="item.data" />
            </div>
          </el-col>

          <el-col v-show="!win" :span="24">
            <div class="grid-content bg-purple-dark">
              <grid-input-layout :pinyins="pinyinArr" :words="words.split('')" />
            </div>
          </el-col>
          <el-col v-show="!win" :span="24">
            <div class="grid-content bg-purple-dark input-container">
              <el-input
                v-model="input"
                class="input-layout"
                placeholder="请输入四字成语"
                @keyup.native="inputChange($event)"
                @keydown.native="inputChange($event)"
              />
            </div>
          </el-col>
          <el-col :span="24">
            <div class="button-group">
              <el-button v-show="!win" type="primary" :disabled="words.length < 4 || list.length >= 10" :class="buttonEnableClass" :loading="loading" @click="ensure">
                确定
              </el-button>
              <el-button type="primary" @click="reset">
                下一题
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-drawer
      title="提示"
      :with-header="false"
      :visible.sync="drawer"
      :show-close="false"
      direction="ttb"
      size="26%"
    >
      <div class="drawer-layout">
        <p>答案包含以下拼音</p>
        <grid v-if="tipsData" :pinyin="tipsData" word="?"/>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import GridLayout from '@c/grid-layout'
import pinyin4js from 'pinyin4js'
import { checkIdiom, tips } from '@/api/idiom'
import GridInputLayout from '@c/grid-input-layout'
import Cookie from 'js-cookie'
import Grid from '@c/grid'

const _ = require('lodash')

export default {
  name: 'Idiom',
  components: {
    Grid,
    GridInputLayout,
    GridLayout
  },
  data() {
    return {
      loading: false,
      input: '',
      words: '',
      pinyinArr: [],
      // 历史数据
      list: [],
      win: false,
      drawer: false,
      tipsData: null
    }
  },
  computed: {
    buttonEnableClass() {
      if (this.list.length >= 10) {
        return { buttonError: true }
      }
      if (this.words.length > 3) {
        return { buttonEnable: true }
      }
      return { button: true }
    }
  },
  mounted() {
    // 不存在cookie则清除历史数据
    const c = Cookie.get('idiom_code')
    if (!c) {
      this.reset()
    } else {
      const listJSON = localStorage.getItem('data')
      if (listJSON) {
        this.list = JSON.parse(listJSON)
      }
    }
  },
  methods: {
    ensure() {
      this.loading = true
      checkIdiom({ source: this.words }).then(res => {
        if (res.code === 200) {
          this.loading = false
          const data = res.data
          let list = localStorage.getItem('data')
          if (list == null) {
            list = []
          } else {
            list = JSON.parse(list)
          }
          list.push({ 'data': data })
          localStorage.setItem('data', JSON.stringify(list))
          this.reloadData()
          this.list = list
          this.win = this.isWin(list)
          // 校验成功失败
          if (this.win) {
            this.$message.success('恭喜你，游戏获胜')
            return
          }
          // 游戏失败
          if (list.length >= 10) {
            this.$message.error('游戏失败')
          }
        }
      }).catch()
    },
    isWin(list) {
      for (const item of list[list.length - 1].data) {
        if (item.check.value !== 1) {
          return false
        }
      }
      return true
    },
    reset() {
      localStorage.clear()
      const c = Cookie.get('idiom_code')
      debugger
      if (c) {
        Cookie.remove(c)
        Cookie.remove('idiom_code')
      }
      this.win = false
      this.reloadData()
    },
    reloadData() {
      this.pinyinArr = []
      this.words = ''
      this.input = ''
      this.list = []
    },
    inputChange: _.debounce(function() {
      // 筛选中文
      this.words = this.input.replace(/[^\u4e00-\u9fa5]/gi, '').slice(0, 4)
      const temp = pinyin4js.convertToPinyinString(this.words, ',', pinyin4js.WITH_TONE_MARK)
      this.pinyinArr = temp.split(',')
    }, 100),
    gotoHome() {
      this.$router.push({ path: '/' })
    },
    // 提示
    showTip() {
      let c = Cookie.get('idiom_code')
      if (c) {
        const flag = Cookie.get(c)
        if (flag) {
          this.tipsData = flag
          this.drawer = true
          return
        }
      }
      this.loading = true
      tips().then(res => {
        this.loading = false
        if (res.code === 200) {
          this.drawer = true
          this.tipsData = res.data.initials + res.data.finals
          c = Cookie.get('idiom_code')
          Cookie.set(c, this.tipsData, { expires: 1 })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.help-btn{
  position: absolute;
  left: 1rem;
  display: inline-block;
  .icon-help{
    background-image: url("../../assets/help.svg");
    height: 32px;
    width: 32px;
  }
}
.tip-btn{
  position: absolute;
  right: 1rem;
  display: inline-block;
  .icon-tip{
    background-image: url("../../assets/hint.svg");
    height: 32px;
    width: 32px;
  }
}
.input-container{
  text-align: center;
  margin-top: 2rem;
  .input-layout{
    text-align: center;
    width: 19rem;
    /deep/ .el-input__inner{
      height: 3rem!important;
    }
  }
}
.button-group{
  margin: 1rem;
  text-align: center;
  .buttonError {
    background: #f56c6c;
  }
  .buttonEnable {
    background: $okColor;
  }
  .button {
    background: $errColor;
  }
}
.header{
  position: relative;
}

.drawer-layout{
  text-align: center;
  margin-top: 2rem;
  p {
    font-family: ttFont;
    font-size: 1.03rem;
  }
}

</style>
