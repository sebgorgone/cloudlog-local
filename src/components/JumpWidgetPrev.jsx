import {getPallette} from "../logInputWidget";
import { useState, useEffect } from 'react';


function JumpWidget(props) {

   const svr = import.meta.env.VITE_SVR_URL;

   const pallette = getPallette();


   //state
   const [showNotes, setShowNotes] = useState(false);
   const [showSig, setShowSig] = useState(false);
   const [showTags, setShowTags] = useState(false);
   const [pdfUrl, setPdfUrl] = useState(null);

   

   



   //handlers

   function handleSigPreview(e) {
      e.preventDefault();

      setFalse();

      setShowSig(!showSig);
   }

   function handleNotesPreview(e) {
      e.preventDefault()

      setFalse();
      
      setShowNotes(!showNotes);
   }

   function handleTagsPreview(e) {
      e.preventDefault()

      setFalse();
      
      setShowTags(!showTags);
   }

   function setFalse () {
      setShowSig(false);
      setShowNotes(false);
      setShowTags(false);
   }



   //inline
   const Shell = {
      background: pallette[4],
      border: "solid .2em",
      borderColor: pallette[1],
      maxWidth: "100%",
      borderRadius: ".75em"

      

   }

   const section = {
      display: 'inline-block',
      paddingRight: "1em",
      margin: "0",
      borderRight: "solid .1em",
      // borderBottom: "solid .1em",
      borderColor: pallette[3],

   }

   const row = {
      display: "flex",
      justifyContent: "space-evenly",
      margin: ".1em",
      flexWrap: "wrap"
   }

   const showButton= {
      fontFamily: "L1",
      fontSize: ".5em",
      border: "none",
      borderRadius: "1em",
      padding: ".3em",
      marginBottom: ".75em"

   }

   const header= {
      color: pallette[2],
      padding: "0",
      paddingLeft: ".2em",
      fontSize: ".55em",
   }

   const line = {
      border: "solid .3em",
      margin: "0",
      borderColor: pallette[3]
   }

   const properties = {
      padding: ".1em",
      margin: "0",
      color: pallette[0],
      fontSize: ".75em",
   }

   const numProp = {
      padding: ".1em",
      margin: "0",
      color: pallette[1],
      fontSize: "1.5em",
   }



   useEffect(() => {
      if (!showSig) return;
      (async () => {
        const blob = await sigRoute();
        if (blob) {
          const url = URL.createObjectURL(blob);
          setPdfUrl(url);
        }
      })();
    }, [showSig]);

   return(<div style={Shell} className="jumpWidget">

      <div style={row}>
         <div style={section}>
            <p style={header}>Jump Number: </p>
            <p style={numProp}>{props.jumpNum}</p>
         </div>

         <div style={section}>
            <p style={header}>Jump Date: </p>
            <p style={properties}>{props.jumpDate}</p>
         </div>

         <div style={section}>
            <p style={header}>Dropzone: </p>
            <p style={properties}>{props.dz}</p>
         </div>

         <div style={section}>
            <p style={header}>Aircraft: </p>
            <p style={properties}>{props.aircraft}</p>
         </div>

         <div style={section}>
            <p style={header}>Equipment: </p>
            <p style={properties}>{props.rig}</p>
         </div>

      </div>


      <div style={line}></div>


      <div style={row}>
         <div style={section}>
         <p style={header}>Exit Altitude (ft): </p>
         <p style={properties}>{props.exitAlt}</p>
      </div>

      <div style={section}>
         <p style={header}>Free Fall Time (s): </p>
         <p style={properties}>{props.time}</p>
      </div>

      <div style={section}>
         <p style={header}>Notes: </p>
         <button style={showButton} onClick={handleNotesPreview}>{showNotes ? "Hide" : "Show Notes"}</button>
      </div>

      <div style={section}>
         <p style={header} >Tags: </p>
         <button style={showButton} onClick={handleTagsPreview}>{showTags ? "hide" : "Show Tags"}</button>
      </div>

      <div style={section}>
         <p style={header}>Signature: </p>
         <button onClick={handleSigPreview} style={showButton}>{showSig ? "Hide" : "Show Signature"}</button>
      </div>
      </div>
      {/* Dropdown */}
            
      <div style={showNotes ? line : {display : "none"}}></div>
      <div style={showNotes ? row : {display: "none"}}>
         <h4 style={{color: pallette[0], fontSize: "1.6em", margin: "0",display: "flex",flexFlow: "column", justifyContent: "center"}}>Notes:</h4> 
         <p style={{color: pallette[0], fontSize: "1.1em", padding: ".05em"}}>{props.notes}</p>
      </div>


      <div style={showTags ? line : {display : "none"}}></div>
     <div style={showTags ? row : {display: "none"}}>

      <h4 style={{color: pallette[0], fontSize: "1.6em", margin: "1em",display: "flex",flexFlow: "column", justifyContent: "center"}}>Tags:</h4> 

      <p style={{fontSize: "1.4em", display: "flex", flexWrap: "wrap", gap: ".5em", margin: "0"}}>{props.tags}</p>
     </div>



      <div style={showSig ? line : {display : "none"}}></div>
      {showSig && <div style={row}>
         {props.signature && props.signature.type === 'application/pdf' ? (
            <object
               data={`${URL.createObjectURL(props.signature)}#zoom=50`}
               type="application/pdf"
               width="100%"
               height="600px"
            >
            Your browser does not support embedded PDFs.
            </object>
         ) : (
            <p>No PDF to display</p>
         )}
      </div>}

      

   </div>)
}

export default JumpWidget;