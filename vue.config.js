module.exports = {
  configureWebpack: {
		devServer:{
			proxy:{
				'/api' :{
					target:'http://m.maoyan.com',
					changeOrigin:true,
					pathRewrite:{
						'^/api':''
					}
				}
			}
		}
  }
}