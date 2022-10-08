
import AppRouter from "./Router";
import { useState } from "react"
import { authService } from "../myBase"


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser)

  return (<>
   <AppRouter isLoggedIn={isLoggedIn}></AppRouter>
  <footer> &copy; { new Date().getFullYear() } Fwitter </footer>  
  </>
  );
}

export default App;
