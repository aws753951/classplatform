import React from "react";

const Postcourse = () => {
  return (
    <div>
      <h3>請新增課程</h3>
      <input type="text" placeholder="課程名稱" />
      <textarea
        name="description"
        cols="30"
        rows="10"
        placeholder="課程描述"
      ></textarea>
      <input type="text" placeholder="請貼上yt連結" />
      <button>立即新增課程</button>
      <h3>已創建的課程</h3>
      <h3>課堂標題</h3>
      <p>上傳時間:</p>
      <p>註冊人數:</p>
      <p>讚: 20</p>
      <p>爛: 15</p>
      <button>查看課程內容</button>
    </div>
  );
};

export default Postcourse;
