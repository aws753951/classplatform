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
  enroll(_id, user_id) {
    if (localStorage.getItem("user")) {
      this.token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      this.token = "";
    }
    return axios.post(
      API_URL + "/enroll/" + _id,
      { user_id },
      {
        headers: { Authorization: this.token },
      }
    );
  }

  // giv course good or bad - student
  rating(_id, user_id, rating) {
    if (localStorage.getItem("user")) {
      this.token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      this.token = "";
    }
    return axios.post(
      API_URL + "/rating/" + _id,
      { user_id, rating },
      {
        headers: { Authorization: this.token },
      }
    );
  }

  // read----------------
  // get course with id
  getCourseWithID(_id) {
    if (localStorage.getItem("user")) {
      this.token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      this.token = "";
    }
    return axios.get(API_URL + "/" + _id, {
      headers: { Authorization: this.token },
    });
  }
  // get students enrolled courses - student
  getStudentCourses(_id) {
    if (localStorage.getItem("user")) {
      this.token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      this.token = "";
    }
    return axios.get(API_URL + "/enroll/" + _id, {
      headers: { Authorization: this.token },
    });
  }
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
  deleteCourse(_id) {
    if (localStorage.getItem("user")) {
      this.token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      this.token = "";
    }
    return axios.delete(API_URL + "/" + _id, {
      headers: { Authorization: this.token },
    });
  }
}

export default new CourseService();
