import React, { memo } from "react";
import { Routes, Route } from 'react-router-dom';
// import MapContainer from "./components/MapContainer";
import Login from "./pages/Login";
import Join from './components/Join';

const App = memo(() => {
  return (
    <>
      {/* <Login /> */}
      {/* <MapContainer /> */}
      <Routes>
        <Route path='/' exapt={true} element={<Login />} />
        <Route path='/singup' element={<Join />} />
      </Routes>
    </>
  );
});

export default App;
