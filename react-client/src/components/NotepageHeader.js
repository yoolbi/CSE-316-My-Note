import React from "react";
import {MdArrowBack, MdNoteAdd} from 'react-icons/md';
import { useState } from 'react';

const NotepageHeader = ({ handleAddNote, handleShowSidebar }) => {
    const [noteText, setNoteText] = useState('');

    const handleAddClick = () => {
        handleAddNote(noteText);
        setNoteText('');
    };

    const handleBackClick = () => {
        handleShowSidebar(true);
    };

    return (
        <div className='notepageHeader'>
            <MdArrowBack
                onClick={handleBackClick}
                className='back-icons' size='1.5em' />
            <MdNoteAdd
                onClick={handleAddClick}
                className='add-icons' size='1.5em' />
        </div>
    );
}

export default NotepageHeader;