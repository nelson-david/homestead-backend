const request = require("supertest");
const database = require("../../database/database");
const config = require("../../config")["development"];
const makeApp = require("../../app.js");
const app = makeApp(database, config);

const mongoose = require("mongoose");
const randomid = require("randomid");

beforeAll(async() => {
	const mongoURL = "mongodb://localhost:27017/homeStead";
	const options = {
		useNewUrlParser:  true,
		useUnifiedTopology:  true,
		useFindAndModify: false
	};
	await mongoose.connect(mongoURL, options);
})

afterAll((done) => {
	mongoose.connection.close();
	done();
})

var token;
var post_id;

const id = randomid(6)
const username = id + "name"
const email = id + "@gmail.com"
const password = id + "password"

// Authentication Routes Unit Testing
describe("POST authentication routes", () => {
	describe("given the neccessary credentials", () => {
		
		test("creating a new user using the email, username, and password credentials",
			async() => {
			const response = await request(app).post("/api/auth/register/").send({
				username: username,
				email: email,
				password: password,
				dob: new Date(),
			})
			expect(response.statusCode).toBe(200);
		})
		test("authenticating user using username and password", async() => {
			const response = await request(app).post("/api/auth/login/").send({
				username: username,
				password: password
			})
			expect(response.body.token).toBeDefined();
			expect(response.statusCode).toBe(200);

			token = response.body.token;
		})
		test("get current user after login", async () => {
			const response = await request(app)
				.get("/api/current_user")
				.set('Authorization', token)
			expect(response.statusCode).toBe(200);
		})
	})
})

//Post Routes Unit Testing
describe("POST post routes", () => {
	describe("addding, deleting and updating post in the database", () => {
		test("creating a new post", async() => {
			const response = await request(app)
				.post("/api/post/add/")
				.send({body: randomid(45)})
				.set('Authorization', token)
			expect(response.statusCode).toBe(200);
			expect(response.body.message).toBeDefined();
			expect(response.body.post).toBeDefined();
			post_id = response.body.post._id;
		})
		test("deleting created post", async() => {
			console.log("post_id: ", post_id)
			const response = await request(app)
				.delete('/api/post/' + post_id + '/delete/')
				.set("Authorization", token)
			expect(response.statusCode).toBe(200);
			expect(response.body.message).toBeDefined();
		})
	})
})