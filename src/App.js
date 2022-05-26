import React, { memo } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import MapContainer from "./pages/MapContainer";




const App = memo(() => {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/mapcontainer" element={<MapContainer />} />
      </Routes>
    </div>
  );
});

export default App;
