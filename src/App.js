import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import Procash from "./pages/Procash";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/registration-form" element={<Procash />} />
    </Routes>
  );
};

export default App;
