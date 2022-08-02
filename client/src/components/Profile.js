import React, { useState, useEffect } from "react";
import CourseService from "../services/CourseService";
import { useNavigate } from "react-router-dom";

const Profile = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [courseData, setCourseData] = useState([]);

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

  const sortGood = () => {
    let temp = [].concat(courseData);
    setCourseData(
      temp.sort((a, b) => (a.good.length > b.good.length ? -1 : 1))
    );
  };

  const sortRegister = () => {
    let temp = [].concat(courseData);
    setCourseData(
      temp.sort((a, b) => (a.students.length > b.students.length ? -1 : 1))
    );
  };

  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role === "student") {
        CourseService.getStudentCourses(_id)
          .then((item) => {
            setCourseData(item.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (currentUser.user.role === "instructor") {
        CourseService.getInstructorCourses(_id)
          .then((item) => {
            setCourseData(item.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      _id = "";
    }
  }, []);

  return (
    <div className="profile">
      {!currentUser && (
        <div className="notlogin">
          你是不是沒登入就用網址搜特定頁面?
          <br /> 抓到了齁,趕緊點右上角的登入鈕啦
        </div>
      )}
      <div className="topsection">
        {currentUser && currentUser.user.role === "student" && (
          <h1>歡迎來到學生頁面</h1>
        )}
        {currentUser && currentUser.user.role === "instructor" && (
          <h1>歡迎來到講師頁面 </h1>
        )}
        {currentUser && (
          <div>
            <h3>你的用戶名: {currentUser.user.username}</h3>
            <h4>你的Email: {currentUser.user.email}</h4>
            <p>上次登入的時間為:{currentUser.user.lastLogin}</p>
          </div>
        )}

        {currentUser && currentUser.user.role === "instructor" && (
          <div>以下為你已創建的課程</div>
        )}
        {currentUser && currentUser.user.role === "student" && (
          <div>以下為你已註冊的課程</div>
        )}
      </div>
      {currentUser && courseData && (
        <div className="button">
          <button onClick={sortGood}>點讚數排列</button>
          <button onClick={sortRegister}>熱門度排列</button>
        </div>
      )}

      <div className="bottomsection">
        {currentUser &&
          courseData &&
          courseData.map((course) => (
            <div key={course._id} className="card">
              <h3>課堂標題: {course.title}</h3>
              <h4>講師名稱: {course.instructor.username}</h4>
              <h4>講師信箱: {course.instructor.email}</h4>
              <hr />
              <p>上傳時間:{course.date}</p>
              <p>註冊人數:{course.students.length}</p>
              <p>讚: {course.good.length}</p>
              <p>爛: {course.bad.length}</p>
              <div className="button">
                <button id={course._id} onClick={handleContent}>
                  查看課程內容
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;
