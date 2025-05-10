const axios = require("axios").default;

class BaseController {
  constructor() {
    this.axiosInstance = axios.create({
      validateStatus: (status) => true,
      baseURL: "https://bookstore.toolsqa.com",
    });
  }
}

module.exports = BaseController;
