<template>
  <div class="scroll-view" style="padding:10px;" >
    <div class="scroll-list-wrap" slot="demo" style="height: 26rem;">
     <scroll ref="scroll"
              :data="items"
              :scrollbar="scrollbarObj"
              :pullDownRefresh="pullDownRefreshObj"
               :pullUpLoad="pullUpLoadObj"
              :startY="parseInt(0)"
              @pullingDown="onPullingDown"
              @pullingUp="onPullingUp"
      >
      </scroll>
      
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../libs/scroll.vue'

  export default {
    data() {
      return {
        items: [1,2,3,4,5,6,7],
        itemIndex: 0,
        scrollbar: true,
        scrollbarFade: true,
      }
    },
    created() {
     
    },
    components: {
      Scroll
    },
   
    computed: {
      scrollbarObj: function () {
        return this.scrollbar ? {fade: this.scrollbarFade} : false
      },
      pullDownRefreshObj: function () {
        return  {
          threshold: parseInt(90),
          stop: parseInt(50)
        } 
      },
      pullUpLoadObj: function () {
        return  {
          threshold: parseInt(0),
          txt: {more: '更多', noMore: '这已近是底线了'}
        } 
      }
    },
    methods: {
      onPullingDown() {
        // 模拟更新数据
        console.log('pulling down and load data')
        setTimeout(() => {
          if (this._isDestroyed) {
            return
          }
          if (!Math.random() > 10.5) {
            // 如果有新数据
            this.items.unshift(123123+ '===' + +new Date())
          } else {
            // 如果没有新数据
            this.items = [1,2,3,4,5,6,7];
            //this.$refs.scroll.forceUpdate()
          }

        }, 2000)
      },
      onPullingUp() {
        // 更新数据
        console.log('pulling up and load data')
        if(this.itemIndex>=3){
          	this.$refs.scroll.forceUpdate()
          	return
          }
        setTimeout(() => {
          if (this._isDestroyed) {
            return
          }
          
          
          if (Math.random() > 0) {
            // 如果有新数据
            let newPage = []
            for (let i = 0; i < 10; i++) {
              newPage.push('normalScrollListPage.previousTxt' +this.itemIndex )
            }
			
			this.itemIndex++
			
            this.items = this.items.concat(newPage)
          } else {
            // 如果没有新数据
            this.$refs.scroll.forceUpdate()
          }
        }, 1500)
      },
     
      rebuildScroll() {
        Vue.nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      }
    }
  }
</script>

<style lang="less" scoped>
	.wrapper{
		min-height: 82vh;
		position: relative;
		overflow: hidden;
	}
	.scroll-list-wrap{
		    position: relative;
		    height: 200px;
		    border: 1px solid rgba(0,0,0,.1);
		    border-radius: .3rem;
		    -webkit-transform: rotate(0deg);
		    transform: rotate(0deg);
		    overflow: hidden;
	}
	

</style>