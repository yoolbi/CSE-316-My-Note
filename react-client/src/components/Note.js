import React from 'react';

const Note = ({notes, id, text, date, currentIndex, setCurrentIndex, handleShowSidebar, setShowSidebar, showSidebar, setNotes}) => {

    const handleEditClick = (id) => {
        setCurrentIndex(id)
        handleShowSidebar(false);
        setShowSidebar(!showSidebar)
    };

    const checkIfCurrent = () => {
        if (id === currentIndex) {
            return "rgb(229, 241, 253)"
        } else {
            return "#ffffff"
        }
    };

    return (
        <div className='note'
             style={{backgroundColor: checkIfCurrent()}}
             onClick={() => handleEditClick(id)}>
            <div className='noteTitle'><b>{text}</b></div>
            <small>{date}</small>
        </div>
    );
};

export default Note;