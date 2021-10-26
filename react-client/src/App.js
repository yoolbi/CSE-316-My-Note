import React, {useState} from 'react';
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import SidebarHeader from "./components/SidebarHeader";
import NotepageHeader from "./components/NotepageHeader";
import AddNote from "./components/AddNote";
import Profile from "./components/Profile";
import {useMediaQuery} from 'react-responsive';
import {createNoteAPIMethod, deleteNoteByIdAPIMethod, getNotesAPIMethod} from "./api/client";

const App =  () => {
    const [notes, setNotes] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [currentIndex, setCurrentIndex] = useState('');
    const [showProfile, setShowProfile] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const getCurrentDate = () => {
        var date = new Date();
        var year = date.getFullYear().toString();
        var month = (date.getMonth() + 1).toString();
        var day = date.getDate().toString();
        var hour = (date.getHours().toString() % 12 || 12) ;
        var minute = date.getMinutes().toString();
        var second = date.getSeconds().toString();
        var ap = date.getHours() < 12 ? 'AM':'PM';
        return month + "/" + day + "/" + year + ", " + hour + ":" + minute + ":" + second + " " + ap;
    };

    const addNote = () => {
        var newNote = {
            text: 'New Note',
            lastUpdatedDate: getCurrentDate(),
        }
        createNoteAPIMethod(newNote).then ((response) => {
            console.log("Created the note on the server");
            console.log(response);
            setNotes([response,...notes])
            setCurrentIndex(response._id);
        });

    };

    const deleteNote = (id) => {
        deleteNoteByIdAPIMethod(id).then((response) => {
            console.log("Deleted the author on the server");
            console.log(response);

        })
        getNotesAPIMethod().then((notes) => {
            if(notes.length ===0) {
                setCurrentIndex('');
            }else {
                setCurrentIndex(notes[0]._id);
            }
            setNotes(notes);
        })
    };

    const getText = () => {
        if (currentIndex.length === 0) {
            return '';
        } else if ((notes.filter((note) => note._id === currentIndex)[0].text === 'New Note')) {
            return '';
        } else {
            return notes.filter((note) => note._id === currentIndex)[0].text
        }
    };

    const setText = (newText) => {
        let items = [...notes];
        let item = items.filter((note) => note._id === currentIndex)[0]
        item.text = newText;
        item.lastUpdatedDate = getCurrentDate();
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
                        note.text.includes(searchText)
                    )}
                    handleDeleteNote={deleteNote}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    handleShowSidebar={handleShowSidebar}
                    setShowSidebar={setShowSidebar}
                    showSidebar={showSidebar}
                    setNotes={setNotes}
                />
            </div>

            <div className='notepage'
                 style={isSmallScreen? {display: showSidebar? 'none' : 'block'} : {display: 'block'}}>
                <NotepageHeader
                    handleAddNote={addNote}
                    handleShowSidebar={handleShowSidebar}
                />
                <AddNote text={getText()} setText={setText} notes={notes} setNotes={setNotes}/>
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