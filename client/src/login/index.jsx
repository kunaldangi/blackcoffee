import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";

import { NotifyBox } from "../../components/Notify";

let spanPassStyle = { fontWeight: 700, padding: "0px 4px" };

function Login(){
    const [userInfo, setUserInfo] = useState({email: "user@demo.com", password: "12345678"});
    const [notify, setNotify] = useState({isNotify: false, type: "", msg: ""});
    let navigate = useNavigate();

    async function loginAccount(){
        let response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userInfo.email,
                password: userInfo.password
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
        <div className="login__main--outter">
            <div className="login__main">
                <div className="login__header"> 
                    <div className="login__header--title">Welcome to Blackcoffer! 👋🏻</div>
                    <div className="login__header--info">Please sign-in to your account and start the adventure</div>
                </div>
                <div className="login__passInfo">
                    User Email: <span style={spanPassStyle}> user@demo.com </span> <span style={{padding: "0px 5px"}}>/</span> Pass: <span style={spanPassStyle}>12345678</span>
                </div>
                <div className="login__email">
                    <div className="login__email--title">Email</div>
                    <input type="text" className="login__email--input" value={userInfo.email} onChange={(e)=>{setUserInfo({...userInfo, email: e.target.value});}} />
                </div>
                <div className="login__pass">
                    <div className="login__pass--title">Password</div>
                    <input type="password" className="login__pass--input" value={userInfo.password} onChange={(e)=>{setUserInfo({...userInfo, password: e.target.value});}} />
                </div>
                {notify.isNotify && <NotifyBox type={notify.type} msg={notify.msg} closeNotify={()=>{setNotify({isNotify: false, type: "", msg: ""});}} />}
                <div className="login__btn">
                    <button className="login__btn--submit" onClick={loginAccount}>Login</button>
                </div>
                <div className="login__isRegister"> New on our platform? <span className="login__isRegister--btn" onClick={()=>{navigate("/register")}}>Create an account</span> </div>
            </div>
        </div>
    )
}

export default Login;