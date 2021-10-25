import React from "react";
import { MdDelete } from "react-icons/md";

const SidebarHeader = ({id, handleShowProfile, handleDeleteNote}) => {
    const handleProfileClick = () => {
        handleShowProfile(true);
    };

    return (
        <div className='sidebarHeader'>
            <img
                onClick={handleProfileClick}
                className='profile'
                src='profile.jpg'
                alt="personal"
            />
            <div><b>My Notes</b></div>
            <MdDelete
                onClick={() => handleDeleteNote(id)}
                className='delete-icon'
                size='1.5em'
            />
        </div>
    );
}

export default SidebarHeader;