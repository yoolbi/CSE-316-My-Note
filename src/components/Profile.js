import React, {useEffect, useState, useRef} from 'react';
import {MdClose} from 'react-icons/md';

const Profile = ({showProfile, setShowProfile}) =>  {
    const [profile, setProfile] = useState([
        {
            id: 0,
            name: 'Yool Bi Lee',
            email: 'yoolbi.lee@stonybrook.edu',
            location: 'Songdo',
        },
    ]);

    const onChangeName = (event) => {
        setProfile({name: event.target.value});
    };

    const onChangeEmail = (event) => {
        setProfile({email: event.target.value});
    };

    const onChangeLocation = (event) => {
        setProfile({location: event.target.value});
    };

    const handleSave = () => {
        localStorage.setItem('my-profile-data', JSON.stringify(profile));
        setShowProfile(!showProfile);
    };

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
                    <input type="text" name="name" value={profile[0].name} onChange={onChangeName}/>
                    <br/>
                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" name="email" value={profile[0].email} onChange={onChangeEmail}/>
                    <br/>
                    <label htmlFor="location"><b>Location</b></label>
                    <input type="text" name="location" value={profile[0].location} onChange={onChangeLocation}/>
                    <div className="clearfix">
                        <button type="button" onClick={handleSave}
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