import { getPallette } from "../logInputWidget";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage () {

   const svr = import.meta.env.VITE_SVR_URL;


   const nav = useNavigate();


   const pallette = getPallette()

   //state
   const [timeout, setTimeOut] = useState(5);

   const [newUserName, setNewuserName] = useState("");

   const [newEmail, setNewEmail] = useState("");

   const [newPassword, setNewPassword] = useState("");

   const [confirmPassword, setConfirmPassword] = useState("");


   //handlers

   function handleUserNameChange (e) {
      setNewuserName(e.target.value);
   }

   function handleEmailChange (e) {
      setNewEmail(e.target.value);
   }

   function handlePasswordChange (e) {
      setNewPassword(e.target.value);
   }

   function handleConfirmPasswordChange (e) {
      setConfirmPassword(e.target.value);
   }



   function handleRegistration (e) {
      e.preventDefault
      if (newUserName.length < 5 || newUserName.length > 24) {
         return alert('username invalid length');
      }
      if (!newEmail.includes("@")){
         return alert('please enter a valid email');
      }
      if (!newEmail.includes(".")){
         return alert('please enter a valid email');
      }
      if (newPassword.length < 7) {
         return alert('Password is too short');
      }
      if (newPassword.length > 35) {
         return alert('Password is too log');
      }
      if (newPassword !== confirmPassword) {
         return alert("Password's do not match")
      }

      console.log('successful user register criterea');

      nav('/');

      
   }


   //styles

   const title = {
      fontFamily: "L1",
      color: pallette[1],
      margin: ".4em"
   }

   const credentials = {
      padding: ".5em",
      display: "flex",
      flexFlow: "column",
      textAlignLast: "center",
      background: pallette[2],
      margin: "auto",
      marginTop: "20px",
      width: "min(80%, 600px)",
      borderLeft: "solid .5em",
      borderRight: "solid .5em",
      borderColor: pallette[1],
      boxShadow: "5px 5px rgb(0,0,0,.5)"

   }

   const inputHeader = {
      fontFamily: "L1",
      margin: ".1em",
      color: pallette[4]
   }

   const inputField = {
      fontFamily: "L1",
      minWidth: "15em",
      margin: "auto",
      marginBottom: "3em",
      background: pallette[0]
   }

   const registerButton = {
      margin: "auto",
      fontFamily: "L1",
      marginBottom: "2em",
      minWidth: "180px",
      color: pallette[0],
      background: pallette[4],
      borderColor: pallette[1]
   }


   return(
      <div>
         <img style={{aspectRatio: "1/1", width: "4em", marginRight: "2em", position: "absolute",}} src="/cloudLogBoxLogo-white.svg"/>

         <div style={{display: "flex", justifyContent: "center", background: pallette[3]}}>
            <h1 style={title}>Create New Account</h1>
         </div>

         <div style={credentials}>

            <h1 style={inputHeader}>New Username</h1>
            <input 
               type="text" 
               value={newUserName}
               onChange={handleUserNameChange}
               style={inputField} 
               placeholder="Username" 
               title="Enter Username">
                 
            </input>


            <h1 style={inputHeader}>Email</h1>
            <input 
               type="text" 
               value={newEmail}
               onChange={handleEmailChange}
               style={inputField} 
               placeholder="Email" 
               title="Enter Email">
                 
            </input>

            <h1 style={inputHeader}>New Password</h1>
            <input 
               type="password" 
               value={newPassword}
               onChange={handlePasswordChange}
               style={inputField} 
               placeholder="password" 
               title="Enter Password">
                 
            </input>

            <h1 style={inputHeader}>Confirm Password</h1>
            <input 
               type="password" 
               value={confirmPassword}
               onChange={handleConfirmPasswordChange}
               style={inputField} 
               placeholder="Confirm Password" 
               title="Confirm Password">
                 
            </input>

            <button style={registerButton} onClick={handleRegistration}>Register</button>

         </div>
      </div>
   )
}

export default RegisterPage

