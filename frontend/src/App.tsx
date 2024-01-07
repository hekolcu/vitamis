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

interface VitamisContext {
    token: string | null;
    setToken: (token: string | null) => void;
    user: User | null;
    setUser: (user: User | null) => void;
}

const VitamisContext = createContext<VitamisContext | undefined>(undefined);

function App() {

    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    const [user, setUser] = useState<User | null>(null);

    React.useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            (async () => setUser(await getUserDetails(token)))();
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    React.useEffect(() => {
        console.log(user);
    }, [user]);

  return (
      <VitamisContext.Provider value={{ token, setToken, user, setUser }} >
          <BrowserRouter>
              <Routes>
                  <Route index path="/" element={<LandingPage />} />
                  <Route index path="/login" element={<Login />} />
                  <Route index path="/register" element={<Register />} />
                  <Route index path="/confirmation" element={<SuccessfulRegister />} />
                  <Route index path="/createProfile" element={<ProfileCreation />} />
                  <Route index path="/dashboard" element={<UserDashboard />} />
                  <Route index path="/logout" element={<Logout />} />
              </Routes>
          </BrowserRouter>
      </VitamisContext.Provider>
  );
}

export const useVitamisContext = () => {
    const context = useContext(VitamisContext);
    if(!context){
        throw new Error("Used in auth provider");
    }
    return context;
}

export default App;
