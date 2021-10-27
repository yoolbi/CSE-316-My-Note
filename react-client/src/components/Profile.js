import React, {useEffect, useState, useRef} from 'react';
import {MdClose} from 'react-icons/md';
import {getUsersAPIMethod, updateUserAPIMethod} from "../api/client";

const Profile = ({showProfile, setShowProfile}) =>  {
    const [profile, setProfile] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');

   useEffect(()=>{
       setName(profile?.name);
       setEmail(profile?.email);
       setLocation(profile?.location);
   }, [profile])

    const onChange = event => {
        const { value, name } = event.target;
        setProfile({
            ...profile,
            [name]: value
        });
    };

    useEffect(() => {
        function fetchData() {
            getUsersAPIMethod().then((res) => {
                setProfile(res[0]);
                // console.dir(res);
                // console.dir(profile)
                // setName[res.name];
                print(res);
            }).catch((err) => {
                console.error('Error retrieving note data: ' + err);
            });
        };
        fetchData();
    }, []);

    const print =(res) => {
        console.dir(res);
        console.dir(profile)
    }
    const handleSave = () => {
        updateUserAPIMethod(profile).then((response) => {
            console.log(response);
            console.log("Updated the author on the server");
        }).catch(err => {
            console.error('Error updating author data: ' + err);
        })
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
            <form className="modal-content" action="/action_page.php" profile={profile}>
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
                    <input type="text" name="name" value={name||''} onChange={onChange}/>
                    <br/>
                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" name="email" value={email||''} onChange={onChange}/>
                    <br/>
                    <label htmlFor="location"><b>Location</b></label>
                    <input type="text" name="location" value={location||''} onChange={onChange}/>
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