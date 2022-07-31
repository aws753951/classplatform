import React, { useState, useEffect } from "react";
import SearchService from "../services/SearchService";
import { useNavigate } from "react-router-dom";

const Search = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [name, setName] = useState("");
  let [courseData, setCourseData] = useState(null);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleSearch = () => {
    if (!name) {
      SearchService.getCourses()
        .then((item) => {
          setCourseData(item.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      SearchService.getCourseByName(name)
        .then((item) => {
          setCourseData(item.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    SearchService.getCourseByName(name)
      .then((item) => {
        setCourseData(item.data);
      })
      .catch((err) => {
        console.log(err);
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

  useEffect(() => {
    SearchService.getCourses()
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
      <input
        type="text"
        placeholder="請輸入關鍵字"
        onChange={handleChangeName}
      />
      <button onClick={handleSearch}>搜尋</button>
      <button>依照點讚數高至低搜尋</button>
      {courseData &&
        courseData.map((course) => (
          <div key={course._id}>
            <h3>課堂標題: {course.title}</h3>
            <p>上傳時間:{course.date}</p>
            <p>註冊人數:{course.students.length}</p>
            <p>讚: {course.good.length}</p>
            <p>爛: {course.bad.length}</p>
            <button id={course._id} onClick={handleContent}>
              查看課程內容或註冊
            </button>
          </div>
        ))}
    </div>
  );
};

export default Search;
