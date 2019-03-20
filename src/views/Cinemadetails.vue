<template>
	<div>
		<div class="cinema-header">
			<div class="cinema-reason" @click="reason">
				<</div>
					<div class="cinema-header-title">{{cinemanm}}</div>
			</div>
			<div class="cinema-dizhi-box">
				<div class="cinema-dizi-left">
					<div class="left-box">
						<p>{{cinemanm}}</p>
						<p>{{cinemaaddr}}</p>
					</div>
				</div>
				<iframe v-show="ditu" class="ditubox" :src="`https://apis.map.qq.com/tools/poimarker?type=1&keyword=${cinemanm}&region=广州&radius=500&key=3IFBZ-YUJ6O-32FWX-SF5OE-ZJPSH-JTBLN&referer=myapp`"></iframe>
				<div @click="dituclick" class="cinema-dizi-right">
					<img src="../../public/img/ditu.png" />
				</div>
			</div>
			<div class="post-bg-filter">
				<swiper :options="swiperOption" ref="mySwiper">
					<swiper-slide class="img-box" v-for="(item,index) in movie" :key="index">
						<img :src="del(item.img)">
					</swiper-slide>
				</swiper>
			</div>
			<div v-if="index == nowindex" v-for="(it,index) in movie" class="cinema-xiang" :key="index">
				<div class="cinema-xiang-up">{{it.nm}}
					<span v-if="it.sc != 0">{{it.sc}}分</span>
					<span v-else>{{it.wish}}人想看</span>
				</div>
				<div class="cinema-xiang-dowm">
					{{it.desc}}
				</div>
				<div class="cinema-data">
					<div @click="dataindex(index)" class="data" :class="{itdata:itdataid == index}" v-for="(itdata,index) in it.shows" :key="index">
						<span>{{itdata.dateShow}}</span>
					</div>
				</div>
				
			</div>
		
			<div @click="goupiao(itpiao.seqNo,itpiao.vipPrice)" class="piao-box" v-for="(itpiao,index) in piao" :key="index+8">
				<div class="tm">{{itpiao.tm}}</div>
				<div class="lang-box"><p>{{itpiao.lang}}</p><p>{{itpiao.th}}</p></div>
				<div class="price">
					<div v-if="itpiao.vipPrice" class="top">
						<div>￥{{parseInt(itpiao.vipPrice)+9}}</div>
						<div>
						<span>{{itpiao.vipPriceName}}</span>
						<span>{{itpiao.vipPrice}}</span>
						</div>
					</div>
					<div v-if="!itpiao.vipPrice" class="toptwo">
						<p>￥80</p>
						
					</div>
					<div v-if="itpiao.vipPrice" class="but">
						<p>{{itpiao.vipPriceNameNew}}特惠</p>
					</div>
				</div>
				<div class="goumai-box">
				<button class="goumai">购买</button>
				</div>
			</div>
			<div v-if="dealList.length != 0" class="tuan-list">
			 	<div class="tuan-list-header">
			 		影院超值套餐
			 	</div>
			 	<div v-for="(chi,i) in dealList" :key="i" class="tuan-list-deal">
			 		<div class="tu">
			 			<img :src="del(chi.imageUrl)"/>
			 			<div>{{chi.cardTag}}</div>
			 		</div>
			 		<div class="chi-title">
			 			<p>{{chi.title}}</p>
			 			<p>￥{{chi.price}}</p>
			 		</div>
			 		<div class="chi-last">
			 			<p>{{chi.curNumberDesc}}</p>
			 			<button>去购买</button>
			 		</div>
			 	</div>
			</div>
			
		</div>
</template>

