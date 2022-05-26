import React, { memo } from "react";
import { Routes, Route } from "react-router-dom";
import MapContainer from "./pages/MapContainer";
import Login from "./components/Login";
import Join from "./components/Join";

import styled from "styled-components";

const AppCss = styled.div`
  
`;



const App = memo(() => {
  return (
    <AppCss>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/signup" element={<Join />} />
        <Route path="mapcontainer" element={<MapContainer />} />
      </Routes>
    </AppCss>
  );
});

export default App;
