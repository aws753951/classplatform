import React, { useState, useEffect } from "react";
import CourseService from "../services/CourseService";

const Enroll = ({ currentUser, setCurrentUser }) => {
  let [courseData, setCourseData] = useState(null);
  let [foundUrl, setFoundUrl] = useState(null);
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

      <button>註冊課程</button>
    </div>
  );
};

export default Enroll;
