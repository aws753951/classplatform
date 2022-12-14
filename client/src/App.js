import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Postcourse from "./components/Postcourse";
import Enroll from "./components/Enroll";
import Search from "./components/Search";
import AuthService from "./services/AuthService";
import "./styles/style.css";

const App = () => {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  return (
    <div>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={
            <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/postcourses"
          element={
            <Postcourse
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path={`/enroll`}
          element={
            <Enroll currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        />
        <Route
          path="/search"
          element={
            <Search currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
