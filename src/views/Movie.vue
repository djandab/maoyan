<template>
	<div>
		<div class="header">
			<div class="title">猫眼电影</div>
		</div>
		<div class="navigation">
			<div class="address">
				广州
			</div>
			<div class="show-up" @click="showup" :class="showupaci?'active':''">			
				正在热映
			</div>
			<div class="shown" @click="shown" :class="shownaci?'active':''">
				即将上映
			</div>
			<div @click="a" class="search">
				<router-link to="/search" tag="div"><div class="iconfont icon-sousuo"></div></router-link> 
			</div>
		</div>
		<div class="aa" v-if="text"></div>
		<div class="data-page">
				<div v-show="showupaci">
					<Showup :seller="seller"></Showup>
				</div>
				<div v-show="shownaci">
					<Shown :hobby='hobby' :shownhobby="shownhobby" :arr="arr"></Shown>
				</div>
		</div>
		
	</div>
</template>

<script>
	import Showup from '.././components/Showup.vue'
	import Shown from '.././components/Shown.vue'
	export default{
		name:'Movie',
		inject:['app'],
		data(){
			return{
				showupaci:true,
				shownaci:false,
				seller:{},
				hobby:{},
				shownhobby:{},
				text:true,
				arr2:[],
				arr:[]
			}
		},
		  mounted(){
		 	this.$indicator.open({
				text: '加载中...',
				spinnerType: 'snake'
			});
			this.$http.get('/api/ajax/movieOnInfoList',{
				params:{
					token:''
				}
			})
			.then(res=>{
				console.log(res.data)
				if(res.status==200){
					this.seller = res.data
					this.text = false
				}
			}),
			this.$http.get('/api/ajax/mostExpected',{
				params:{
					ci:20,
					limit:10,
					offset:0,
					token:'-jEndSVgmbqYk1nRxGR7MrV7PrIAAAAA_QcAAG_m5Ev59g8sJbk8Y84VBWM8qHUkf1ieNZFvM_7d35gAQHdMYuXQ9-3sNn9y444fWw'
				}
			})
			.then(res=>{
				console.log(res.data)
				if(res.status==200){
					this.hobby = res.data
				}
			}),
			this.$http.get('/api/ajax/comingList',{
				params:{
					ci:20,
					token:'-jEndSVgmbqYk1nRxGR7MrV7PrIAAAAA_QcAAG_m5Ev59g8sJbk8Y84VBWM8qHUkf1ieNZFvM_7d35gAQHdMYuXQ9-3sNn9y444fWw&limit=10'
				}
			})
			.then(res=>{
				console.log(res.data)
				if(res.status==200){
					this.shownhobby = res.data
					this.arr2.push(this.shownhobby.coming)
					for(let i = 0; i<this.arr2[0].length;i++){
						this.arr.push(this.arr2[0][i].comingTitle)
					}
					console.log(this.arr)
					
				}
				this.$indicator.close();
			})
			
		},

		components:{
			Showup,
			Shown
		},
		methods:{
			a(){
				console.log('aaaa')
		  		this.app.bottom = false
		  	},
			showup(){
				if(this.showupaci==false){
						this.shownaci=false
						this.showupaci = true
				}
			},
			shown(){
					if(this.shownaci==false){
						this.showupaci=false
						this.shownaci = true
				}
			}
		}
	}
</script>

<style>
.aa{
	width: 100%;
	height: 1000px;
}
.header{
	width: 100%;
	height: 56px;
	background: #e54847;
	position: relative;
}
.header>div{
	color: white;
	line-height: 56px;
	font-size: 20px;
	text-align: center;
}
.navigation{
	width: 100%;
	height: 44px;
	border-bottom: .4px solid rgba(48,48,48,.5);
	display: flex;
	justify-content: space-around;
/*	transform: scaleY(.5);*/
}
.navigation>div{
	line-height: 44px;
	font-size: .2rem;
}
.active{
	border-bottom: 3px solid #ef4238;
	color: #ef4238;
}
.activec{
	color: #ef4238;
}
</style>