import React, {useEffect, useState} from 'react';
import { nanoid } from 'nanoid';
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import SidebarHeader from "./components/SidebarHeader";
import NotepageHeader from "./components/NotepageHeader";
import AddNote from "./components/AddNote";
import Profile from "./components/Profile";
import {useMediaQuery} from 'react-responsive';

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
    const [showProfile, setShowProfile] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    //save localStorage
    useEffect(() => {
        const savedNotes = JSON.parse(
            localStorage.getItem('my-notes-data')
        );

        if(savedNotes) {
            setNotes(savedNotes);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(
            'my-notes-data',
            JSON.stringify(notes)
        );
    }, [notes])

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
        setCurrentIndex(newNotes[0].id);
    };

    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => note.id !== id);
        setNotes(newNotes);
        if(newNotes.length ===0) {
            setCurrentIndex('');
        }else {
            setCurrentIndex(newNotes[0].id);
        }
    };

    const getText = () => {
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

    const handleShowProfile = (event) => {
        setShowProfile({
            showProfile : event
        })
    };
    const isSmallScreen = useMediaQuery({ query: "(max-width: 500px)"});

    const handleShowSidebar = (event) => {
        setShowSidebar({
            showSidebar : event
        })
    };

    return (
        <React.Fragment>
        <div className='wrapper'>
            <div className='sidebar'
                 style={isSmallScreen? {display: showSidebar? 'block' : 'none'} : {display: 'block'}}>
                <SidebarHeader
                    id = {currentIndex}
                    handleShowProfile={handleShowProfile}
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
                    handleShowSidebar={handleShowSidebar}
                    setShowSidebar={setShowSidebar}
                    showSidebar={showSidebar}
                />
            </div>

            <div className='notepage'
                 style={isSmallScreen? {display: showSidebar? 'none' : 'block'} : {display: 'block'}}>
                <NotepageHeader
                    handleAddNote={addNote}
                    handleShowSidebar={handleShowSidebar}
                />
                <AddNote text={getText()} setText={setText}/>
            </div>
        </div>
        <Profile
                 showProfile={showProfile}
                 setShowProfile={setShowProfile}
        />
        </React.Fragment>
    );
};

export default App;