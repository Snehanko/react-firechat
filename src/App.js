import {useEffect, useState} from "react"
import './Style/App.css'

//Firebase App
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

//React Component
import Button from "./components/Button";
import Channel from "./components/Channel";

firebase.initializeApp({
  apiKey: "AIzaSyB-WkxFwXvDJf6FRcvqGgdLssRUEfCVKW8",
    authDomain: "fir-basics-52a84.firebaseapp.com",
    projectId: "fir-basics-52a84",
    storageBucket: "fir-basics-52a84.appspot.com",
    messagingSenderId: "798033210071",
    appId: "1:798033210071:web:503f3f6963b3e0beb8de92",
    measurementId: "G-5E54HS4GJ2" 
})

const auth=firebase.auth();
const db=firebase.firestore();

function App() {
  const [user,setUser]=useState(()=>auth.currentUser);
  const [initializing,setInitializing]=useState(true);

  useEffect(()=>{
    const unsunscribe=auth.onAuthStateChanged(user=>{
      console.log(user)
      if(user){
        setUser(user);
      }else{
        setUser(null);
      }
      if(initializing){
        setInitializing(false);
      }
    });
    //Cleanup Subscrpition 
    return unsunscribe;
  })

  const signInWithGogle= async()=>{   
    // Retrive Google Provider object
    const provider = new firebase.auth.GoogleAuthProvider();
    //set Langugae to default browser preference
    auth.useDeviceLanguage();
    //Start sign in process
    try{
      await auth.signInWithPopup(provider);
    }catch(error){
      console.error(error);
    }
  }

  const signOut=async()=>{
    try{
      await firebase.auth().signOut();
    }catch(error){
      console.log(error.messege);
    }
  };
  
  if (initializing) return "Loading...";

  return (
    <div className='App'>
      {user? (<>
       <Button onClick={signOut}>Sign out</Button>
       <Channel user={user} db={db}></Channel>
      </>
      ):
      (<Button onClick={signInWithGogle} style={{textAlign:"center"}}>Click here to sign in with Google</Button>)}
    </div>
  );
}

export default App;
