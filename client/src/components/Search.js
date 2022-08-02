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
      <button onClick={sortGood}>點讚數排列</button>
      <button onClick={sortRegister}>熱門度排列</button>
      {courseData &&
        courseData.map((course) => (
          <div key={course._id}>
            <h3>課堂標題: {course.title}</h3>
            <h4>講師名稱: {course.instructor.username}</h4>
            <h4>講師信箱: {course.instructor.email}</h4>
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
