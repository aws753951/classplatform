import React, { useState, useEffect } from "react";
import CourseService from "../services/CourseService";
import { useNavigate } from "react-router-dom";

const Postcourse = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [url, setURL] = useState("");
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
  }, []);

  const handlePostCourse = () => {
    CourseService.post(title, description, url)
      .then(() => {
        window.alert("新課程已經被建立，現在幫你導到搜尋課程的頁面");
        navigate("/search");
      })
      .catch((err) => {
        setMessage(err.response.data);
      });
  };

  const handleContent = (e) => {
    if (!currentUser) {
      window.alert("你還沒登入喔，請登入後再查看課程內容");
      navigate("/login");
    } else {
      currentUser.user["course"] = e.target.id;
      setCurrentUser(currentUser);
      navigate("/enroll");
    }
  };

  return (
    <div>
      {/* !currentUser not work, need futher check */}
      {!currentUser && <div>請先登入喔</div>}
      {currentUser.user.role === "student" && <div>只有講師才能新增課程喔</div>}
      {currentUser.user.role === "instructor" && (
        <>
          <h3>請新增課程</h3>
          {message && <div>{message}</div>}
          <input
            type="text"
            placeholder="課程名稱"
            onChange={handleChangeTitle}
          />
          <textarea
            name="description"
            cols="30"
            rows="10"
            placeholder="課程描述"
            onChange={handleChangeDesciption}
          ></textarea>
          <textarea
            name="url"
            cols="30"
            rows="3"
            placeholder="請貼上Youtube上方網址或者透過Youtube內建分享按鈕複製連結"
            onChange={handleChangeURL}
          ></textarea>
          <button onClick={handlePostCourse}>立即新增課程</button>
          <h3>已創建的課程</h3>
        </>
      )}

      {courseData &&
        currentUser.user.role === "instructor" &&
        courseData.map((course) => (
          <div key={course._id}>
            <h3>課堂標題: {course.title}</h3>
            <p>上傳時間:{course.date}</p>
            <p>註冊人數:{course.students.length}</p>
            <p>讚: {course.good.length}</p>
            <p>爛: {course.bad.length}</p>
            <button id={course._id} onClick={handleContent}>
              查看課程內容
            </button>
          </div>
        ))}
    </div>
  );
};

export default Postcourse;
