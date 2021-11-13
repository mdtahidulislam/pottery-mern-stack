import initFirebase from "../Pages/Login/Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
// import { useHistory, useLocation } from "react-router";

// init firebase
initFirebase();


const useFirebase = () => {
    const auth = getAuth();
    const [user, setUser] = useState({});
    const [authError, setAuthError] = useState('');
    const [isLoding, setIsLoding] = useState(true);

    // const location = useLocation();
    // const history = useHistory();

    // create user
    const createUser = (email, password, name, history) => {
        setIsLoding(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const newUser = { email, displayName: name };
                setUser(newUser);
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                    // Profile updated!
                    // ...
                }).catch((error) => {
                    // An error occurred
                    // ...
                });
                history.replace('/');
            }).catch((err) => {
                setAuthError(err.messsage)
            })
            .finally(() => setIsLoding(false));
    }

    // get current user
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                console.log(user);
            } else {
                setUser({})
            }
        });
        // return () => unsubscribe;
    }, [])

    // login user
    const userLogin = (email, password, location, history) => {
        setIsLoding(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/';
                history.replace(destination);
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
            })
            .finally(() => setIsLoding(false));
    }

    // signout
    const userSignOut = () => {
        setIsLoding(true);
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => setIsLoding(false));
    }


    return {
        user,
        authError,
        isLoding,
        createUser,
        userLogin,
        userSignOut
    };
};

export default useFirebase;