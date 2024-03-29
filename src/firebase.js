import firebase from "firebase/compat";


const firebaseConfig = {
    apiKey: "AIzaSyDm2mDLwQJbHnjMq6sU2xBtF9Z7Vre__7g",
    authDomain: "fir-demo-26b3d.firebaseapp.com",
    projectId: "fir-demo-26b3d",
    storageBucket: "fir-demo-26b3d.appspot.com",
    messagingSenderId: "387597387634",
    appId: "1:387597387634:web:33dba5a44d21165e89bfeb"
  };


  const app = firebase.initializeApp(firebaseConfig);
  const auth = app.auth();
  const db = app.firestore();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      const res = await auth.signInWithPopup(googleProvider);
      const user = res.user;
      const query = await db
        .collection("users")
        .where("uid", "==", user.uid)
        .get();
      if (query.docs.length === 0) {
        await db.collection("users").add({
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const signInWithEmailAndPassword = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      const user = res.user;
      await db.collection("users").add({
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const sendPasswordResetEmail = async (email) => {
    try {
      await auth.sendPasswordResetEmail(email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const logout = () => {
    auth.signOut();
  };
  export {
    auth,
    db,
    signInWithGoogle,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordResetEmail,
    logout,
  };