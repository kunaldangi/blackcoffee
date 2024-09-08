import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";

import { NotifyBox } from "../../components/Notify";

function Register(){
    const [notify, setNotify] = useState({isNotify: false, type: "", msg: ""});
    let navigate = useNavigate();

    async function registerAccount(){
        let username = document.getElementById("id--register__username")?.value;
        let email = document.getElementById("id--register__email")?.value;
        let pass = document.getElementById("id--register__password")?.value;
    
        let response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: pass
            })
        });
    
        let data = await response.json();
    
        if(data?.error){
            setNotify({isNotify: true, type: "error", msg: data.error});
        }
        
        if(data?.success){
            setNotify({isNotify: true, type: "success", msg: data.success});
            setTimeout(() => {
                navigate("/");
            }, 3000);
        }
    }

    return (
        <div className="register__main--outter">
            <div className="register__main">
                <div className="register__header"> 
                    <div className="register__header--title">Adventure starts here 🚀</div>
                    <div className="register__header--info">Make your app management easy and fun!</div>
                </div>
                <div className="register__user">
                    <div className="register__user--title">Username</div>
                    <input type="text" className="register__user--input" id="id--register__username" />
                </div>
                <div className="register__email">
                    <div className="register__email--title">Email</div>
                    <input type="text" className="register__email--input" id="id--register__email" />
                </div>
                <div className="register__pass">
                    <div className="register__pass--title">Password</div>
                    <input type="password" className="register__pass--input" id="id--register__password" />
                </div>
                {notify.isNotify && <NotifyBox type={notify.type} msg={notify.msg} closeNotify={()=>{setNotify({isNotify: false, type: "", msg: ""});}} />}
                <div className="register__btn">
                    <button className="register__btn--submit" onClick={()=>{registerAccount(navigate)}} >Sign Up</button>
                </div>
                <div className="register__isLogin"> Already have an account? <span className="register__isLogin--btn" onClick={()=>{navigate("/login")}}>Sign in instead</span> </div>
            </div>
        </div>
    )
}

export default Register;