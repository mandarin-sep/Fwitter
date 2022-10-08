import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain:  process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId:  process.env.REACT_APP_PROJECT_ID,
    storageBucket:  process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId:  process.env.REACT_APP_MESSAGIN_ID,
    appId:  process.env.REACT_APP_APP_ID
  };


firebase.initializeApp(firebaseConfig)

export const authService = firebase.auth(); //auth서비스를 아주 많이 호출할 예정이라 
                        // 매번 firebase.auth()로 쓰기 귀찮아서 미리 만들어서 넘겨줌 