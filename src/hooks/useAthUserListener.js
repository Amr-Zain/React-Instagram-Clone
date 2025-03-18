import React from "react";
import FirebaseContext from "../contexts/firebase";
import { onAuthStateChanged } from "firebase/auth";
function useAuthUserListener(){
    const [user,setUser] = React.useState(JSON.parse( localStorage.getItem("authUser"))|| null)
    const { auth } =React.useContext(FirebaseContext);
    React.useEffect(()=>{ 
        const listener = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                localStorage.setItem("authUser", JSON.stringify(authUser));
                setUser(authUser);
            } else {
                localStorage.removeItem("authUser");
                setUser(null);
            }
        });
        return ()=>listener();
    },[auth, user])
    return user
}
export default useAuthUserListener;

