const { faker } = require("@faker-js/faker");
const LoginController = require("../Controllers/LoginController.js");

async function createTestUser() {
  const fakeUser = {
    username: faker.internet.username(),
    password: "A" + faker.internet.password() + "!",
  };

  const response = await LoginController.createNewUser(
    fakeUser.username,
    fakeUser.password
  );
  const tokenResponse = await LoginController.getToken(
    fakeUser.username,
    fakeUser.password
  );

  return {
    status: response.status,
    userId: response.data.userID,
    userName: response.data.username,
    userBooks: response.data.books,
    token: tokenResponse.token,
    password: fakeUser.password,
  };
}

module.exports = { createTestUser };
