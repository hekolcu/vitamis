import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from "./pages/landing-page/LandingPage";
import Login from "./pages/login-page/Login";
import Register from "./pages/register-page/Register";
import SuccessfulRegister from "./pages/register-page/SuccessfulRegister";
import ProfileCreation from "./pages/profile-creation-page/ProfileCreation";
import UserDashboard from "./pages/user-dashboard-page/UserDashboard";
import Logout from "./pages/log-out-page/Logout";
import {User} from "./types/User";

function App() {

    const [user, setUser] = React.useState<User | null>(null);

    // Simulate signing in a user
    const signInUser = () => {
        setUser({ email: 'user@example.com' });
    };

    // Simulate signing out a user
    const signOutUser = () => {
        setUser(null);
    };

  return (
      <BrowserRouter>
          <Routes>
              <Route index path="/" element={<LandingPage />} />
              <Route index path="/login" element={<Login onLogin={signInUser}/>} />
              <Route index path="/register" element={<Register />} />
              <Route index path="/confirmation" element={<SuccessfulRegister />} />
              <Route index path="/createProfile" element={<ProfileCreation />} />
              <Route index path="/dashboard" element={<UserDashboard user={user} />} />
              <Route index path="/logout" element={<Logout onLogout={signOutUser} />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
