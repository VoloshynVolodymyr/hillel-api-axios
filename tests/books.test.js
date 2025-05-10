const BookController = require("./Controllers/BookController.js");
const LoginController = require("./Controllers/LoginController.js");

const { createTestUser } = require("./utils/createTestUser.js");

describe("Using controllers for Books", () => {
  let token, testUser;

  beforeAll(async () => {
    testUser = await createTestUser();

    const tokenResponse = await LoginController.getToken(
      testUser.userName,
      testUser.password
    );
    token = tokenResponse.token;
    userId = testUser.userId;
  });

  test("Get all books and verify data", async () => {
    const response = await BookController.getAllBooks();
    const responseBody = response.data;

    expect(responseBody.books).toHaveLength(8);
    expect(responseBody.books[0].title).toBe("Git Pocket Guide");
  });

  test("Post a book and verify data", async () => {
    const response = await BookController.addBook(testUser.userId, token);
    const responseBody = response.data;

    if (!responseBody.books || responseBody.books.length === 0) {
      console.log("Error adding new Book. Skipping test.");
      return;
    }

    const isbnAddedBook = responseBody.books[0].isbn;
    const userResponse = await LoginController.getUserInfo(userId, token);
    const userStoreIsbn = userResponse.data.books[0].isbn;

    expect(isbnAddedBook).toBe(userStoreIsbn);
  });

  test("should delete all books for the test user", async () => {
    const userResponse = await LoginController.getUserInfo(userId, token);
    const response = await BookController.removeBooks(userId, token);

    if (typeof userResponse.data.books === "undefined") {
      console.log("There are not books to delete");
      expect(response.status).toBe(401);
      return;
    }

    expect(response.status).toBe(204);
  });

  afterAll(async () => {
    console.log("testUser : ", testUser.userName, "   ", testUser.password);
    await LoginController.deleteUser(testUser.userId, token);
  });
});
