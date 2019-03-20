<template>
	<div class="bigbox">
		<div class="header">
			<div class="title">我的</div>
		</div>
		<div class="mine-header">
			<img src="../../public/img/touxiang.png" />
		</div>

		<div class="orders">
			<div class="orders-title">
				<div class="xian"></div>
				<div class="order">我的订单</div>
			</div>
			<div class="orders-cont">
				<div class="orders-movie">
					<img src="../../public/img/movie.png" />
					<p>电影</p>
				</div>
				<div class="orders-shop">
					<img src="../../public/img/shop.png" />
					<p>商城</p>
				</div>
			</div>
		</div>
		<div class="mine-but">
			<div>在线观影<p>></p></div>
			<div>优惠卷<p>></p></div>
			<div>折扣卡<p>></p></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Mine',
		inject: ['app'],
		beforeRouteEnter(to, from, next) {

			next(vm => {

				let sign = vm.app.signup
				if(sign == false) {
					vm.app.bottom = false
					vm.$router.replace('/sign')
				}
			})
		},
	}
</script>

<style>
	.mine-header {
		background-color: #f03d37;
		background-image: url(../../public/img/background.png);
		background-repeat: no-repeat;
		background-position: 50%;
		background-size: 100% 150px;
		height: 150px;
		overflow: hidden;
		text-align: center;
	}
	
	.mine-header>img {
		display: inline-block;
		margin-top: 30px;
		width: 60px;
		height: 60px;
		border-radius: 60px;
		border: 3px solid #fff;
	}
	
	.orders {
		margin-top: 10px;
		width: 100%;
		height: 3rem;
		background: white;
	}
	.orders-title{
		position: relative;
		height: 30px;
		top: 10px;
		font-size: .28rem;
	}
	.order{
		width: 80px;
		position: absolute;
		left: 50%;
		text-align: center;
		margin-left: -40px;
		background: white;
		z-index: 3;
	}
	.xian{
		width: 150px;
		position: absolute;
		left: 50%;
		z-index: 1;
		top: 8px;
		margin-left: -75px;
		border-top: 1px solid #3C3C3C;

	}
	.orders-cont{
		width: 100%;
		display: flex;
		justify-content:space-around;
		margin-top: 20px;
	}
	.orders-cont>div>img{
		width: 1rem;
		height: 1rem;
		margin-left: 20px;
		margin-right: 20px;
	}
	.orders-cont>div>p{
		font-size: .28rem;
		text-align: center;
	}
	.mine-but{
		margin-top: 10px;
	}
	.mine-but>div{
		height: .8rem;
		border-bottom: .1px solid #B8BBBF;
		box-sizing: border-box;
		font-size: .25rem;
		line-height: .8rem;
		padding-left: 20px;
		background: white;
	}
	.mine-but>div>p{
	float: right;
	margin-right: 20px;
	}	
	/*.container{
	-webkit-box-flex: 1;
    flex: 1;
}
.group{
    margin-top: 10px;
    background: #fff;	
}*/
</style>