module.exports = {
	development: {
		environment: "development",
		port: process.env.PORT || 7500,
		origin: "http://localhost:3000",
		dbURL: "mongodb://localhost:27017/homeStead",
		TOKEN_SECRET: 'dkngfngngg',
		options: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		}
	},
	production: {
		environment: "production",
		port: process.env.PORT || 7500,
		origin: "https://homestead-singles.netlify.app",
		dbURL: "mongodb+srv://DavidNelson:xCrNyznFBvl3fnM1@homestead-db.gjiqg.mongodb.net/homesteadapi-db?retryWrites=true&w=majority",
		TOKEN_SECRET: 'dkngfngngg',
		options: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		}
	}
}
