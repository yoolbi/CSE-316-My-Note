import Note from './Note';

const NotesList = ({ notes, handleDeleteNote, currentIndex, setCurrentIndex }) => {
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
                />
            ))}
        </div>
    );
};

export default NotesList;