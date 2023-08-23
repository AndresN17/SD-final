const assert = require("assert");
const { When, Then } = require("cucumber");
const { login } = require("../../cucumber");


When("the login user email is andresnoboa17@hotmail.com", function () {
   result = login();
   return 'pending';
});

Then(
    "I should have {string}",
    function (expectedResponse) {
        assert.equal("Succesfully login", expectedResponse);
    }
);