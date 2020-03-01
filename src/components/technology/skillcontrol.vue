/**
* Auth: PanShiCheng
* Create Time: 2020-03-01
* Description:
*/
<template>
  <div class="skillcontrol">
    <transition name="decrease">
      <div v-show="food.count>0" class="cart-decrease" @click.stop.prevent="decreaseCart">
        <span class="inner icon-remove_circle_outline"/>
      </div>
    </transition>
    <div v-show="food.count>0" class="cart-count">{{ food.count }}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"/>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'Skillcontrol',
  props: {
    food: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    addCart(event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('add', event.target)
    },
    decreaseCart(event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.skillcontrol{
  font-size: 0
  .cart-decrease{
    display: inline-block
    padding: 6px
    opacity: 1
    transform: translate3d(0, 0, 0)
    .inner{
      display: inline-block
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
      transition: all 0.4s linear
      transform: rotate(0)
    }
    &.decrease-enter-active, &.decrease-leave-active{
      transition: all 0.4s linear
    }
    &.decrease-active, &.decrease-leave-to{
      opacity: 0;
      transform: translate3d(24px, 0, 0)
      .inner {
        transform: rotate(180deg)
      }
    }
  }
  .cart-count{
    display: inline-block
    vertical-align: top
    font-size: 10px
    line-height: 24px
    padding-top: 6px
    width: 12px
    text-align: center
    color: rgb(147, 153, 159)
  }
  .cart-add{
    display: inline-block
    font-size: 24px
    line-height: 24px
    padding: 6px
    color: rgb(0, 160, 220)
  }
}
</style>
