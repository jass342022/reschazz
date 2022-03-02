<template>
  <div class="Double">
    <div>
      <Slider id="a" :words="words" /> &
      <Slider id="b" :words="words2" />
    </div>
  </div>
</template>

<script>
import config from '@/config'
import Slider from './Slider'

const SPACE = 70
const TIME_OUT = 100

export default {
  components: {
    Slider
  },
  props: ['id', 'words', 'words2'],
  data () {
    return {
      value: 0,
      wordIndex: 0,
      hover: false,
      visible: false,
      width: 100
    }
  },
  computed: {
    v () {
      return Math.floor(this.value)
    },
    style () {
      return `width:${this.width + SPACE}px;`
    },
    placeholder () {
      return this.words[this.v]
    },
    word () {
      return this.words[this.wordIndex]
    },
    className () {
      let classes = [this.visible ? 'is-visible' : null]

      if (this.hover) {
        classes.push('is-hover')
      }

      return classes.join(' ')
    }
  },
  watch: {
    value () {
      this.hide()
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getMaxWidth()
      //this.loadSaved()
    })
  },
  methods: {
    onEnd () {
      let id = this.v
      this.selectWordByIndex(id)
    },
    loadSaved () {
      let selectedId = localStorage[`${config.KEY}_${this.id}`]

      if (selectedId !== undefined) {
        this.value = +selectedId
        this.selectWordByIndex(+selectedId)
      }
    },
    getMaxWidth () {
      let maxWidth = 0

    this.words.forEach((word) => {
      let width = this.getWidth(word) 
      if (width> maxWidth) {
        maxWidth = width
      }
    })

    this.width = maxWidth

    },
      getWidth(text) {
        var myCanvas = document.createElement('canvas')
        var context = myCanvas.getContext('2d')

        context.font = '5vw Circular'

        var metrics = context.measureText(text)
        return metrics.width + SPACE
      },
      onMouseEnter () {
        this.hover = true
      },
      onMouseLeave () {
        this.hover = false
      },
      onChangeRange () {
        this.hide()

        let id = this.v
        this.selectWordByIndex(id)
      },
      selectWordByIndex (id) {
        //let word = this.words[id]
        //this.width = this.getWidth(word)

        localStorage[`${config.KEY}_${this.id}`] = this.wordIndex

        setTimeout(() => {
          this.show()
          this.wordIndex = id
        }, TIME_OUT)
      },
      hide () {
        this.visible = false
      },
      show () {
        this.visible = true
      }
  }
}
</script>
