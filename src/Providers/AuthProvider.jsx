import { createUserWithEmailAndPassword,  getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";import app from "../firebase/firebase.config";
import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext(null)
const auth = getAuth(app);
const AuthProvider = ({children}) => {
const [user, setUser] = useState(null)
const [loading, setLoading] = useState(true)

const createUser = (email , password) =>{
  setLoading(true)
  return createUserWithEmailAndPassword(auth, email, password)
}

const signIn =(email, password)=>{
  setLoading(true);
  return signInWithEmailAndPassword(auth,email, password)
}

// const signOut = () =>{
//   setLoading(true)
//   return signOut(auth)
// }
const signout = () =>{
  setLoading(true)
  return signOut(auth)
}

const updateUserProfile = (name , photo) =>{
  return updateProfile(auth.currentUser, {
     displayName: name, photoURL: photo
   })
 }

useEffect(()=>{
 const unsubscribe = onAuthStateChanged(auth, currentUser=>{
    setUser(currentUser)
    console.log('current user',currentUser);
    setLoading(false)
  });
  return () => {
    return unsubscribe()
  }
},[])

  const authInfo = {
      user,
      loading,
      createUser,
      updateUserProfile,
      signIn,
      signout,
  }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;