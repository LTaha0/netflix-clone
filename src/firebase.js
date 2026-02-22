
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth/cordova";
import { addDoc, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA8BfN8JcC36yVCvmRKZhlMU3kRm1YnWW8",
  authDomain: "netflix-clone-1ff0a.firebaseapp.com",
  projectId: "netflix-clone-1ff0a",
  storageBucket: "netflix-clone-1ff0a.firebasestorage.app",
  messagingSenderId: "585733685530",
  appId: "1:585733685530:web:b1b98faa8081f55b0daca3"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db =getFirestore(app);

const signUp =async (name,email,password)=>{
    try{
      const res=  await createUserWithEmailAndPassword(auth,email,password);
      const user=res.user;
      await addDoc(collection(db,'user'),{
        uid:user.uid,
        name,
        authProvider:"local",
        email
      })
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}
const login =async (email,password)=>{
    try{
      await signInWithEmailAndPassword(auth,email,password)  
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const logout=()=>{
    signOut(auth);
}

export {auth,db,login,signUp,logout}