import React from 'react';

const Profile = ({showProfile}) =>  {
    return (
        <div id="id01" className="modal" style={{display: showProfile? 'block' : 'none'}}>
            <form className="modal-content" action="/action_page.php">
                <div className="container">
                    <button type="button" onClick="document.getElementById('id01').style.display='none'"
                            className="material-icons" id="close" style={{float: 'right', margin: '5px'}}>close
                    </button>
                    <h1>Edit Profile</h1>
                    <div style={{alignItems: 'center'}}>
                        <img className="profile" src="/profile.jpg" style={{marginRight: '30px', marginBottom: '0px'}}/>
                        <b>Choose New Image</b>
                        <b style={{marginLeft: '20px'}}>Remove Image</b>
                    </div>
                    <br/>
                    <label htmlFor="name"><b>Name</b></label>
                    <input type="text" name="name" defaultValue="Yool Bi lee" required/>
                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" name="email" defaultValue="yoolbi.lee@stonybrook.edu" required/>
                    <label htmlFor="location"><b>Location</b></label>
                    <input type="text" name="psw-repeat" defaultValue="Songdo" required/>
                    <div className="clearfix">
                        <button type="button" onClick="document.getElementById('id01').style.display='none'"
                                className="save">Save
                        </button>
                        <button type="button" onClick="document.getElementById('id01').style.display='none'"
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