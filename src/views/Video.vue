<template>
	<div class="video-box">
		<!--<div ref="top" class="top"><span><</span></div>-->
		<video class="video" :src="$route.query.video" controls autoplay></video>
		<div class="video-nm">{{details.nm}}</div>
		<div class="video-star">主演: {{details.star}}</div>
		<div class="video-dra">详情: {{details.dra}}</div>
		<div class="return" @click="returns">返回详情</div>
	</div>
</template>

<script >
	export default{
		name:'Video',
		data(){
			return{
				video:this.$route.query.video,
				details:{}
			}
		},
		methods:{
			returns() {
				this.$router.go(-1)
			},
		},
		mounted() {
			this.$indicator.open({
				text: '加载中...',
				spinnerType: 'snake'
			});
			this.$http.get('/api/ajax/detailmovie', {
				params: {
					movieId: this.$route.query.movieid
				}
			})
			.then(res => {
				
			if(res.status == 200) {
				this.details = res.data.detailMovie	
					console.log(this.details)
				}
				this.$indicator.close();
			})
		},
	}
</script>

<style scoped>
	body,html,.video-box{
		width: 100%;
		height: 100%;
	}
	.video-box{
		position: relative;
	}
	.video{
		width: 100%;
	}
	.video-nm{
		font-weight: 600;
		margin-top: 20px;
		margin-left: 10px;
		font-size: .3rem;
	}
	.video-star,.video-dra{
		margin-left: 10px;
		margin-top: 10px;
		font-size: .2rem;
		color: #666666;
	}
	.video-dra{
		margin-right: 10px;
		line-height: 20px;
	}
	.return{
		width: 90%;
		margin-left: 3%;
		margin-top: .3rem;
		height: .55rem;
		border-radius: 20px;
		background: #e54847;
		text-align: center;
		line-height: .55rem;
		color: white;
		font-size: .28rem;
	}
</style>