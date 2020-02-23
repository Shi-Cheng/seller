/**
* Auth: PanShiCheng
* Create Time: 2020-02-18
* Description: 练习采用better-scroll组件实现左右联动
*/
<template>
  <div>
    <div class="goods">
      <div ref="menuwrapper" class="menu-wrapper">
        <ul>
          <li v-for="(item, index) in goods" :key="index" :class="{'current':currentIndex===index}" class="menu-item" @click="selectMenu(index,$event)">
            <span class="text border-1px">
              <span v-show="item.type > 0" :class="classMap[item.type]" class="icon"/>
              {{ item.name }}
            </span>
          </li>
        </ul>
      </div>
      <div ref="foodswrapper" class="foods-wrapper">
        <ul>
          <li v-for="(item, index) in goods" ref="foodlist" :key="index" class="food-list">
            <h1 class="title">{{ item.name }}</h1>
            <ul>
              <li v-for="(food, foodIndex) in item.foods" :key="foodIndex" class="food-item border-1px" @click="selectFood(food,$event)">
                <div class="icon">
                  <img :src="food.icon" width="57" height="57">
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc"> {{ food.description }}</p>
                  <div class="extra">
                    <span>月售 {{ food.sellCount }} 份</span>
                    <span>好评率 {{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now"> ￥ {{ food.price }}</span>
                    <span v-show="food.oldPrice" class="old"> ￥{{ food.oldPrice }}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food" @add="addFood"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart ref="shopcart" :select-foods="selectFoods" :min-price="minPrice" :delivery-price="deliveryPrice"/>
    </div>
    <food ref="food" :food="selectedFood" @add="addFood"/>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import Shopcart from 'components/shopcart/shopcart'
import { ERR_OK } from '../../api/const'
import Cartcontrol from '../cartcontrol/cartcontrol'
import Food from 'components/food/food'

const deliveryPrice = 20
const minPrice = 20

export default {
  name: 'Goods',
  components: {
    Cartcontrol,
    Shopcart,
    Food
  },
  props: {
    seller: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      minPrice: minPrice,
      deliveryPrice: deliveryPrice,
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  computed: {
    currentIndex() {
      // 监听this.scrollY 的变化
      for (let i = 0; i < this.listHeight.length; i++) {
        const hight1 = this.listHeight[i]
        const hight2 = this.listHeight[i + 1]
        if (!hight2 || (this.scrollY > hight1 && this.scrollY < hight2)) {
          this._followScroll(i)
          return i
        }
      }
      return 0
    },
    selectFoods() {
      // selectFoods 是观察goods的数据变化，this.goods发生变化， selectFoods会被执行
      // cartcontrol -> base-goods -> shopcart 传递
      const foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    this._getGoods()
  },
  methods: {
    selectFood(item, event) {
      if (!event._constructed) {
        return
      }
      this.selectedFood = item
      this.$refs.food.show()
    },
    addFood(target) {
      this._drop(target)
    },
    selectMenu(index, event) {
      if (!event._constructed) {
        return
      }
      const foodList = this.$refs.foodlist
      const el = foodList[index]
      this.foodsScroll.scrollToElement(el, 300)
    },
    _drop(target) {
      // 体验优化,异步执行下落动画
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target)
      })
    },
    _followScroll(index) {
      const menuList = this.$refs.menuwrapper
      const el = menuList[index]
      this.menuScroll.scrollToElement(el, 300)
    },
    _initScroll() {
      this.menuScroll = new Bscroll(this.$refs.menuwrapper, {
        click: true
      })
      this.foodsScroll = new Bscroll(this.$refs.foodswrapper, {
        click: true,
        probeType: 3
      })

      // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
      this.foodsScroll.on('scroll', (pos) => {
        if (pos.y <= 0) {
          this.scrollY = Math.abs(Math.round(pos.y))
        }
      })
    },
    _calculateHeight() {
      // 计算每个区域的整体高度
      const foodlist = this.$refs.foodlist
      let hight = 0
      this.listHeight.push(hight)
      for (let i = 0; i < foodlist.length; i++) {
        const item = foodlist[i]
        hight += item.clientHeight
        this.listHeight.push(hight)
      }
    },
    _getGoods() {
      this.$http.get('/api/goods').then((res) => {
        res = res.body
        if (res.code === ERR_OK) {
          this.goods = res.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .goods{
    display: flex
    position: absolute
    overflow: hidden
    top: 174px
    bottom: 46px
    width: 100%
    .menu-wrapper{
      flex: 0 0 80px
      background: #f3f5f7
      .menu-item{
        display: table
        width: 56px
        height: 54px
        line-height: 14px
        padding: 0 12px
        &.current{
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text {
            border-none()
          }
        }
        .icon{
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease{
            bg-image('decrease_3')
          }
          &.discount{
            bg-image('discount_3')
          }
          &.guarantee{
            bg-image('guarantee_3')
          }
          &.invoice{
            bg-image('invoice_3')
          }
          &.special{
            bg-image('special_3')
          }
        }
        .text{
          display: table-cell
          width: 56px
          vertical-align: middle
          font-size: 12px
          border-1px(rgba(7, 17, 27, 0.1))
        }
      }
    }
    .foods-wrapper{
      flex: 1
      .food-list{
        .title{
          padding-left: 14px;
          height: 26px
          line-height: 26px
          border-left: 2px solid #d9dde1
          background-color: #f3f5f7
          color: rgb(147, 153, 79)
        }
        .food-item{
          display: flex
          margin: 18px
          padding-bottom: 18px
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child{
            border-none()
            margin-bottom: 0
          }
          .icon{
            flex: 0 0 57px
            margin-right: 10px
          }
          .content{
            flex: 1
            .name{
              margin: 2px 0 8px 0
              height: 14px
              line-height: 14px
              font-size: 14px
              color: rgb(7, 17, 27)
            }
            .desc{
              margin-bottom: 8px
              height: 10px
              line-height: 10px
              font-size: 10px
              color: rgb(147, 153, 149)
            }
            .extra{
              margin: 8px 0 8px 0
              height: 10px
              line-height: 10px
              font-size: 10px
              color: rgb(147, 153, 149)
              span:last-child{
                margin-left: 12px
              }
            }
            .price{
              font-weight: 24px
              .now{
                margin-left: 8px
                font-size: 14px
                height: 24px
                line-height: 24px
                color: rgb(240, 20, 20)
              }
              .old{
                text-decoration: line-through
                font-size: 10px
                height: 24px
                line-height: 24px
                color: rgb(147, 153, 159)
              }
            }
            .cartcontrol-wrapper{
              position: absolute
              right: 0
              bottom: 12px
            }
          }
        }
      }
    }
  }
</style>
