<template>
  <div ref="wrapper" class="list-wrapper">
    <div class="scroll-content">
      <div ref="listWrapper">
        <slot name="list">
          <ul class="list-content">
            <li  class="list-item" v-for="item in data">{{item}}</li>
          </ul>
        </slot>
      </div>
      <slot name="pullup"
            :pullUpLoad="pullUpLoad"
            :isPullUpLoad="isPullUpLoad"
      >
        <div class="pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger" v-if="!isPullUpLoad">
            <span>{{pullUpTxt}}</span>
          </div>
          <div class="after-trigger" v-else>
            <loading></loading>
          </div>
        </div>
      </slot>
    </div>
    <slot name="pulldown"
          :pullDownRefresh="pullDownRefresh"
          :pullDownStyle="pullDownStyle"
          :beforePullDown="beforePullDown"
          :isPullingDown="isPullingDown"
          :bubbleY="bubbleY"
    >
      <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          <bubble :y="bubbleY"></bubble>
        </div>
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="loading">
            <loading></loading>
          </div>
          <div v-else><span>刷新成功</span></div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import Loading from '../libs/loading/loading.vue'
  import Bubble from '../libs/bubble.vue'
  //import { getRect } from '../utils/dom'


	const  getRect = (el) => {
  if (el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}

  const COMPONENT_NAME = 'scroll'
  const DIRECTION_H = 'horizontal'
  const DIRECTION_V = 'vertical'

  export default {
    name: COMPONENT_NAME,
    props: {
      data: {
        type: Array,
        default: function () {
          return []
        }
      },
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      listenBeforeScroll: {
        type: Boolean,
        default: false
      },
      direction: {
        type: String,
        default: DIRECTION_V
      },
      scrollbar: {
        type: null,
        default: false
      },
      pullDownRefresh: {
        type: null,
        default: false
      },
      pullUpLoad: {
        type: null,
        default: false
      },
      startY: {
        type: Number,
        default: 0
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      freeScroll: {
        type: Boolean,
        default: false
      },
      mouseWheel: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        beforePullDown: true,
        isRebounding: false,
        isPullingDown: false,
        isPullUpLoad: false,
        pullUpDirty: true,
        pullDownStyle: '',
        bubbleY: 0
      }
    },
    computed: {
      pullUpTxt() {
        const moreTxt = this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more || this.$i18n.t('scrollComponent.defaultLoadTxtMore')

        const noMoreTxt = this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.noMore || this.$i18n.t('scrollComponent.defaultLoadTxtNoMore')

        return this.pullUpDirty ? this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more : this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.noMore
        //return this.pullUpDirty ? moreTxt : noMoreTxt
      },
      refreshTxt() {
        return this.pullDownRefresh && this.pullDownRefresh.txt || this.$i18n.t('scrollComponent.defaultRefreshTxt')
      }
    },
    created() {
// 下拉自定义元素 定位
      this.pullDownInitTop = -50
    
    },
    mounted() {
    	
// 异步初始化

      setTimeout(() => {
        this.initScroll()
      }, 20)
    },
    methods: {
      initScroll() {
      	
// 判断是否有容器
        if (!this.$refs.wrapper) {
          return
        }
        
// 设置最小高度
        if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
        	
        	//console.log(`111111111${getRect(this.$refs.wrapper).height + 1}px`)
          this.$refs.listWrapper.style.minHeight = `${getRect(this.$refs.wrapper).height + 1}px`
        }
//  参数
        let options = {
          probeType: this.probeType,
          click: this.click,
          scrollY: this.freeScroll || this.direction === DIRECTION_V,
          scrollX: this.freeScroll || this.direction === DIRECTION_H,
          scrollbar: {fade:false}||this.scrollbar,
          pullDownRefresh:  {stop:50,threshold:90}||this.pullDownRefresh,
          pullUpLoad: this.pullUpLoad,
          startY: this.startY,
          freeScroll:  this.freeScroll,
          mouseWheel: this.mouseWheel
        }

//  初始化 BScroll

        this.scroll = new BScroll(this.$refs.wrapper, options)

// 监听scroll

        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scrolls', pos)
          })
        }
// 监听scroll 滚动开始
        if (this.listenBeforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
          	
            this.$emit('beforeScrollStart')
          })
        }

//下拉刷新
        if (this.pullDownRefresh) {
          this._initPullDownRefresh()
        }
