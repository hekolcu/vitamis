import React, {createContext, useContext, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from "./pages/landing-page/LandingPage";
import Login from "./pages/login-page/Login";
import Register from "./pages/register-page/Register";
import SuccessfulRegister from "./pages/register-page/SuccessfulRegister";
import ProfileCreation from "./pages/profile-creation-page/ProfileCreation";
import UserDashboard from "./pages/user-dashboard-page/UserDashboard";
import Logout from "./pages/log-out-page/Logout";
import {User} from "./types/User";
import {getUserDetails} from "./utils/VitamisApiFunctions";

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function App() {

    const [token, setToken] = useState<string | null>(null);

    const [user, setUser] = React.useState<User | null>(null);

    // Simulate signing in a user
    const signInUser = async () => {
        if (token != null) setUser(await getUserDetails(token));
    };

    // Simulate signing out a user
    const signOutUser = () => {
        setUser(null);
    };

  return (
      <AuthContext.Provider value={{ token, setToken }} >
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
      </AuthContext.Provider>
  );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("Used in auth provider");
    }
    return context;
}

export default App;
