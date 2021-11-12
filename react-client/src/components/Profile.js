import React, {useEffect, useState, useRef} from 'react';
import {MdClose} from 'react-icons/md';
import {logoutUserAPIMethod, updateUserAPIMethod, uploadImageToCloudinaryAPIMethod} from "../api/client";

const Profile = ({showProfile, setShowProfile, user, setUser}) =>  {
    const [profile, setProfile] = useState(user);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');

   useEffect(()=>{
       setName(profile?.name);
       setEmail(profile?.email);
       setLocation(profile?.location);
   }, [profile]);

    const onChange = (event) => {
        const { value, name } = event.target;
        setProfile({
            ...profile,
            [name]: value
        });
    };

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

    const handleImageSelected = (event) => {
        console.log("New File Selected");
        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            console.dir(selectedFile);

            const formData = new FormData();
            const unsignedUploadPreset = 'xrvdsh95'
            formData.append('file', selectedFile);
            formData.append('upload_preset', unsignedUploadPreset);

            console.log("Cloudinary upload");
            uploadImageToCloudinaryAPIMethod(formData).then((response) => {
                console.log("Upload success");
                console.dir(response);

                // Now the URL gets saved to the author
                const updatedAuthor = {...profile, "profile_url": response.url};
                setProfile(updatedAuthor);

                // Now we want to make sure this is updated on the server – either the
                // user needs to click the submit button, or we could trigger the server call here
            });
        }
    }

    const handleRemoveImage = () => {
        if (user.profile_url) {
            let editImage = {...user, profile_url: null};
            setProfile(editImage);
        }
    };

    const handleLogout = () => {
        logoutUserAPIMethod(user).then((response) => {
            setUser(null);
            setShowProfile(!showProfile);
        });
    };

    return (
        <div id="id01" className="modal" style={{display: showProfile? 'block' : 'none'}}>
            <form className="modal-content" action="/action_page.php" user={user}>
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
                            src={user.profile_url ? user.profile_url : 'defaultProfile.png'}
                            alt='profile'
                        />
                        <label className="imageEdit">
                            <input type="file" name="profile_url" accept="image/*" id="clooudinary" onChange={handleImageSelected}/>
                            <b>Choose New Image</b>
                        </label>
                        <div className="imageEdit" onClick={handleRemoveImage}><b>Remove Image</b></div>
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
                        <button type="button" onClick={handleLogout}
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