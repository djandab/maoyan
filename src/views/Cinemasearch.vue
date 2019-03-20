<template>
	<div class="searchbox">
		<div class="header">
 			<router-link to='/cinema' tag='div'>
 				<div @click="b" class="return"><</div>
 			</router-link>
			<div class="title">猫眼电影</div>
		</div>
		<div class="search-box">
			<div class="left">
				<div class="iconfont icon-sousuo sou"></div>
				<input v-model="inp" @input="shousuo" type="text" placeholder="搜影院"/>
			</div>
			<div @click="quxiao" class="right">取消</div>
		</div>
		<div v-if="inp!=''">
		<div v-if="searchcinema">
			<div class="search-cinema">
				<div class="search-cinema-title">影院</div>
				<div v-if="searchcinema">
				<div @click="tiao(it.id)" class="cinema-content" v-for="(it,i) in searchcinema.list">
					<div class="cinema-nm">{{it.nm}}<span class="cinema-price">{{it.sellPrice}}<span>元起</span></span></div>
					<div class="cinema-addr">{{it.addr}}</div>
					<div class="cinema-buttom">
						<p class="cinema-sell" v-if='it.sell==true'>座</p>
						<p class="allow-refund" v-if="it.allowRefund==1">退</p>
						<p class="allow-snack" v-if="it.allowRefund==1">小吃</p>
						<p class="vip-desc" v-if="it.vipDesc=='折扣卡'">折扣卡</p>
					</div>
					<div class="cinema-distance">{{it.distance}}</div>
				</div>
				</div>
			</div>
		</div>
		<div v-else class="none">
			没有找到相关内容
		</div>
		</div>
	</div>
</template>

<script>
	let timer;
	export default{
		name:'Cinemasearch',
		inject:['app'],
		data(){
			return{
				inp:'',
				searchcinema:[]
			}
		},
		mounted(){
			this.app.bottom = false
		},
		methods:{
			tiao(i){
				
				this.$router.push({path:'/cinemadetails',query:{cinemaid:i,movieids:0,arrindex:0}})
			},
			b(){
				this.$emit('b',true)
			},
			quxiao(){
				this.searchcinema = []
				this.inp = ''
			},
					shousuo(){
				this.searchcinema = []
				clearTimeout(timer)
				timer = setTimeout(()=>{
					this.$indicator.open({
						text: '加载中...',
						spinnerType: 'snake'
					});
					this.$http.get('/api/ajax/search', {
						params: {
							kw: this.inp,
							cityId:20,
							stype:-1
						}
					}).then(res => {
//						console.log(res.data.movies.list)
						this.searchcinema = res.data.cinemas
						console.log(res.data)
//						this.dataLst = res.data.coming
//	
//						this.seller.movieList = this.seller.movieList.concat(this.dataLst)
					this.$indicator.close();
					})
				},500)
			}
			
		}
	}
</script>

<style scoped>
 .search-cinema-title {
    height: 50px;
    background: white;
    line-height: 50px;
    font-size: .27rem;
    color: #999;
    padding-left: 20px;
    border-bottom: .3px solid #e6e6e6;
    }
.none{

	background: white;
	height: 50px;
	line-height: 50px;
	text-align: center;
	font-size: .27rem;
	color: #999;
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
.searchbox{
	background: #f5f5f5;
	height: 100vh;
}
.return{
	position: absolute;
	left: 10px;
	width: 50px;
}
.search-box{
	display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding: 8px 0 8px 10px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e5e5e5;
    z-index: 1;
}
.search-box>.left{
	position: relative;
	padding: 0 10px;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    background-color: #fff;
    -webkit-box-flex: 1;
    flex-grow: .9;
    height: 35px;
}
.search-box>.left>input{
	transform: translateY(-.5rem);
	outline-style: none;
	-webkit-box-flex: 1;
    flex: 1;
    border: none;
    font-size: 13px;
    color: #333;
    line-height: 20px;
    padding: 4px 0;
    width: 80%;
    margin-left: 20px;
/*	margin-top: -20px;*/
}
.search-box>.right{
	height: 30px;
    line-height: 30px;
    padding: 0 10px;
    font-size: 16px;
    color: #f03d37;
}
.sou{
	position: absolute;
	top: .2rem;
}
.cinema-nm{
	font-size: .28rem;
	
}
.cinema-content{
	position: relative;
	padding-top: 20px;
	background: white;
	padding-left: 15px;
	border-bottom: .3px solid #e6e6e6;
/*	height: 80px;*/
}
.cinema-price{
	margin-left: 8px;
	color: #f03d37;
}
.cinema-price span,.cinema-addr{
	margin-left: 5px;
	color: #999;
	font-size: .2rem;
}
.cinema-addr{
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: 70%;
	margin-top: 10px;
	margin-left: 0;
}
.cinema-buttom{
	width: 100%;
	height: 20px;
}
.allow-refund,.allow-snack,.vip-desc,.cinema-sell{
	margin-left: 5px;

/*    margin-top: 10px;*/
/*    padding: 0 3px;*/
    float: left;
    text-align: center;
    line-height: 15px;
    border-radius: 2px;
    font-size: .06rem;
}
.allow-refund{
	width: 15px;
	height: 15px;
	border: 1px solid #589daf;
	color: #589daf;
}
.allow-snack{
	width: 30px;
	height: 15px;
	border: 1px solid #f90;
	color: #f90;
}
.vip-desc{
	
	width: 45px;
	height: 15px;
	border: 1px solid #f90;
	color: #f90;
}
.cinema-sell{
	width: 15px;
	height: 15px;
	border: 1px solid #589daf;
	color: #589daf;
}
.cinema-distance{
    position: absolute;
    font-size: .23rem;
    color: #999;
    top: .8rem;
    right: .3rem;
}
.cinema-buttom {
    margin-top: 10px;
    width: 100%;
    height: 20px;
    padding-bottom: 20px;
}
</style>