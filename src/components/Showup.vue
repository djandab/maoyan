<template>
	<div>
		<!--<div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">-->
		<div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<div class="movie" @click="id" v-for="(item,index) in seller.movieList" :key="index">
				<router-link :to="{path:'/details',query:{movieids:item.id,time:time}}" tag="span">
				<div class="img">
					<img :src="del(item.img)">
				</div>
				<div class="details">
					<div class="left">
						<div class="movie-title"><span class="title">{{item.nm}}</span><span class="span" :class="item.version"></span></div>
						<div v-if="item.sc != 0" class="movie-evaluate">观众评<span class="sc">{{item.sc}}</span></div>
						<div v-else class="movie-evaluate"><span class="sc">{{item.wish}}</span>人想看</div>
						<div class="performer">主演:{{item.star}}</div>
						<div class="show-info">{{item.showInfo}}</div>
					</div>
					<div class="buy">
						<button v-if="item.sc != 0" :class="active(index)?'blue':'red'">购买</button>
						<button v-else :class="active(index)?'blue':'red'">预售</button>
					</div>
				</div>
				</router-link>
			</div>
	</div>
		<!--</div>-->
	</div>
	
</template>

<script>
	export default {
		name: 'Showup',
		data() {
			return {
				loading :false,
				dataLst: null,
				time: Number(new Date()),
			}
		},
		props: ['seller'],
		inject:['app'],
		methods: {
			id(){
				this.app.bottom = false	
			},
			del(url) {
				let reg = /w\.h/
				return url.replace(reg, '128.180')
			},
			active(index) {
				if(this.seller.movieList[index].sc == 0) {
					return true
				} else {
					return false
				}
			},
			loadMore() {
				this.loading = true;

				setTimeout(() => {
					this.$indicator.open({
						text: '加载中...',
						spinnerType: 'snake'
					});
					
					this.$http.get('/api/ajax/moreComingList', {
						params: {
							token: '',
							movieIds: '1215114,1251606,1206836,907653,1233150,1205582,1228750,1235560,1256964,1220833'
						}
					}).then(res => {

						this.dataLst = res.data.coming

						this.seller.movieList = this.seller.movieList.concat(this.dataLst)
					this.$indicator.close();
					})
				
				}, 500);
			},

		},

	}
</script>

<style>
	.aa {
		height: 1000px;
	}
	
	.movie>span {
		display: flex;
		justify-content: center;
	}
	
	.movie .img {
		margin-top: 12px;
		width: 22%;
	}
	
	.movie .img img {
		width: 1.3rem;
		height: 1.9rem;
	}
	
	.movie .details {
		margin-top: 12px;
		width: 65%;
		display: flex;
		border-bottom: .3px solid #cccccc;
	}
	
	.movie .details>.left {
		width: 80%;
	}
	
	.movie .details .movie-title {
		display: flex;
		margin-top: 5px;
		align-items: inherit;
		font-size: .25rem;
		font-weight: 600;
		vertical-align: middle;
	}
	
	.movie .details .movie-title .title {
		margin-bottom: 5px;
		max-width: 150px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-right: 5px;
	}
	
	.movie .details .movie-title .span {
		display: inline-block;
		background-size: 100%;
		margin-top: 3px;
	}
	
	.movie-title .imax {
		background: url(../../public/img/3d.png)no-repeat;
		width: .6rem;
	}
	
	.movie-title .v2d {
		background: url(../../public/img/2d.png)no-repeat;
		width: .6rem;
	}
	
	.v3d {
		background: url(../../public/img/3dsmall.png)no-repeat;
		width: .3rem;
		height: .3rem;
	}
	
	.movie-evaluate,
	.performer,
	.show-info {
		font-size: .23rem;
		color: #3c3c3c;
	}
	
	.performer,
	.show-info {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-top: 10px;
	}
	
	.sc {
		color: #faaf00;
		margin-left: 2px;
		font-size: .3rem;
		font-weight: 600;
	}
	
	.buy>button {
		outline-style: none;
		border: none;
		width: .8rem;
		height: .5rem;
		font-size: .23rem;
		border-radius: 5px;
		color: white;
	}
	
	.red {
		background: #f03d37;
	}
	
	.blue {
		background: #3c9fe6;
	}
</style>