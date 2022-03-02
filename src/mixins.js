import config from '@/config'

const MARGIN_TOP = 200

export default {
  data () {
    return {
      MARGIN_TOP,
      browserWidth: 0
    }
  },
  computed: {
    isMobile () {
      this.browserWidth = document.body.getBoundingClientRect().width
      return this.browserWidth <= +config.STEPS.mobile
    }
  }
}
