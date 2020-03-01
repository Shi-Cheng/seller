/*
* Auth: PanShiCheng
* Create Time: 2020-02-17
* Description: main entrance file
*/
<template>
  <div>
    <v-header :seller="seller"/>
    <div class="tab border-1px">
      <router-link tag="div" class="tab-item" to="/goods">
        <span class="tab-link">商品</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/rating">
        <span class="tab-link">评论</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/seller">
        <span class="tab-link">商家</span>
      </router-link>
      <!--<router-link tag="div" class="tab-item" to="/skills">-->
      <!--<span class="tab-link">期待</span>-->
      <!--</router-link>-->
    </div>
    <div class="content">
      <keep-alive>
        <router-view :seller="seller"/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Header from 'components/header/header'
import { ERR_OK } from './api/const'
import { urlParse } from './common/js/util'
export default {
  name: 'App',
  components: {
    'v-header': Header
  },
  data() {
    return {
      seller: {
        id: (() => {
          const queryParam = urlParse()
          return queryParam.id
        })()
      }
    }
  },
  created() {
    this._getSeller()
  },
  methods: {
    _getSeller() {
      this.$http.get('/api/seller?id' + this.seller.id).then((response) => {
        response = response.body
        if (response.code === ERR_OK) {
          // Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象
          // 语法   Object.assign(target, ...sources)
          // 推荐给这种给对象复制
          this.seller = Object.assign({}, this.seller, response.data)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "./common/stylus/mixin.styl"

.tab{
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-1px(rgba(7, 17, 27, 0.1))
  .tab-item {
    flex: 1;
    text-align: center;
    .tab-link{
      display: block;
      font-size: 14px;
      color: reb(77, 85, 93)
    }
    &.active .tab-link{
      color: rgb(240, 20, 20)
    }
  }
}
</style>
