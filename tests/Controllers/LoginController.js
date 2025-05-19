const BaseController = require("./BaseController");

class LoginController extends BaseController {
  async getToken(userName, password) {
    const response = await this.axiosInstance.post(
      "/Account/v1/GenerateToken",
      { userName: userName, password: password }
    );
    return response.data;
  }

  async createNewUser(userName, password) {
    const response = await this.axiosInstance.post("/Account/v1/User", {
      userName: userName,
      password: password,
    });
    return response;
  }

  async getUserInfo(userId, token) {
    const response = await this.axiosInstance.get(
      `/Account/v1/User/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  }

  async isAuthorized(userName, password) {
    return await this.axiosInstance.post("/Account/v1/Authorized", {
      userName: userName,
      password: password,
    });
  }

  async deleteUser(userId, token) {
    const response = await this.axiosInstance.delete(
      `/Account/v1/User/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  }
}

module.exports = new LoginController();
