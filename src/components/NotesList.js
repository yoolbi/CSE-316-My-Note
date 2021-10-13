import Note from './Note';

const NotesList = (
    { notes, handleDeleteNote, currentIndex, setCurrentIndex, handleShowSidebar, setShowSidebar, showSidebar}) => {
    return (
        <div className='notes-list'>
            {notes.map((note) => (
                <Note
                    id={note.id}
                    text={note.text}
                    date={note.date}
                    key={note.id}
                    handleDeleteNote={handleDeleteNote}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    handleShowSidebar={handleShowSidebar}
                    setShowSidebar={setShowSidebar}
                    showSidebar={showSidebar}
                />
            ))}
        </div>
    );
};

export default NotesList;