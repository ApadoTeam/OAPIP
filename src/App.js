import React, { memo } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
// import MapContainer from "./components/MapContainer";
import styled from "styled-components";

import Login from "./pages/Login";
import Join from "./components/Join";

const AppCss = styled.div`
  .titleBox {
    width: 480px;
    height: 50px;
    margin: 0 auto;
    margin-top: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    border: 1px solid #ccc;
    border-radius: 5px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    .sign {
      display: inline-block;
      width: 100%;
      height: 100%;
      font-size: 30px;
      font-weight: 800;
      line-height: 50px;
      color: #555;
      text-align: center;
      text-decoration: none;
      &:first-child {
        border-right: 1px solid #ccc;
      }
      &:hover {
        background-color: aliceblue;
        color: black;
      }
    }
    .active {
      background-color: aliceblue;
    }
  }
`;

const App = memo(() => {
  return (
    <AppCss>
      {/* <Login /> */}
      {/* <MapContainer /> */}
      {/* <Join /> */}
      <nav className="titleBox">
        <NavLink className="sign" to="/signin">
          Sign In
        </NavLink>
        <NavLink className="sign" to="/signup">
          Sign In
        </NavLink>
      </nav>
      <Routes>
        <Route path="/signin" exapt element={<Login />} />
        <Route path="/signup" exapt element={<Join />} />
      </Routes>
    </AppCss>
  );
});

export default App;
