import React from "react";
import {Link,useNavigate} from "react-router-dom"
import FirebaseContext from "../contexts/firebase";
import "../styles/login.css"
import * as PATHS from "../constants/Routes"
import { signInWithEmailAndPassword  } from "firebase/auth";
import useAuthUserListener from "../hooks/useAthUserListener";
function Login(){

    const navigate = useNavigate();
    const {auth} = React.useContext(FirebaseContext);
    const user = useAuthUserListener();
    console.log(user)
    const [formData ,setFormData] =React.useState({email:"",password:"",error:""})

    const isInvalid = formData.email === "" || formData.password === ""||formData.password.length<8;
    function changeHandle(evn){
        setFormData((prv)=>{return{
            ...prv,
            [evn.target.name] :evn.target.value}})
    }
    async function submitHandler(event){
        event.preventDefault();

        try{
            await signInWithEmailAndPassword (auth,formData.email, formData.password).then((userCredential) => {
            })
            .catch((e) => {
                setFormData({email:"",password:"",error:e.message.replace("Firebase: Error ","").replace("auth/","")})
            });;
            
        }catch(e){
            
            
        }
    }

    React.useEffect(() => {
        if (user) {
            navigate(PATHS.HOME, { replace: true });
        }
    }, [user, navigate]);

    React.useEffect(() => {
        document.title = 'Login - Instagram';
    }, []);

    return(<div className="container">
            <div className="img-container">
                <img src="/images/iphone-with-profile.jpg" alt="iPhone with Instagram app" />
            </div>
            <div className="container-sec">
                <div className="form-container">
                    <img className="logo" src="/images/logo.png" alt="logo"/>
                    
                    {formData.error && <p className="error">{formData.error}</p>}
                    
                        <form onSubmit={submitHandler} method="POST">
                            
                            <input name= "email" 
                            placeholder="Enter Your Email"
                            type="email" 
                            onChange={changeHandle}
                            value={formData.email}
                            />
                            <input name= "password"
                            
                            placeholder="Your Password"
                            type="password"
                            onChange={changeHandle}
                            value={formData.password}
                            />
                            <button disabled={isInvalid} type="submit" className={`subnitBtn`} style={{opacity: isInvalid?"50%":"100%"}} >Log in</button>
                        </form>
                
                        
                    </div>
                    <div className="signup">
                        <p>Don't have an account?</p>
                        <Link className="link" to={PATHS.SIGN_UP} >Sign up</Link>
                    </div>
                </div>
            </div>)
}
export default Login;