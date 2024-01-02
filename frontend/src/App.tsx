import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from "./pages/landing-page/LandingPage";
import Login from "./pages/login-page/Login";
import Register from "./pages/register-page/Register";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route index path="/" element={<LandingPage />} />
              <Route index path="/login" element={<Login />} />
              <Route index path="/register" element={<Register />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
