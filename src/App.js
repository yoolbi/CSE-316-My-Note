import {/*useEffect,*/ useState} from 'react';
import { nanoid } from 'nanoid';
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import SidebarHeader from "./components/SidebarHeader";
import NotepageHeader from "./components/NotepageHeader";
import AddNote from "./components/AddNote";

const App =  () => {
    const [notes, setNotes] = useState([
        {
            id: nanoid(),
            text: 'CSE 316',
            date: '9/10/2021',
        },
        {
            id: nanoid(),
            text: 'CSE 416',
            date: '8/21/2021',
        },
    ]);

    const [searchText, setSearchText] = useState('');
    const [currentIndex, setCurrentIndex] = useState('');


    // useEffect(() => {
    //     const savedNotes = JSON.parse(
    //         localStorage.getItem('my-notes-data')
    //     );
    //
    //     if(savedNotes) {
    //         setNotes(savedNotes);
    //     }
    // }, [])
    //
    // useEffect(() => {
    //     localStorage.setItem(
    //         'my-notes-data',
    //         JSON.stringify(notes)
    //     );
    // }, [notes])

    const getCurrentDate = () => {
        var date = new Date();
        var year = date.getFullYear().toString();
        var month = (date.getMonth() + 1).toString();
        var day = date.getDate().toString();
        return month + "/" + day + "/" + year ;
    };

    const addNote = (text) => {
        const newNote = {
            id: nanoid(),
            text: 'New Note',
            date: getCurrentDate(),
            key: nanoid(),
        }
        const newNotes = [newNote, ...notes];
        setNotes(newNotes);
    };

    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => note.id !== id);
        setNotes(newNotes);
        console.log("DELETE NOTE", notes, notes[0].id)
        setCurrentIndex(notes[0].id);
       console.log("DELETE NOTE", newNotes, id)
    };

    const getText = () => {
        let items = [...notes];
        console.log("GETTING TEXT....",items,currentIndex)
        if (currentIndex.length === 0) {
            return '';
        } else if ((notes.filter((note) => note.id === currentIndex)[0].text === 'New Note')) {
            return '';
        } else {
            return notes.filter((note) => note.id === currentIndex)[0].text
        }
    };

    const setText = (newText) => {
        let items = [...notes];
        let item = items.filter((note) => note.id === currentIndex)[0]
        item.text = newText;
        item.date = getCurrentDate();
        setNotes(items);
    };

    return (
        <div className='wrapper'>
            <div className='sidebar'>
                <SidebarHeader
                    id = {currentIndex}
                    handleDeleteNote={deleteNote}
                />
                <Search handleSearchNote={setSearchText}/>
                <NotesList
                    notes={notes.filter((note)=>
                        note.text.toLowerCase().includes(searchText)
                    )}
                    handleDeleteNote={deleteNote}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                />
            </div>

            <div className='notepage'>
                <NotepageHeader
                    handleAddNote={addNote}
                />
                <AddNote text={getText()} setText={setText}/>
            </div>


        </div>
    );
};

export default App;