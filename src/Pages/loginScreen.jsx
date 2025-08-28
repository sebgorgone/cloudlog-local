import {useState} from 'react';
import {getPallette} from "../logInputWidget";
import '../style/loginScreen.css';
import { useNavigate, Navigate } from "react-router-dom";
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           



function LoginScreen () {

   const domain = 'https://sebgorgone.github.io/cloudlog-local/#'
   const nav = useNavigate();

   const [ident, setIdent] = useState("");
   const [psky, setPsky] = useState("");
   // if (user) {
   //    return <Navigate to="/" replace />
   // }
   //pallette v
   const pallette = getPallette();

   //styles vv
   const backdrop = {
      display: "felx",
      minWidth: "100%",
      minHeight: "100%",
   }
   const loginContainer = {
      background: pallette[4],
      padding: "1vw",
      maxWidth: "28em",
      margin: "auto",
      marginTop: "5vh",
      minHeight: "20em",
      borderRadius: "1em",
      border: "solid .4em",
      borderColor: pallette[0],
   }

   const headerStyle = {
      color: pallette[0],
      fontFamily: "L1",
   }

   const inputStyle = {
      fontFamily: "L1",
      color: pallette[0],
      background: pallette[3],
      margin: "8vh auto",
      minWidth: "75%",
      display: "block",
      border: "none",

   }

   const signupPageButton = {
      color: pallette[0],
      fontFamily: "L1",
   }

   const loginButton = {
      fontFamily: "L1",
      border: "none",
      color: pallette[0],
      background: pallette[3],
      margin: "0",
      minWidth: "40%",
      display: "block",
   }

   


   //handlers vv

   function handleIdentField(e) {
      setIdent(e.target.value);
   }

   function handlePskyField(e) {
      setPsky(e.target.value);
   }
   

   return(
      <div style={backdrop}>

      <div style={{justifyContent: "center", display: "flex"}}>
         <img style={{padding: "3em", width: "45em", paddingBottom: "0"}}src={`${import.meta.env.BASE_URL}CloudLogBannerWhite.svg`} />
      </div>
      
      <form style={loginContainer} >
         <h3 style={headerStyle}>Please Log In</h3>
         <input 
            className="loginInput"
            style={inputStyle} 
            type="text" 
            placeholder="Email or Username"
            value={ident}
            onChange={handleIdentField}
          />
         <input style={inputStyle} 
            type="password" 
            className="loginInput"
            placeholder="password" 
            value={psky}
            onChange={handlePskyField}
         />
         <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center", marginBottom: "3vh"}}>
            <button type="submit" style={loginButton} onClick={e => {e.preventDefault(); nav('/'); ident !== '' && localStorage.setItem('user', JSON.stringify({name: ident, id: 1}))}}>Log In</button>

            <a 
              className="registerLink"
              style={signupPageButton}
              href={`${domain}/register`}
            >
              Create New Account
            </a>

         </div>
         


      </form>
      </div>
   )
}

export default LoginScreen;