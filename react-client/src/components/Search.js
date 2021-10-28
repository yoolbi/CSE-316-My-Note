import React, {useEffect} from 'react';
import { MdSearch } from 'react-icons/md';

const Search = ({ notes, handleSearchNote, searchText, setCurrentIndex, currentIndex }) => {
    useEffect(() => {
            if (notes.length > 0) {
                setCurrentIndex(notes[0]._id);
            }
            if (searchText === '') {
                setCurrentIndex(currentIndex);
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