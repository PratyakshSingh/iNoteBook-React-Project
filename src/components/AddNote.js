import React, { useState, useContext} from 'react'
import NoteContext from '../context/notes/noteContext';


const AddNote = (props) => {
    const context = useContext(NoteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title: "", description: "", tag: ""})
    
    
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        props.showAlert("New Note added", "success")
        setNote({title: "", description: "", tag: ""})
    }
    return (
        <div className="addNote-container-wrapper clearfix">
            <h2 className="text-center mt-1 text-white">Add a Note</h2>
            <form className="form-horizontal login-form">
                <div className="form-group relative">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control input-lg" id="title" name="title" value={note.title} onChange={onChange} minLength={5} required/>
                </div>
                <div className="form-group relative">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control input-lg" id="Description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
                </div>
                <div className="form-group relative">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control input-lg" id="tag" name="tag" value={note.tag} onChange={onChange}/>
                </div>
                <div className="form-group text-center mt-3">
                <button disabled={note.title.length <5 || note.description.length <5} type="submit" className="btn btn-success btn-lg btn-block" onClick={handleClick}>Add Note</button>
                </div>
            </form>
        </div>
    )
}

export default AddNote
