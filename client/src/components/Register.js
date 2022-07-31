import React, { useState } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [password2, setPassword2] = useState("");
  let [role, setRole] = useState("");
  let [message, setMessage] = useState("");

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangePassword2 = (e) => {
    setPassword2(e.target.value);
  };
  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };

  const handleRegister = () => {
    AuthService.register(username, email, password, password2, role)
      .then(() => {
        window.alert("註冊成功，現在幫你導向登入頁面");
        navigate("/login");
      })
      .catch((err) => {
        setMessage(err.response.data);
      });
  };
  return (
    <div>
      <h1>還在等甚麼?趕緊來註冊</h1>
      <h3>
        若已註冊，<a href="/login">請登入</a>
      </h3>
      <p>或使用MC帳號註冊</p>
      {message && <div>{message}</div>}
      <input
        type="text"
        placeholder="帳號(請輸入至少三碼)"
        onChange={handleChangeUsername}
      />
      <input type="email" placeholder="信箱" onChange={handleChangeEmail} />
      <input
        type="password"
        placeholder="密碼(請輸入至少六碼)"
        onChange={handleChangePassword}
      />
      <input
        type="password"
        placeholder="再次輸入密碼"
        onChange={handleChangePassword2}
      />
      <select onChange={handleChangeRole}>
        <option value="">請選擇老師或學生身分</option>
        <option value="instructor">老師</option>
        <option value="student">學生</option>
      </select>
      <button onClick={handleRegister}>註冊</button>
    </div>
  );
};

export default Register;
