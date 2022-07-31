import React, { useState, useEffect } from "react";
import CourseService from "../services/CourseService";

const Search = ({ currentUser, setCurrentUser }) => {
  let [courseData, setCourseData] = useState(null);

  useEffect(() => {
    CourseService.getCourses()
      .then((item) => {
        setCourseData(item.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h3>搜尋你想要看的課程</h3>
      <input type="text" placeholder="請輸入關鍵字" />
      <button>搜尋</button>
      <button>依照點讚數高至低搜尋</button>
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

export default Search;
