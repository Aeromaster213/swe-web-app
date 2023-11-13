import React, {useState} from "react";
import './auth.css';
import {useUploadContext} from "../../Context/UploadContext";

export default function Auth() {
    const {handleLoginContext} = useUploadContext();
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const handleSignup = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/signup", {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({
                    username: user, password: pass
                }),
            })
            if (response.status === 400) {
                window.alert("User Already Exists!");
            } else if (response.status === 500) {
                window.alert("Internal Server Error!");
            } else if (response.status === 201) {
                //implement signup and login TODO:
                handleLoginContext(true);
            }
        } catch (error) {
            console.log("Unexpected Error!");
        }
    };

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: 'POST', headers: {
                    'Content-Type': 'application/JSON',
                }, body: JSON.stringify({
                    username: user, password: pass
                })
            })

            if (response.status === 401) {
                window.alert("Invalid Credentials!");
            } else if (response.status === 500) {
                window.alert("Internal Server Error!");
            } else if (response.ok) {
                //TODO: login
            }
        } catch (error) {
            console.log("Unexpected Error!");
        }
    }

    return (
        <div className={"auth-container"}>
            <div className={"auth-box"}>
                <div className="auth-logo">
                    <p className="auth-logo-text">
                        <text style={{color: "#8080D7"}}>T</text>
                        OWER <text style={{color: "#8080D7"}}>O</text>F <text style={{color: "#8080D7"}}>B</text>ABEL
                    </p>
                </div>
                <div className={"auth-input-box"}><input
                    type={"text"}
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder={"Username"}
                    className={"auth-input auth-user-inp"}
                />
                <input
                    type={"password"}
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder={"Password"}
                    className={"auth-input auth-password-inp"}
                /></div>

                <div className={"auth-button-box"}>
                    <button
                        className={"auth-button auth-signup-btn"}
                        onClick={handleSignup}
                        type={"button"}
                    >Sign Up
                    </button>
                    <button
                        className={"auth-button auth-login-btn"}
                        onClick={handleLogin}
                        type={"button"}
                    >
                        Login
                    </button></div>

            </div>
        </div>
    )
}