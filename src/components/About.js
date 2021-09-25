import React, { useContext } from 'react';
import NoteContext from '../context/notes/noteContext';

function About() {
    const a = useContext(NoteContext);
    return (
        <div className="container my-5 text-white">
            <h3><strong><i>About iNoteBook</i></strong></h3>
            <p><h4>This is a note taking web app that stores your important notes on the cloud and you can access them by logging in your account.
                Create an account to store your notes on the cloud</h4></p>
        </div>
    )
}

export default About
