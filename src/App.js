import logo from './logo.svg';
import  React ,{useState} from 'react'
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

 firebase.initializeApp(firebaseConfig);
 

function App() {

  const [user , setUser] = useState({
    isSignedIn : false,
    name: '',
    email : '',
    photo: ''

  })

 const provider = new firebase.auth.GoogleAuthProvider();
 const handleSignIn = ()=>{
  firebase.auth().signInWithPopup(provider)
  .then(res =>{
     const {displayName, email,photoURL} = res.user;
     const signedInUser = {
       isSignedIn:true,
       name : displayName, 
       email: email,
      photo: photoURL
       
     }
     setUser(signedInUser);
     console.log(displayName,email,photoURL);
  })
.catch(err =>{
  console.log(err);
  console.log(err.message)
})
 }

 const handleSignOut = () => {
   firebase.auth().signOut()
   .then(res => {
   const signedOutUser = {
     isSignedIn: false,
     name:'',
     photo:'',
     email: ''
   }
   setUser(signedOutUser)
   })
   .catch(err => {

   })
 }
  

  return (
    <div className="App">
      {
       user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button> :

       <button onClick={handleSignIn}>LoG in with Google</button>

      }
      {
         user.isSignedIn && <div>  <p>Welcome, {user.name}</p>
        <p>Your email: {user.email}</p>
         <img src={user.photo} alt=""></img>

        </div>
}
    </div>
  );
  
}

export default App;
