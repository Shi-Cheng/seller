/**
* Auth: PanShiCheng
* Create Time: 2020-03-01
* Description:
*/
<template>
  <div>
    <div class="skillcart">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" >
              <i class="icon-shopping_cart"/>
            </div>
          </div>
          <div class="desc" >另需配送费￥12元</div>
        </div>
        <div class="content-right">
          <div class="pay not-enough">
            支付运费
          </div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="(ball, index) in balls" :key="index">
          <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div v-show="ball.show" class="ball">
              <div class="inner inner-hook" />
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Skill',
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: []
    }
  },
  methods: {
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
    beforeEnter(el) {
      let count = this.balls.length
      while (count--) {
        const ball = this.balls[count]
        if (ball.show) {
          const rect = ball.el.getBoundingClientRect()
          const x = rect.left - 32
          const y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
          el.style.transform = `translate3d(0, ${y}px, 0)`
          const inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    enter(el, done) {
      /* eslint-disable no-unused-vars */
      const rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0, 0, 0)'
        el.style.transform = 'translate3d(0, 0, 0)'
        const inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0, 0, 0)'
        inner.style.transform = 'translate3d(0, 0, 0)'
        el.addEventListener('transitionend', done)
      })
    },
    afterEnter(el) {
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
 .skillcart{
   position: fixed
   left: 0
   bottom: 0
   z-index: 50
   width: 100%
   height: 48px
   .content{
     display: flex
     color: rgba(255, 255, 255, 0.4)
     background: #141d27
     .content-left{
       flex: 1
       .logo-wrapper{
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
         .logo{
           width: 100%
           height: 100%
           border-radius: 50%
           text-align: center
           background: #2b343c
           .icon-shopping_cart{
             line-height: 44px
             font-size: 24px
             color: #80858a
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
     }
     .content-right{
       flex: 0 0 0 105px
       width: 105px
       .pay {
         height: 48px
         line-height: 48px
         text-align: center
         font-size: 12px
         font-weight: 700
         &.not-enough{
           background: #2b333b
         }
       }
     }
   }
   .ball-container{
     .ball{
       position: fixed;
       left: 32px
       bottom: 22px
       z-index: 200
       transition: all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
       .inner{
         width: 16px
         height: 16px
         border-radius: 50%
         background: rgb(0, 160, 220)
         transition: all 0.4s linear
       }
     }
   }
 }
</style>
