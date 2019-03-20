<template>
	<div>
		<div class="expect">
			<p class="title">近期最受期待</p>
			<div class="moviebox">
				<div v-for="(it,i) in hobby.coming" :key="it.id">
					<div class="imgbox">
						<img :src="del(it.img)">
						<span class="zibox">
							<span class="zi">{{it.wish}}人想看</span>
						</span>
						<div @click="like(i)" class="like">
							<p class="iconfont icon-icon4" ref="like"></p>
						</div>
					</div>
					<p class="movies-title">
						{{it.nm}}
					</p>
					<p class="time">
						{{deltime(it.comingTitle)}}
					</p>
				</div>
			</div>
		</div>
		<div class="movielist">
			<div v-for="(it,is) in shownhobby.coming" :key='it.id'>	
					<span class="movietime" v-if='qing[is]'>{{it.comingTitle}}</span>
					<div class="movie" @click="id()">
						<router-link  :to="{path:'/detailsTwo',query:{movieids:it.id}}" tag="span">
						<div class="img">
							<img :src="del(it.img)">
						</div>
						<div class="details">
							<div class="left">
								<div class="movie-title"><span class="title">{{it.nm}}</span><span class="span" :class="it.version"></span></div>
								<div v-if="it.sc != 0" class="movie-evaluate">观众评<span class="sc">{{it.sc}}</span></div>
								<div v-else class="movie-evaluate"><span class="sc">{{it.wish}}</span>人想看</div>
								<div class="performer">主演:{{it.star}}</div>
								<div class="show-info">{{it.showInfo}}</div>
							</div>
							<div class="buy">
								<button v-if="it.showInfo" :class="active(is)?'blue':'yellow'">预售</button>
								<button v-else :class="active(is)?'blue':'yellow'">想看</button>
							</div>
						</div>
						</router-link>
					</div>
				
				
				
			</div>
		</div>
		<transition name="scale">
			<div class="tang" v-show="show">
				<p class="iconfont icon-dui"></p>
				<p v-if="likes">已标记想看</p>
				<p v-else>已取消想看</p>
			</div>
		</transition>
	
	</div>
</template>

<script>
	export default {
		name: 'Shown',
		data() {
			return {
				show: false,
				likes: true,
				movieid:0
			}
		},
		props: ['hobby','shownhobby','arr'],
		inject:['app'],
 		computed:{
			qing(){
 				let a = []
 				for(let i = 0 ; i<this.arr.length;i++){	
						if(this.arr[i]==this.arr[i-1]){
							a.push(false)
						}else{
						  	a.push(true)
						}
				} 
				console.log(a)
 				return a
 			},
 		
 		},
		methods: {
			id(){
				this.app.bottom = false
			},
			active(is) {
				if(this.shownhobby.coming[is].showInfo) {
					return true
				} else {
					return false
				}
			},
			del(url) {
			
				let reg = /w\.h/
				return url.replace(reg, '128.180')
			},
			deltime(i){
				return i.substring(0,5)
			},
			like(i) {
				this.show = !this.show
				if(this.$refs.like[i].className == 'iconfont icon-icon4 liked') {
					this.$refs.like[i].className = 'iconfont icon-icon4'
					this.likes = false
				} else {
					this.$refs.like[i].className = 'iconfont icon-icon4 liked'
					this.likes = true
				}

			},
			
		}

	}
</script>

<style>
	.expect {
		padding: 12px 0 12px 15px;
	}
	
	.expect>.title {
		margin: 0 0 12px;
		font-size: 14px;
		color: #333;
	}
	
	.expect>.moviebox {
		width: 95%;
		overflow: scroll;
		overflow-y: hidden;
		display: flex;
	}
	
	.expect>.moviebox::-webkit-scrollbar {
		display: none;
	}
	
	.expect>.moviebox>div {
		margin-left: 8px;
		margin-right: 8px;
	}
	
	.expect>.moviebox img {
		width: 1.3rem;
		height: 1.9rem;
	}
	
	.expect>.moviebox .imgbox {
		position: relative;
	}
	
	.zibox {
		display: inline-block;
		width: 100%;
		height: 35px;
		position: absolute;
		bottom: 7px;
		left: 0px;
		z-index: 1;
		background-image: linear-gradient(-180deg, rgba(77, 77, 77, 0), #000);
	}
	
	.zi {
		position: absolute;
		color: #faaf00;
		font-size: 11px;
		display: inline-block;
		bottom: 0px;
		left: 0px;
		width: 100%;
		font-weight: 600;
	}
	
	.like {
		position: absolute;
		width: .5rem;
		height: .5rem;
		background: rgba(48, 48, 48, .9);
		top: 0px;
		text-align: center;
		line-height: .5rem;
		color: white;
		border-bottom-right-radius: 15px;
	}
	
	.liked {
		color: red;
	}
	
	.tang {
		position: fixed;
		width: 2rem;
		height: 2rem;
		background: rgba(48, 48, 48, .9);
		border-radius: 10px;
		top: 50%;
		left: 50%;
		margin-top: -1rem;
		margin-left: -1rem;
		opacity: 0;
	}
	
	.tang>p:first-child {
		font-size: 1rem;
		color: white;
		text-align: center;
		margin-top: .3rem;
	}
	
	.tang>p:last-child {
		font-size: .3rem;
		color: white;
		text-align: center;
	}
	
	.scale-enter {
		opacity: 0
	}
	
	.scale-enter-to {
		opacity: 1
	}
	
	.scale-enter-active,
	.scale-leave-active {
		transition: all .5s;
	}
	
	.scale-leave-to {
		opacity: 1
	}
	.scale-leave{
		opacity: 0;
	}
	/*.scale--enter {
		opacity: 0;
	}*/
	.movies-title{
		width: 70px;
		font-size: .24rem;
		font-weight: 600;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.time{
		font-size: .2rem;
		margin-top: 2px;
		color: #CCCCCC;
	}
	.movietime{
		font-size: .25rem;
		color: #333;
		margin-left: 15px;
	}
	.yellow{
		background: #faaf00;
	}
</style>