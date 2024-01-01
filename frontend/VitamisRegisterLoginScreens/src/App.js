import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import SignIn from "./pages/Sign-in";
import ProfileCreation from "./pages/ProfileCreation";


export default function App(){
  return(
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element = {<Landing />} />
        <Route path="/landing" element = {<Landing />} />
        <Route path="/sign-in" element = {<SignIn />} />
        <Route path="/create-profile" element = {<ProfileCreation />} />

      </Routes>
      </BrowserRouter>

    </div>
  );
}
