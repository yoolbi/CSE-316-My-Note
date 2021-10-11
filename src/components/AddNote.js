import {useEffect, useState} from 'react';

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
        <div className="note new">
            <textarea
                value={noteText}
                onChange = {handleChange}
            ></textarea>
        </div>
    );
}

export default AddNote;