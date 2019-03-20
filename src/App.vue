<template>
  <div id="app">

		<router-view  @b="b"></router-view>
		<div v-show="bottom" class="text"></div>
		<div v-show="bottom" class="bottom">
				<router-link to="/" tag="div" active-class="activec" exact>电影<p class="iconfont icon-dianying"></p></router-link>
				<router-link to="/cinema" tag="div">影院<p class="iconfont icon-yingyuana"></p></router-link>
				<router-link to="/mine" tag="div">我的<p class="iconfont icon-wode"></p></router-link>
		</div>
		
  </div>
</template>

<script>

	export default{
		name:'App',
		provide(){
			return {
				app:this
			}
		},
		data(){
			return{
				showupaci:true,
				shownaci:false,
				bottom:true,
				signup:false
			}
		},
		methods:{
//			a(val){
//				console.log('111')
//				this.bottom=val
//			},
			b(val){
				console.log(val)
				this.bottom=val
			}
		}

	}
</script>
<style>
.bottom{
	width: 100%;
	height: 56px;
	background: white;
	position: fixed;
	bottom: 0;
	display: flex;
	justify-content: space-around;
	font-size: .3rem;
	bottom: 0;
	text-align: center;
	border-top: .3px solid #CCCCCC;
}
.bottom>div{
	margin-top: .25rem;
}
.bottom p{
	margin-top: 2px;
}
.text{
	height: 56px;
/*	background: #f5f5f5;*/
}
</style>
