import React, {useEffect, useRef, useState} from "react";
import {MdClose} from "react-icons/md";
import {createUserAPIMethod, loginUserAPIMethod} from "../api/client";

const Login = ({user, setUser}) => {
    const [showSignup, setShowSignup] = useState(false);
    const [showErrorLogin, setShowErrorLogin] = useState(false);
    const [showErrorSignup, setShowErrorSignup] = useState(false);
    const [currentUserSignup, setCurrentUserSignup] = useState(null);
    const [currentUserLogin, setCurrentUserLogin] = useState(null);

    const onChangeSignup = (event) => {
        const { value, name } = event.target;
        setCurrentUserSignup({
            ...currentUserSignup,
            [name]: value
        });
    };

    const onChangeLogIn = (event) => {
        const { value, name } = event.target;
        setCurrentUserLogin({
            ...currentUserLogin,
            [name]: value
        });
    };

    const handleLogin = () => {
        console.log(currentUserLogin);
        loginUserAPIMethod(currentUserLogin).then((response) => {
            console.log("Logged In the user on the server");
            setUser(response);
            setShowErrorLogin(false);
        }).catch(err => {
            setShowErrorLogin(true);
        });
    };

    const handleCreate = () => {
        setShowSignup(true);
    };

    const handleClose = () => {
        setShowSignup(!showSignup);
    };

    const handleSignup = () => {
        createUserAPIMethod(currentUserSignup).then((response) => {
            console.log("Created the user on the server");
            setUser(response);
            setShowErrorSignup(false);
        }).catch(err => {
            setShowErrorSignup(true);
        });
    };

    let containerRef = useRef();

    useEffect(() => {
        let handler = (event) => {
            if (!containerRef.current.contains(event.target)) {
                setShowSignup(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });

    return (
        <div>
            <div className="login" >
                <div className="title">
                    <h1 style={{marginTop: '0px'}}>Notes</h1>
                    <h2>Organize all your thoughts in one place.</h2>
                </div>
                <form>
                    <div className="loginContainer">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" required onChange={onChangeLogIn}/>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" required style={{marginBottom: 0}} onChange={onChangeLogIn}/>
                        <div style={{color: "red", display: showErrorLogin? 'block' : 'none'}}>Error: Invalid email and/or password</div>
                        <button type="button" className="loginBtn" onClick={handleLogin}>Log In</button>
                        <hr />
                        <button type="button" className="createAccBtn" onClick={handleCreate}>Create New Account</button>
                    </div>
                </form>
            </div>

            <div className="modal" style={{paddingTop: '0px', display: showSignup? 'block' : 'none'}}>
                <form className="modal-content1" >
                    <div className="container" ref={containerRef} style={{padding: '0px 16px 0px 16px'}}>
                        <div className='signupTop'>
                            <h2>Sign Up</h2>
                            <MdClose
                                className='close-icons'
                                size='1.5em'
                                onClick= {handleClose}
                            />
                        </div>
                        <label htmlFor="name"><b>Name</b></label>
                        <input type="text" name="name" required onChange={onChangeSignup}/>
                        <br/>
                        <label htmlFor="email"><b>Email</b></label>
                        <input type="text" name="email" required onChange={onChangeSignup}/>
                        <br/>
                        <label htmlFor="password"><b>Password</b></label>
                        <input type="password" name="password" required onChange={onChangeSignup} style={{marginBottom: 0}}/>
                        <div style={{color: "red", display: showErrorSignup? 'block' : 'none'}}>Error: Invalid email and/or password</div>
                        <button type="button" className="signupBtn" onClick={handleSignup}>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;