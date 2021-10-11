import React, {useEffect, useRef} from 'react';
import {MdClose} from 'react-icons/md';

const Profile = ({showProfile, setShowProfile}) =>  {
    const handleClose = () => {
        setShowProfile(!showProfile);
    };

    let containerRef = useRef();

    useEffect(() => {
        let handler = (event) => {
            if (!containerRef.current.contains(event.target)) {
                setShowProfile(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });

    return (
        <div id="id01" className="modal" style={{display: showProfile? 'block' : 'none'}}>
            <form className="modal-content" action="/action_page.php">
                <div className="container" ref={containerRef}>
                    <MdClose
                        className='close-icons'
                        size='1.5em'
                        onClick= {handleClose}
                    />
                    <h1>Edit Profile</h1>
                    <div className='selectImage'>
                        <img
                            className='editprofile-profile'
                            src='profile.jpg'
                            alt=''
                        />
                        <div><b>Choose New Image</b></div>
                        <div><b>Remove Image</b></div>
                    </div>
                    <br/>
                    <label htmlFor="name"><b>Name</b></label>
                    <input type="text" name="name" defaultValue="Yool Bi lee" required/>
                    <br/>
                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" name="email" defaultValue="yoolbi.lee@stonybrook.edu" required/>
                    <br/>
                    <label htmlFor="location"><b>Location</b></label>
                    <input type="text" name="psw-repeat" defaultValue="Songdo" required/>
                    <div className="clearfix">
                        <button type="button" onClick={handleClose}
                                className="save">Save
                        </button>
                        <button type="button" onClick={handleClose}
                                className="logout">
                            <b>Logout</b>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Profile;