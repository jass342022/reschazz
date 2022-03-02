<template>
  <div class="Blank" @click="onClickBlank" :class="className" :style="style">
    <span class="Blank__word" v-html="word"></span>
    <span class="Blank__cover"></span>
  </div> 
</template>

<script>
const WORDS = [
  'cool',
  'nice',
  'good',
  'fantastic plastic',
  'tiny'
]

import config from '@/config'

export default {
  props: ['id'],
  data () {
    return {
      wordIndex: 0,
      visible: false,
      width: 100,
      words: WORDS
    }
  },
  mounted () {
    let selectedId = localStorage[`${config.KEY}_${this.id}`]

    if (selectedId !== undefined) {
      this.selectWordByIndex(+selectedId)
    }
  },
  computed: {
    style () {
      return `width:${this.width + 60}px;`
    },
    word () {
      return this.words[this.wordIndex]
    },
    className () {
      return this.visible ? 'is-visible' : null
    }
  },
  methods: {
    getWidth(text) {
      var myCanvas = document.createElement('canvas')
      var context = myCanvas.getContext('2d')

      context.font = '5vw Circular'

      var metrics = context.measureText(text)
      return metrics.width
    },
    selectWordByIndex (id) {
      this.wordIndex = id
      this.hide()
      this.width = this.getWidth(this.word)

      localStorage[`${config.KEY}_${this.id}`] = this.wordIndex

      setTimeout(() => {
        this.show()
      }, 200)
    },
    onClickBlank () {
      let id = (this.wordIndex + 1) % this.words.length
      this.selectWordByIndex(id)
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
