import React, { useState, useEffect } from "react";
import CourseService from "../services/CourseService";
import { useNavigate } from "react-router-dom";

const Enroll = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [courseData, setCourseData] = useState(null);
  let [foundUrl, setFoundUrl] = useState(null);
  let [good, setGood] = useState(0);
  let [bad, setBad] = useState(0);

  const enrollCourse = (e) => {
    if (currentUser.user.role === "student") {
      CourseService.enroll(e.target.id, currentUser.user._id)
        .then((res) => {
          window.alert(res.data);
          navigate("/profile");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      window.alert("只有學生才能註冊喔~");
    }
  };

  const deleteCourse = (e) => {
    CourseService.getCourseWithID(e.target.id).then((item) => {
      if (item.data.instructor._id === currentUser.user._id) {
        let check = window.prompt(
          `請輸入該課程的名稱「${item.data.title}」作為確認`
        );
        if (check === item.data.title) {
          CourseService.deleteCourse(e.target.id)
            .then(() => {
              window.alert("課程已經被刪除，現在幫你導到搜尋課程的頁面");
              navigate("/search");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          window.alert("輸入的與課程名稱不同，請重新操作");
        }
      } else {
        window.alert("只有該講師才能刪除課程");
      }
    });
  };

  const handleGood = (e) => {
    if (currentUser.user.role !== "student") {
      window.alert("只有學生才能給讚或給爛");
    } else {
      CourseService.rating(e.target.id, currentUser.user._id, 1).then(
        (item) => {
          setGood(item.data.good);
          setBad(item.data.bad);
        }
      );
    }
  };
  const handleBad = (e) => {
    if (currentUser.user.role !== "student") {
      window.alert("只有學生才能給讚或給爛");
    } else {
      CourseService.rating(e.target.id, currentUser.user._id, 0).then(
        (item) => {
          setGood(item.data.good);
          setBad(item.data.bad);
        }
      );
    }
  };

  useEffect(() => {
    if (currentUser) {
      CourseService.getCourseWithID(currentUser.user.course).then((item) => {
        try {
          setFoundUrl(item.data.url.match(/v=(.*)/)[1]);
        } catch (e) {}
        try {
          setFoundUrl(item.data.url.match(/youtu.be\/(.*)/)[1]);
        } catch (e) {}
        setGood(item.data.good.length);
        setBad(item.data.bad.length);
        setCourseData(item.data);
      });
    }
  }, []);

  return (
    <div className="enroll">
      {!currentUser && <div>請先登入</div>}
      {courseData && (
        <div className="content">
          <h1>課程標題: {courseData.title}</h1>
          <p>課程描述: {courseData.description}</p>
        </div>
      )}
      {foundUrl && (
        <iframe
          width="800"
          height="600"
          src={`https://www.youtube.com/embed/${foundUrl}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      )}
      <div className="button">
        {currentUser && (
          <button id={currentUser.user.course} onClick={handleGood}>
            給個讚{good}
          </button>
        )}
        {currentUser && (
          <button id={currentUser.user.course} onClick={handleBad}>
            給個爛{bad}
          </button>
        )}
      </div>
      <div className="action">
        {currentUser && currentUser.user.role === "student" && (
          <button id={currentUser.user.course} onClick={enrollCourse}>
            註冊課程
          </button>
        )}
        {currentUser && currentUser.user.role === "instructor" && (
          <button id={currentUser.user.course} onClick={deleteCourse}>
            刪除課程
          </button>
        )}
      </div>
    </div>
  );
};

export default Enroll;
