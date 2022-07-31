import React, { useState, useEffect } from "react";
import CourseService from "../services/CourseService";

const Postcourse = ({ currentUser, setCurrentUser }) => {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [url, setURL] = useState(0);
  let [message, setMessage] = useState("");

  let [courseData, setCourseData] = useState([]);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDesciption = (e) => {
    setDescription(e.target.value);
  };
  const handleChangeURL = (e) => {
    setURL(e.target.value);
  };

  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
    } else {
      _id = "";
    }

    if (currentUser.user.role === "instructor") {
      CourseService.getInstructorCourses(_id)
        .then((item) => {
          setCourseData(item.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  const handlePostCourse = () => {
    CourseService.post(title, description, url)
      .then(() => {
        window.alert("新課程已經被建立");
      })
      .catch((err) => {
        setMessage(err.response.data);
      });
  };
  return (
    <div>
      <h3>請新增課程</h3>
      {message && <div>{message}</div>}
      <input type="text" placeholder="課程名稱" onChange={handleChangeTitle} />
      <textarea
        name="description"
        cols="30"
        rows="10"
        placeholder="課程描述"
        onChange={handleChangeDesciption}
      ></textarea>
      <input
        type="text"
        placeholder="請貼上yt連結"
        onChange={handleChangeURL}
      />
      <button onClick={handlePostCourse}>立即新增課程</button>
      <h3>已創建的課程</h3>
      {courseData &&
        courseData.map((course) => (
          <div>
            <h3>課堂標題: {course.title}</h3>
            <p>上傳時間:{course.date}</p>
            <p>註冊人數:{course.students.length}</p>
            <p>讚: {course.good.length}</p>
            <p>爛: {course.bad.length}</p>
            <button>查看課程內容</button>
          </div>
        ))}
    </div>
  );
};

export default Postcourse;
