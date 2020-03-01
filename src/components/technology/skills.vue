/**
* Auth: PanShiCheng
* Create Time: 2020-03-01
* Description:
*/
<template>
  <div>
    <div class="skills">
      <div ref="skilltype" class="skill-wrapper">
        <ul>
          <li v-for="(item, index) in goods" :key="index" class="type-item" @click="selectType(index, $event)">
            <span class="text border-1px">
              <span v-show="item.type > 0" :class="classMap[item.type]" class="icon"/>
              {{ item.name }}
            </span>
          </li>
        </ul>
      </div>
      <div ref="typewrapper" class="type-wrapper">
        <ul>
          <li v-for="(item, index) in goods" :key="index" class="type-list">
            <h1 class="title"> {{ item.name }}</h1>
            <ul>
              <li v-for="(type, t) in item.foods" :key="t" class="type-item">
                <div class="icon">
                  <img :src="type.icon" width="57" height="57">
                </div>
                <div class="content">
                  <h2 class="name"> {{ type.name }}</h2>
                  <p class="desc"> {{ type.description }}</p>
                  <div class="extra">
                    <span>月售 {{ type.sellCount }} 份</span>
                    <span>好评率 {{ type.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now"> ￥ {{ type.price }}</span>
                    <span v-show="type.oldPrice" class="old"> ￥{{ type.oldPrice }}</span>
                  </div>
                  <div class="skillcontrol-wrapper">
                    <skillcontrol :food="type" @add="addSkill"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <skill ref="skillcart"/>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { ERR_OK } from '../../api/const'
import Skill from './skill'
import Skillcontrol from './skillcontrol'

export default {
  name: 'Skills',
  components: {
    Skillcontrol,
    Skill,
    BScroll
  },
  props: {
    seller: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      goods: []
    }
  },
  created() {
    this._getInit()
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  },
  methods: {
    addSkill(target) {
      this._drop(target)
    },
    selectType(index, event) {

    },
    _drop(target) {
      this.$nextTick(() => {
        this.$refs.skillcart.drop(target)
      })
    },
    _getScroll() {
      this.skillScroll = new BScroll(this.$refs.skilltype, {
        click: true
      })

      this.typeScroll = new BScroll(this.$refs.typewrapper, {
        click: true,
        probeType: 3
      })
    },
    _getInit() {
      this.$http.get('/api/goods').then((res) => {
        res = res.body
        if (res.code === ERR_OK) {
          this.goods = res.data
          this.$nextTick(() => {
            this._getScroll()
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .skills{
    display: flex
    position: absolute
    overflow: hidden
    top: 174px
    bottom: 46px
    width: 100%
    .skill-wrapper{
      flex: 0 0 80px
      background: #f3f5f7
      .type-item{
        display: table
        width: 56px
        height: 54px
        line-height: 14px
        padding: 0 12px
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
          // 所有的表格元素将会自动在自身周围生成所需的匿名table对象，使其符合table/inline-table、table-row、table- cell的三层嵌套关系。
          display: table-cell
          font-size: 12px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
        }
      }
    }
    .type-wrapper{
      flex: 1
      .type-list{
        .title{
          height: 26px
          padding-left: 14px
          border-left: 2px solid #d9dde1
          line-height: 26px
          color: rgb(147, 153, 79)
          background: #f3f5f7
        }
        .type-item{
          display: flex
          margin: 18px
          padding-bottom: 18px
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child{
            border-none()
            padding-bottom: 0
          }
          .icon{
            flex: 0 0 57px
            img{
              border-radius: 50%
            }
          }
          .content{
            flex: 1
            margin-left: 10px
            .name{
              padding: 2px 0 8px 0
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
            .extra {
              margin: 8px 0 8px 0
              height: 10px
              line-height: 10px
              font-size: 10px
              color: rgb(147, 153, 149)
              span:last-child {
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
            .skillcontrol-wrapper{
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
