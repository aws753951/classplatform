import axios from "axios";

const API_URL = "http://localhost:8080/api/courses";

class CourseService {
  // create--------------
  // post a new course
  post(title, description, url) {
    if (localStorage.getItem("user")) {
      this.token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      this.token = "";
    }
    return axios.post(
      API_URL,
      { title, description, url },
      { headers: { Authorization: this.token } }
    );
  }
  // enroll a new course - student
  // read----------------

  // get students enrolled courses - student
  // get instructor posted courses - instructor
  getInstructorCourses(_id) {
    if (localStorage.getItem("user")) {
      this.token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      this.token = "";
    }
    return axios.get(API_URL + "/post/" + _id, {
      headers: { Authorization: this.token },
    });
  }
  // update - instructor--------
  // delete - instructor--------
}

export default new CourseService();
