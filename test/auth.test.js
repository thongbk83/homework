//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

const User = require("../models/User");

chai.use(chaiHttp);

describe("Auth", () => {
    before(done => {
        User.remove({ email: "john@doe.com" }, err => {
            done();
        });
    });

    after(done => {
        User.remove({ email: "john@doe.com" }, err => {
            done();
        });
    });

    describe("User login", () => {
        it("should return 200 and token for valid credentials", done => {
            //mock invalid user input
            let new_user = new User({
                name: "Joe",
                email: "john@doe.com",
                password: "password",
                avatar: "http://image.com",
                date: "09/10/2017"
            });
            const valid_input = {
                email: "john@doe.com",
                password: "password"
            };

            //register user then test
            chai.request(server)
                .post("/api/users")
                .send(new_user)
                .end((err, res) => {
                    //assertions
                    res.should.have.status(200);
                    res.body.should.have.property("token");
                    chai.request(server)
                        .post("/api/auth")
                        .send(valid_input)
                        .end((err, res) => {
                            //assertions
                            console.log(res.body);
                            res.should.have.status(200);
                            res.body.should.have.property("token");
                            done();
                        });
                });
        });
    });
});
