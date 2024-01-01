import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from "./pages/landing-page/LandingPage";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route index path="/" element={<LandingPage />} />
              {/*<Route path="/example" element={}/>*/}
          </Routes>
      </BrowserRouter>
  );
}

export default App;
