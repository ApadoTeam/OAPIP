import React, { memo } from "react";
import { Routes, Route } from "react-router-dom";
//import MapContainer from "./pages/MapContainer";
import Login from "./components/Login";
import Join from "./components/Join";
import Map from "./pages/Map";



const App = memo(() => {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/signup" element={<Join />} />
        <Route path="mapcontainer" element={<Map />} />
      </Routes>
    </>
  );
});

export default App;
