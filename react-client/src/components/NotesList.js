import Note from './Note';
import {getNotesAPIMethod} from "../api/client";
import {useEffect} from "react";

const NotesList = (
    { notes, handleDeleteNote, currentIndex, setCurrentIndex, handleShowSidebar, setShowSidebar, showSidebar, setNotes}) => {

    useEffect(() => {
        function fetchData() {
            getNotesAPIMethod().then((notes) => {
                setNotes(notes);
                console.dir(notes);
                // updateNoteAPIMethod(notes);
            }).catch((err) => {
                console.error('Error retrieving note data: ' + err);
            });
        };
        fetchData();
    }, []);

    return (
        <div className='notes-list'>
            {notes.map((note) => (
                <Note
                    // notes={notes}
                    id={note.id}
                    text={note.text}
                    date={note.lastUpdatedDate}
                    key={note.id}
                    handleDeleteNote={handleDeleteNote}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    handleShowSidebar={handleShowSidebar}
                    setShowSidebar={setShowSidebar}
                    showSidebar={showSidebar}
                    setNotes={setNotes}
                />
            ))}
        </div>
    );
};

export default NotesList;