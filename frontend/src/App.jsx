import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/authentication/Signup";
import Login from "./components/authentication/Login";
import Layout from "./pages/Layout";
import Profile from "./components/main/Profile";
import Home from "./pages/home/Home";
import EditProfile from "./components/main/EditProfile";
import ChatPage from "./components/main/ChatPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/chat" element={<ChatPage />} />
        </Route>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
