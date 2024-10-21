import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import Home from './Pages/Home/Home'
import Detail from './Pages/Detail/Detail'
import LoginPage from './Pages/LoginPage/LoginPage'
import { UserProvider } from './Context/UserContext'
import Signup from './Pages/Signup/Signup'
import Profile from './Pages/Profile/Profile'


function App() {

  return (
    <UserProvider>
    <BrowserRouter>
      <Header />
      <Routes>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<Signup/>} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/" element={<Home />} />
      <Route path="/recipe/:id" element ={<Detail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </UserProvider>
  )
}

export default App
