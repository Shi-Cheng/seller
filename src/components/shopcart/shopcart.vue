/**
* Auth: PanShiCheng
* Create Time: 2020-02-20
* Description:
*/
<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleList">
          <div class="logo-wrapper">
            <div class="logo" >
              <i :class="{'hightlight': totalCount > 0}" class="icon-shopping_cart"/>
            </div>
            <div v-show="totalCount > 0" class="num">{{ totalCount }}</div>
          </div>
          <div v-show="totalPrice > 0" :class="{'highlight':totalPrice > 0}" class="price">￥{{ totalPrice }}</div>
          <div class="desc" >另需配送费￥{{ deliveryPrice }}元</div>
        </div>
        <div class="content-right">
          <div :class="payClass" class="pay">
            {{ payDesc }}
          </div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="(ball, index) in balls" :key="index">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div v-show="ball.show" class="ball">
              <div class="inner inner-hook"/>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div v-show="listShow" class="shopcart-list">
          <div class="header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div ref="listcontent" class="list-content">
            <ul>
              <li v-for="(food, index) in selectFoods" :key="index" class="food">
                <span class="name">{{ food.name }}</span>
                <div class="price">
                  <span>￥{{ food.price * food.count }}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" @add="addFood"/>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="hide">
      <div v-show="listShow" class="listmask" @click.stop.prevent="hideList"/>
    </transition>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Cartcontrol from '../cartcontrol/cartcontrol'
export default {
  name: 'Shopcart',
  components: {
    BScroll,
    Cartcontrol
  },
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [{
          price: 20,
          count: 1
        }]
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: [{
        show: false
      }, {
        show: false
      }, {
        show: false
      }, {
        show: false
      }, {
        show: false
      }],
      dropBalls: [], // 记录点击的商品el
      fold: true,
      hide: true
    }
  },
  computed: {
    totalPrice() {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount() {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice} 元起送`
      } else if (this.totalPrice < this.minPrice) {
        const diff = this.minPrice - this.totalPrice
        return `还差￥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    },
    listShow() {
      if (!this.totalCount) {
        /* eslint-disable */
        this.fold = true
        return false
      }
      const show = !this.fold
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            /* eslint-disable */
            this.scroll = new BScroll(this.$refs.listcontent, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    }
  },
  methods: {
    toggleList() {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    hideList() {
      this.fold = false
    },
    empty() {
      if (!this.totalCount){
        return
      }
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    addFood(target) {
      this.drop(target)
    },
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        const ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeDrop(el) {
      let count = this.balls.length
      while (count--) {
        const ball = this.balls[count]
        if (ball.show) {
          // 方法返回元素的大小及其相对于视口的位置
          const rect = ball.el.getBoundingClientRect()
          // x 轴偏移
          const x = rect.left - 32
          // y轴偏移
          const y = -(window.innerHeight - rect.top - 22)
          // 设置小球的属性
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)`
          // 设置元素inner-hook的属性
          const inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    dropping(el, done) {
      /* eslint-disable no-unused-vars */
      const rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'
        const inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
        el.addEventListener('transitionend', done)
      })
    },
    afterDrop(el) {
      // 重置
      const ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixin.styl"
.shopcart{
  position: fixed
  left: 0
  bottom: 0
  z-index: 50
  width: 100%
  height: 48px
  .content{
    display: flex
    font-size: 0
    color: rgba(255, 255, 255, 0.4)
    background: #141d27
    .content-left {
      flex: 1
      .logo-wrapper {
        display: inline-block
        vertical-align: top
        position: relative
        top: -10px
        margin: 0 12px
        padding: 6px
        width: 56px
        height: 56px
        box-sizing: border-box
        border-radius: 50%
        background: #141d27
        .logo {
          width: 100%
          height: 100%
          border-radius: 50%
          text-align: center
          background: #2b343c
          &.hightlight{
            background: rgb(0, 160, 220)
          }
          .icon-shopping_cart {
            line-height: 44px
            font-size: 24px
            color: #80858a
          }
        }
        .num{
          position: absolute
          top: 0
          right: 0
          width: 24px
          height: 16px
          line-height: 16px
          text-align: center
          border-radius: 16px
          font-size: 9px
          font-weight: 700
          color: #fff
          background: rgb(240, 20, 20)
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        }
      }
      .price{
        display: inline-block
        vertical-align: top
        margin-top: 12px
        line-height: 24px
        padding-right: 12px
        box-sizing: border-box
        border-right: 1px solid rgba(255, 255, 255, 0.1)
        font-size: 16px
        font-weight: 700
        &.highlight{
          color: #fff
        }
      }
      .desc{
        display: inline-block
        vertical-align: top
        margin: 12px 0 0 12px
        line-height: 24px
        font-size: 10px
      }
    }
    .content-right{
      flex: 0 0 105px
      width: 105px
      .pay{
        height: 48px
        line-height: 48px
        text-align: center
        font-size: 12px
        font-weight: 700
        &.not-enough{
          background: #2b333b
        }
        &.enough{
          background: #00b43c
          color: #fff
        }
      }
    }
  }
  .ball-container{
    .ball{
      position: fixed
      left: 32px
      bottom: 22px
      z-index: 200
      transition:all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41);
      .inner{
        width: 16px
        height: 16px
        border-radius: 50%
        background: rgb(0, 160, 220)
        transition: all 0.4s linear
      }
    }
  }
  .shopcart-list{
    position: absolute
    left: 0
    top: 0
    z-index: -1
    width: 100%
    transform: translate3d(0, -100%, 0)
    &.fold-enter-active, &.fold-leave-active{
      transition: all 0.5s
    }
    &.fold-enter, &.fold-leave-active{
      transform: translate3d(0,0,0)
    }
    .header{
      height: 40px
      line-height: 40px
      padding: 0 18px
      background: #f3f5f7
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      .title{
        float: left
        font-size; 14px
        color: rgb(7, 17, 27)
      }
      .empty{
        float: right
        font-size: 12px
        color: rgb(0, 160, 220)
      }
    }
    .list-content{
      max-height: 200px
      padding: 0 18px
      overflow: hidden
      background: #fff
      .food{
        position: relative
        padding: 12px 0
        box-size: border-box
        border-1px(rgba(7, 17, 27, 0.1))
        .name{
          line-height: 24px
          height: 14px
          color: rgb(7, 17, 27)
        }
        .price {
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          }
        .cartcontrol-wrapper {
          position: absolute
          right: 0
          bottom: 6px
        }
      }
    }
  }
}
.listmask{
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 40
  backdrop-filter: blur(10px)
  opacity: 1
  background: rgba(7, 17, 27, 0.4)
  &.hide-enter-active, &.hide-leave-active{
    transition: all 0.5s
  }
  &.hide-enter, &.hide-leave-active{
    opacity: 1
    background: rgba(7, 17, 27, 0)
  }
}
</style>
