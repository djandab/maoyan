<template>
	<div>
		<div class="cinema-header">
			<div class="cinema-reason" @click="reason">
				<
			</div>
			<div class="cinema-header-title">{{cinemanm}}</div>
		</div>
		<div class="movie-xinxi">
			<p>{{movie}}</p>
			<p>
				<span class="showdate">{{show.showDate}}</span>
				<span class="showtime">{{show.showTime}}</span>
				<span class="lang">{{show.lang}}{{show.dim}}</span>
			</p>
		</div>
		<div class="sle-box">
			<div class="sle-title">{{hall}}</div>
		<div class="sle-zuo-bigbox">
			<div class="sle-zuo-box">
				<div  class="xing" v-for="(xing,index) in zuo" :key='index'>
					<div class="xing-num">{{xing.rowNum}}</div> 
					<div ref="gezuo" @click="xuan(index,ins)" :class="ge.st" class="ge" v-for="(ge,ins) in xing.columns"></div>
					<!--<div v-else  class="ge-none" v-for="(ge,index) in xing.columns"></div>-->
				</div>
			</div>
			<div class="sle-but">
				<span class="N"></span>可选
				<span class="LK"></span>已售
				<span class="green"></span>已选
				<span class="qinglv"></span>情侣座
			</div>
			
		</div>
		
		</div>
		<div class="tuijian">
			<p>总价: {{zong}}</p>
			<button>购买</button>
		</div>
	</div>
</template>

<script>
	export default{
		name:'Goupiao',
		data(){
			return{
				cinemanm:'',
				movie:'',
				show:'',
				hall:'',
				zuo:'',
				xing:0,
				arr:[]

			}
		},
		computed:{
			zong(){
				let zong = parseInt(this.$route.query.price) * this.arr.length
				return zong
				
			}
		},
		methods:{
			reason() {
				this.$router.go(-1)
			},
			xuan(index,ins){	
				
				if(this.zuo[index].columns[ins].st == 'N'){
					
					this.arr.push(ins)
					if(this.arr.length>6){
						this.arr.pop()
					this.$toast({
						message:'不能超过六个'
					})
					return
					}
					
					this.$set(this.zuo[index].columns[ins],'st','green')
				
				}else if(this.zuo[index].columns[ins].st == 'LK'){
					this.$toast({
						message:'已被选择'	
					})
				}else{
					this.$set(this.zuo[index].columns[ins],'st','N')
					this.arr.pop()
				}
			
			}
		},
		mounted(){
			this.$indicator.open({
						text: '加载中...',
						spinnerType: 'snake'
					});
			this.$http.post('/api/ajax/seatingPlan?timestamp='+ new Date().getTime() ,{
				cityId: 20,
				ci: 20,
				seqNo: this.$route.query.id
			}).then(res =>{
				this.cinemanm = res.data.seatData.cinema.cinemaName
				this.movie = res.data.seatData.movie.movieName
				this.show = res.data.seatData.show
				this.hall = res.data.seatData.hall.hallName
				this.zuo = res.data.seatData.seat.sections[0].seats
				this.three = res.data.seatData.seat.bestRecommendation.bestThree.seats
				console.log(this.three)
				console.log(this.zuo)
				console.log(res.data)
				this.$indicator.close();
			})
			
		}
	}
</script>

<style>
	.movie-xinxi{
		height: .9rem;
		border-bottom: 1px solid #F0F0F0;
	}
	.movie-xinxi>p:first-of-type{
		margin-top: 13px;
		font-size: .3rem;
		margin-left: 10px;
		font-weight: 600;
	}
	.movie-xinxi>p:last-of-type{
		margin-top: 10px;
		color: #666666;
		font-size: .25rem;
	}
	.movie-xinxi>p>span{
		margin-left: 10px;
	}
	.sle-box{
		
		height: 7rem;
		background: #f2f1f6;
		position :relative;
		overflow: hidden;
		
	}
	.sle-title{
		left: 50%;
		margin-left: -100px;
		text-align: center;
		position: absolute;
		width: 200px;
		border-bottom-left-radius: 30px;
		border-bottom-right-radius: 30px;
		height: 20px;
		background: #e3e3e3;
		font-size: .23rem;
		color: #3C3C3C;
	}
	.sle-zuo-bigbox{
		height: 5rem;
	}
	.sle-zuo-box{
		height: 5rem;
		margin-top: 20px;
		overflow-x: scroll;
	}
	.xing{
		position: relative;
		top: 1rem;
		left: .6rem;
		width: 1000px;
		height: .5rem;
		
	}
	.xing-num{
		position: absolute;
		left: -.6rem;
		height: .5rem;
		line-height: .5rem;
		font-size: .2rem;
	}
	.ge{
		
		width: .3rem;
		height: .3rem;
		float: left;
		margin-left: 5px;
	}
	.E{
		/*background: white;*/
	}
	.N{
		background: url(../../public/img/kong.png)no-repeat 100% 100%;
		background-size: 100%;
	}
	.LK{
		background:url(../../public/img/you.png)no-repeat 100% 100%;
		background-size: 100%;
	}
	.green{
		background: url(../../public/img/xuan.png)no-repeat 100% 100%;
		background-size:100%;
	}
	.qinglv{
		background: url(../../public/img/qinglv.png)no-repeat 100% 100%;
		background-size:100%;
	}
	.sle-but{
width: 300px;
    height: 30px;
    position: absolute;
    bottom: 4px;
    left: 50px;
    font-size: .23rem;
	}
	.sle-but>span{
		display: inline-block;
		width: .4rem;
		height: .4rem;
		margin-left: 10px;
	}
	.tuijian{
		padding-top: 15px;
		padding-left: 15px;
		font-size: .3rem;
	}
	.tuijian>button{
		width: 90%;
		margin-left: 5%;
		border: none;
		margin-top: 20px;
		height: 40px;
		background: #f90;
	}
</style>