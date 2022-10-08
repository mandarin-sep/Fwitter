
import AppRouter from "./Router";
import { useEffect, useState } from "react"
import { authService } from "../myBase"
import { onAuthStateChanged } from "firebase/auth"


function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if(user){
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, [])

  return (<>
  { init ? <AppRouter isLoggedIn={isLoggedIn}></AppRouter>: "Loading..." }
  <footer> &copy; { new Date().getFullYear() } Fwitter </footer>  
  </>
  );
}

export default App;
