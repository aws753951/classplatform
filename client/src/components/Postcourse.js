import React, { useState } from "react";
import CourseService from "../services/CourseService";
import { useNavigate } from "react-router-dom";

const Postcourse = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [url, setURL] = useState("");
  let [message, setMessage] = useState("");

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDesciption = (e) => {
    setDescription(e.target.value);
  };
  const handleChangeURL = (e) => {
    setURL(e.target.value);
  };

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

  return (
    <div className="postcourse">
      {!currentUser && <div>請先登入喔</div>}
      {currentUser && currentUser.user.role === "student" && (
        <div>只有講師才能新增課程喔</div>
      )}
      {currentUser && currentUser.user.role === "instructor" && (
        <div className="post">
          <h1>請新增課程</h1>
          {message && <div className="message">{message}</div>}
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
        </div>
      )}
    </div>
  );
};

export default Postcourse;
