import React, {useEffect} from 'react';
import { MdSearch } from 'react-icons/md';

const Search = ({ notes, handleSearchNote, searchText, setCurrentIndex, currentIndex }) => {
    useEffect(() => {
        // no notes, return
        if (notes.length === 0) {
            return;
        }
        //if there is a search
        if (searchText.length !== 0) {
            //if nothing was selected, select the top note
            if (currentIndex.length === 0) {
                setCurrentIndex(notes[0]._id);
            }
            //if note is selected and the selected note is in the filtered note, select the selected note
            else {
                let selectedIndex = 0;
                for (let i = 0; i < notes.length; i++) {
                    if (notes[i]._id === currentIndex) {
                        selectedIndex = i;
                    }
                }
                setCurrentIndex(notes[selectedIndex]._id);
            }
        }

    }, [searchText, setCurrentIndex, notes, currentIndex]);

    return (
        <div className='search'>
            <MdSearch className='search-icons' size='1.5em' />
            <input
                className='searchInput'
                onChange={(event) => {
                    handleSearchNote(event.target.value);
                }}
                type='text'
                placeholder='Search all notes'
                value={searchText}
            />
        </div>
    );
};

export default Search;