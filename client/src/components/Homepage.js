import React from "react";

const Homepage = () => {
  return (
    <div>
      <h1>MC 開放式線上課程平台</h1>
      <p>
        在這裡，你可以透過此平台瀏覽各種優質課程 <br />
        同時你也可以做為講師
        <br />
        分享你的知識幫助更多學生
        <br />
        還在等甚麼?趕快加入我們吧!
        <br />
        你可以點選下列的連結，或者先看看有甚麼課程
      </p>
      <button>
        <a href="/search">課程搜尋</a>
      </button>
      <h1>成為學生</h1>
      <p>
        你可以享受課程帶給你的知識
        <br />
        同時可針對課程進行簡單評分
        <br />
        幫助自己成長，也幫助老師改善課程品質
      </p>
      <button>
        <a href="/register">註冊或登入</a>
      </button>
      <h1>成為老師</h1>
      <p>
        你可以在這裡練習如何成為優秀的老師
        <br />
        學生的回饋可以幫助你調整課程品質
        <br />
        讓彼此都更加成長
      </p>
      <button>
        <a href="/register">註冊或登入</a>
      </button>
    </div>
  );
};

export default Homepage;
