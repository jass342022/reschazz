<template>
  <li class="Studio is-large Studios__listItem" :class="className">
    <button class="Studios__listItemHeader Button">
      <div class="Studios__listItemTitle" v-html="data.title" @click="onClickTitle"></div>
      <div class="Studios__listItemToggle" @click="onClickToggle"></div>
    </button>
    <div class="Studios__listItemData">
      <div class="Studios__listItemDataAddress" v-html="data.address"></div>
      <a href="email" class="Studios__listItemDataEmail" target="_blank" v-html="data.email"></a>        
     
    </div>

  </li>
</template>

<script>
export default {
  props: ['data'],
  
  data (){ 
    return {
    linkLinkedin: "https://www.linkedin.com/company/chazz",
    }
  },
  computed: {
    image () {
      return `images/${this.data.cover}`
    },
    email () {
      return `mailto:${this.data.email}`
    },
    className () {
      let classes = [this.data.selected ? 'is-selected' : null]

      if (this.data.selected) {
        classes.push('is-selected')
      }

      if (this.data.open) {
        classes.push('is-open')
      }

      return classes.join(' ')
    }
  },
  methods: {
    onSeeTeamClick () {
      this.location.href('https://www.linkedin.com/company/chazz/')
    //  this.$emit('show', this.data.index)
    },
    onClickTitle () {
      this.$emit('select', this.data.index)
    },
    onClickToggle () {
      if (this.data.selected) {
        this.data.open = !this.data.open
      }
    }
  }
}
</script>
