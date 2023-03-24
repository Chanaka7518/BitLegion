import { Route, Routes } from "react-router-dom";
import NavBar from "./components/HomePage/NavBar";
import HeadCoachSignUp from "./components/signup/HeadCoachSignUp";
import HomepageBody from "./components/HomePage/HomepageBody";
import Login from "./components/login/Login";
import ForgetPwd from "./components/login/ForgetPwd";
import CreateNewPassword from "./components/login/CreateNewPassword";
import Admin from "./Pages/Admin/Admin";
import ClientSignup from "./components/signup/Client/ClientSignup";
import Generate from "./components/signup/Generate";
import Test from "./Pages/Test";
import HeadCoachProfile from "./Pages/HeadCoach/HeadCoachProfile";
import UserDashboard from "./Pages/UserDashboard";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="pages">
        <Routes>
          <Route path="/" element={<HomepageBody />} />
          <Route path="/generate" element={<UserDashboard />} />
          <Route path="/signupHeadCoach/:token" element={<HeadCoachSignUp />} />
          <Route path="/signup" element={<ClientSignup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpwd" element={<ForgetPwd />} />{" "}
          <Route
            path="/newPassword/:id/:token"
            element={<CreateNewPassword />}
          />
          <Route path="/alf-admin" element={<Admin />} />
          <Route path="/headcoachprofile" element={<HeadCoachProfile />} />
          <Route path="/dashboard" element={<UserDashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
