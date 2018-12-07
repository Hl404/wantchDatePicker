<template>
  <div class="loading-container-img">
    <img src="./loading.gif"><span>加载中</span>
  </div>
</template>
<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'loading'

  export default {
    name: COMPONENT_NAME
  }
</script>
<style lang="less" >
  .loading-container-img{
  	text-align: center;
    img{
	      width: 20px;
	      height: 20px;
	      display: inline-block;
     	vertical-align: middle;
     }
     span{
     	display: inline-block;
     	font-size: 12px;
     	margin-left: 5px;
     	color:#999;
     	vertical-align: middle;
     }
  }
</style>
