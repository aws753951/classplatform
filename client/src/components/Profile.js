import React, { useState, useEffect } from "react";
import CourseService from "../services/CourseService";
import { useNavigate } from "react-router-dom";

const Profile = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [courseData, setCourseData] = useState([]);

  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
    } else {
      _id = "";
    }
    if (currentUser.user.role === "student") {
      CourseService.getStudentCourses(_id)
        .then((item) => {
          setCourseData(item.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

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
      {!currentUser && (
        <div className="notlogin">
          你是不是沒登入就用網址搜特定頁面?
          <br /> 抓到了齁,趕緊點右上角的登入鈕啦
        </div>
      )}

      {currentUser && currentUser.user.role === "student" && (
        <h1>歡迎來到學生頁面</h1>
      )}
      {currentUser && currentUser.user.role === "instructor" && (
        <h1>歡迎來到講師頁面 </h1>
      )}
      {currentUser && (
        <div>
          <p>你的username是: {currentUser.user.username}</p>
          <p>你註冊的Email是:{currentUser.user.email}</p>
          <p>上次登入的時間為:{currentUser.user.lastLogin}</p>
          <button>依照上傳時間排列</button>
        </div>
      )}
      {currentUser.user.role === "student" &&
        courseData &&
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

export default Profile;