//上拉加载
        if (this.pullUpLoad) {
          this._initPullUpLoad()
        }
      },
     
//销毁 
      destroy() {
        this.scroll.destroy()
      },
// dom 更新刷新插件
    	refresh() {
        this.scroll && this.scroll.refresh()
      },
      
// 父组件没数据时调用
      forceUpdate(dirty) {
        if (this.pullDownRefresh && this.isPullingDown) {  //下拉刷新启动 并且 loading 为显示
         		 this.isPullingDown = false   //隐藏 loading图
          		
         		let pms = new Promise((resolve) => {
		          setTimeout(() => {
		          this.isRebounding = true
							this.scroll.finishPullDown()

		            resolve()
		          }, 600)
		        })
            
            pms.then(()=>{
            		setTimeout(()=>{
				          this.isRebounding = false
		         			this.pullDownStyle = `top:${this.pullDownInitTop}px`
				          this.beforePullDown = true
				          this.refresh()
			          	
			          }, this.scroll.options.bounceTime)
            })
        	 	/*setTimeout(()=>{
        	 		this.isRebounding = true
							this.scroll.finishPullDown()
		         	this.pullDownStyle = `top:${this.pullDownInitTop}px`
		         
		          
	          },600)
	         	setTimeout(()=>{
	         			this.beforePullDown = true
		          	this.isRebounding = false
			         	this.pullDownStyle = `top:${this.pullDownInitTop}px`
		          	this.refresh()
		          	console.log(2)
		         },1000)*/
        } else if (this.pullUpLoad && this.isPullUpLoad) {

          this.isPullUpLoad = false
          this.scroll.finishPullUp()
          this.pullUpDirty = dirty
          this.refresh()
        } else {
          this.refresh()
        }
      },
      // 下拉刷新要执行的方法
      _initPullDownRefresh() {
        this.scroll.on('pullingDown', () => {
          this.beforePullDown = false // 隐藏 canvas 图
          this.isPullingDown = true // 显示 loading 图
          this.$emit('pullingDown') // 触发 父组件的函数
        })

        this.scroll.on('scroll', (pos) => {
          if (this.beforePullDown) {  //显示canvas 动画
            this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop) //设置 canvas 需要的参数
            this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`   // 设置canva 父元素 距离顶部的距离  最大值为10
          } else {  //隐藏canvas 动画 时 将参数设置为0
            this.bubbleY = 0
          }

          if (this.isRebounding) {
          	//console.log(`top:${10 - (this.pullDownRefresh.stop - pos.y)}px`)
          	
            this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`
          }
        })
      },
      _initPullUpLoad() {
        this.scroll.on('pullingUp', () => {
          this.isPullUpLoad = true  //上拉显示 loading
          this.$emit('pullingUp')   // $emit 触发父组件函数
        })
      },
     /* _reboundPullDown() {
        const {stopTime = 600} = this.pullDownRefresh
        console.log(this.pullDownRefresh)
        return new Promise((resolve) => {
          setTimeout(() => {
            this.isRebounding = true
            this.scroll.finishPullDown()
            resolve()
          }, stopTime)
        })
      },
      _afterPullDown() {
        setTimeout(() => {
          this.pullDownStyle = `top:${this.pullDownInitTop}px`
          this.beforePullDown = true
          this.isRebounding = false
          this.refresh()
        }, this.scroll.options.bounceTime)
      }*/
    },
    watch: {
      data() {
        setTimeout(() => {
          this.forceUpdate(true)
        }, this.refreshDelay)
      }
    },
    components: {
      Loading,
      Bubble
    }
  }

</script>

<style lang="less" >
  .list-wrapper{
    position: relative;
   height: 100%;
    /*position: absolute*/
    /*left: 0*/
    /*top: 0*/
    /*right: 0*/
    /*bottom: 0*/
    overflow: hidden;
    .scroll-content{
      position: relative;
      z-index: 1;
      }
    .list-content{
      position: relative;
      z-index: 10;
      background: #fff;
      .list-item{
        height: 60px;
        line-height: 60px;
        font-size: 18px;

        border-bottom: 1px solid #e5e5e5;
			}
		}
	}
  .pulldown-wrapper{
    position: absolute;
    width: 100%;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all;
    .after-trigger{
      margin-top: 10px;
    }
  }

  .pullup-wrapper{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    }
</style>
