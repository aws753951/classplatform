import React from "react";

const Enroll = () => {
  return (
    <div>
      <h1>課程名稱</h1>
      <p>課程描述</p>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/O6ZOYWzymtE"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <button>註冊課程</button>
    </div>
  );
};

export default Enroll;
