import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import Detail from "./Pages/Detail/Detail";
import LoginPage from "./Pages/LoginPage/LoginPage";
import { UserProvider } from "./Context/UserContext";
import Signup from "./Pages/Signup/Signup";
import Profile from "./Pages/Profile/Profile";
import { useState } from "react";

function App() {
  const [dark, setDark] = useState<boolean>(false);

  return (
    <div className={`${dark && "dark-mode-on"}`}>
      <UserProvider>
        <BrowserRouter>
          <Header dark={dark} setDark={setDark} />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<Detail />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