<script>
	export default {
		
		name: 'Cinemadetails',
		inject: ['app'],
		data() {
			return {
				itdataid: 0,
				cinemanm: '',
				cinemaaddr: '',
				movie: {},
				nowindex: this.$route.query.arrindex,
				movieid: this.$route.query.movieids,
				cinemaid: this.$route.query.cinemaid,
				swiperOption: {
					slidesPerView: 3,
					centeredSlides: true,
					spaceBetween: 60,
					slideActiveClass: 'swper-img',
					slideToClickedSlide: true,
					initialSlide: this.$route.query.arrindex,
					on: {
						slideChange: () => {
							let swiper = this.$refs.mySwiper.swiper;
							if(swiper == null) {
								this.nowindex = this.$route.query.arrindex
								console.log(this.nowindex)
								this.itdataid = 0
							} else {
								this.nowindex = swiper.activeIndex
								console.log(this.nowindex)
								this.itdataid = 0
							}
						}
					}
				},
				dealList:[],
				ditu:false
			}
		},
		mounted() {
			this.app.bottom = false
			this.$indicator.open({
				text: '加载中...',
				spinnerType: 'snake'
			});
			this.$http.get('/api/ajax/cinemaDetail', {
					params: {
						cinemaId: this.cinemaid,
						movieId: this.movieid
					}
				})
				.then(res => {
					if(res.status == 200) {
						this.cinemanm = res.data.cinemaData.nm
						this.cinemaaddr = res.data.cinemaData.addr
						this.movie = res.data.showData.movies
//						console.log(res.data.dealList)
						if(res.data.dealList.dealList.length != 0){
							this.dealList = res.data.dealList.dealList
						}
						console.log(this.dealList)
						console.log(res.data)
						console.log(this.movieid)
						console.log(this.swiperOption)
					}
					this.$indicator.close();
				})
		},
		methods: {
			goupiao(i,pr){
				console.log(i)
				this.$router.push({name:'goupiao',query:{id:i,price:pr}})
			},
			
			dituclick(){
				if(this.ditu == false){
					this.ditu = true
				}else{
					this.ditu = false
				}
			},
			del(url) {
				let reg = /w\.h/
				return url.replace(reg, '128.180')
			},
			dataindex(i){
				console.log(i)
				this.itdataid = i
			},
			del(url) {
				let reg = /w\.h/
				return url.replace(reg, '128.180')
			},
			reason() {
				this.$router.go(-1)
				this.app.bottom = true
			}
		},
				computed:{
			piao(){
				let arr = []
				return arr = this.movie[this.nowindex].shows[this.itdataid].plist
				
			}
		},

	}
</script>

