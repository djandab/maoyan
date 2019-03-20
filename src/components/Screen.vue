<template>
	<div>
		<div class="screen">
			<div @click="ct" :class="city? 'actuve':''" class="city">全城<span class="iconfont" :class="city?'icon-triangle-up':'icon-triangle-down'"></span></div>|
			<div @click="br" :class="brand? 'actuve':''" class="brand">品牌<span class="iconfont" :class="brand?'icon-triangle-up':'icon-triangle-down'"></span></div>|
			<div @click="ch" :class="characteristic? 'actuve':''" class="characteristic">特色<span class="iconfont" :class="characteristic?'icon-triangle-up':'icon-triangle-down'"></span></div>
		</div>
		<div class="city-box" :class="city? 'actuve-box':''">
			<div class="city-header">
				<div class="business" @click="cityAact" :class="citybusiness?'city-heade-active':''">商区</div>
				<div class="metro" @click="cityBact" :class="citymetro?'city-heade-active':''">地铁站</div>
			</div>
			<div>
				<div class="citybusiness-box" v-show="citybusiness">
					<div class="citybusiness-left">
						<div @click="incity(index)" :class="{inleft:cityid==index}" v-for="(item,index) in subItems" class="citybusiness-left-cl">
							{{item.name}}({{item.count}})
						</div>
					</div>
					<div class="citybusiness-right">
						<div @click.capture="citybusinessbox(index)" :class="{inright:cityid==index}" v-for="(item,index) in subItems" class="citybusiness-right-cl">
							<div @click="citybusinessright(i)" v-for="(it,i) in item.subItems" class="citybusiness-right-in">
								{{it.name}}<span>{{it.count}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="citybusiness-box" v-show="citymetro">
					<div class="citybusiness-left">
						<div @click="inmetro(index)" :class="{inleft:metroid==index}" v-for="(item,index) in metro" class="citybusiness-left-cl">
							{{item.name}}({{item.count}})
						</div>
					</div>
					<div class="citybusiness-right">
						<div @click.capture="metrobusinessbox(index)" :class="{inright:metroid==index}" v-for="(item,index) in metro" class="citybusiness-right-cl">
							<div @click="metrobusinessright(i)" v-for="(it,i) in item.subItems" class="citybusiness-right-in">
								{{it.name}}<span>{{it.count}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="brand-box" :class="brand? 'actuve-box':''">
			<div @click="brandclick(ind)" class="brand-list" v-for="(brandi,ind) in brands" :key="ind">
				{{brandi.name}}<span>{{brandi.count}}</span>
			</div>
		</div>
		<div class="characteristic-box" :class="characteristic? 'actuve-box':''">
			<div class="chara-cont-box">
				<div class="characteristic-title">特色功能</div>
				<div class="service-box">
					<div @click="serviceatclick(ind)" :class="{serviceact:serviceid==ind}" class="service" v-for="(chara,ind) in service" :key="ind">
						{{chara.name}}
					</div>
				</div>
				<div class="characteristic-title">特殊厅</div>
				<div class="halltype-box">
					<div v-for="(hall,ind) in hallType" @click="hallclick(ind)" :class="{hallact:hallid==ind}" :key="ind" class="halltype">
						{{hall.name}}
					</div>
				</div>
			</div>
			<div class="chara-but-box">
				<div @click="resetclick" class="chara-reset">重置</div>
				<div @click="sendclick" class="chara-send">确认</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Screen',
		props: ['screens', 'subItems', 'metro', 'brands', 'service', 'hallType'],
		inject: ['cinema'],
		data() {
			return {
				datetime: '',
				city: false,
				brand: false,
				characteristic: false,
				citybusiness: true,
				citymetro: false,
				metroid: 0,
				cityid: 0,
				cityleftid: 0,
				cityrightid: 0,
				cityindex: 1,
				serviceid: 0,
				serviceindex: -1,
				hallid: 0,
				hallindex: -1
			}
		},
		mounted() {
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
		},
		methods: {
			serviceatclick(ind) {
				this.serviceid = ind
				console.log(this.service[ind].id)
				this.serviceindex = this.service[ind].id
			},
			hallclick(ind) {
				this.hallid = ind
				console.log(this.hallType[ind].id)
				this.hallindex = this.hallType[ind].id
			},
			brandclick(ind) {
				console.log(ind)
				console.log(this.brands[ind].id)
				this.$indicator.open({
					text: '加载中...',
					spinnerType: 'snake'
				});
				this.$http.get('/api/ajax/cinemaList', {
						params: {
							day: this.datetime,
							offset: 0,
							limit: 20,
							districtId: -1,
							lineId: -1,
							hallType: -1,
							brandId: this.brands[ind].id,
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
						this.cinema.cinema = res.data.cinemas
						this.$indicator.close();
						console.log(this.cinemas)
					})
				this.brand = false
			},
			metrobusinessbox(index) {
				this.cityleftid = this.metro[index].id
				this.cityindex = index
			},
			metrobusinessright(i) {
				this.cityrightid = this.metro[this.cityindex].subItems[i].id
				this.$indicator.open({
					text: '加载中...',
					spinnerType: 'snake'
				});
				this.$http.get('/api/ajax/cinemaList', {
						params: {
							day: this.datetime,
							offset: 0,
							limit: 20,
							districtId: -1,
							lineId: this.cityleftid,
							hallType: -1,
							brandId: -1,
							serviceId: -1,
							areaId: -1,
							stationId: this.cityrightid,
							item: '',
							updateShowDay: true,
							reqId: new Date().getTime(),
							cityId: 20
						}
					})
					.then(res => {
						this.cinema.cinema = res.data.cinemas
						this.$indicator.close();
					})
				this.city = false

			},
			inmetro(index) {
				this.metroid = index
			},
			citybusinessbox(index) {
				console.log(index)
				this.cityleftid = this.subItems[index].id
				console.log(this.cityleftid)
				this.cityindex = index
			},
			citybusinessright(i) {
				this.cityrightid = this.subItems[this.cityindex].subItems[i].id
				console.log(this.cityrightid)
				this.$indicator.open({
					text: '加载中...',
					spinnerType: 'snake'
				});
				this.$http.get('/api/ajax/cinemaList', {
						params: {
							day: this.datetime,
							offset: 0,
							limit: 20,
							districtId: this.cityleftid,
							lineId: -1,
							hallType: -1,
							brandId: -1,
							serviceId: -1,
							areaId: this.cityrightid,
							stationId: -1,
							item: '',
							updateShowDay: true,
							reqId: new Date().getTime(),
							cityId: 20
						}
					})
					.then(res => {
						this.cinema.cinema = res.data.cinemas
						this.$indicator.close();
					})
				this.city = false

			},
			incity(i) {
				this.cityid = i
			},
			resetclick() {
				this.serviceid = 0
				this.hallid = 0
				this.serviceindex = -1
				this.hallindex = -1
			},
			sendclick() {
				this.$indicator.open({
					text: '加载中...',
					spinnerType: 'snake'
				});
				this.$http.get('/api/ajax/cinemaList', {
						params: {
							day: this.datetime,
							offset: 0,
							limit: 20,
							districtId: -1,
							lineId: -1,
							hallType: this.hallindex,
							brandId: -1,
							serviceId: this.serviceindex,
							areaId: -1,
							stationId: -1,
							item: '',
							updateShowDay: true,
							reqId: new Date().getTime(),
							cityId: 20
						}
					})
					.then(res => {
						this.cinema.cinema = res.data.cinemas
						this.$indicator.close();
					})
				this.characteristic = false
			},
			cityAact() {
				if(this.citybusiness == false) {
					this.citybusiness = true,
						this.citymetro = false
				} else {
					this.citybusiness = true
				}
			},
			cityBact() {
				if(this.citymetro == false) {
					this.citybusiness = false
					this.citymetro = true
				} else {
					this.citymetro = true
				}
			},
			ct() {
				if(this.city == false) {
					this.city = true
					this.brand = false,
						this.characteristic = false
				} else {
					this.city = false
					this.brand = false,
						this.characteristic = false
				}
			},
			br() {
				if(this.brand == false) {
					this.city = false
					this.brand = true,
						this.characteristic = false
				} else {
					this.city = false
					this.brand = false,
						this.characteristic = false
				}
			},
			ch() {
				if(this.characteristic == false) {
					this.city = false
					this.brand = false,
						this.characteristic = true
				} else {
					this.city = false
					this.brand = false,
						this.characteristic = false
				}
			},
		}
	}
</script>

<style scoped>
	.screen {
		font-size: .2rem;
		line-height: 50px;
		width: 100%;
		height: 50px;
		border-bottom: .3px solid #e5e5e5;
		display: flex;
		justify-content: space-around;
	}
	
	.city,
	.brand,
	.characteristic {
		text-align: center;
		width: 30%;
	}
	
	.city-box,
	.brand-box,
	.characteristic-box {
		width: 100%;
		height: 0px;
		position: relative;
		z-index: 5;
		overflow: hidden;
		transition: all .5s;
	}
	
	.brand-box {
		overflow: scroll;
		overflow-x: hidden;
	}
	
	.brand-list {
		position: relative;
		height: 45px;
		line-height: 45px;
		padding-left: 20px;
		border-bottom: .3px solid #E6E6E6;
		font-size: .25rem;
	}
	
	.brand-list>span {
		position: absolute;
		right: 20px;
	}
	
	.brand-list:first-of-type {
		color: #F03D37;
	}
	
	.actuve-box {
		width: 100%;
		height: 7rem;
		position: relative;
		z-index: 5;
	}
	
	.actuve {
		color: #e54847;
	}
	
	.city-header {
		width: 100%;
		height: 40px;
		display: flex;
		justify-content: space-around;
		font-size: .3rem;
	}
	
	.city-header>div {
		width: 50%;
		text-align: center;
		height: .6rem;
		line-height: .6rem;
	}
	
	.city-heade-active {
		border-bottom: 2px solid #F03D37;
		color: #F03D37;
	}
	
	.citybusiness-box {
		display: flex;
		justify-content: center;
	}
	
	.citybusiness-left {
		width: 30%;
		height: 6.4rem;
		overflow: scroll;
		overflow-x: hidden;
	}
	
	.citybusiness-right {
		width: 70%;
	}
	
	.citybusiness-left-cl {
		width: 100%;
		font-size: .25rem;
		height: 50px;
		text-align: center;
		line-height: 50px;
	}
	
	.citybusiness-right-cl {
		width: 100%;
		font-size: .25rem;
		display: none;
		height: 6.3rem;
		overflow: scroll;
		overflow-x: hidden;
	}
	
	.inleft {
		background: #f5f5f5;
		color: #F03D37;
	}
	
	.inright {
		display: block;
		background: #f5f5f5;
	}
	
	.citybusiness-right-in:first-of-type {
		color: #F03D37;
	}
	
	.citybusiness-right-in {
		padding-left: 20px;
		width: 100%;
		height: 50px;
		line-height: 50px;
		position: relative;
	}
	
	.citybusiness-right-in>span {
		position: absolute;
		right: 50px;
	}
	
	.characteristic-title {
		font-size: .34rem;
		color: #969896;
		padding-left: 15px;
		margin-top: 20px;
	}
	
	.service,
	.halltype,
	.chara-reset,
	.chara-send {
		float: left;
		width: 21.3%;
		height: 30px;
		padding: 3px 0;
		margin-right: 3%;
		margin-top: 15px;
		line-height: 30px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: center;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: .25rem;
		color: #ccc;
	}
	
	.service-box,
	.halltype-box {
		height: 30px;
		margin-left: 15px;
		padding-bottom: 15px;
		display: block;
	}
	
	.serviceact,
	.hallact {
		background: #fcf0f0;
		color: #f03d37;
		border: 1px solid #f03d37
	}
	
	.chara-cont-box {
		height: 5rem;
		/*	border-bottom: .2px solid #ccc;*/
		overflow: scroll;
		overflow-x: hidden;
	}
	
	.chara-but-box {
		background: #fafafa;
		top: 20px;
		padding-left: 20px;
		position: relative;
		height: 1.5rem;
		border-bottom: .2px solid #ccc;
		border-top: .2px solid #ccc;
	}
	
	.chara-reset,
	.chara-send {
		position: absolute;
		top: 50%;
		margin-top: -15px;
		color: black;
	}
	
	.chara-send {
		right: 10px;
		background: #f03d37;
		border: 1px solid #f03d37;
		color: #fff
	}
</style>