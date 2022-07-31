import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";

const Nav = ({ currentUser, setCurrentUser }) => {
  const handleLogout = () => {
    AuthService.logout();
    window.alert("登出成功，現在幫你導回首頁");
    setCurrentUser(AuthService.getCurrentUser());
  };
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">首頁</Link>
          </li>
          <li>
            <Link to="/register">註冊</Link>
          </li>
          <li>
            <Link to="/login">登入</Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>
              登出
            </Link>
          </li>
          <li>
            <Link to="/profile">個人頁面</Link>
          </li>
          <li>
            <Link to="/postcourses">新增課程</Link>
          </li>
          <li>
            <Link to="/enroll">註冊課程</Link>
          </li>
          <li>
            <Link to="/search">搜尋課程</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
