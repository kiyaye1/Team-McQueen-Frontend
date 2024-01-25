import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './main-screens/Homepage';
import Login from './main-screens/Login';
import Faq from './main-screens/Faq';
import Register from './main-screens/Register';
import AboutUs from './main-screens/About-us';
import Contact from './main-screens/Contact';
import NotLoggedInLayout from './navigation/Layout'

export default function App() {
  return (
    // need a conditional for if the user is logged in or not 
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<NotLoggedInLayout/>}>
            <Route index element={<Homepage/>}/>
            <Route path = "faq" element = {<Faq/>}/>
            <Route path = "contact" element = {<Contact/>}/>
            <Route path = "about" element = {<AboutUs/>}/>
            <Route path = "signup" element = {<Register/>}/>
            <Route path = "login" element = {<Login/>}/>
          </Route>
        </Routes>
      </BrowserRouter>

    );
}

