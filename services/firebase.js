// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from 'firebase/firestore';
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const analytics = getAnalytics(app);


const initFirebaseApp = () => {

    const firebaseConfig = {
        apiKey: import.meta.env.VITE_API_KEY,
        authDomain: import.meta.env.VITE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_APP_ID,
        measurementId: import.meta.env.VITE_MEASUREMENT_ID
      };
    try {
        const app = initializeApp(firebaseConfig);
        console.log("Init FirebaseApp completed");
    return app;
    } catch (error) {
        console.log("Error:while init Firebase App", error);
    }
}


const getFirestoreService = () => {
    console.log("Insideooooo")
    try {
        const app = initFirebaseApp();
        const firestoreService = getFirestore(app);
        console.log("GETDB", firestoreService)
    return firestoreService;
        
    } catch (error) {
        console.log("Error:while getFirestoreDB", error);
    }
}

export const addEntry = async(entry)=>{
    console.log("Inside addEntry");
    try{
        const firestoreService = getFirestoreService();
        const docRef = await addDoc(collection(firestoreService, "ledgerDB"),entry)
        console.log("Document written with ID: ", docRef.id);
          
    }catch(error){
        console.error("Error adding document: ", error);
    }
}

export const getEntries = async()=>{
    console.log("Inside getEntries");
    try{
        const firestoreService = getFirestoreService();
        const querySnapshot  = await getDocs(collection(firestoreService, "ledgerDB"))
        const documents =[];
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data(), typeof doc.data(), doc.id);
            documents.push({...doc.data(), id:doc.id});
          });
          console.log("docs", documents)
          return documents;
    }catch(error){
        console.error("Error adding document: ", error);
        throw new Error("Error while get")
    }
}
export const deleteEntry = async(id)=>{
    console.log("Inside deleteEntry");

    try{
        const firestoreService = getFirestoreService();
       await deleteDoc(doc(firestoreService,"ledgerDB",id))
        console.log("Deleteed")
    }catch(error){
        console.error("Error delete document: ", error);
        throw new Error("Error while delete")
    }
}






