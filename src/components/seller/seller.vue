/*
* Auth: PanShiCheng
* Create Time: 2020-02-17
* Description:
*/
<template>
  <div class="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{ seller.name }}</h1>
        <div class="desc">
          12
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{ seller.minPrice }}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{ seller.deliveryPrice }}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{ seller.deliveryTime }}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click.stop.prevent="toggleFavorite">
          <span :class="getFavoriteIcon(seller)" class="icon-favorite" />
        </div>
      </div>
      <split />
    </div>
  </div>
</template>

<script>
import Split from '../split/split'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Seller',
  components: { Split },
  props: {
    seller: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      favorite: this.favoriteList
    }
  },
  computed: {
    ...mapGetters([
      'favoriteList'
    ])
  },
  methods: {
    toggleFavorite() {
      this.favorite = !this.favorite
      if (this.favorite) {
        this.saveFavoriteList(this.seller)
      } else {
        this.deleteFavoriteList(this.seller)
      }
    },
    getFavoriteIcon(item) {
      if (this.isFavorite(item)) {
        return 'active'
      } else {
        return ''
      }
    },
    isFavorite(seller) {
      let index
      if (this.favoriteList.length) {
        index = this.favoriteList.findIndex((item) => {
          if (item && seller) {
            return item.name === seller.name
          }
        })
      }
      return index > -1
    },
    ...mapActions([
      'saveFavoriteList',
      'deleteFavoriteList'
    ])
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixin.styl"
.seller{
  position: absolute
  top: 174px
  bottom: 0
  left: 0
  width: 100%
  overflow: hidden
  .overview{
    position: relative
    padding: 18px
    .title{
      margin-bottom: 8px
      line-height: 14px
      color: rgb(7, 17, 27)
      font-size: 14px
    }
    .desc{
      padding-bottom: 18px
      font-size: 10px
      color: rgb(77, 85, 93)
      border-1px(rgba(7, 17, 27, 0.1))
    }
    .remark{
      display: flex
      padding-top: 18px
      .block{
        flex: 1
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        &:last-child{
          border: none
        }
      }
    }
    .favorite{
      position: absolute
      width: 50px
      right: 11px
      top: 18px
      text-align: center
      .icon-favorite{
        display: block
        margin-bottom: 4px
        line-height: 24px
        font-size: 24px
        color: #d4d6d9
        &.active {
          color: rgb(240, 20, 20)
        }
      }
      .text{
        line-height: 10px
        font-size: 10px
        color: rgb(77, 85, 93)
      }
    }
  }
}
</style>
