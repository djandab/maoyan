<template>
	<div>
		<div class="header">
		<router-link tag="div" :to="{path:'/details',query:{movieids:details.id}}" class="return">
				<
		</router-link>
		
		<div class="title">{{details.nm}}</div>
		</div>

			<div class="details-box">
				<div class="detailstwo-header"></div>
				<div ref="bg" class="bg"></div>
				<div class="details-box-flex">
					<div class="pri">
						<img class="kuang" :src="bga">
					</div>
					<div class="details-content">
						<p class="details-content-title">{{details.nm}}</p>
						<p class="details-content-enm">{{details.enm}}</p>
						<p v-if="details.sc!=0" class="star">
							<span v-for="(star,index) in starArr" :key="index" class="star-item" :class="star"></span>
							<span class="sc">{{details.sc}}</span>
						</p>
						<p v-if="details.sc==0" class="star">
							<span class="sc">{{details.wish}}人想看</span>
						</p>
						<p v-if="details.sc!=0" class="ping pingtwo">({{details.snum}}人评)</p>
						<p class="details-content-cat detailscat">{{details.cat}}<span v-if="details.version=='v3d imax'">&nbsp;<img src="../../public/img/3d2.png" /></span></p>
						<p class="details-content-time details-time">
							{{details.src}}/{{details.dur}}分钟
						</p>
						<p class="details-content-shang details-shang">
							{{details.pubDesc}}
						</p>
					</div>
				</div>
			</div>
			<router-link tag="div" :to="{path:'/details',query:{movieids:details.id}}" class="tehui">特惠购票</router-link>
			<div class="dra">
				<div ref="dra" class="dra-box">
					<p ref="p">{{details.dra}}</p>
				</div>
				<div @click="sideupd" class="sideup" :class="sideup?'iconfont icon-iconfontjiantou':'iconfont icon-jiantou-copy-copy-copy'"></div>
			</div>
			<div class="autor">
				<div class="autor-title">媒体库</div>
				<div class="autor-box">
					<router-link :to="{path:'/video',query:{video:details.videourl,movieid:details.id}}" class="autor-video" tag="div">
						<div class="iconfont icon-bofang bofang"></div>
						<img :src="details.videoImg">
					</router-link>
					<div class="autor-img" v-for="(ie,i) in details.photos">
						<div><img :src="del(ie)"></div>			
					</div>
				</div>
				<div class="autor-buttom">
					<div class="left">视频<span>{{details.vnum}}</span></div>
					<div class="right">剧照<span>{{details.pn}}</span></div>
				</div>
			</div>
		</div>
</template>

