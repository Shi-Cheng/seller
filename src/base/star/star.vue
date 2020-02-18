/**
* Auth: PanShiCheng
* Create Time: 2020-02-18
* Description:
*/
<template>
  <div :class="starType" class="star">
    <span v-for="(itemClass,index) in itemClasses" :key="index" :class="itemClass" class="star-item"/>
  </div>
</template>

<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

export default {
  name: 'Star',
  props: {
    size: {
      type: Number,
      default: 0
    },
    score: {
      type: Number,
      default: 0
    }
  },
  computed: {
    starType() {
      return 'star-' + this.size
    },
    itemClasses() {
      const result = []
      const score = Math.floor((this.score * 2)) / 2
      const hasDecimal = score % 1 !== 0
      const integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .star{
    font-size: 0
    .star-item{
      display: inline-block
      background-repeat: no-repeat
    }
    &.star-48{
      .star-item{
        width: 20px
        height 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child{
          margin-right: 0
        }
        &.on{
          bg-image('../../assets/images/star/star48_on')
        }
        &.half{
          bg-image('../../assets/images/star/star48_half')
        }
        &.off{
          bg-image('../../assets/images/star/star48_off')
        }
      }
    }
    &.star-36{
      .star-item{
        width: 15px
        height 15px
        margin-right: 6px
        background-size: 15px 15px
        &:last-child{
          margin-right: 0
        }
        &.on{
          bg-image('../../assets/images/star/star36_on')
        }
        &.half{
          bg-image('../../assets/images/star/star36_half')
        }
        &.off{
          bg-image('../../assets/images/star/star36_off')
        }
      }
    }
    &.star-24{
      .star-item{
        width: 10px
        height 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child{
          margin-right: 0
        }
        &.on{
          bg-image('../../assets/images/star/star24_on')
        }
        &.half{
          bg-image('../../assets/images/star/star24_half')
        }
        &.off{
          bg-image('../../assets/images/star/star24_off')
        }
      }
    }
  }
</style>
