import { useState, useEffect } from 'react'
import {getPallette} from "../logInputWidget.jsx"
import FullJumpLedge from './fullJumpHistory.jsx'
import WelcomePage from './WelcomePage.jsx'
import StatsPage from './StatsPage.jsx'
import DownloadPage from './DownloadPage.jsx'
import SettingsPage from './SettingsPage.jsx'
import SearchedList from './SearchedList.jsx'
import LogInputWidget from '../logInputWidget.jsx'
import LoadPage from './LoadPage.jsx'
import { useNavigate } from 'react-router-dom'


function HomePage(props) {

   const svr = import.meta.env.VITE_SVR_URL;

   //environment variables

   const pallette = getPallette()

   const nav = useNavigate();


   //user info

   const [defaultRig, setDefaultRig] = useState(() => {
      const stored = localStorage.getItem('defaultRig');
      return stored ? JSON.parse(stored) : null; 
   });

   const [defaultAircraft, setDefaultAircraft] = useState(() => {
      const stored = localStorage.getItem('defaultAircraft');
      return stored ? JSON.parse(stored) : null; 
   });


   const [defaultDZ, setDefaultDZ] = useState(() => {
      const stored = localStorage.getItem('defaultDZ');
      return stored ? JSON.parse(stored) : null; 
   });

   const [planes, setPlanes] = useState(() => {
      const stored = localStorage.getItem('planes');
      return stored ? JSON.parse(stored) : []; 
   });

   const [rigs, setRigs] = useState(() => {
      const stored = localStorage.getItem('rigs');
      return stored ? JSON.parse(stored) : []; 
   });

   const [DZs, setDZs] = useState(() => {
      const stored = localStorage.getItem('DZs');
      return stored ? JSON.parse(stored) : []; 
   });

   //states

    const [router, setRouter] = useState({
      welcome: false,
      fullList: false,
      searchedList: false,
      download: false,
      stats: false,
      settings: false,
      add: false,
    })

    function checkIfTrue (value) {
      if (router.welcome === true && value !== router.welcome) return false
      
      if (router.fullList === true && value !== router.fullList) return false

      if (router.searchedList === true && value !== router.searchedList) return false

      if (router.download === true && value !== router.download) return false

      if (router.stats === true && value !== router.stats) return false

      if (router.settings === true && value !== router.settings) return false

      if (router.add === true && value !== router.add) return false

      return true
    }

   const [wcField, setWcField] = useState();

   const [wildCard, setWildCard] = useState();

   const [flag, setFlag]= useState(false);

   //getjumphistory post

   const [user, setUser] = useState(() => {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : 'guest'; 
   });

   const [userJumpHistory, setUserJumpHistory] = useState(() => {
      const stored = localStorage.getItem('userJumpHistory');
      return stored ? JSON.parse(stored) : []; 
   });

   const [userJumpCount, setUserJumpCount] = useState();
   
   

   //handlers

   async function handleNavToLedg (e) {
      e.preventDefault()
      setRouter({
      welcome: false,
      fullList: true,
      searchedList: false,
      download: false,
      stats: false,
      settings: false,
      add: false
    })
   }
   async function callLedg (e) {
      e.preventDefault()
      setRouter({
      welcome: false,
      fullList: true,
      searchedList: false,
      download: false,
      stats: false,
      settings: false,
      add: false
    })
   }
   async function handleNavToStats (e) {
      setRouter({
      welcome: false,
      fullList: false,
      searchedList: false,
      download: false,
      stats: true,
      settings: false,
      add: false
    })
   }
   async function callStats (e) {
      e.preventDefault()
      setRouter({
      welcome: false,
      fullList: false,
      searchedList: false,
      download: false,
      stats: true,
      settings: false,
      add: false
    })
   }
   async function handleNavToDownload (e) {
      e.preventDefault();
      setRouter({
      welcome: false,
      fullList: false,
      searchedList: false,
      download: true,
      stats: false,
      settings: false,
      add: false
    })
   }
   async function handleNavToSettings (e) {
      e.preventDefault();
      setRouter({
      welcome: false,
      fullList: false,
      searchedList: false,
      download: false,
      stats: false,
      settings: true,
      add: false
    });
   }

    function handleSearch(e) {
      e.preventDefault();
      setWildCard(wcField);
      setRouter({
         welcome: false,
         fullList: false,
         searchedList: true,
         download: false,
         stats: false,
         settings: false,
         add: false
      })

      setFlag(prev => !prev);
   
    }
    function updateWildCardField (e) {
      setWcField(e.target.value)
    }
    async function handleNavToAdd(e) {
      e.preventDefault();
      setRouter({
      welcome: false,
      fullList: false,
      searchedList: false,
      download: false,
      stats: false,
      settings: false,
      add: true
    })
    }


   //inline styles
   const homePageShell = {
      overflowX: "hidden"
   }
   const headerStyle ={
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "3em",
      zIndex: "4",
      padding: "1em",
      display: "flex",
      background: pallette[4],
   }
   const headerBackground = {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "3.25em",
      zIndex: "2",
      padding: "1em",
      display: "flex",
      background: pallette[3],
      boxShadow: [
  "1em .5em 1em rgba(0,0,0,0.4)",   // darkest, tightest
  "1.5em .75em 1.5em rgba(0,0,0,0.3)",
  "2em 1em 2em rgba(0,0,0,0.2)",     // softer, more spread
  "4em 2em 4em rgba(0,0,0,0.1)"      // very light, wide fade
].join(', '),
   }
   const nameStyle= {
      color: pallette[0],
      fontFamily: "L1",
      fontWeight: "bold",
      fontSize: "min(3vw, 25px)",
      margin: "0",
      marginLeft: "65px",
      padding: "0",
   }
   const jumpNumStyle= {
      color: pallette[0],
      fontFamily: "L1",
      fontSize: ".7em",
      margin: "0",
      marginLeft: "65px",
      padding: "0",
   }
   const filterButtonStyle= {
      maxHeight: "30px",
      color: pallette[0],
      backgroundColor: pallette[3],
      fontFamily: "L1",
      fontSize: "1.2em",
      padding: ".3.3em",
      paddingTop: ".7em",
      paddingBottom: ".8em",
      border: "none",
      borderRadius: "2.7em",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"  
   }
   const filterInputStyle= {
      height: "2em",
      background: pallette[0],
      fontFamily: "L1",
      minWidth: "50%",
      textAlign: "center"
   } 
   const sidebarStyle ={
      position: "fixed",
      height: "100%",
      top: "0",
      width: "3.5em",
      zIndex: "5",
      paddingLeft: ".7em",
      display: "flex",
      flexDirection: "column",
      background: pallette[4],

   }
   const sidebarbacgroundStyle ={
      position: "fixed",
      height: "100%",
      top: "0",
      width: "3.75em",
      zIndex: "3",
      paddingLeft: ".7em",
      display: "flex",
      flexDirection: "column",
      background: pallette[3],
      borderRight: "none",
   }
   const mainPageArea = {
      margin: "0", 
      height: "100%",
      overflowX: "hidden",
      background: pallette[2]
   }
   const logOutButton = {
      fontFamily: "L1",
      color: pallette[0],
      background: "none",
      border: "none",
      boxShadow: "none",
      marginTop: "1.75em"
   }


   //useEffects


   useEffect(() => {

      setRouter({
      welcome: true,
      fullList: false,
      searchedList: false,
      download: false,
      stats: false,
      settings: false,
      add: false
    });
   }, [flag]);

   useEffect(() => {
      setUserJumpCount(userJumpHistory.length)
   }, [userJumpHistory])



   return(
      <div style={homePageShell}>
         {/* version */}
         <p style={{position: "fixed", top: "0", right: "1em", fontFamily: "L1", color: pallette[0], fontSize: ".5em", zIndex: 5}}>Cloud log V 0.3</p>

         <div style={headerBackground}></div>


         <div style={headerStyle}>

            <div >
               <p style={nameStyle}></p>
               <p style={jumpNumStyle}>{userJumpCount ? userJumpCount : userJumpCount !== 0 ? 'Loading...' : userJumpCount} Jumps</p>
            </div>

            <form onSubmit={handleSearch} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <input
                 value={wcField}
                 onChange={updateWildCardField}
                 type="text"
                 placeholder="🔎 Search your jumps"
                 style={filterInputStyle}
              />
            </form>

            {/* <div style={{ display: 'flex', alignItems: 'center', marginRight: "5vw"}}>
              <button style={filterButtonStyle}>Filters</button>
            </div> */}

            
         </div>

         

         <div style={sidebarbacgroundStyle}></div>

         

         <div style={sidebarStyle}>

            <img style={{width: '3em', height: '3em', paddingTop: "1em"}} src="/cloudLogBoxLogo-white.svg" />

            <div style={{marginTop: "2.2em"}}>

               <button 
                  title='Add to Jumps'
                  style={{borderRadius: "50%", border: "solid .2em", borderColor: pallette[2], background: pallette[0]}}
                  onClick={handleNavToAdd}
               >
                     <img style={{width: '1.9em', height: '1.8em',padding: ".25em", paddingTop: ".37em"}} src="/new-indicator-svgrepo-com.svg" />
               </button>


               <button 
                  title='Full Logbook Ledgar'
                  style={{borderRadius: "50%", border: "solid .2em", borderColor: pallette[2], marginTop: "1.5em", background: pallette[0]}}
                  onClick={handleNavToLedg}
               >
                     <img style={{width: '1.8em', height: '1.8em', padding: ".3em"}} src="/list-svgrepo-com.svg" />
               </button>


               <button 
                  title='Statistics'
                  style={{borderRadius: "50%", border: "solid .2em", borderColor: pallette[2], marginTop: "1.5em", background: pallette[0]}}
                  onClick={handleNavToStats}
               >
                     <img style={{width: '2em', height: '2em', padding: ".3em"}} src="/stats-svgrepo-com(2).svg" />
               </button>
               
               
               <button 
                  title='Download Logbook Data'
                  style={{borderRadius: "50%", border: "solid .2em", borderColor: pallette[2], marginTop: "1.5em", background: pallette[0]}}
                  onClick={handleNavToDownload}
               >
                     <img style={{width: '2em', height: '2em', padding: ".2em"}} src="/download-file-1-svgrepo-com(1).svg" />
               </button>


               <button 
                  title='Settings'
                  style={{borderRadius: "50%", border: "solid .2em", borderColor: pallette[2], marginTop: "1.5em", background: pallette[0]}}
                  onClick={handleNavToSettings}
               >
                     <img style={{width: '1.8em', height: '1.8em', padding: ".4em"}} src="/settings-gear-part-2-svgrepo-com.svg" />
               </button>
               
               
               <button style={logOutButton} onClick={e => {e.preventDefault(); nav('/login')}}>log out</button>

            </div>
            
         </div>


         <div style={mainPageArea}>
            {(router.welcome && userJumpHistory) ? <WelcomePage jumps={userJumpHistory ? userJumpHistory :'loading...'} skip={callLedg} stats={callStats} rigs={[...rigs]} planes={planes} dzs={DZs} defaults={(defaultAircraft || defaultAircraft === null ) ? {plane: defaultAircraft, rig: defaultRig, dz: defaultDZ} : 'loading...'}/> : checkIfTrue(router.welcome) && <LoadPage />}
            {(router.fullList && userJumpHistory) ? <FullJumpLedge rst={() => {getJumpHist()}} add={() => {setUserJumpCount(userJumpCount + 1)}} jumps={userJumpHistory} jump_num={userJumpCount} set_false={() => setGotHistory(false)} rigs={rigs.map(n => n.name)} planes={planes.map(n => n.name)} DZs={DZs.map(n => n.name)} defaults={(defaultAircraft || defaultAircraft === null ) ? {plane: defaultAircraft, rig: defaultRig, dz: defaultDZ} : 'loading...'} /> : checkIfTrue(router.fullList) && <LoadPage />}

            {router.download ? <DownloadPage /> : null}

            {(router.stats && userJumpHistory) ? <StatsPage jumps={userJumpHistory} jump_num={userJumpCount} rigs={rigs} planes={planes} dzs={DZs} /> : checkIfTrue(router.stats) && <LoadPage />}

            {(router.settings && userJumpHistory) ? <SettingsPage user={user} jump_num={userJumpCount} jumps={userJumpHistory ? userJumpHistory : 'loading'} rst={() => {}} set_false={() => setGotHistory(false)} rigs={rigs.map(rig => rig.name)} planes={planes.map(pl => pl.name)} DZs={DZs.map(dz => dz.name)} defaults={(defaultAircraft || defaultAircraft === null ) ? {plane: defaultAircraft, rig: defaultRig, dz: defaultDZ} : 'loading...'} /> : checkIfTrue(router.settings) && <LoadPage />}

            {router.searchedList ? <SearchedList  wildCard={wildCard} flag={flag} jump_num={userJumpCount}/> : null}

            {router.add ? <div style={{display: "flex",justifyContent: "space-around", paddingLeft: "4em", marginTop: "3.25em", width: "100%"}}>
               <div style={{width: '75%'}}>
                  <LogInputWidget add={() => setUserJumpCount(userJumpCount + 1)} rst={() => getJumpHist()} numOfJumps={Array.isArray(userJumpHistory) ? userJumpCount : null} set_false={() => setGotHistory(false)} rigs={rigs.map(n => n.name)} planes={planes.map(n => n.name)} DZs={DZs.map(n => n.name)} defaults={(defaultAircraft || defaultAircraft === null ) ? {plane: defaultAircraft, rig: defaultRig, dz: defaultDZ} : 'loading...'} />
               </div>
            </div> : null}
                  
         </div>


      </div>
   )
}

export default HomePage;