<script>
	const STARLENGTH = 5
	const STAR_ON = 'on'
	const STAR_OFF = 'off'
	const STAR_HALF = 'half'
	export default {
		name: 'DetailsTwo',
		data() {
			return {
				detailstow: this.$route.query.movieids,
				details: {},
				bga: '',
				score: 0,
				sideup: true
			}
		},
		methods: {
			del(url) {
				let reg = /w\.h/
				return url.replace(reg, '128.180')
			},
			returns() {
				this.$router.go(-1)
			},
			sideupd() {
				if(this.sideup == true) {
					this.sideup = false

					this.$refs.dra.style.overflow = "none"
					let top = this.$refs.p.offsetHeight
					this.$refs.dra.style.height = top + 'px'

				} else {
					this.$refs.dra.style.overflow = "hidden"
					this.sideup = true
					this.$refs.dra.style.height = 1 + 'rem'
				}
			}
		},
		computed: {
			starArr() {

				let record = []
				let score = Math.floor(this.score * 2) / 4
				let intScore = parseInt(score)
				for(let i = 1; i <= STARLENGTH; i++) {
					if(i <= intScore) {
						record.push(STAR_ON)
					} else if(i > intScore && i === Math.ceil(score)) {
						record.push(STAR_HALF)
					} else {
						record.push(STAR_OFF)
					}
				}

				return record
			}
		},
		mounted() {
			this.$indicator.open({
				text: '加载中...',
				spinnerType: 'snake'
			});
			this.$http.get('/api/ajax/detailmovie', {
					params: {
						movieId: this.detailstow
					}
				})
				.then(res => {
					let reg = /w\.h/
					if(res.status == 200) {
						this.details = res.data.detailMovie
						this.score = this.details.sc
						this.bga = this.details.img.replace(reg, '128.180')
						this.$refs.bg.style.background = 'url(' + this.bga + ')no-repeat'
						this.$refs.bg.style.backgroundSize = 'cover'

						console.log(this.details)
					}
					this.$indicator.close();
				})
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	@import "../../public/sass/mixin";
	.kuang {
		border: 1px solid #f0f2f3
	}
	
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
	
	.detailstwo-header {
		position: absolute;
		z-index: -1;
		width: 100%;
		height: 100%;
		background-color: rgba(48, 48, 48, .8);
	}
	
	.cinema-distance {
		position: absolute;
		font-size: .23rem;
		color: #999;
		top: .8rem;
		right: .3rem;
	}
	
	.star {
		transform: translateY(-.7rem);
	}
	
	.star-item {
		width: .28rem;
		height: .28rem;
		margin-right: 5px;
		display: inline-block;
		&:last-child {
			margin-right: 0;
		}
		&.on {
			@include bg-img("/img/allstar", cover)
		}
		&.half {
			@include bg-img("/img/banstar", cover)
		}
		&.off {
			@include bg-img("/img/nostar", cover)
		}
	}
	
	.detailscat,
	.pingtwo,
	.details-time,
	.details-shang {
		color: white;
		transform: translateY(-.85rem);
	}
	
	.tehui {
		width: 90%;
		margin-left: 5%;
		margin-top: .3rem;
		height: .55rem;
		border-radius: 20px;
		background: #e54847;
		text-align: center;
		line-height: .55rem;
		color: white;
		font-size: .28rem;
	}
	
	.dra {
		margin-top: 20px;
		padding-left: 15px;
		padding-right: 15px;
		line-height: 20px;
		font-size: .25rem;
		position: relative;
	}
	
	.dra-box {
		height: 1rem;
		overflow: hidden;
		border-bottom: .5rem;
	}
	
	.dra-box>p {}
	
	.sideup {
		position: absolute;
		bottom: -20px;
		left: 48%;
	}
	
	.autor {
		border-top: 10px solid #f4f4f4;
		margin-top: 20px;
		border-bottom: 10px solid #f4f4f4;
	}
	
	.autor-title {
		font-size: .3rem;
		color: #666;
		font-weight: 600;
		margin-top: .3rem;
		margin-left: .2rem;
	}
	.autor-video>img{
		width: 2.3rem;
		height: 1.2rem;
	}
	.autor-video{
		position: relative;
		margin-right: .1rem;
	}
	.autor-box{
		margin-left: 8px;
		margin-right: 8px;
		margin-top: 10px;
		overflow: scroll;
		overflow-y: hidden;
		display: flex;
		white-space: nowrap
	}
	.autor-box::-webkit-scrollbar{
		display: none;
	}
	.autor-img>div{
		width: 1.5rem;
		height: 1.2rem;
		margin-left: .1rem;
		overflow: hidden;
	}
	.autor-img>div>img{
		transform: scale(1.2);
	}
	/*.autor-img{
		overflow: hidden;
		width: 1.5rem;
		height: 1.2rem;
	}*/
	.autor-buttom{
		height: 30px;
		display: flex;
		justify-content: center;
	}
	.left{
		width: 35%;
		margin-right: 15px;
	}
	.right{
		width: 55%;
	}
	.left>span,.right>span{
		float: right;
	}
	.left,.right{
		color: #666;
		line-height: 30px;
		font-size: .25rem;
	}
	.bofang{
		font-size: .4rem;
		position: absolute;
		bottom: 10px;
		right: 5px;
	}
</style>