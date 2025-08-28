import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LoginScreen from './Pages/loginScreen.jsx'
import {HashRouter, Routes, Route} from  'react-router-dom';
import HomePage from './Pages/homePage.jsx'
import RegisterPage from './Pages/RegisterPage.jsx';
import NoPage from './Pages/NoPage.jsx';
import LoadPage from './Pages/LoadPage.jsx';



createRoot(document.getElementById('root')).render(
      <HashRouter> 
          <Routes>

            <Route index element={
                <HomePage/>
            } />

            <Route path="/home" element={
                <HomePage/>
            } />

            <Route path="/laodbuild" element={
                <LoadPage />
            } />

            <Route path="/register" element={
              <RegisterPage />
            } />

            <Route  path="/login" element={
              <LoginScreen />
            } />    

            <Route path="*" element={
              <NoPage />
            } />
            
          </Routes>
      </HashRouter>    
)
