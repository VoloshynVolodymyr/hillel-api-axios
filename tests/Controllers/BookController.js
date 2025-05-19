const BaseController = require("./BaseController.js");

class BookController extends BaseController {
  async getAllBooks() {
    return await this.axiosInstance.get("/BookStore/v1/Books");
  }

  async addBook(userId, token) {
    const response = await this.axiosInstance.get("/BookStore/v1/Books");
    const responseBody = response.data;
    this.axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
    const bookNumber = Math.floor(Math.random() * responseBody.books.length);

    return await this.axiosInstance.post("/BookStore/v1/Books", {
      userId: userId,
      collectionOfIsbns: [{ isbn: responseBody.books[bookNumber].isbn }],
    });
  }

  async removeBooks(userId, token) {
    this.axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
    return await this.axiosInstance.delete("/BookStore/v1/Books", {
      params: {
        UserId: userId,
      },
    });
  }
}

module.exports = new BookController();
