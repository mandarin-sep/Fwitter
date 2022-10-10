
import AppRouter from "./Router";
import { useEffect, useState } from "react"
import { authService } from "../myBase"
import { onAuthStateChanged } from "firebase/auth"


function App() {
  const [init, setInit] = useState(false)
  const [userObj, setUserObj ] = useState(null)

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if(user){
        setUserObj(user);
      } 
      setInit(true)
    })
  }, [])

  return (<>
  { init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj}></AppRouter>: "Loading..." }
  <footer> &copy; { new Date().getFullYear() } Fwitter </footer>  
  </>
  );
}

export default App;
