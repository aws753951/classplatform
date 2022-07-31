import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Homepage from "./components/Homepage";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Postcourse from "./components/Postcourse";
import Enroll from "./components/Enroll";
import Search from "./components/Search";

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/postcourses" element={<Postcourse />} />
        <Route path="/enroll" element={<Enroll />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
};

export default App;
