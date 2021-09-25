import React, {useContext} from 'react';
import NoteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const {deleteNote} = context;
    const {note, updateNote} = props;

    return (
        <div className="col-3 noteitem-container-wrapper">
           <div className="card my-2">
                <div className="card-body">
                    <div className="d-flex align-self-stretch flex-wrap">
                        <h5 className="card-title fw-bold">{note.title}</h5>
                        <i className="fas fa-trash-alt mx-2" onClick={() => {deleteNote(note._id);props.showAlert("Note deleted", "success")
                                }}></i>
                        <i className="fas fa-edit mx-2" onClick={() => {updateNote(note)}}></i>
                    </div>
                        <p className="card-text fst-italic">{note.description}</p>
                </div>
            </div> 
        </div>
    )
}

export default NoteItem
