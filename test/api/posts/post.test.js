const request = require("supertest");
const app = require("../../../app.js");
const mongoose = require("mongoose");

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

describe("POST /api/auth/register/", () => {

	describe("given the neccessary credentials", () => {

		test("should respond with a 200 status code", async() => {
			const response = await request(app).post("/api/auth/register/").send({
				username: "username",
				email: "username@gmail.com",
				password: "username8899",
				dob: new Date(),
			})
			expect(response.statusCode).toBe(200);
		})

	})

	describe("when the username and password is missing", () => {
		
	})

})