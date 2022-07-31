import axios from "axios";
const API_URL = "http://localhost:8080/api/user";

class AuthService {
  register(username, email, password, password2, role) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      password2,
      role,
    });
  }
  login(email, password, password2) {
    // return an object with token, need to save in localstorage
    return axios.post(API_URL + "/login", { email, password, password2 });
  }
  logout() {
    localStorage.removeItem("user");
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
