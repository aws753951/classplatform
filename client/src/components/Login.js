import React from "react";

const Login = () => {
  return (
    <div>
      <h1>你的登入，是人類的一大步</h1>
      <h3>
        若無註冊，<a href="/register">請先註冊</a>
      </h3>
      <p>或使用MC帳號登入</p>
      <input type="email" placeholder="信箱" />
      <input type="password" placeholder="密碼(請輸入至少八碼)" />
      <input type="password" placeholder="再次輸入密碼" />
      <button>註冊</button>
    </div>
  );
};

export default Login;
