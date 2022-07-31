import React from "react";

const Search = () => {
  return (
    <div>
      <h3>搜尋你想要看的課程</h3>
      <input type="text" placeholder="請輸入關鍵字" />
      <button>搜尋</button>
      <button>依照點讚數高至低搜尋</button>
      <h3>課堂標題</h3>
      <p>上傳時間:</p>
      <p>註冊人數:</p>
      <p>讚: 20</p>
      <p>爛: 15</p>
      <button>查看課程內容</button>
    </div>
  );
};

export default Search;
