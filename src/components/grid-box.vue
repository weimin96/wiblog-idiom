<template>
  <div class="grid-card">
    <div class="title">
      <span :class="typeClass(val.check.initials)">{{ val.data.initials }}</span>
      <span :class="typeClass(val.check.finals)">{{ val.data.finals }}</span>
      <div class="yinbiao" :class="toneImg(val.data.initials, val.data.finals, val.check.tone)">
        <svg
          width="8"
          height="8"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            v-if="val.data.tone === 1"
            d="M3.35 8C2.60442 8 2 8.60442 2 9.35V10.35C2 11.0956 2.60442 11.7 3.35 11.7H17.35C18.0956 11.7 18.7 11.0956 18.7 10.35V9.35C18.7 8.60442 18.0956 8 17.35 8H3.35Z"
            fill="currentColor"
          />
          <path
            v-if="val.data.tone === 2"
            d="M16.581 3.71105C16.2453 3.27254 15.6176 3.18923 15.1791 3.52498L3.26924 12.6439C2.83073 12.9796 2.74743 13.6073 3.08318 14.0458L4.29903 15.6338C4.63478 16.0723 5.26244 16.1556 5.70095 15.8199L17.6108 6.70095C18.0493 6.3652 18.1327 5.73754 17.7969 5.29903L16.581 3.71105Z"
            fill="currentColor"
          />
          <path
            v-if="val.data.tone === 3"
            d="M1.70711 7.70712C1.31658 7.3166 1.31658 6.68343 1.70711 6.29291L2.41421 5.5858C2.80474 5.19528 3.4379 5.19528 3.82843 5.5858L9.31502 11.0724C9.70555 11.4629 10.3387 11.4629 10.7292 11.0724L16.2158 5.5858C16.6064 5.19528 17.2395 5.19528 17.63 5.5858L18.3372 6.29291C18.7277 6.68343 18.7277 7.3166 18.3372 7.70712L10.7292 15.315C10.3387 15.7056 9.70555 15.7056 9.31502 15.315L1.70711 7.70712Z"
            fill="currentColor"
          />
          <path
            v-if="val.data.tone === 4"
            d="M4.12282 3.71105C4.45857 3.27254 5.08623 3.18923 5.52474 3.52498L17.4346 12.6439C17.8731 12.9796 17.9564 13.6073 17.6207 14.0458L16.4048 15.6338C16.0691 16.0723 15.4414 16.1556 15.0029 15.8199L3.09303 6.70095C2.65452 6.3652 2.57122 5.73754 2.90697 5.29903L4.12282 3.71105Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
    <div class="grid-border">
      <span :class="typeClass(val.check.value)">{{ val.data.value }}</span>
    </div>
  </div>
</template>

<script>
const offset0 = ['a', 'o', 'e', 'i', 'u', 'v', 'er', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'in', 'vn', 'ang', 'eng', 'ing', 'ong']
export default {
  name: 'GridBox',
  props: {
    val: {
      type: Object,
      default: null
    }
  },
  data() {
    return {}
  },
  computed: {
    typeClass() {
      return function(val) {
        return val === 1 ? { ok: true } : (val === 2 ? { exist: true } : { exist: false })
      }
    },
    toneImg() {
      return function(initials, finals, tone) {
        let cls = tone === 1 ? { okPath: true } : (tone === 2 ? { existPath: true } : { exist: false })
        const finalsOffset = offset0.indexOf(finals) > -1 ? 0 : 1
        const initialsOffset = initials === null ? 0 : initials.length
        const offset = 'offset' + (finalsOffset + initialsOffset)
        const of = {
          [offset]: true
        }
        cls = {
          ...of,
          ...cls
        }
        return cls
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.grid-card {
  .title {
    .yinbiao {
      position: absolute;
      top: -0.48rem;
    }
    .offset0 {
      //left: 0.18rem;
    }
    .offset1 {
      left: 0.58rem;
    }
    .offset2 {
      left: 1.1rem;
    }
    .offset3 {
      left: 1.68rem;
    }
  }
}

.ok {
  color: $okColor;
}
.okPath {
  path {
    fill: $okColor;
  }
}

.exist {
  color: $misColor;
}
.existPath {
  path {
    fill: $misColor;
  }
}
</style>
