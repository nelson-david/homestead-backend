module.exports = {
	development: {
		port: process.env.PORT || 7500,
		origin: "http://localhost:3000",
		buildOrigin: "https://brave-hopper-6e87df.netlify.app",
		devOrigin: "http://192.168.43.191:3000",
		atlasURL: "mongodb+srv://DavidNelson:xCrNyznFBvl3fnM1@homestead-db.gjiqg.mongodb.net/homesteadapi-db?retryWrites=true&w=majority",
		secDevOrigin: "http://192.168.43.192:3000",
		mongoURL: "mongodb://localhost:27017/homeStead",
		TOKEN_SECRET: 'dkngfngngg'
	},
	production: {
		origin: "http://5272a9c0b780.ngrok.io",
		TOKEN_SECRET: 'finigojog'
	}
}
