import React, {useEffect} from 'react';
import { MdSearch } from 'react-icons/md';

const Search = ({ notes, handleSearchNote, searchText, setCurrentIndex }) => {
    useEffect(() => {
        if (notes.length > 0) {
            setCurrentIndex(notes[notes.length - 1]._id);
        }
        if (searchText === '') {
            setCurrentIndex('');
        }
    }, [searchText, setCurrentIndex]);

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