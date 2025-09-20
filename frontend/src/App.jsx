import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/authentication/Signup";
import Login from "./components/authentication/Login";
import Layout from "./pages/Layout";
import Profile from "./components/main/Profile";
import Home from "./pages/home/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
