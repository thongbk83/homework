//During the test the env variable is set to test
"use strict";
process.env.NODE_ENV = "test";
let mongoose = require("mongoose");

const User = require("../models/User");

let agent;
let token;

describe("Profile Route", function() {
    before(done => {
        agent = require("supertest").agent(require("../server"));

        const new_user = {
            name: "JohnDoe",
            email: "john@doe.com",
            password: "password"
        };

        agent
            .post("/api/users")
            .send(new_user)
            .end((err, response) => {
                token = response.body.token; // save the token!
                done();
            });
    });

    after(done => {
        User.remove({ email: "john@doe.com" }, err => {
            done();
        });
    });

    describe("Post /", function() {
        describe("without authentication header set", function() {
            it("returns a 401", function(done) {
                agent
                    .post("/api/profile")
                    .expect(400)
                    .end(function(err, res) {
                        if (err) return done(err);
                        done();
                    });
            });
        });

        describe("with authentication header set", function() {
            it("show error if profile name and invoice name not the same", function(done) {
                const newProfile = {
                    logoUrl: "logo",
                    name: "kamereo",
                    address: "hai ba trung",
                    district: "1",
                    city: "hcm",
                    phone: "111111",
                    invoiceName: "kamereo1",
                    invoiceAddress: "hai ba trung",
                    invoiceDistrict: "1",
                    invoiceCity: "hcm",
                    invoiceTaxCode: "111"
                };

                agent
                    .post("/api/profile")
                    .set("x-auth-token", token)
                    .send(newProfile)
                    .expect(400)
                    .end(function(err, res) {
                        if (err) return done(err);
                        done();
                    });
            });

            it("add or update new profile success", function(done) {
                const newProfile = {
                    logoUrl: "logo",
                    name: "kamereo",
                    address: "hai ba trung",
                    district: "1",
                    city: "hcm",
                    phone: "111111",
                    invoiceName: "kamereo",
                    invoiceAddress: "hai ba trung",
                    invoiceDistrict: "1",
                    invoiceCity: "hcm",
                    invoiceTaxCode: "111"
                };

                agent
                    .post("/api/profile")
                    .set("x-auth-token", token)
                    .send(newProfile)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        done();
                    });
            });
        });
    });

    describe("GET /", function() {
        describe("without authentication header set", function() {
            it("returns a 401", function(done) {
                agent
                    .get("/api/profile/me")
                    .expect(400)
                    .end(function(err, res) {
                        if (err) return done(err);
                        done();
                    });
            });
        });
        describe("with authentication header set", function() {
            it("returns hello", function(done) {
                agent
                    .get("/api/profile/me")
                    .set("x-auth-token", token)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        done();
                    });
            });
        });
    });
});
