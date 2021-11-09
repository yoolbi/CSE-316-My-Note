import React, {useEffect, useRef, useState} from "react";
import {MdClose} from "react-icons/md";

const Login = (props, {handleShowNotes, handleShowLogin}) => {
    // const [user, setUser] = useState(props.user || {})
    const [showSignup, setShowSignup] = useState(false);

    const handleLogin = () => {
        handleShowLogin(true);
        handleShowNotes(true);
    };

    const handleCreate = () => {
        setShowSignup(true);
    };

    const handleClose = () => {
        setShowSignup(!showSignup);
    };

    const handleSignup = () => {
        handleShowLogin(true);
        handleShowNotes(true);
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
                    <h1>Notes</h1>
                    <h2>Organize all your thoughts in one place.</h2>
                </div>
                <form>
                    <div className="loginContainer">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" required />
                        <label htmlFor="psw">Password</label>
                        <input type="password" name="psw" required />
                        <button type="button" className="loginBtn" onClick={handleLogin}>Log In</button>
                        <hr />
                        <button type="button" className="createAccBtn" onClick={handleCreate}>Create New Account</button>
                    </div>
                </form>
            </div>

            <div className="modal" style={{display: showSignup? 'block' : 'none'}}>
                <form className="modal-content1">
                    <div className="container" ref={containerRef}>
                        <MdClose
                            className='close-icons'
                            size='1.5em'
                            onClick= {handleClose}
                        />
                        <h1>Sign Up</h1>
                        <label htmlFor="name"><b>Name</b></label>
                        <input type="text" name="name" required/>
                        <br/>
                        <label htmlFor="email"><b>Email</b></label>
                        <input type="text" name="email" required/>
                        <br/>
                        <label htmlFor="password"><b>Password</b></label>
                        <input type="password" name="password" required/>

                        <button type="button" className="signupBtn" onClick={handleSignup}>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;