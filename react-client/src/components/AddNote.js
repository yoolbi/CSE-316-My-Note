import React, {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';

const AddNote = ({ text, setText }) => {
    const [noteText, setNoteText] = useState(text);

    const handleChange = (event) => {
        setNoteText(event.target.value);
        setText(event.target.value);
    };

    useEffect(() => {
        setNoteText(text);
    }, [text]);

    return(
        <div className="notenew">
            <textarea
                className='textarea'
                value={noteText}
                onChange = {handleChange}
            ></textarea>
            <ReactMarkdown className='markdown' children={noteText} />
        </div>
    );
}

export default AddNote;