<style>
	.ditubox{
		position: fixed;
		top: 50%;
		margin-left: -150px;
		margin-top: -200px;
		left: 50%;
		z-index: 6;
		height: 400px;
		width: 300px;
	}
	.cinema-header {
		width: 100%;
		height: 56px;
		background: #F03D37;
		color: white;
		position: relative;
	}
	
	.cinema-header-title {
		line-height: 56px;
		text-align: center;
		font-size: .36rem;
		width: 80%;
		margin-left: 10%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap
	}
	
	.cinema-reason {
		position: absolute;
		font-size: .5rem;
		line-height: 56px;
		left: 15px;
	}
	
	.cinema-dizhi-box {
		display: flex;
	}
	
	.cinema-dizi-left {
		width: 80%;
	}
	
	.cinema-dizi-left>.left-box {
		width: 95%;
		margin-left: 5%;
		border-right: 1px solid #969896;
		margin-top: 20px;
	}
	
	.cinema-dizi-left>.left-box>p:first-of-type {
		font-size: .32rem;
		font-weight: 600;
	}
	
	.cinema-dizi-left>.left-box>p:last-of-type {
		font-size: .2rem;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-top: 10px;
		color: #999999;
	}
	
	.cinema-dizi-right>img {
		transform: scale(.5);
		margin-top: .3rem;
		margin-left: .3rem;
	}
	
	.post-bg-filter {
		margin-top: 10px;
		height: 3.5rem;
		background: #40454d
	}
	
	.img-box {
		margin-top: .5rem;
	}
	
	.img-box>img {
		width: 1.5rem;
		height: 2.2rem;
	}
	
	.swper-img {
		transition: all .5s;
		transform: scale(1.1);
		padding-bottom: 20px;
	}
	
	.swper-img:after {
		position: absolute;
		top: 2.1rem;
		left: .65rem;
		transform: rotateZ(45deg);
		z-index: -1;
		content: '';
		width: 20px;
		height: 20px;
		background: white;
	}
	
	.swper-img>img {
		border: 3px solid white;
	}
	
	.cinema-xiang-up {
		margin-top: 15px;
		text-align: center;
		font-size: .3rem;
		font-weight: 600;
	}
	
	.cinema-xiang-up>span {
		color: #FAAF00;
		font-size: .25rem;
	}
	
	.cinema-xiang-dowm {
		padding-bottom: 10px;
		width: 100%;
		border-bottom: .2px solid #e6e6e6;
		font-size: .25rem;
		text-align: center;
		margin-top: 10px;
		color: #969896;
	}
	
	.data {
		font-size: .25rem;
		margin-left: 4.5px;
	}
	
	.itdata {
		color: #F03D37;
		border-bottom: 2px solid #F03D37;
	}
	
	.cinema-data {
		overflow: scroll;
		overflow-y: hidden;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		border-bottom: .2px solid #e6e6e6;
	}
	.cinema-data::-webkit-scrollbar {
		display: none;
	}
	.data>span {
		text-align: center;
		line-height: 45px;
		height: 45px;
		display: inline-block;
		width: 2rem;
	}
	.piao-box{
		width: 100%;
		height: 1.5rem;
		display: flex;
		justify-content: space-around;
		border-bottom: .2px solid #e6e6e6 ;
	}
	.piao-box .tm{
		line-height: 1.5rem;
		text-align: center;
		width: 20%;
		font-size: .3rem;
	}
	.piao-box .lang-box{
		width: 25%;
	}
	.piao-box .lang-box>p:first-of-type{
		margin-top: .35rem;
		font-size: .25rem;
		
	}
	.piao-box .lang-box>p:last-of-type{
		margin-top: .15rem;
		width: 100%;
		overflow: hidden;
   	 	text-overflow: ellipsis;
   	 	white-space: nowrap;
		font-size: .22rem;
		color: #969896;
	}
	.top>div:first-of-type{
		font-size: .28rem;
		color: #F03D37;
	}
	.price{
		width: 25%;
	}
	.top{
		transform: translateY(-.23rem);
		display: inline-block;
	}
	.toptwo{
		font-size: .28rem;
		color: #F03D37;
		line-height: 1.5rem;
	}
	.top>div{
		float: left;
	}
	.top>div:last-of-type{
		    display: inline-block;
    line-height: 15px;
    height: 15px;
    -webkit-transform: scale(.8);
    transform: scale(.8);
    -webkit-transform-origin: left;
    transform-origin: left;
    margin-right: -16px;
    border: 1px solid #ff9000;
    border-radius: 2px;
    font-size: 12px;
	}
	.top>div:last-of-type>span:first-of-type{
		    display: inline-block;
    padding: 0 2px;
        color: #fff;
    background-color: #f90;
	}
	.top>div:last-of-type>span:last-of-type{
		   color: #f90;
    background-color: #fff;
	}
	.but{
		transform: translateY(-.23rem);
		font-size: .22rem;
		color: #969896;
	}
	.goumai{
		transform: translateY(-.18rem);
	outline-style: none;
    border: none;
    width: .8rem;
    height: .5rem;
    font-size: .23rem;
    border-radius: 5px;
    color: white;
    background: #f03d37;
	}
	.goumai-box{
		width: 20%;
	}
	.tuan-list{
		
		border-top: 10px solid #e6e6e6;
	}
	.tuan-list-header{
		
		color: #969896;
		padding-bottom: 10px;
		height: 20px;
		padding-left: 15px;
		font-size: .28rem;
		margin-top: 20px;
		border-bottom: 1px solid #e6e6e6;
	}
	.tuan-list-deal{
		border-bottom: 1px solid #e6e6e6;
		display: flex;
		justify-content: space-around;
		margin-top: 10px;
	}
	.tu{
		width: 30%;
		position: relative;
	}
	.tu>img{
		width: 1.8rem;
		height: 1.8rem;
	}
	.tu>div{
		position: absolute;
		font-size: .23rem;
		top: 0px;
		padding: 5px 6px 5px 6px;
		background: #0ac1ae;
		color: white;
	}
	.chi-title{
		width: 50%;
	}
	.chi-title>p:first-of-type{
		font-size: .24rem;
	}
	.chi-title>p:last-of-type{
		font-size: .29rem;
		color: #F03D37;
		margin-top: 30px;
	}
	.chi-last{
		width: 20%;
	}
	.chi-last>p:first-of-type{
		margin-top: .5rem;
		font-size: .23rem;
	}
	.chi-last>button{
transform: translateY(-.18rem);
    outline-style: none;
    border: none;
    width: 1rem;
    height: .5rem;
    font-size: .23rem;
    border-radius: 5px;
    color: white;
    background: #f03d37;
	}
</style>