<template>
	<div class="bigbox">
		<div class="header">
			<div @click="b">
				<div @click="returns" class="return">
					<</div>
				</div>
			<div class="title">猫眼电影</div>
		</div>
		<div class="sign-header">
			<div @click="meituanClick" :class="meituan? 'act':''">美团账号登陆</div>
			<div @click="phoneClick" :class="phone? 'act':''">手机验证登陆</div>
		</div>
		<div class="tiao-box">
			<div ref="tiao" class="tiao"></div>
		</div>
		<div class="meituan-box" v-if="meituan">
			<div class="meituan-id">
				<input  placeholder="账号/手机/Email" type="text"/>
			</div>
			<div class="meituan-paw">
				<input type="text" placeholder="请输入你的密码"/>
			</div>
		</div>
		<div class="phone-box" v-if="phone">
			<div class="phone-id">
				<span>获取验证码</span>
				<input  placeholder="请输入手机号" type="text"/>
			</div>
			<div class="phone-paw">
				<input type="text" placeholder="请输入短信验证码"/>
			</div>
		</div>
		<div @click="sign" class="sign">登录</div>
		<div class="zhuce">
			<span>立即注册</span>
			<span>找回密码</span>
		</div>
		<div class="sign-but">
			<span>猫眼电影</span>
			<span>客服电话</span>
			<span>400-670-5335</span>
		</div>
	</div>
</template>

<script>
	export default{
		name:'Sign',
		inject:['app'],
		data(){
			return{
				meituan:true,
				phone:false
			}
		},
		methods:{
			sign(){
				this.app.signup = true
				this.app.bottom = true
				this.$router.replace('/mine')
			},
			b() {
				this.$emit('b', true)
			},
			returns() {
				this.$router.replace('/')
				this.app.bottom = true
			},
			meituanClick(){
				if(this.meituan == false){
					this.phone = false
					this.meituan = true
					this.$refs.tiao.style.left = 0 + 'px'
					
				}else{
					this.meituan = true
					this.$refs.tiao.style.left = 0 + 'px'
				}
			},
			phoneClick(){
				if(this.phone == false){
					this.phone = true
					this.meituan = false
					this.$refs.tiao.style.left = 50 + '%'
				}else{
					this.phone = true
					this.$refs.tiao.style.left = 50 + '%'
				}
			}
		}
	}
</script>

<style>
	.bigbox{
		background: #f5f5f5;
		width: 100%;
		height: 100vh;
	}
	.return {
		position: absolute;
		left: 10px;
		width: 50px;
	}
	.sign-header{
		width: 100%;
		display: flex;
		height: 50px;
		background: white;
	}
	.sign-header>div{
		width: 50%;
		font-size: .3rem;
		text-align: center;
		line-height: 50px;
	}
	.act{
		color: #F03D37;
	}
	.tiao-box{
		position: relative;
		height: 5px;
	}
	.tiao{
		transition: all .5s;
		background: #F03D37;
		position: absolute;
		left: 0px;
		height: 5px;
		width: 50%;
	}
	.meituan-box,.phone-box{
		background: white;
		height: 100px;
	}
	.meituan-id,.meituan-paw,.phone-id,.phone-paw{
		height: 50%;
		border-bottom: .1px solid #F5F5F5;
	}
	.meituan-id>input,.meituan-paw>input,.phone-id>input,.phone-paw>input{
		transform: translateY(-25px);
		height: .4rem;
		border: none;
		outline-style: none;
		font-size: .32rem;
		width: 60%;
		padding-left: 10px;
		margin-left: 10px;
	}
	.phone-paw>input{
		background: rgba(48,48,48,.5);
		height: .5rem;
		width: 90%;
		border-radius: 8px;
		padding-left: 10px;
	}
	.phone-id{
		position: relative;
	}
	.phone-id>span{
		position: absolute;
		right: .3rem;
		background: rgba(48,48,48,.5);
		width: 1.8rem;
		height: .5rem;
		font-size: .28rem;
		line-height: .5rem;
		text-align: center;
		color: white;
		top: .2rem;
		border-radius: 8px;
		display: inline-block;
	}
	.sign{
		width: 90%;
		margin-left: 5%;
		height: 40px;
		background: #F03D37;
		color: white;
		margin-top: 20px;
		font-size: .3rem;
		line-height: 40px;
		text-align: center;
	}
	.zhuce{
		top: 10px;
		position: relative;
	}
	.zhuce>span{
		color: #F03D37;
		position: absolute;
		font-size: .25rem;
	}
	.zhuce>span:first-of-type{
		left: 15px;
	}
	.zhuce>span:last-of-type{
		right: 15px;
	}
	.sign-but{
		display: flex;
		position: relative;
		width: 300px;
		margin: 0 auto;
		justify-content: space-around;
		top: .8rem;
	}
	.sign-but>span{
		font-size: .25rem;
	}
	.sign-but>span:last-of-type{
		color: #F03D37;
	}
</style>