/*
* Auth: PanShiCheng
* Create Time: 2020-02-18
* Description:
*/
<template>
  <div class="alarm-list">
    <div class="select-group"/>
    <div class="list-scroll-wrap">
      <cube-scroll
        ref="alarmlistscroll"
        :data="items"
        :options="options"
        :scroll-events="['scroll']"
        @scroll="onScrollHandle"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp">
        <ul>
          <li v-for="(item,index) in items" :key="index" class="item">
            {{ item }}
          </li>
        </ul>
        <!--  下拉刷新  需要加上:cube-pulldown-wrapper  定位下拉盒子内容在content顶部 :style="pullDownStyle" -->
        <template slot="pulldown" slot-scope="props">
          <div v-if="props.pullDownRefresh" :style="pullDownStyle" class="cube-pulldown-wrapper">
            <!--  自定义下拉刷新的内容   -->
            <div class="pulldown-content">
              <span v-if="props.beforePullDown">下拉刷新...</span>
              <div v-else>
                <span v-if="props.isPullingDown">正在更新...</span>
                <span v-else>更新成功</span>
              </div>
            </div>
          </div>
        </template>
        <template slot="pullup" slot-scope="props">
          <div v-if="props.pullUpLoad" class="cube-pullup-wrapper" style="height: 0.8rem">
            <p v-if="props.isPullUpLoad">  加载中.....</p>
          </div>
        </template>
      </cube-scroll>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      /* options 参数配置参考better-scroll 的官网*/
      options: {
        pullDownRefresh: {
          threshold: 40,
          stop: 50
        },
        pullUpLoad: {
          threshold: 100
        }
      },
      pullDownY: 0,
      pullDownStyle: ''
    }
  },
  computed: {
    /* 自定义下拉到一定高度你想展示的内容 */
    // pullDownTip() {
    //     if (this.pullDownY <= 60) {
    //         return '下拉刷新...'
    //     } else if (this.pullDownY <= 90) {
    //         return '继续下拉有惊喜...'
    //     } else {
    //         return '松手得惊喜！'
    //     }
    // },
  },
  methods: {
    /* 根据滚动事件 计算下拉刷新的位置，当自定的下拉刷新动画盒子定位在盒子顶部 */
    onScrollHandle(pos) {
      // console.log(pos)
      this.pullDownY = pos.y
      if (pos.y > 0) {
        this.pullDownStyle = `top:${pos.y - 30}px`
      }
    },
    /*  下拉刷新完成 ： this.$refs['alarm-list-scroll'].forceUpdate() 强制执行下拉盒子的高度 */
    onPullingDown() {
      setTimeout(() => {
        this.$refs['alarmlistscroll'].forceUpdate()
      }, 1000)
    },
    /* 上拉加载  */
    onPullingUp() {
      setTimeout(() => {
        for (let i = 0; i < 3; i++) {
          this.items.push(i + '=')
        }
        this.$refs['alarmlistscroll'].forceUpdate()
      }, 3000)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .alarm-list {
    height: 100vh;
  }

  .select-group {
    height: 1.5rem;
  }

  .list-scroll-wrap {
    height: calc(100vh - 1.5rem);
    background: lavender;

    .item {
      height: 1.8rem;
      background: lightblue;
      margin: 0.3rem;

      &:nth-child(1) {
        margin-top: 0;
      }
    }
  }

</style>
