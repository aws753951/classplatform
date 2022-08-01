import React, { useState, useEffect } from "react";
import CourseService from "../services/CourseService";
import { useNavigate } from "react-router-dom";

const Enroll = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [courseData, setCourseData] = useState(null);
  let [foundUrl, setFoundUrl] = useState(null);

  const deleteCourse = (e) => {
    CourseService.getCourseWithID(e.target.id).then((item) => {
      if (item.data.instructor._id === currentUser.user._id) {
        CourseService.deleteCourse(e.target.id)
          .then(() => {
            window.alert("課程已經被刪除，現在幫你導到搜尋課程的頁面");
            navigate("/search");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        window.alert("只有該講師才能刪除課程");
      }
    });
  };

  useEffect(() => {
    CourseService.getCourseWithID(currentUser.user.course).then((item) => {
      if (item.data.url.match(/v=(.*)/)[1]) {
        setFoundUrl(item.data.url.match(/v=(.*)/)[1]);
      }
      setCourseData(item.data);
    });
    // could'nt put if and else if in useEffect,need check
    CourseService.getCourseWithID(currentUser.user.course).then((item) => {
      if (item.data.url.match(/youtu.be\/(.*)/)[1]) {
        setFoundUrl(item.data.url.match(/youtu.be\/(.*)/)[1]);
      }
      setCourseData(item.data);
    });
  }, []);

  return (
    <div>
      {courseData && (
        <>
          <h1>{courseData.title}</h1>
          <p>{courseData.description}</p>
        </>
      )}
      {foundUrl && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${foundUrl}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      )}
      {currentUser && currentUser.user.role === "student" && (
        <button>註冊課程</button>
      )}
      {currentUser && currentUser.user.role === "instructor" && (
        <button id={currentUser.user.course} onClick={deleteCourse}>
          刪除課程
        </button>
      )}
    </div>
  );
};

export default Enroll;
