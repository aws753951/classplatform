import React from "react";

const Profile = () => {
  return (
    <div>
      <div className="notlogin">
        你是不是沒登入就用網址搜特定頁面?
        <br /> 抓到了齁,趕緊點右上角的登入鈕啦
      </div>
      <h1>歡迎來到學生頁面</h1>
      <h1>歡迎來到老師頁面</h1>
      <p>你的username是:</p>
      <p>你註冊的Email是:</p>
      <p>上次登入的時間為:</p>
      <button>依照上傳時間排列</button>
      <h3>課堂標題</h3>
      <p>上傳時間:</p>
      <p>註冊人數:</p>
      <p>讚: 20</p>
      <p>爛: 15</p>
      <button>查看課程內容</button>
    </div>
  );
};

export default Profile;
