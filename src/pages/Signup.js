import React from "react";
import {Link,useNavigate} from "react-router-dom"
import FirebaseContext from "../contexts/firebase";
import "../styles/login.css"
import * as PATHS from "../constants/Routes"
import { doesUsernameExist , updateFollowers } from '../services/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; 
function Signup(){

    const navigate = useNavigate();
    const { auth,FieldValue } = React.useContext(FirebaseContext);

    const [formData ,setFormData] =React.useState({email:"",password:"",userName:"",fullName:"",error:""})

    const isInvalid = formData.email === "" || formData.password === ""||formData.password.length<8
    ||formData.userName===""||formData.fullName==="";
    function changeHandle(evn){
        setFormData((prv)=>{return{
            ...prv,
            [evn.target.name] :evn.target.value}})
    }
    async function submitHandler(event){
        event.preventDefault();
        const isExist = await doesUsernameExist(formData.userName);
        //console.log("idExist",isExist);
        if(!isExist){
            try{

                    const createdUserResult = await createUserWithEmailAndPassword (auth,formData.email, formData.password);
                    //console.log(createdUserResult)
        
                // authentication
                // -> emailAddress & password 
        
                // firebase user collection (create a document)
                const usersRef = collection(FieldValue, 'users');
                await addDoc(usersRef, {
                    userId: createdUserResult.user.uid,
                    username: formData.userName.toLowerCase(),
                    fullName:formData.fullName,
                    emailAddress: formData.email.toLowerCase(),
                    following: ["2"],
                    followers: [],
                    photos:0,
                    dateCreated: Date.now()
                })
                await updateFollowers('Z4UuSMEn71luvi49bcOr',createdUserResult.user.uid,false);
                
                //navigate(PATHS.HOME);
                window.location.reload();
            }catch(e){
                setFormData({email:"",password:"",userName:"",fullName:"",error:e.message.replace("Firebase: Error ","").replace("auth/","")})
            }
        } else {
            setFormData(prv =>{return {...prv,userName:"",
                            error:'That username is already taken, please try another.'}})
        }
    }
    React.useEffect(() => {
        document.title = 'Signup - Instagram';
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
                            
                            <input name= "fullName" 
                            placeholder="Enter Your Full Name"
                            type="text" 
                            onChange={changeHandle}
                            value={formData.fullName}
                            />
                            <input name= "email" 
                            placeholder="Enter Your Email"
                            type="email" 
                            onChange={changeHandle}
                            value={formData.email}
                            />
                            <input name= "userName" 
                            placeholder="Enter Your Full Username"
                            type="text" 
                            onChange={changeHandle}
                            value={formData.userName}
                            />
                            <input name= "password"
                            placeholder="Your Password"
                            type="password"
                            onChange={changeHandle}
                            value={formData.password}
                            />
                            <button disabled={isInvalid} type="submit" className={`subnitBtn`} style={{opacity: isInvalid?"50%":"100%"}} >Signup</button>
                        </form>
                
                        
                    </div>
                    <div className="signup">
                        <p>Have an account?</p>
                        <Link className="link" to={PATHS.LOGIN} >Log In</Link>
                    </div>
                </div>
            </div>)
}
export default Signup;