<template>
	<div>

		<div class="header">
			<div class="title">影院</div>
		</div>
		<div class="search-box">
			<div class="left">广州</div>
			<div class="right">
				<div class="iconfont icon-sousuo sou"></div>
				<div style="height: 20px;" @click="appbut">
					<router-link tag="input" to="/cinemasearch" type="text" placeholder="搜影院" />
				</div>
			</div>
		</div>
		<Screen :hallType="hallType" :service="service" :screens="screens" :subItems="subItems" :metro="metro" :brands="brands"></Screen>
		<div ref='cinemabigbox' class="cinema-bigbox">
			
			<div @click="tiao(it.id)"  class="cinema-content" v-for="(it,i) in cinema" :key="i">
				<div class="cinema-nm">{{it.nm}}<span class="cinema-price">{{it.sellPrice}}<span>元起</span></span>
				</div>
				<div class="cinema-addr">{{it.addr}}</div>
				<div class="cinema-buttom">

					<p class="allow-refund" v-if="it.tag.allowRefund==1">退</p>
					<p class="allow-snack" v-if="it.tag.allowRefund==1">小吃</p>
					<p class="vip-desc" v-if="it.tag.vipTag=='折扣卡'">折扣卡</p>
					<p class="hallType" v-for="(ite,is) in cinema[i].tag.hallType" :key='is'>
						{{ite}}
					</p>
				</div>
				<div v-if="it.promotion.cardPromotionTag" class="card">
					<img src="../../public/img/card.png" /> {{it.promotion.cardPromotionTag}}
				</div>
				<div class="cinema-distance">{{it.distance}}</div>
			</div >
			
		</div>
	</div>
</template>

<script>
	//:to="{path:'/cinemadetails',query:{cinemaid:it.id,movieids:0}}" tag="div"
	import Screen from '.././components/Screen.vue'
	let timer;
	export default {
		name: 'cinema',
		inject: ['app'],
		components: {
			Screen
		},
		provide() {
			return {
				cinema: this
			}
		},
		data() {
			return {
				datetime: '',
				cinema: {},
				screens: {},
				subItems: {},
				metro: {},
				brands: {},
				service: {},
				hallType: {},
			}
		},
		methods: {
			tiao(i){
				
				this.$router.push({path:'/cinemadetails',query:{cinemaid:i,movieids:0,arrindex:0}})
			},
			appbut() {
				this.app.bottom = false
			},
		},
		mounted() {
			this.$indicator.open({
				text: '加载中...',
				spinnerType: 'snake'
			});
			var today = new Date();
			var fullYear = today.getFullYear();
			var month = today.getMonth() + 1;
			var dating = today.getDate();
			if(month < 10) {
				month = '0' + month
			}
			if(dating < 10) {
				dating = '0' + dating
			}
			this.datetime = fullYear + '-' + month + '-' + dating
			this.$http.get('/api/ajax/cinemaList', {
					params: {
						day: this.datetime,
						offset: 0,
						limit: 20,
						districtId: -1,
						lineId: -1,
						hallType: -1,
						brandId: -1,
						serviceId: -1,
						areaId: -1,
						stationId: -1,
						item: '',
						updateShowDay: true,
						reqId: new Date().getTime(),
						cityId: 20
					}
				})
				.then(res => {
					if(res.status == 200) {
						this.cinema = res.data.cinemas
						console.log(res.data.cinemas)
					}
					this.$indicator.close();
				})
			this.$http.get('/api/ajax/filterCinemas', {
					params: {
						ci: 20,
					}
				})
				.then(res => {
					if(res.status == 200) {
						this.screens = res.data
						this.subItems = res.data.district.subItems
						this.metro = res.data.subway.subItems
						this.brands = res.data.brand.subItems
						this.service = res.data.service.subItems
						this.hallType = res.data.hallType.subItems
						console.log(this.screens)
					}
				})
		}

	}
</script>

<style scoped>
	.cinema-nm {
		font-size: .28rem;
	}
	
	.header {
		width: 100%;
		height: 56px;
		background: #e54847;
		position: relative;
	}
	
	.header>div {
		color: white;
		line-height: 56px;
		font-size: 20px;
		text-align: center;
	}
	
	.search-box {
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		padding: 8px 0 8px 10px;
		background-color: #f5f5f5;
		border-bottom: 1px solid #e5e5e5;
		z-index: 1;
	}
	
	.search-box>.right {
		position: relative;
		padding: 0 10px;
		border: 1px solid #e6e6e6;
		border-radius: 5px;
		background-color: #fff;
		-webkit-box-flex: 1;
		flex-grow: .9;
		height: 35px;
	}
	
	.search-box>.right input {
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
	}
	
	.search-box>.left {
		height: 30px;
		line-height: 30px;
		padding: 0 10px;
		font-size: 16px;
	}
	
	.sou {
		position: absolute;
		top: .2rem;
	}
	
	.cinema-content {
		position: relative;
		padding-top: 20px;
		background: white;
		padding-left: 15px;
		border-bottom: .3px solid #e6e6e6;
	}
	
	.cinema-price {
		margin-left: 8px;
		color: #f03d37;
	}
	
	.cinema-price span,
	.cinema-addr,
	.card {
		margin-left: 5px;
		color: #999;
		font-size: .2rem;
	}
	
	.card>img {
		width: .25rem;
		height: .25rem;
	}
	
	.cinema-addr,
	.card {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 70%;
		margin-top: 10px;
		margin-left: 0;
	}
	
	.cinema-buttom {
		margin-top: 10px;
		width: 100%;
		height: 20px;
		padding-bottom: 20px;
	}
	
	.allow-refund,
	.allow-snack,
	.vip-desc,
	.cinema-sell,
	.hallType {
		margin-left: 5px;
		/*    padding: 0 3px;*/
		float: left;
		text-align: center;
		line-height: 15px;
		border-radius: 2px;
		font-size: .06rem;
	}
	
	.allow-refund {
		width: 15px;
		height: 15px;
		border: 1px solid #589daf;
		color: #589daf;
	}
	
	.allow-snack {
		width: 30px;
		height: 15px;
		border: 1px solid #f90;
		color: #f90;
	}
	
	.vip-desc {
		width: 45px;
		height: 15px;
		border: 1px solid #f90;
		color: #f90;
	}
	
	.cinema-sell {
		width: 15px;
		height: 15px;
		border: 1px solid #589daf;
		color: #589daf;
	}
	
	.hallType {
		padding-left: 5px;
		padding-right: 5px;
		height: 15px;
		border: 1px solid #589daf;
		color: #589daf;
	}
	
	.cinema-distance {
		position: absolute;
		font-size: .23rem;
		color: #999;
		top: .8rem;
		right: .3rem;
	}
	
	.card {
		transform: translateY(-25px);
	}
</style>