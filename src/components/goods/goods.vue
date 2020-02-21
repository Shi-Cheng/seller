/**
* Auth: PanShiCheng
* Create Time: 2020-02-18
* Description: 采用cube-ui实现左右联动
*/
<template>
  <div class="goods">
    <div class="scroll-nav-wrapper">
      <cube-scroll-nav
        v-if="goods.length"
        :side= "scrollStatus"
        :data="goods"
        :options="scrollOptions"
      >
        <cube-scroll-nav-panel
          v-for="good in goods"
          :key="good.name"
          :label="good.name"
          :title="good.name">
          <ul>
            <li
              v-for="food in good.foods"
              :key="food.name"
              class="food-item"
            >
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售{{ food.sellCount }}份</span><span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{ food.price }}</span>
                  <span v-show="food.oldPrice" class="old">￥{{ food.oldPrice }}</span>
                </div>
                <div class="cart-control-wrapper"/>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>

      </cube-scroll-nav>
    </div>
  </div>
</template>

<script>
import { ERR_OK } from '../../api/const'

export default {
  name: 'Goods',
  props: {
    seller: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      goods: [],
      scrollStatus: true,
      selectedFood: {},
      scrollOptions: {
        click: false, // 会点击俩次，底层用的是scroll，所以设置click为false
        directionLockThreshold: 0
      }
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    this._getGoods()
  },
  methods: {
    _getGoods() {
      this.$http.get('/api/goods').then((res) => {
        res = res.body
        if (res.code === ERR_OK) {
          this.goods = res.data
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
.goods{
  position: relative
  text-align: left
  width: 100%
  min-height: 480px;
  .scroll-nav-wrapper{
    position: absolute
    width: 100%
    top: 0
    left: 0
    bottom: 48px
    >>> .cube-scroll-nav-bar {
      width: 80px
      white-space: normal
      overflow: hidden
    }
    >>> .cube-scroll-nav-bar-item {
      padding: 0 10px
      display: flex
      align-items: center
      height: 56px
      line-height: 14px
      font-size: 12px
      background: #f3f5f7
    }
    .text{
      flex: 1
      position: relative
    }
    .num {
      position: absolute
      right: -8px
      top: -10px
    }
    .support-ico {
      display: inline-block
      vertical-align: top
      margin-right: 4px
    }
    >>> .cube-scroll-nav-bar-item_active {
      background: #fff
      color: #7e8c8d
    }
    >>> .cube-scroll-nav-panel-title {
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid rgba(7, 17, 27, 0.1)
      font-size: 12px
      color: #7e8c8d
      background: #f3f5f7
    }
    .food-item {
      display: flex
      margin: 18px
      padding-bottom: 18px
      position: relative
      border-1px(rgba(7, 17, 27, 0.1))
      &:last-child {
        border-none()
        margin-bottom: 0
      }
      .icon {
        flex: 0 0 57px
        margin-right: 10px
        img {
          height: auto
        }
      }
      .content {
        flex: 1
        vertical-align: top
        .name {
          margin: 2px 0 8px 0
          height: 14px
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)
        }
        .desc, .extra {
          line-height: 10px
          font-size: 10px
          color: rgb(143, 157, 159, 0.1)
        }
        .desc {
          line-height: 12px
          margin-bottom: 8px
        }
        .extra {
          .count {
            margin-right: 12px
          }
        }
        .price {
          font-weight: 700
          line-height: 24px
          .now {
            margin-right: 8px
            font-size: 14px
            color: red
          }
          .old {
            text-decoration: line-through
            font-size: 10px
            color: rgb(147, 153, 159)
          }
        }
      }
      .cart-control-wrapper {
        position: absolute
        right: 0
        bottom: 12px
      }
    }
    .shop-cart-wrapper {
      position: absolute
      left: 0
      bottom: 0
      z-index: 50
      width: 100%
      height: 48px
    }
  }
}

</style>
