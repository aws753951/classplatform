import React from "react";

const Register = () => {
  return (
    <div>
      <h1>還在等甚麼?趕緊來註冊</h1>
      <h3>
        若已註冊，<a href="/login">請登入</a>
      </h3>
      <p>或使用MC帳號註冊</p>
      <input type="text" placeholder="帳號(請輸入至少六碼)" />
      <input type="email" placeholder="信箱" />
      <input type="password" placeholder="密碼(請輸入至少八碼)" />
      <input type="password" placeholder="再次輸入密碼" />
      <select>
        <option value="">請選擇老師或學生身分</option>
        <option value="instructor">老師</option>
        <option value="student">學生</option>
      </select>
      <button>註冊</button>
    </div>
  );
};

export default Register;
