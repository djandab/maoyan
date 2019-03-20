<template>
	<div>
		<div class="header">
			<div @click="b">
				<div @click="returns" class="return">
					<</div>
				</div>
				<div v-if="details.detailMovie" class="title">{{details.detailMovie.nm}}</div>
			</div>
			<div class="details-box">
				<div class="details-header"></div>
				<div ref="bg" class="bg"></div>
				<div class="details-box-flex">
					<div class="pri">
						<img :src="bga">
					</div>
					<div class="details-content">
						<p class="details-content-title" v-if="details.detailMovie">{{details.detailMovie.nm}}</p>
						<p class="details-content-enm" v-if="details.detailMovie">{{details.detailMovie.enm}}</p>
						<p class="details-content-sc" v-if="details.detailMovie&&details.detailMovie.sc!=0">
							{{details.detailMovie.sc}}
							<span class="ping">({{details.detailMovie.snum}}人评)</span>
						</p>
						<p class="details-content-sc" v-if="details.detailMovie&&details.detailMovie.sc==0">
							{{details.detailMovie.wish}}人想看
						</p>
						<p class="details-content-cat" v-if="details.detailMovie">
							{{details.detailMovie.cat}}
							<span v-if="details.detailMovie&&details.detailMovie.version=='v3d imax'">
								<img src="../../public/img/3d2.png" />
							</span>
						</p>
						<p class="details-content-time" v-if="details.detailMovie">
							{{details.detailMovie.src}}/{{details.detailMovie.dur}}分钟
						</p>
						<p class="details-content-shang" v-if="details.detailMovie">
							{{details.detailMovie.pubDesc}}
						</p>
					</div>
				</div>
				<router-link :to="{path:'/detailsTwo',query:{movieids:movieid}}" tag="div" class="detailstwo">></router-link>
			</div>
			<div class="details-data">
				<div @click="active(i)" v-for="(it,i) in datat" :key='i' :class="{active:i==activec}">
					<span>{{it.date}}</span>
				</div>
			</div>
			<Screentwo :datetime="datetime" :moveid="moveid" :hallType="hallType" :service="service" :screens="screens" :subItems="subItems" :metro="metro" :brands="brands"></Screentwo>
			<div  @click="tiao(it.id)" class="cinema-content" v-for="(it,i) in cinema" :key="i">
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
				<!--<p class="show-times">{{it.showTimes}}</p>-->
				<div class="cinema-distance">{{it.distance}}</div>
			</div>

		</div>

</template>

