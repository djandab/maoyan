<template>
 	<div class="searchbox">
 		<div class="header">
 			<router-link to='/' tag='div'>
 				<div @click="b" class="return"><</div>
 			</router-link>
			<div class="title">猫眼电影</div>
		</div>
		<div class="search-box">
			<div class="left">
				<div class="iconfont icon-sousuo sou"></div>
				<input v-model="inp" @input="shousuo" type="text" placeholder="搜电影、搜影院"/>
			</div>
			<div @click="quxiao" class="right">取消</div>
		</div>
		<div v-if="inp!=''">
		<div v-if="searchSeller">
			<div class="search-content">
				电影/电视剧/综艺
			</div>
			<div class="movie" @click="id" v-for='(it,i) in searchSellerList' :key="i">
				<router-link  :to="{path:'/detailsTwo',query:{movieids:it.id}}" tag="span">
				<div class="img">
					<img :src="del(it.img)">
				</div>
				<div class="details">
					<div class="searchleft">
						<div class="movie-title">
							<p class="title">{{it.nm}}</p>
						</div>
						<p class="enm">{{it.enm}}</p>
						<p class="cat">{{it.cat}}</p>
						<p class="rt">{{it.rt}}</p>
					</div>
					<div class="buy">
						<div v-if="it.sc != 0" class="search-movie-evaluate"><span class="search-sc">{{it.sc}}</span>分</div>
						<div v-else class="search-movie-evaluate"><span class="search-sc">{{it.wish}}</span>人想看</div>
						<div class="search-btn">
							<div v-if="it.showst==4">
								<button class="blue">预售</button>
							</div>
							<div v-if="it.showst==1">
								<button class="yellow">想看</button>
							</div>
							<div v-if="it.showst==3">
								<button class="red">购票</button>
							</div>
						</div>
						<!--<button v-if="it.sc != 0" :class="active(i)?'blue':'red'">购买</button>
						<button v-else :class="active(i)?'blue':'red'">预售</button>-->
					</div>
					
				</div>
				</router-link>
			</div>
			<div class="total">查看全部{{searchSeller.total}}部影视剧</div>
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
		name:'Search',
		inject:['app'],
		data(){
			return{
				inp:'',
				searchSeller:[],
				searchcinema:[]
			}
		},
		computed:{
			searchSellerList(){	
				let arr = []
				if(this.searchSeller.list){
					arr = this.searchSeller.list
					if(arr.length>0&&arr.length<=2){
						return arr 
					}else{
						return arr.slice(0,3)
					}
				}			
			}
		},
		mounted(){
			this.app.bottom = false
		},
		methods:{
			tiao(i){
				
				this.$router.push({path:'/cinemadetails',query:{cinemaid:i,movieids:0,arrindex:0}})
			},
			id(){
				this.app.bottom = false
			},
			del(url) {
				let reg = /w\.h/
				return url.replace(reg, '128.180')
			},
			b(){
				this.$emit('b',true)
			},
			shousuo(){
				this.searchSeller = []
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
						this.searchSeller = res.data.movies
						console.log(this.searchSeller)
						this.searchcinema = res.data.cinemas
						console.log(this.searchcinema)
//						this.dataLst = res.data.coming
//	
//						this.seller.movieList = this.seller.movieList.concat(this.dataLst)
					this.$indicator.close();
					})
				},500)
			},
			quxiao(){
				this.searchSeller = []
				this.inp = ''
			}
		}
	}
</script>

<style scoped>
 
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
.none{

	background: white;
	height: 50px;
	line-height: 50px;
	text-align: center;
	font-size: .27rem;
	color: #999;
}
.search-content,.search-cinema-title{
	height: 50px;
	background: white;
	line-height: 50px;
	font-size: .27rem;
	color: #999;
	padding-left: 20px;
	border-bottom: .3px solid #e6e6e6;
}
.movie{
	background: white;
}
.enm,.cat,.rt{
	margin-top: 5px;
	color: #999;
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: .25rem;
}
.searchleft{
	width: 65%;
}
.search-movie-evaluate{
	font-size: .2rem;
	width: 100%;

	text-align: center;
	color: #EE9900;
	font-weight: 600;
}
.buy button{
	outline-style: none;
	border: none;
	width: .8rem;
	height: .5rem;
	font-size: .23rem;
	border-radius: 5px;
	color: white;
}
.total{
	height: 50px;
	font-size: .25rem;
	text-align: center;
	color: #f03d37;
	line-height: 50px;
	border-bottom: 10px solid #e6e6e6;
	background: white;
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