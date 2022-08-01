import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const Login = ({ currentUser, setCurrentUser }) => {
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [password2, setPassword2] = useState("");
  let [message, setMessage] = useState("");
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangePassword2 = (e) => {
    setPassword2(e.target.value);
  };
  const handleLogin = () => {
    AuthService.login(email, password, password2)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setCurrentUser(AuthService.getCurrentUser());
        window.alert("登入成功，現在幫你轉到個人頁面");
        navigate("/profile");
      })
      .catch((err) => {
        setMessage(err.response.data);
      });
  };
  return (
    <div>
      <h1>你的登入，是人類的一大步</h1>
      <h3>
        若無註冊，<a href="/register">請先註冊</a>
      </h3>
      <p>或使用MC帳號登入</p>
      {message && <div>{message}</div>}
      <input type="email" placeholder="信箱" onChange={handleChangeEmail} />
      <input
        type="password"
        placeholder="密碼(請輸入至少八碼)"
        onChange={handleChangePassword}
      />
      <input
        type="password"
        placeholder="再次輸入密碼"
        onChange={handleChangePassword2}
      />
      <button onClick={handleLogin}>登入</button>
    </div>
  );
};

export default Login;