<script>
	//:to="{path:'/cinemadetails',query:{cinemaid:it.id,movieids:movieid}}" tag='div'

	import Screentwo from '.././components/Screentwo.vue'
	export default {
		name: 'Details',
		inject: ['app'],
		components: {

			Screentwo
		},
		provide() {
			return {
				cinematwo: this
			}
		},
		data() {
			return {
				details: {},
				bga: '',
				datat:[],
				activec: 0,
				detailsCinema: {},
				movieid: 0,
				datetime: '',
				cinema: {},
				screens: {},
				subItems: {},
				metro: {},
				brands: {},
				service: {},
				hallType: {},
				moveid:this.$route.query.movieids
}		
},
methods: {
	tiao(k){
		this.$http.get('/api/ajax/cinemaDetail', {
					params: {
						cinemaId: k,
						movieId: this.movieid
					}
				})
		.then(res => {
			this.movie = res.data.showData.movies
			for(let i = 0; i <this.movie.length; i++){
							if(this.movieid === this.movie[i].id ){
								
								var arrindex = i
//								this.swiperOption.initialSlide = i
//								this.$set(this.swiperOption,'initialSlide',i)
							
								this.$router.push({path:'/cinemadetails',query:{cinemaid:k,movieids:this.movieid,arrindex:i}})
								break
							}
						}
			
		})

	},
		active(i) {
			this.datetime = this.datat[i].date
			this.activec = i
			console.log(i)
						this.$indicator.open({
				text: '加载中...',
				spinnerType: 'snake'
			});
			this.$http.post('/api/ajax/movie?forceUpdate='+ new Date().getTime(), {
							movieId: this.$route.query.movieids,
							day: this.datat[i].date,
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
							cityId: 20,
					
						})
						.then(res =>{
							console.log(res.data)
							this.cinema = res.data.cinemas
							this.$indicator.close();
						})
		},
		returns() {
			this.$router.replace('/')
				this.app.bottom = true
			},
			b() {
				this.$emit('b', true)
			},
		},
		mounted() {
			this.app.bottom = false
			this.$indicator.open({
				text: '加载中...',
				spinnerType: 'snake'
			});

			this.$http.get('/api/ajax/detailmovie', {
					params: {
						movieId: this.$route.query.movieids
					}
				})
				.then(res => {
					console.log(res.data)
					if(res.status == 200) {
						this.details = res.data
						let reg = /w\.h/
						
							this.bga = this.details.detailMovie.img.replace(reg, '128.180')
							this.$refs.bg.style.background = 'url(' + this.bga + ')no-repeat'
							this.$refs.bg.style.backgroundSize = 'cover'
							this.movieid = this.details.detailMovie.id
						
					}
					this.$indicator.close();
				})
			this.$http.post('/api/ajax/movie?forceUpdate='+new Date().getTime(), {
					movieId: this.$route.query.movieids,
					day: '',
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
					cityId: 20,
					
				})
				.then(res => {
					console.log(res.data)
					this.cinema = res.data.cinemas
					console.log(res.data.showDays.dates)
					this.datat = res.data.showDays.dates
					this.datetime = res.data.showDays.dates[this.activec].date
					this.$http.get('/api/ajax/filterCinemas', {
					params: {
						movieId:this.moveid,
						day: this.datetime
					}
				})
				.then(res => {
					if(res.status == 200) {
						if(res.data.district){
							this.screens = res.data
						this.subItems = res.data.district.subItems
						this.metro = res.data.subway.subItems
						this.brands = res.data.brand.subItems
						this.service = res.data.service.subItems
						this.hallType = res.data.hallType.subItems
						}
//						else{
//							this.metro = res.data.subway.subItems
//							this.hallType = res.data.hallType.subItems
//						}
//						
						console.log(res.data)
					}
					
				})
					if(res.data.cinemas.length === 0 ){
						this.$http.post('/api/ajax/movie?forceUpdate='+ new Date().getTime(), {
							movieId: this.$route.query.movieids,
							day: res.data.showDays.dates[0].date,
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
							cityId: 20,
					
						})
						.then(res =>{
							console.log(res.data)
							this.cinema = res.data.cinemas
//							this.datetime = this.datat[this.].
							
						})
					}
					
				})
//			var today = new Date();
//			var fullYear = today.getFullYear();
//			var month = today.getMonth() + 1;
//			var dating = today.getDate();
//			if(month < 10) {
//				month = '0' + month
//			}
//			if(dating < 10) {
//				dating = '0' + dating
//			}
//			this.datetime = fullYear + '-' + month + '-' + dating
			
//			this.$http.get('/api/ajax/filterCinemas', {
//					params: {
//						movieId:this.moveid,
//						day: this.datetime
//					}
//				})
//				.then(res => {
//					if(res.status == 200) {
//						if(res.data.district){
//							this.screens = res.data
//						this.subItems = res.data.district.subItems
//						this.metro = res.data.subway.subItems
//						this.brands = res.data.brand.subItems
//						this.service = res.data.service.subItems
//						this.hallType = res.data.hallType.subItems
//						}
//						else{
//							this.metro = res.data.subway.subItems
//							this.hallType = res.data.hallType.subItems
//						}
////						
//						console.log(res.data)
//					}
//					
//				})
		}
	}
</script>

<style>
	.return {
		position: absolute;
		left: 10px;
		width: 50px;
	}
	
	.details-box {
		height: 3.2rem;
		position: relative;
		cursor: pointer;
	}
	
	.bg {
		width: 100%;
		height: 100%;
		z-index: -1;
		overflow: hidden;
		position: absolute;
		-webkit-filter: blur(0.12rem);
		filter: blur(0.12rem);
		opacity: .35;
	}
	
	.details-header {
		position: absolute;
		z-index: -1;
		width: 100%;
		height: 100%;
		background-color: #333;
	}
	
	.details-box-flex {
		height: 150px;
		padding: 19px 30px 19px 15px;
		display: flex;
		justify-content: center;
	}
	
	.pri {
		width: 40%;
	}
	
	.pri img {
		width: 1.9rem;
		height: 2.6rem;
	}
	
	.details-content {
		width: 60%;
		text-align: left;
		color: white;
	}
	
	.details-content>p {
		margin-top: .15rem;
	}
	
	.details-content-title {
		font-size: .35rem;
		font-weight: 600;
	}
	
	.details-content-enm,
	.details-content-cat,
	.details-content-time,
	.details-content-shang {
		font-size: .23rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #999;
	}
	
	.details-content-sc {
		font-size: .32rem;
		font-weight: 600;
		color: #FF9900;
	}
	
	.ping {
		font-size: .23rem;
		color: #999999;
	}
	
	.details-content-cat img {
		width: .7rem;
		height: .2rem;
	}
	
	.details-data {
		overflow: scroll;
		overflow-y: hidden;
		display: flex;
		border-bottom: .2px solid #e6e6e6;
	}
	
	.details-data::-webkit-scrollbar {
		display: none;
	}
	
	.details-data>div {
		font-size: .25rem;
		margin-left: 4.5px;
	}
	
	.details-data>div>span {
		text-align: center;
		line-height: 45px;
		height: 45px;
		display: inline-block;
		width: 2rem;
	}
	
	.cinema-nm {
		font-size: .28rem;
	}
	
	.cinema-content {
		position: relative;
		padding-top: 20px;
		background: white;
		padding-left: 15px;
		border-bottom: .3px solid #e6e6e6;
		/*	height: 80px;*/
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
		/*padding-bottom: 20px;*/
	}
	
	.detailstwo {
		position: absolute;
		top: 1.25rem;
		color: white;
		right: .1rem;
		font-size: .5rem;
	}
</style>