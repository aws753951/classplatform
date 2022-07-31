import axios from "axios";

const API_URL = "http://localhost:8080/api/search";

class SearchService {
  // get all courses
  getCourses() {
    return axios.get(API_URL + "/");
  }
  // get course by name
  getCourseByName(name) {
    return axios.get(API_URL + "/" + name);
  }
}

export default new SearchService();
