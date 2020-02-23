/**
* Auth: PanShiCheng
* Create Time: 2020-02-22
* Description:
*/
<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span :class="{'active': selectType === 2 }" class="block all" @click="select(2,$event)" >{{ desc.all }}<span class="count">{{ ratings.length }}</span></span>
      <span :class="{'active': selectType === 0 }" class="block positive" @click="select(0,$event)" >{{ desc.positive }}<span class="count">{{ positive.length }}</span></span>
      <span :class="{'active': selectType === 1 }" class="block negative" @click="select(1,$event)" >{{ desc.negative }}<span class="count">{{ negative.length }}</span></span>
      <div :class="{'on': onlyContent }" class="switch" @click="toggleContent">
        <span class="icon-check_circle"/>
        <span class="text">只看有内容的评价</span>
      </div>
    </div>
</div></template>

<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
  name: 'Ratingselect',
  props: {
    ratings: {
      type: Array,
      default: () => []
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: true
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '积极',
          negative: '不满意'
        }
      }
    }
  },
  computed: {
    positive() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },
    negative() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  },
  methods: {
    toggleContent(event) {
      if (!event._constructed) {
        return
      }
      this.$emit('content')
    },
    select(type, event) {
      if (!event._constructed) {
        return
      }
      this.$emit('select', type)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
.ratingselect{
  .rating-type{
    padding: 18px 0
    margin: 0 18px
    border-1px(rgba(7, 17, 27, 0.1))
    font-size: 0
    .block{
      display: inline-block
      padding: 8px 12px
      margin-right: 8px
      line-height: 16px
      border-radius: 1px
      font-size: 12px
      color: rgb(77, 85, 93)
      .count{
        margin-left: 2px
        font-size: 8px
      }
      &.active{
        color: #fff
      }
      &.all{
        background: rgba(0, 160, 220, 0.2)
        &.active{
          background: rgb(0, 160, 220)
        }
      }
      &.positive{
        background: rgba(0, 160, 220, 0.2)
        &.active{
          background: rgb(0, 160, 220)
        }
      }
      &.negative{
        background: rgba(77, 85, 93, 0.2)
        &.active {
          background: rgb(77, 85, 93)
        }
      }
    }
  }
  .switch{
    padding: 12px 18px
    line-height: 24px
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    color: rgb(147, 153, 159)
    font-size: 0px
    &.on{
      .icon-check_circle{
        color: #00c850
      }
    }
    .icon-check_circle{
      vertical-align: top
      margin-right: 4px
      font-size: 24px
    }
    .text{
      display: inline-block
      vertical-align: top
      font-size: 12px
    }
  }
}
</style>
