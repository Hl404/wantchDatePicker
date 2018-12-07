<template>
  <div>
    <!-- echart表格 -->
    <div id="myChart" :style="echartStyle"></div>
  </div>
</template>
 
<script>
	import echarts from "echarts";
	//let myChart = this.$echarts.init(document.getElementById("myChart"));

  export default {
    props: {
      // 样式
      echartStyle: {
        type: Object,
        default(){
          return {}
        }
      },
      // 标题文本
      titleText: {
        type: String,
        default: ''
      },
		 legend: {
		 	type: Array,
       		 top:"50%"
   	 },
      // 提示框键名
      tooltipFormatter: {
        type: String,
        default: ''
      },
      // 扇形区域名称
      opinion: {
        type: Array,
        default(){
          return [
			]
        }
      },
      // 提示框标题
      seriesName: {
        type: String,
        default: ''
      },
      // 扇形区域数据
      opinionData: {
        type: Array,
        default(){
          return []
        }
      },
    },
    data(){
      return {
        //
      }
    },
    mounted(){
      this.$nextTick(function() {
        this.drawPie('myChart')
      })
    },
    methods: {
      // 监听扇形图点击
      eConsole(param) {
        // 向父组件传值
        this.$emit("currentEchartData",param.name);
      },
      // 绘制饼状图
      drawPie(id){
	
        this.charts = this.$echarts.init(document.getElementById(id));
        this.charts.on("click", this.eConsole);
        this.charts.setOption({
          title: {
            text: this.titleText, // 标题文本
            left: 'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/> " + this.tooltipFormatter + ":{c}"
          },
          legend: {
			 orient: 'vertical',
            bottom:0,
            left: 'center',
            data: this.opinion // 扇形区域名称
          },
          series : [
            {
              name:this.seriesName,  // 提示框标题
              type: 'pie',
              radius : '50%',
              center: ['50%', '45%'],
              selectedMode: 'single',
              data:this.opinionData, // 扇形区域数据
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      }
    }
  }
</script>
 

