const LoginController = require("./Controllers/LoginController.js");
const { createTestUser } = require("./utils/createTestUser.js");

describe("User controller tests", () => {
  let testUser;
  let token;

  beforeAll(async () => {
    testUser = await createTestUser();

    const tokenResponse = await LoginController.getToken(
      testUser.userName,
      testUser.password
    );

    if (tokenResponse.status === "Failed" || !tokenResponse.token) {
      const authResponse = await LoginController.isAuthorized(
        testUser.userName,
        testUser.password
      );

      expect(authResponse.status).toBe(200);

      const secondTry = await LoginController.getToken(
        testUser.userName,
        testUser.password
      );

      expect(secondTry.token).toBeDefined();
      token = secondTry.token;
    } else {
      token = tokenResponse.token;
    }
  });

  test("should authorize the user", async () => {
    const response = await LoginController.isAuthorized(
      testUser.userName,
      testUser.password
    );

    expect(response.status).toBe(200);
    expect(response.data).toBe(true);
  });

  test("should get user info", async () => {
    const response = await LoginController.getUserInfo(testUser.userId, token);

    expect(response.status).toBe(200);
    expect(response.data.userId).toBe(testUser.userId);
    expect(response.data.username).toBe(testUser.userName);
  });

  test("should delete the user", async () => {
    const response = await LoginController.deleteUser(testUser.userId, token);
    expect(response.status).toBe(204);
  });
});
